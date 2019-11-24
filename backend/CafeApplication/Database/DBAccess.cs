using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Data;

public class DBAccess {

    private static MySqlConnection connection;


    public DBAccess() {
        string host = "mal.cs.plu.edu";
        int port = 3306;
        string database = "kc499_2019";
        string username = "kc499";
        string password = "KelleyCafe";

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


