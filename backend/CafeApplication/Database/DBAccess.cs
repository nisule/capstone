using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using MySql.Data.MySqlClient;
using System.Data;

public static class DBAccess {

    private static string database = "kc499_2019";
    private static string username = "kc499";
    private static string password = "KelleyCafe";

    //On-campus host & port variables
    //private static string host = "mal.cs.plu.edu";
    //private static int port = 3306;


    // Off-campus connection host & port variables:
    private static string host = "localhost";
    private static int port = 2000;

    private static string connString = "Server=" + host + ";Database=" + database
            + ";port=" + port + ";User Id=" + username + ";password=" + password;

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
                         "WHERE user_id = 11111111 " +
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

