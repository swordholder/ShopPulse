using Microsoft.AspNetCore.Mvc;
using ShopPulse.Backend.Models;

namespace ShopPulse.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        /// <summary>
        /// A static list of products to simulate a database for demonstration purposes.
        /// We will use this list to return product data in our API endpoints.
        /// Later , this can be replaced with a real database or data source.
        /// </summary>
        private static readonly List<Product> Products = new()
    {
        new Product { Id = 1, Name = "Wireless Mechanical Keyboard", Description = "RGB backlighting with tactile switches", Price = 129.99m, Category = "Electronics", StockQuantity = 15 },
        new Product { Id = 2, Name = "Ergonomic Vertical Mouse", Description = "Reduces wrist strain during long coding sessions", Price = 59.99m, Category = "Electronics", StockQuantity = 22 },
        new Product { Id = 3, Name = "UltraWide Monitor 34-inch", Description = "Curved IPS display with 144Hz refresh rate", Price = 499.99m, Category = "Monitors", StockQuantity = 8 }
    };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(Products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
    }
}
