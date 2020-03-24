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

        public static Order getOrder(string orderID) {
            for (int i = 0; i < orders.Count; i++) {
                if (orders[i].orderID == Int32.Parse(orderID)) {
                    return orders[i];
                }
            }
            return null;
        }

        public static bool approveOrder(Order o) {
            OrderProcessor oc = new OrderProcessor();
            if (oc.ProcessOrder(o)) {
                o.approved = 1;
                return true;
            }
            o.approved = 0;
            return false;
        }

        public static bool denyOrder(Order o) {
            o.approved = -1;
            orders.Remove(o);
            return false;
        }


    }

}
