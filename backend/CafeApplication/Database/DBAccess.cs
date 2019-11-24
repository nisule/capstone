using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using MySql.Data.MySqlClient;
using System.Data;

public class DBAccess {

    private static MySqlConnection connection;


    public DBAccess() {
        //string host = "mal.cs.plu.edu";
        //int port = 3306;
        string database = "kc499_2019";
        string username = "kc499";
        string password = "KelleyCafe";

        // Off-campus connection host & port variables:
        string host = "localhost";
        int port = 2000;

        // Connection String.
        String connString = "Server=" + host + ";Database=" + database
            + ";port=" + port + ";User Id=" + username + ";password=" + password;

        MySqlConnection conn = new MySqlConnection(connString);

        connection = conn;
    }

    public static void Main(string[] args) {
        var db = new DBAccess();
        var table = getAllDrinks();


        Console.Read();
    }

    public static DataTable getAllItems() {
        try {
            connection.Open();
            //String sql = "INSERT INTO Item(item_name, stock, price, is_drink, addition_date) VALUES('Cappuccino', 30, 3.99, true, '2019-11-20')";
            String sql = "SELECT * FROM Item";

            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
            connection.Close();
            return dataTable;
        }
        catch (Exception e) {
            Console.WriteLine("Error: " + e.Message);
            return null;
        }
    }
    public static DataTable getAllDrinks() {
        try {
            connection.Open();
            //String sql = "INSERT INTO Item(item_name, stock, price, is_drink, addition_date) VALUES('Cappuccino', 30, 3.99, true, '2019-11-20')";
            String sql = "SELECT * FROM Item WHERE is_drink = true";

            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
            connection.Close();
            return dataTable;
        }
        catch (Exception e) {
            Console.WriteLine("Error: " + e.Message);
            return null;
        }
    }



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
