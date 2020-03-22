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

        public static bool approveOrder(Order o) {

            return false;
        }


    }

}
