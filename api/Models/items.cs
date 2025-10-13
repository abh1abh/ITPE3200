using System;
using System.ComponentModel.DataAnnotations;

namespace MyShop.Models
{
    public class Item
    {
        public int ItemId { get; set; }
        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ .,'\-]{2,20}", ErrorMessage = "Name must only contain letters, numbers and can be 2-20 characters long")]
        [Display(Name = "Item name")]
        public string Name { get; set; } = string.Empty;
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }
        [StringLength(200, ErrorMessage = "Description cannot be longer than 200 characters")]
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        // navigation property
        // public virtual List<OrderItem>? OrderItems { get; set; }
        

    }
}