using Backend.Challenge.Data;
using Backend.Challenge.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;

namespace Backend.Challenge
{
	public class MvcApplication : HttpApplication
	{
		protected void Application_Start()
		{
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			BundleConfig.RegisterBundles(BundleTable.Bundles);

			// Run on app startupp.
			Context c = new Context();

			// ReCreate a database 
			if (c.Database.Exists())
			{
				c.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction, string.Format("ALTER DATABASE [{0}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE", c.Database.Connection.Database));
				c.Database.Delete();
			}
			
				c.Database.Create();

			// Create Demo Data...

			c.UsersDbo.AddRange(new List<UserDbo>
				{
					new UserDbo
					{
						Id = 1,
						Login = "user1@example.com",
						Password = "1",
						Balance = 120
					},
					new UserDbo
					{
						Id = 2,
						Login = "user2@example.com",
						Password = "1",
						Balance = 30
					},
					new UserDbo
					{
						Id = 3,
						Login = "user1@example.com",
						Password = "1",
						Balance = 50
					}
				});


			c.ItemsDbo.AddRange(new List<ItemDbo>
			{
				new ItemDbo
				{
					Id = 1,
					Name = "Bronze sword: low quality, low price",
					ImageUrl = "/Content/images/bronze_sword.png",
					UnitPrice = 8,
					Quantity = 10
				},
				new ItemDbo
				{
					Id = 2,
					Name = "Wooden shield",
					ImageUrl = "/Content/images/wooden_shield.png",
					UnitPrice = 15,
					Quantity = 5
				},
				new ItemDbo
				{
					Id = 3,
					Name = "Battle axe",
					ImageUrl = "/Content/images/battle_axe.png",
					UnitPrice = 12,
					Quantity = 2
				},
				new ItemDbo
				{
					Id = 4,
					Name = "Longsword, carefully crafted to slay your enemies",
					ImageUrl = "/Content/images/longsword.png",
					UnitPrice = 31,
					Quantity = 1
				},
			});



			c.SaveChanges();


			


		}
	}
}
