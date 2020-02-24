using System.Collections.Generic;

namespace DTOs {
    public class ItemDetails {
        public string item_id { get; set; }
        public string item_name { get; set; }
        public string stock { get; set; }
        public string price { get; set; }
        public string is_drink { get; set; }
        public string addition_date { get; set; }
        public string deletion_date { get; set; }

        public List<ItemDetails> getFoodItems() {

            var itemTable = DBAccess.getAllFood();
            List<ItemDetails> items = new List<ItemDetails>();

            if (!(itemTable is null)) {
                for (int i = 0; i < itemTable.Rows.Count; i++) {
                    ItemDetails item = new ItemDetails();
                    item.item_id = itemTable.Rows[i].ItemArray[0].ToString();
                    item.item_name = itemTable.Rows[i].ItemArray[1].ToString();
                    item.stock = itemTable.Rows[i].ItemArray[2].ToString();
                    item.price = itemTable.Rows[i].ItemArray[3].ToString();
                    item.is_drink = itemTable.Rows[i].ItemArray[4].ToString();
                    item.addition_date = itemTable.Rows[i].ItemArray[5].ToString();
                    item.deletion_date = itemTable.Rows[i].ItemArray[6].ToString();
                    items.Add(item);
                }
            }
            return items;
        }

        public List<ItemDetails> getDrinkItems() {

            var itemTable = DBAccess.getAllDrinks();
            List<ItemDetails> items = new List<ItemDetails>();

            for (int i = 0; i < itemTable.Rows.Count; i++) {
                ItemDetails item = new ItemDetails();
                item.item_id = itemTable.Rows[i].ItemArray[0].ToString();
                item.item_name = itemTable.Rows[i].ItemArray[1].ToString();
                item.stock = itemTable.Rows[i].ItemArray[2].ToString();
                item.price = itemTable.Rows[i].ItemArray[3].ToString();
                item.is_drink = itemTable.Rows[i].ItemArray[4].ToString();
                item.addition_date = itemTable.Rows[i].ItemArray[5].ToString();
                item.deletion_date = itemTable.Rows[i].ItemArray[6].ToString();
                items.Add(item);
            }
            return items;
        }

    }
}
