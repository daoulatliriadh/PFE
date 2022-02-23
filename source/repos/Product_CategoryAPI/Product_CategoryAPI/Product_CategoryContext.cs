using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Product_CategoryAPI.Models
{
    public class Product_CategoryContext : DbContext
    {
        public Product_CategoryContext(DbContextOptions<Product_CategoryContext> options)
            : base(options)
        {

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().Property(p => p.NameProduct).IsRequired();
            modelBuilder.Entity<Category>().Property(c => c.NameCategory).IsRequired();
        }

    }
}
