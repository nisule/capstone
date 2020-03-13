﻿using System;
using System.Diagnostics;
using MySql.Data.MySqlClient;
using System.Data;
using Database;

public static class DBAccess {

    private static string connString = DBCredentials.GetCredentials();

    private static MySqlConnection connection = new MySqlConnection(connString);

    public static DataTable getItemPrice(string itemID) {
        string sql = "SELECT price FROM Item WHERE item_id = @itemID";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@itemID", itemID);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                return dataTable;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in item price query: " + e.Message);
            connection.Close();
            return null;
        }
    }

    public static void insertNewOrder(string userID, double total) {
        string sql = "INSERT INTO Orders(user_id, total) " +
                                 "VALUES(@userID, @total)";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@userID", userID);
                command.Parameters.AddWithValue("@total", total);

                var dataReader = command.ExecuteReader();
                dataReader.Close();
                connection.Close();
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error database inserting order: " + e.Message);
            connection.Close();
        }
    }

    public static void insertOrderWithItem(string orderID, int itemID, int itemQuantity) {
            string sql = "INSERT INTO Order_Items(order_id, item_id, quantity) " +
                         "VALUES(@orderID, @itemID, @itemQuantity)";

        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@orderID", orderID);
                command.Parameters.AddWithValue("@itemID", itemID);
                command.Parameters.AddWithValue("@itemQuantity", itemQuantity);

                var dataReader = command.ExecuteReader();
                dataReader.Close();
                connection.Close();
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database query: " + e.Message);
            connection.Close();
        }
   
    }

    public static DataTable getUserLatestOrder(string userID) {
        string sql = "SELECT order_id " +
                         "FROM Orders " +
                         "WHERE user_id = @userID " +
                         "ORDER BY order_id DESC LIMIT 1";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@userID", userID);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                return dataTable;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in latest order query: " + e.Message);
            connection.Close();
            return null;
        }
    }

    public static DataTable getUserBalance(string userID) {
        string sql = "SELECT balance FROM User WHERE user_id = @userID";

        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@userID", userID);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                return dataTable;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database user balance query: " + e.Message);
            connection.Close();
            return null;
        }
    }

    public static string getSalt(string email) {
        
        
        string sql = "SELECT salt FROM User WHERE email = @email";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@email", email);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                string salt = (string)dataTable.Rows[0]["salt"];
                return salt;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database user get salt query: " + e.StackTrace);
            connection.Close();
            return null;
        }
    }

    public static bool isEmployee(string email) {
        string sql = "SELECT is_employee FROM User WHERE email = @email";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@email", email);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                bool is_employee = (bool)dataTable.Rows[0]["is_employee"];
                return is_employee;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database user isEmployee query: " + e.StackTrace);
            connection.Close();
            return false;
        }
    }

    public static DataTable getAllAccountCredentials(string email, string password) {
        string sql = "SELECT email, password, salt FROM User WHERE email = @email AND password = @password";

        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                return dataTable;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database user balance query: " + e.Message);
            connection.Close();
            return null;
        }
    }

    public static DataTable getUserInfo(string email) {
        string sql = "SELECT user_id, first_name, email, balance, is_employee FROM User WHERE email = @email";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@email", email);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                return dataTable;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database user info query: " + e.Message);
            connection.Close();
            return null;
        }
    }

    public static DataTable getPastTenOrders(string userID) {
        string sql = "SELECT order_id, total, date FROM Orders WHERE user_id = @userID ORDER BY order_id DESC LIMIT 10";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@userID", userID);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                return dataTable;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database past order query: " + e.Message);
            connection.Close();
            return null;
        }
    }

    public static DataTable getOrderItems(string orderID) {
        string sql = "SELECT Order_Items.item_id, item_name, quantity FROM Order_Items, Item WHERE Order_Items.item_id = Item.item_id AND Order_Items.order_id = @orderID";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@orderID", orderID);
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                return dataTable;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database past order query: " + e.Message);
            connection.Close();
            return null;
        }
    }

    public static void updateBalance(string userID, double newBalance) {
        string sql = "UPDATE User " + 
                     "SET balance = @newBalance " + 
                     "WHERE user_id = @userID";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@newBalance", newBalance);
                command.Parameters.AddWithValue("@userID", userID);
                command.ExecuteReader();
                connection.Close();
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database query: " + e.Message);
            connection.Close();
        }
    }

    public static bool InsertNewUser(string userID, string fName, string lName, string email, string password, string salt) {
        string sql = "INSERT INTO User(user_id, first_name, last_name, email, password, salt) " +
                                 "VALUES(@id, @fName, @lName, @email, @password, @salt)";
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                command.Parameters.AddWithValue("@id", userID);
                command.Parameters.AddWithValue("@fName", fName);
                command.Parameters.AddWithValue("@lName", lName);
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);
                command.Parameters.AddWithValue("@salt", salt);
                command.ExecuteReader();
                connection.Close();
                return true;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database query: " + e.Message);
            connection.Close();
            return false;
        }
    }

    public static DataTable getAllFood() {
        string sql = "SELECT * FROM Item WHERE is_drink = false";
        return issueQuery(sql);
    }
    
    public static DataTable getAllDrinks() {
        string sql = "SELECT * FROM Item WHERE is_drink = true";
        return issueQuery(sql);
    }

    private static DataTable issueQuery(string sql) {
        try {
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection)) {
                command.CommandTimeout = 1000;
                var dataReader = command.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(dataReader);
                dataReader.Close();
                connection.Close();
                return dataTable;
            }
        }
        catch (Exception e) {
            Debug.WriteLine("Error in database query: " + e.Message);
            connection.Close();
            return null;
        }
    }

}
