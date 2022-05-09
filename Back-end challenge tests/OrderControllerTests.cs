using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Backend.Challenge.Controllers;
using Backend.Challenge.Data;
using Backend.Challenge.Models;
using Backend.Challenge.Services;
using NUnit.Framework;


namespace Backend.Challenge.Tests
{
	[TestFixture]
	internal class OrderControllerTests
	{
		private OrderController _OrderController;

		[SetUp]
		public void SetUp()
		{
			_OrderController = new OrderController(new AuthenticationService(new UserCredentialsValidator(new UserRepository())));
		}

		[Test]
		public void  ReturnsBadRequestIfParameterIsNull()
		{
			var actionResult = _OrderController.Submit(null) as HttpStatusCodeResult;

			//Assert
			Assert.IsNotNull(actionResult);
			Assert.AreEqual((int)HttpStatusCode.BadRequest, actionResult.StatusCode);
		}

		[Test]
		public void ReturnsBadRequestIfStockNotExists()
		{
			//Arrange
			OrderItemModel[] model = new OrderItemModel[1];
			model[0] = new OrderItemModel();
			model[0].Id = 1;
			model[0].Quantity = 999999;

			//Act
			var actionResult = _OrderController.Submit(model) as HttpStatusCodeResult;

			//Assert
			Assert.IsNotNull(actionResult);
			Assert.AreEqual((int)HttpStatusCode.BadRequest, actionResult.StatusCode);
		}

		[Test]
		public void ReturnsBadRequestIfNegativeQuantity()
		{
			//Arrange
			OrderItemModel[] model = new OrderItemModel[1];
			model[0] = new OrderItemModel();
			model[0].Id = 1;
			model[0].Quantity = -1;

			//Act
			var actionResult = _OrderController.Submit(model) as HttpStatusCodeResult;

			//Assert
			Assert.IsNotNull(actionResult);
			Assert.AreEqual((int)HttpStatusCode.BadRequest, actionResult.StatusCode);
		}

		[Test]
		public void ReturnsOkIfEnoughStockAndBalanceExists()
		{
			//Arrange
			OrderItemModel[] model = new OrderItemModel[2];
			model[0] = new OrderItemModel();
			model[0].Id = 1;
			model[0].Quantity = 1;

			model[1] = new OrderItemModel();
			model[1].Id = 2;
			model[1].Quantity = 1;

			//Act
			var actionResult = _OrderController.Submit(model) as HttpStatusCodeResult;

			//Assert
			Assert.IsNotNull(actionResult);
			Assert.AreEqual((int)HttpStatusCode.OK, actionResult.StatusCode);
		}
	}
}
