using System.Collections.Generic;

namespace DTOs {
    public class ItemDetails {
        public string itemID { get; set; }
        public string Name { get; set; }
        public string stock { get; set; }
        public string price { get; set; }
        public string is_drink { get; set; }
        public string additionDate { get; set; }

        public List<ItemDetails> getAllItems() {

            var itemTable = DBAccess.getAllItems();
            List<ItemDetails> items = new List<ItemDetails>();

            for (int i = 0; i < itemTable.Rows.Count; i++) {
                ItemDetails item = new ItemDetails();
                item.itemID = itemTable.Rows[i].ItemArray[0].ToString();
                item.Name = itemTable.Rows[i].ItemArray[1].ToString();
                item.stock = itemTable.Rows[i].ItemArray[2].ToString();
                item.price = itemTable.Rows[i].ItemArray[3].ToString();
                item.is_drink = itemTable.Rows[i].ItemArray[4].ToString();
                item.additionDate = itemTable.Rows[i].ItemArray[5].ToString();
                items.Add(item);
            }
            return items;
        }

    }
}
