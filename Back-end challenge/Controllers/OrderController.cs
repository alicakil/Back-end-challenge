using Backend.Challenge.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using System.Linq;
using Backend.Challenge.Data;
using Backend.Challenge.Services;

namespace Backend.Challenge.Controllers
{
	[RoutePrefix("api/Order")]
	[ApiAuthorize]
	public class OrderController : Controller
	{
		private readonly AuthenticationService _authenticationService;

		public OrderController(AuthenticationService authenticationService)
		{
			_authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
		}


		[HttpGet, Route("Items")]
		public ActionResult Items()
		{
			// TODO CHALLENGE: these items need to be constructed with the data in the "persistent" storage
			// (the current data is mocked)
			List<OrderStockItem> items = GetStockItemsForOrder();

			return Json(items, JsonRequestBehavior.AllowGet);

			List<OrderStockItem> GetStockItemsForOrder()
			{
				Context c = new Context();
				return c.ItemsDbo.Select(x => new OrderStockItem
				{
					Id = x.Id,
					Name = x.Name,
					ImageUrl = x.ImageUrl,
					Price = x.UnitPrice
				}).ToList();
			}
		}

		[HttpPost, Route("")]
		public ActionResult Submit(OrderItemModel[] order)
		{
			// TODO CHALLENGE: the order needs to be processed
			// The frontend excepts either:
			//   - a 400 response with BadRequestResponseModel as Json
			//   - a 200 response (no content)

			/*
			VALIDATIONS
			1) Check if order parameter is null or count() 0
			2) Check Qty if positive
			3) Check if stockids are exists
			4) Have we got enough stock for this order
			5) does the user enough balance to buy them

			TRANSACTION			
			1) Deduct order items from stock
			2) Save transactions to UserOrders
			3) Deduct the total price from the user balance
			*/

			//Validations
			// 1)
			if (order == null)
				return BadRequest("order paremeter is null");

			if (order.Count() == 0)
				return BadRequest("You have to add at least one item");


			// 2)
			if (order.Where(x => x.Quantity < 0).Any())
				return BadRequest("Quantity can not be negative");
				
						
			// 3)
			var OrderIds = order.Select(x=>x.Id);
			var StockIds = order.Select(x=>x.Id);

			if (OrderIds.Except(StockIds).Any())
				return BadRequest("Order Ids are not exists in sto stock!");
				

			// 4)
			ItemRepository ItemRepo = new ItemRepository();
			List<ItemDbo> Stocks = ItemRepo.GetAllItems();

			var Exceed = from o in order
			join s in Stocks on o.Id equals s.Id where s.Quantity < o.Quantity
			select s.Name;			

			if (Exceed.Any())
				return BadRequest("Insufficient stock");
				

			// 5)
			int userId = _authenticationService.GetCurrentUserId();

			UserRepository userRepo = new UserRepository();
			UserDbo user = userRepo.GetUserById(userId);

			var userOrders = from o in order
						 join s in Stocks on o.Id equals s.Id
						 select new { o.Id, o.Quantity, s.UnitPrice, Price = o.Quantity * s.UnitPrice };

			int CartTotal = userOrders.Sum(x => x.Price);

			if (user.Balance < CartTotal)
				return BadRequest("Insufficient balance to proceed your order");
				

			// TRANSACTION
			//1) deduct order items from the stock
			ItemRepo.DeductStock(order);

			//2) Save transactions to UserOrders


			//3) Deduct the total price from the user balance
			userRepo.UpdateBalance(userId, -CartTotal);



			Response.StatusCode = (int)HttpStatusCode.OK;
			return null;
		}

		private JsonResult BadRequest(string msg)
		{
			Response.StatusCode = (int)HttpStatusCode.BadRequest;
			return Json(new BadRequestResponseModel { Message = msg });
		}
	}
}