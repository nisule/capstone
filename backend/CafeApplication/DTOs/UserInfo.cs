﻿
using System.Collections.Generic;
using System.Data;

namespace DTOs {
    public class UserInfo {
        public string status { get; set; }
        public string userID { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string password2 { get; set; }
        public bool isEmployee { get; set; }
        public List<OrderInfo> orders { get; set; } = new List<OrderInfo>();


        public UserInfo getUserInfo(string email) {
            var itemTable = DBAccess.getUserInfo(email);

            if (!(itemTable is null)) {
                this.userID = itemTable.Rows[0].ItemArray[0].ToString();
                this.firstName = itemTable.Rows[0].ItemArray[1].ToString();
                this.email = itemTable.Rows[0].ItemArray[2].ToString();

                string isEmpStr = itemTable.Rows[0].ItemArray[3].ToString();

                if (string.Equals(isEmpStr, "True"))
                    this.isEmployee = true;
                else if (string.Equals(isEmpStr, "False"))
                    this.isEmployee = false;

                populateOrders(this.userID);
            }


            return this;
        }

        private void populateOrders(string uID) {
            OrderInfo order;
            var itemTable = DBAccess.getPastTenOrders(uID);

            if (!(itemTable is null)) {
                foreach(DataRow row in itemTable.Rows) {
                    order = new OrderInfo();
                    order.orderID = row.ItemArray[0].ToString();
                    order.total = row.ItemArray[1].ToString();
                    order.date = row.ItemArray[2].ToString();

                    order.populateItems(order.orderID);
                    orders.Add(order);
                }

            }

        }
    }
    
}
