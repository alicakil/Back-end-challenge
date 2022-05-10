using Backend.Challenge.Models;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Challenge.Data
{
	public class UserRepository
	{
		private readonly List<UserDbo> _users;
		private readonly Context c;

		public UserRepository()
		{
		    c = Models.Context.GetSingleTon();
			_users = c.UsersDbo.ToList();			
		}

		public UserDbo GetUserByLogin(string login)
		{
			return _users.FirstOrDefault(u => u.Login == login);
		}

		public UserDbo GetUserById(int userId)
		{
			UserDbo user = _users.First(u => u.Id == userId);
			return user;
		}


		

	}
}