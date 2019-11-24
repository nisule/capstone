using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using MySql.Data.MySqlClient;
using System.Data;

class DBAccess {
    static void Main(string[] args) {

        Console.WriteLine("Getting Connection ...");
        MySqlConnection conn = createConnection();

        try {
            Console.WriteLine("Opening Connection ...");

            conn.Open();

            Console.WriteLine("Connection successful!");

            string user_id = "22222222";
            // Dictionary with item_id and quantity.
            Dictionary<int, int> items = new Dictionary<int, int>();
            items.Add(26, 2);
            items.Add(1, 2);
            items.Add(54, 1);
           
            createOrder(user_id, items, conn);

            conn.Close();
        }
        catch (Exception e) {
            Console.WriteLine("Error: " + e.Message);
        }

        Console.Read();
    }

    public static MySqlConnection createConnection() {
        // On-campus connection host & port variables:
        //string host = "mal.cs.plu.edu";
        //int port = 3306;

        // Off-campus connection host & port variables:
        string host = "localhost";
        int port = 2000;

        string database = "kc499_2019";
        string username = "kc499";
        string password = "KelleyCafe";

        // Connection String.
        String connString = "Server=" + host + ";Database=" + database
            + ";port=" + port + ";User Id=" + username + ";password=" + password;

        MySqlConnection conn = new MySqlConnection(connString);

        return conn;
    }

    /*
     * This method will take in the user_id of the User, and a dictionary of item_id as key and quantity as value. It will then 
     * create the appropriate Orders and use the order_id of that entry to create the data in the Order_Items table.
     */
    public static void createOrder(string user_id, Dictionary<int, int> items, MySqlConnection conn)
    {
        /*
         * Need to calculate the total, and create a new row in Orders table. Then need to get the order_id of that entry
         * and use that to create all the entries for the OrderItems table.
         */
        double taxRate = 0.102;
        int number_of_items = items.Count;
        Console.WriteLine(number_of_items);

        double total = 0;

        // Calculating total:
        for(int i = 0; i < number_of_items; i++)
        {
            string itemId = items.ElementAt(i).Key.ToString();
            int itemQuantity = items.ElementAt(i).Value;
            string sql = "SELECT * FROM Item WHERE item_id = " + itemId;

            MySqlCommand command = new MySqlCommand(sql, conn);
            var dataReader = command.ExecuteReader();
            dataReader.Read();
            
            total += Convert.ToDouble(dataReader["price"]) * itemQuantity;
            Console.WriteLine(total);
            
            dataReader.Close();
        }

        total += total * taxRate;

        // Insert order into Orders table.
        string addOrderToTable = "INSERT INTO Orders(user_id, total) VALUES("+ user_id + ", " + total + ")";
        Console.WriteLine(addOrderToTable);

        MySqlCommand addOrder = new MySqlCommand(addOrderToTable, conn);
        var orderSubmitter = addOrder.ExecuteReader();

        orderSubmitter.Close();

        // Selects the row with the largest order_id, which is the order that was just added.
        string selectOrderString = "SELECT order_id from Orders ORDER BY order_id DESC LIMIT 1;";
        MySqlCommand selectOrder = new MySqlCommand(selectOrderString, conn);
        var orderSelecter = selectOrder.ExecuteReader();
        orderSelecter.Read();
        string orderID = orderSelecter["order_id"].ToString();
        orderSelecter.Close();
        Console.WriteLine(orderID);

        // Inserting each order item to the OrderItems table.
        for(int i = 0; i < number_of_items; i++)
        {
            int itemID = items.ElementAt(i).Key;
            int itemQuantity = items.ElementAt(i).Value;
            string sql = "INSERT INTO Order_Items(order_id, item_id, quantity) " +
                         "VALUES(" + orderID + ", " + itemID + ", " + itemQuantity + ")";

            MySqlCommand command = new MySqlCommand(sql, conn);
            var dataReader = command.ExecuteReader();

            dataReader.Close();
        }
    }

}
