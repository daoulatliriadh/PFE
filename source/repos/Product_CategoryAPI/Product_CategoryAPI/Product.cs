using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Product_CategoryAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string NameProduct { get; set; }
        public int IdCategory { get; set; }
        public Category? Category { get; set; }

    }

}
