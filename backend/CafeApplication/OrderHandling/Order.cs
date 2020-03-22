using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderHandling {
    public class Order {
        public int id;
        public Dictionary<int, int> items;
        public double total;
        public string date;
        public int approved = 0;

        public Order(string id, string[] items, string total, string date) {
            this.id = Int32.Parse(id);

        }



    }
}
