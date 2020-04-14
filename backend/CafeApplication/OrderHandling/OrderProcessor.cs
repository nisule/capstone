using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderHandling {
    public class OrderProcessor {

       /*
        * This method will take in the user_id of the User, and a dictionary of item_id as key and quantity 
        * as value. It will then create the appropriate Orders and use the order_id of that entry to create 
        * the data in the Order_Items table.
        */
        public bool ProcessOrder(Order o) {
            string user_id = o.userID.ToString();
            double orderTotal = o.getTotal();
            if (hasFunds(orderTotal, user_id)) {
                DBAccess.insertNewOrder(o.orderID, user_id, orderTotal, o.getDate());

                //Insert each item in the order into the database
                foreach (var item in o.getItems()) 
                    DBAccess.insertOrderWithItem(o.orderID, item.getID(), item.getQty());

                return true;
            }
            else {
                Console.WriteLine("Could not complete order");
                return false;
            }

        }

        private bool hasFunds(double orderTotal, string userID) {
            try {
                var table = DBAccess.getUserBalance(userID);
                double userBalance = double.Parse(table.Rows[0].ItemArray[0].ToString());

                if (orderTotal > userBalance)
                    return false;

                double newBalance = userBalance - orderTotal;
                DBAccess.updateBalance(userID, newBalance);
                return true;
            }catch(Exception e) {
                Console.WriteLine("Database retrieval error" + e);
            }
            return false;
        }
    }
}
