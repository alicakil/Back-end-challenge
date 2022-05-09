using Backend.Challenge.Data;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;

namespace Backend.Challenge.Models
{
	public class Context : DbContext
	{
		public Context() : base(@"Data Source=ALI\SQLEXPRESS15;Initial Catalog=BackEnd_Challange; Integrated Security=true;") // from the web.config
		{

		}

		public DbSet<ItemDbo> ItemsDbo { get; set; }
		public DbSet<UserDbo> UsersDbo { get; set; }
		public DbSet<StockItem> StockItems { get; set; }

	}
}