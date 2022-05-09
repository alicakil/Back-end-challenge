using Backend.Challenge.Models;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Challenge.Data
{
	public class ItemRepository
	{
		public static Context c;
		private readonly List<ItemDbo> _items;
		public ItemRepository()
		{
			c = new Context();
			_items = c.ItemsDbo.ToList();
		}

		public List<ItemDbo> GetAllItems()
		{
			return _items;
		}

		public void IssueOrder(int Userid, OrderItemModel[] order, int CartTotal)
		{
			var transaction = c.Database.BeginTransaction();

				//1) deduct order items from the stock			
				foreach (var item in order)
				{
					ItemDbo StockItem = c.ItemsDbo.FirstOrDefault(x => x.Id == item.Id);
					StockItem.Quantity -= item.Quantity;
				}
				c.SaveChanges();

				//2) Deduct the total price from the user balance
				UserDbo user = c.UsersDbo.FirstOrDefault(x => x.Id == Userid);
				user.Balance -= CartTotal; // Ammount can me + or -
				c.SaveChanges();

			transaction.Commit();
		}

	}
}