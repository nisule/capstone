using System;
using System.Collections.Generic;
using System.Globalization;

namespace OrderHandling {
    public class Order {
        public string orderID { get; set; }
        public int userID { get; set; }
        public Dictionary<int, string[]> items;
        private float total;
        private DateTime date;
        public int approved = 0;

        public Order(string orderID, string userID, Dictionary<int, string[]> items, string total, DateTime date) {
            this.orderID = orderID;
            this.userID = Int32.Parse(userID);
            this.items = items;
            this.total = float.Parse(total, CultureInfo.InvariantCulture);
            this.date = date;
        }
        public Dictionary<int, string[]> getItems() {
            return items;
        }

        public float getTotal() {
            return total;
        }

        public DateTime getDate() {
            return date;
        }
    }
}
