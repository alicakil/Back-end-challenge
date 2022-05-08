using System.ComponentModel.DataAnnotations;

namespace Backend.Challenge.Models
{
	public class OrderItemModel
	{
		[Key]
		public int Id { get; set; }
		public int Quantity { get; set; }
	}
}