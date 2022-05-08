using System.Web.Mvc;

namespace Backend.Challenge.Controllers
{
	public class UiController : Controller
	{
		[HttpGet, Route("")]
		public ActionResult Index()
		{
			return View("~/Views/Index.cshtml");
		}
	}
}