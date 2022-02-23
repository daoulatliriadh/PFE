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

    public class CategoryController : Controller
    {
        private readonly Product_CategoryContext _context;

        public CategoryController(Product_CategoryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
            var category = await _context.Categories.Where(c => c.Id.Equals(id)).FirstOrDefaultAsync();
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }
        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(int id, Category Category)
        {
            _context.Categories.Add(Category);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCategoryById), new { id = Category.Id }, Category);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(long id, Category Category)
        {
            if (id != Category.Id)
            {
                return BadRequest();
            }

            _context.Entry(Category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (id != Category.Id)
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
        public async Task<ActionResult<Category>> DeleteCtegory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
