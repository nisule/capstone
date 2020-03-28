using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderHandling {
    public class EmployeeOrderQueue {

        private static List<Order> orders = new List<Order>();
        
        public static void addOrder(Order o) {
            orders.Add(o);
        }

        public static List<Order> getOrderQueue() {
            return orders;
        }

        public static Order getOrder(string orderID) {
            for (int i = 0; i < orders.Count; i++) {
                if (orders[i].orderID.Equals(orderID)) {
                    return orders[i];
                }
            }
            return null;
        }

        public static string generateOrderID() {
            List<string> existingIDs = new List<string>();
            //Add all DB IDs
            var data = DBAccess.getAllOrderIDs();
            if (!(data is null)) {
                for (int i = 0; i < data.Rows.Count; i++) {
                    existingIDs.Add(data.Rows[i].ItemArray[0].ToString());
                }
            }

            //Add all IDs from orders in the queue currently
           foreach (var order in orders) {
                existingIDs.Add(order.orderID);
            }

            string orderIDstring = generateRandomID();

            int count = 0;
            while (existingIDs.Contains(orderIDstring)) {
                orderIDstring = generateRandomID();
                count++;
                if (count == 19)
                    return null;
            }

            return orderIDstring;
        }

        private static string generateRandomID() {
            var chars = "0123456789";
            var random = new Random();
            var orderID = new char[8];
            var orderIDstring = "";

            for (int i = 0; i < orderID.Length; i++)
                orderID[i] = chars[random.Next(chars.Length)];

            orderIDstring = new String(orderID);
            return orderIDstring;
        }

        public static bool approveOrder(string id) {
            foreach (var order in orders) {
                if (order.orderID.Equals(id)) {
                    OrderProcessor oc = new OrderProcessor();
                    if (oc.ProcessOrder(order)) {
                        order.approved = 1;
                        orders.Remove(order);
                        return true;
                    }
                }
            }
            return false;
        }

        public static bool denyOrder(string id) {
            foreach (var order in orders) {
                if (order.orderID.Equals(id)) {
                    order.approved = -1;
                    orders.Remove(order);
                    return true;
                }
            }
            return false;
        }



    }

}
