using System;
using Backend.Challenge.Data;
using Backend.Challenge.Models;

namespace Backend.Challenge.Services
{
	public class UserCredentialsValidator
	{
		private readonly UserRepository _userRepository;

		public UserCredentialsValidator(UserRepository userRepository)
		{
			_userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
		}

		public bool ValidateUserCredentials(string login, string password, out int userId)
		{
			UserDbo user = _userRepository.GetUserByLogin(login.ToLowerInvariant());

			if (user != null)
			{
				if (user.Password.ToLowerInvariant() == password.ToLowerInvariant())
				{
					userId = user.Id;
					return true;
				}
			}

			userId = -1;
			return false;
		}
	}
}