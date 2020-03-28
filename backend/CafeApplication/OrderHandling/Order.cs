using System;
using System.Collections.Generic;
using System.Globalization;

namespace OrderHandling {
    public class Order {
        public string orderID { get; set; }
        public int userID { get; set; }
        public string firstName;
        public string lastName;
        //TODO revamp this dictionary and make item its own class
        public Dictionary<int, string[]> items;
        private float total;
        private DateTime date;
        public int approved = 0;

        public Order(string orderID, string userID, string fname, string lname, Dictionary<int, string[]> items, string total, DateTime date) {
            this.orderID = orderID;
            this.userID = Int32.Parse(userID);
            this.firstName = fname;
            this.lastName = lname;
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
