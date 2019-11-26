using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using MySql.Data.MySqlClient;
using System.Data;
using Database;

public static class DBAccess {
   
    private static string connString = DBCredentials.GetCredentials();

    private static MySqlConnection connection = new MySqlConnection(connString);

    //All items for main menu
    public static DataTable getAllItems() {
        try {
            connection.Open();
            String sql = "SELECT * FROM Item";

            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
            connection.Close();
            return dataTable;
        }
        catch (Exception e) {
            Debug.WriteLine("Error in retrieving all items: " + e.Message);
            return null;
        }
    }

    //Only drinks filter
    public static DataTable getAllDrinks() {
        try {
            connection.Open();
            String sql = "SELECT * FROM Item WHERE is_drink = true";

            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
            connection.Close();
            return dataTable;
        }
        catch (Exception e) {
            Debug.WriteLine("Error in retrieving drinks: " + e.Message);
            return null;
        }
    }

    public static DataTable getItemPrice(string itemID) {
        try {
            connection.Open();
            String sql = "SELECT price FROM Item WHERE item_id = " + itemID;

            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
            connection.Close();
            return dataTable;
        }
        catch (Exception e) {
            Debug.WriteLine("Error in retrieving single item price: " + e.Message);
            return null;
        }
    }

    public static void insertNewOrder(string userID, double total) {
        try {
            connection.Open();
            String sql = "INSERT INTO Orders(user_id, total) " +
                         "VALUES(" + userID + ", " + total + ")";

            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            connection.Close();
        }
        catch (Exception e) {
            Debug.WriteLine("Error inserting order: " + e.Message);
        }
    }

    public static void insertOrderWithItem(string orderID, int itemID, int itemQuantity) {
        try {
            connection.Open();
            String sql = "INSERT INTO Order_Items(order_id, item_id, quantity) " +
                         "VALUES(" + orderID + ", " + itemID + ", " + itemQuantity + ")";

            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            connection.Close();
        }
        catch (Exception e) {
            Debug.WriteLine("Error inserting order: " + e.Message);
        }
    }

    public static DataTable getUserLatestOrder(string userID) {
        try {
            connection.Open();
            String sql = "SELECT order_id " +
                         "FROM Orders " + 
                         "WHERE user_id = " + userID + " " +
                         "ORDER BY order_id DESC LIMIT 1";
            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
            connection.Close();
            return dataTable;
        }
        catch (Exception e) {
            Debug.WriteLine("Error in retrieving single item price: " + e.Message);
            return null;
        }
    }

}
