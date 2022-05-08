using System;
using System.Collections.Generic;
using System.Linq;
using Backend.Challenge.Data;
using Backend.Challenge.Models;

namespace Backend.Challenge.Services
{
	public class StocksService
	{
		private readonly ItemRepository _itemRepository;

		public StocksService(ItemRepository itemRepository)
		{
			_itemRepository = itemRepository ?? throw new ArgumentNullException(nameof(itemRepository));
		}

		public List<StockItem> GetStocks()
		{
			return _itemRepository.GetAllItems()
			.Select(it => new StockItem
			{
				Id = it.Id,
				Name = it.Name,
				Quantity = it.Quantity
			}).ToList();
		}
	}
}