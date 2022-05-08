using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Challenge.Models
{
	public class UserOrderDbo
	{
		[Key]
		public int Id { get; set; }		
		public string UserId { get; set; }
		public int ItemId { get; set; }
		public int Quantity { get; set; }
		public int UnitPrice { get; set; }
		public DateTime CreateTime { get; set; } = DateTime.Now;	

	}
}