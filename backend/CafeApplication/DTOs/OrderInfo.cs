using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs {
    public class OrderInfo {
        public string orderID { get; set; }
        public string total { get; set; }
        public string date { get; set; }
        public List<ItemOrderInfo> items { get; set; } = new List<ItemOrderInfo>();

        public void populateItems(string orderID) {
            ItemOrderInfo item;
            var itemTable = DBAccess.getOrderItems(orderID);

            if (!(itemTable is null)) {
                foreach (DataRow row in itemTable.Rows) {
                    item = new ItemOrderInfo();
                    item.item_id = row.ItemArray[0].ToString();
                    item.item_name = row.ItemArray[1].ToString();
                    item.quantity = row.ItemArray[2].ToString();
                    items.Add(item);
                }
            }

        }

    }
}
