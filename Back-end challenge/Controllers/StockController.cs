using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Backend.Challenge.Models;
using Backend.Challenge.Services;

namespace Backend.Challenge.Controllers
{
	[RoutePrefix("api/Stock")]
	[ApiAuthorize]
	public class StockController: Controller
	{
		private readonly StocksService _stocksService;

		public StockController(StocksService stocksService)
		{
			_stocksService = stocksService ?? throw new ArgumentNullException(nameof(stocksService));
		}

		[HttpGet, Route("")]
		public ActionResult List()
		{
			List<StockItem> stocks = _stocksService.GetStocks();

			return Json(stocks, JsonRequestBehavior.AllowGet);
		}
	}
}