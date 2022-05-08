using System.ComponentModel.DataAnnotations;

namespace Backend.Challenge.Data
{
	public class UserDbo
	{
		[Key]
		public int Id { get; set; }

		public string Login { get; set; }

		public string Password { get; set; }

		public int Balance { get; set; }
	}
}