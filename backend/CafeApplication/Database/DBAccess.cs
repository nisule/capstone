using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            //String sql = "INSERT INTO Item(item_name, stock, price, is_drink, addition_date) VALUES('Cappuccino', 30, 3.99, true, '2019-11-20')";
            String sql = "SELECT * FROM Item";

            MySqlCommand command = new MySqlCommand(sql, conn);
            //command.ExecuteReader();
            var dataReader = command.ExecuteReader();
            var dataTable = new DataTable();
            dataTable.Load(dataReader);
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
}


