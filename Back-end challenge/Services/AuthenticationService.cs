using System;
using System.Web;
using System.Web.Security;

namespace Backend.Challenge.Services
{
	public class AuthenticationService
	{
		private readonly UserCredentialsValidator _userCredentialsValidator;

		public AuthenticationService(UserCredentialsValidator userCredentialsValidator)
		{
			_userCredentialsValidator = userCredentialsValidator ?? throw new ArgumentNullException(nameof(userCredentialsValidator));
		}

		public bool TryAuthenticate(string login, string password)
		{
			if (_userCredentialsValidator.ValidateUserCredentials(login, password, out int userId))
			{
				FormsAuthentication.SetAuthCookie(userId.ToString(), false);
				return true;
			}

			return false;
		}

		public int GetCurrentUserId()
		{
			return Convert.ToInt32(HttpContext.Current.User.Identity.Name);
		}

		public void DeAuthenticate()
		{
			FormsAuthentication.SignOut();
		}
	}
}