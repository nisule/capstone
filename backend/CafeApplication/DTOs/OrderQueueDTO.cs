using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs {
    public class OrderQueueDTO {
        public List<OrderInfoDTO> orders { get; set; } = new List<OrderInfoDTO>();

        public void populateOrder(string orderID, string userID, string total, string date, Dictionary<int, string[]> items) {
            OrderInfoDTO o = new OrderInfoDTO();
            o.orderID = orderID;
            o.userID = userID;
            o.total = total;
            o.date = date;
            populateItems(o, items);

            orders.Add(o);
        }

        private void populateItems(OrderInfoDTO o, Dictionary<int, string[]> items) {
            foreach (KeyValuePair<int, string[]> entry in items) {
                ItemOrderInfoDTO i = new ItemOrderInfoDTO();
                i.item_id = entry.Key.ToString();
                i.item_name = entry.Value[0];
                i.quantity = entry.Value[1];
                o.items.Add(i);
            }
        }
    }
}
