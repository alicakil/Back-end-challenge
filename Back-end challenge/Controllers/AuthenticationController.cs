using System;
using System.Web.Mvc;
using Backend.Challenge.Services;
using System.Net;
using Backend.Challenge.Models;

namespace Backend.Challenge.Controllers
{
	[RoutePrefix("api/Authentication")]
	public class AuthenticationController : Controller
	{
		private readonly AuthenticationService _authenticationService;
		private readonly UserService _currentUserService;

		public AuthenticationController(
			AuthenticationService authenticationService,
			UserService currentUserService
		)
		{
			_authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
			_currentUserService = currentUserService ?? throw new ArgumentNullException(nameof(currentUserService));
		}

		[HttpPost, Route("Login")]
		public ActionResult LogIn(string login, string password)
		{
			if (!_authenticationService.TryAuthenticate(login, password))
			{
				Response.StatusCode = (int)HttpStatusCode.BadRequest;
				return Json(
					new BadRequestResponseModel
					{
						Message = "Login or password is not correct"
					}
				);
			}

			return new HttpStatusCodeResult(HttpStatusCode.OK);
		}

		[HttpPost, Route("Logout")]
		public ActionResult LogOut()
		{
			_authenticationService.DeAuthenticate();
			return new HttpStatusCodeResult(HttpStatusCode.OK);
		}

		[HttpGet, Route("UserInfo")]
		[ApiAuthorize]
		public ActionResult UserInfo()
		{
			int userId = _authenticationService.GetCurrentUserId();
			UserInfo result = _currentUserService.GetUserInfo(userId);
			return Json(result, JsonRequestBehavior.AllowGet);
		}
	}
}