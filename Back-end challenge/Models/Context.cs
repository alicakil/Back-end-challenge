using Backend.Challenge.Data;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using Effort;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;

namespace Backend.Challenge.Models
{
	public class Context : DbContext
	{
		private static Context c;

		
		public static Context GetSingleTon()
		{
			if (c == null)
				c = new Context(DbConnectionFactory.CreateTransient());

			return c;
		}

		//public Context() : base(@"Data Source=ALI\SQLEXPRESS15;Initial Catalog=BackEnd_Challange; Integrated Security=true;") // or pass it from the web.config
		//{

		//}

		public Context(DbConnection connection) : base(connection, false) 
		{
			// var connection = DbConnectionFactory.CreateTransient();
		}


		public DbSet<ItemDbo> ItemsDbo { get; set; }
		public DbSet<UserDbo> UsersDbo { get; set; }
		public DbSet<StockItem> StockItems { get; set; }

	}
}