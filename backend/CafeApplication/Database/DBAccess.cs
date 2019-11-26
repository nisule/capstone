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
    private static string password = "newPasswordsBoysEsketit";

    //On-campus host & port variables
    private static string host = "mal.cs.plu.edu";
    private static int port = 3306;


    // Off-campus connection host & port variables:
    //private static string host = "localhost";
    //private static int port = 2000;

    private static string connString = "Server=" + host + ";Database=" + database
            + ";port=" + port + ";User Id=" + username + ";password=" + password;

    private static MySqlConnection connection = new MySqlConnection(connString);

    //All items for main menu
    public static DataTable getAllItems() {
        string sql = "SELECT * FROM Item";
        return issueQuery(sql);
    }

    //Only drinks filter
    public static DataTable getAllDrinks() {
        string sql = "SELECT * FROM Item WHERE is_drink = true";
        return issueQuery(sql);
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
        string sql = "INSERT INTO Orders(user_id, total) " +
                         "VALUES(" + userID + ", " + total + ")";
        issueInsert(sql);
    }

    public static void insertOrderWithItem(string orderID, int itemID, int itemQuantity) {
        string sql = "INSERT INTO Order_Items(order_id, item_id, quantity) " +
                         "VALUES(" + orderID + ", " + itemID + ", " + itemQuantity + ")";
        issueInsert(sql);
    }

    public static DataTable getUserLatestOrder(string userID) {
        string sql = "SELECT order_id " +
                         "FROM Orders " +
                         "WHERE user_id = " + userID + " " +
                         "ORDER BY order_id DESC LIMIT 1";
        return issueQuery(sql);
    }

    public static void issueInsert(string sql) {
        try {
            connection.Open();
            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            connection.Close();
        }
        catch (Exception e) {
            Debug.WriteLine("Error inserting into database: " + e.Message);
        }
    }

    public static DataTable issueQuery(string sql) {
        try {
            connection.Open();
            MySqlCommand command = new MySqlCommand(sql, connection);
            var dataReader = command.ExecuteReader();
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
            connection.Close();
            return dataTable;
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database query: " + e.Message);
            return null;
        }
    }

}
