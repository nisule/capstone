using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderHandling {
    public class OrderCreator {
        
        public static void Main(string[] args) {
            OrderCreator o = new OrderCreator();

            string user_id = "11111111";
            // Dictionary with item_id and quantity.
            Dictionary<int, int> items = new Dictionary<int, int>();

            //Test example
            items.Add(26, 2);
            items.Add(1, 2);
            items.Add(54, 1);
            items.Add(19, 36);

            o.ProcessOrder(user_id, items);
            
        }

       /*
        * This method will take in the user_id of the User, and a dictionary of item_id as key and quantity 
        * as value. It will then create the appropriate Orders and use the order_id of that entry to create 
        * the data in the Order_Items table.
        */
        public void ProcessOrder(string user_id, Dictionary<int, int> items) {
            //Computer the total and insert it into the database
            double orderTotal = computeTotal(items, .102);
            DBAccess.insertNewOrder(user_id, orderTotal);
            
            //Get the ID of the user's order they just placed
            var table = DBAccess.getUserLatestOrder(user_id);
            string orderID = table.Rows[0].ItemArray[0].ToString();

            //Insert each item in the order into the database
            foreach (KeyValuePair<int, int> entry in items) {
                DBAccess.insertOrderWithItem(orderID, entry.Key, entry.Value);
            }

        }

        private double computeTotal(Dictionary<int, int> items, double taxRate) {
            double total = 0;

            // Calculating total:
            for (int i = 0; i < items.Count; i++) {
                string itemId = items.ElementAt(i).Key.ToString();
                int itemQuantity = items.ElementAt(i).Value;
                total += getItemPrice(itemId) * itemQuantity;
            }
            total += total * taxRate;
            return Math.Round(total, 2);
        }

        private double getItemPrice(string itemID) {
            var dataTable = DBAccess.getItemPrice(itemID);

            if (dataTable.Rows.Count != 1)
                return -1;

            return double.Parse(dataTable.Rows[0].ItemArray[0].ToString());

        }
    }
}
