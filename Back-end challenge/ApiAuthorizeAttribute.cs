using System.Net;
using System.Web.Mvc;

namespace Backend.Challenge
{
	public class ApiAuthorizeAttribute : AuthorizeAttribute
	{
		protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
		{
			filterContext.Result = new JsonResult()
			{
				Data = "user is not authenticated",
				JsonRequestBehavior = JsonRequestBehavior.AllowGet
			};

			filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
			filterContext.HttpContext.Response.SuppressFormsAuthenticationRedirect = true;
		}
	}
}