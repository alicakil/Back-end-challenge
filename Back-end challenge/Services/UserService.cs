using System;
using Backend.Challenge.Data;
using Backend.Challenge.Models;

namespace Backend.Challenge.Services
{
	public class UserService
	{
		private readonly UserRepository _userRepository;

		public UserService(
			UserRepository userRepository
		)
		{
			_userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
		}

		public UserInfo GetUserInfo(int userId)
		{
			UserDbo user = _userRepository.GetUserById(userId);

			return new UserInfo
			{
				Login = user.Login,
				Balance = user.Balance
			};
		}
	}
}