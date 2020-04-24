using System;
using System.Collections.Generic;
using System.Globalization;

namespace OrderHandling {
    public class Order {
        public string orderID { get; set; }
        public int userID { get; set; }
        public string firstName;
        public string lastName;
        private double total;
        private DateTime date;
        public int approved = 0;
        private List<Item> items;
        private Dictionary<int, string[]> itemD;

        public Order(string orderID, string userID, string fname, string lname, Dictionary<int, 
            string[]> items, string total, DateTime date) {

            this.items = new List<Item>();
            this.orderID = orderID;
            this.userID = Int32.Parse(userID);
            this.firstName = fname;
            this.lastName = lname;
            this.date = date;
            this.itemD = items;

            //Populate the list of items from the dictionary
            foreach (KeyValuePair<int, string[]> entry in items) {
                Item i = new Item(entry.Key, entry.Value[0], Int32.Parse(entry.Value[1]));
                this.items.Add(i);
            }

            this.total = this.calculateTotal(.102);
        }

        private double calculateTotal(double taxRate) {
            double total = 0;

            foreach (var item in this.items) {
                total += item.getPrice() * item.getQty();
            }
            total += total * taxRate;
            return Math.Round(total, 2);
        }

        public List<Item> getItems() {
            return items;
        }

        public Dictionary<int, string[]> getItemsDictionary() {
            return this.itemD;
        }

        public double getTotal() {
            return total;
        }

        public DateTime getDate() {
            return date;
        }
    }
}
