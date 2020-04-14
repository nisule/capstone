using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderHandling {
    public class Item {
        private int id;
        private string name;
        private int quantity;
        private double price;

        public Item(int id, string name, int qty) {
            this.id = id;
            this.name = name;
            quantity = qty;
            price = getItemPrice(this.id.ToString());

        }
        private double getItemPrice(string itemID) {
            var dataTable = DBAccess.getItemPrice(itemID);

            try {
                if (dataTable.Rows.Count != 1)
                    return -1;

                return double.Parse(dataTable.Rows[0].ItemArray[0].ToString());
            }
            catch (Exception e) {
                Console.WriteLine("Database retrieval error" + e);
            }
            return -1;
        }

        public int getID() {
            return this.id;
        }

        public int getQty() {
            return this.quantity;
        }
        public double getPrice() {
            return this.price;
        }
    }
}
