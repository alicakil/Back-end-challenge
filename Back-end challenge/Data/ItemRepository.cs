using Backend.Challenge.Models;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Challenge.Data
{
	public class ItemRepository
	{
		public static Context c;
		public ItemRepository()
		{
			c = new Context();
		}

		private static readonly List<ItemDbo> _items;

		public List<ItemDbo> GetAllItems()
		{
			return _items;
		}

		public void DeductStock(OrderItemModel[] order)
		{
			foreach (var item in order)
			{
				ItemDbo StockItem = c.ItemsDbo.FirstOrDefault(x => x.Id == item.Id);
				StockItem.Quantity -= item.Quantity;
			}			
			c.SaveChanges();
		}

		static ItemRepository()
		{
			_items = c.ItemsDbo.ToList();
		}


	}
}