using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Product_CategoryAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Product_CategoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly Product_CategoryContext _context;

        public ProductController(Product_CategoryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var Product = await _context.Products.Where(c => c.Id.Equals(id)).FirstOrDefaultAsync();
            if (Product == null)
            {
                return NotFound();
            }
            return Product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProductBy(int id, Product Product)
        {
            _context.Products.Add(Product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProductById), new { id = Product.Id }, Product);

        }

        [HttpPut("{id}")]
        public  async Task<IActionResult> PutProduct(long id, Product Product)
        {
            if (id != Product.Id)
            {
                return BadRequest();
            }

            _context.Entry(Product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (id!=Product.Id)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
