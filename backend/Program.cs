using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;


class Program { 
    static void Main(string[] args) {

        Console.WriteLine("Getting Connection ...");
        MySqlConnection conn = createConnection();

        try
        {
            Console.WriteLine("Opening Connection ...");

            conn.Open();

            Console.WriteLine("Connection successful!");
            String sql = "INSERT INTO Item(item_name, stock, price, is_drink, addition_date) VALUES('Americano', 47, 3.49, true, '2019-11-20')";
            MySqlCommand command = new MySqlCommand(sql, conn);
            command.ExecuteReader();

            conn.Close();
        }
        catch (Exception e)
        {
            Console.WriteLine("Error: " + e.Message);
        }

        Console.Read();
    }

    public static MySqlConnection createConnection()
    {
        // Insert credentials and connection details
        string host = "";
        int port = 0;
        string database = "";
        string username = "";
        string password = "";

        // Connection String.
        // todo string format this instead of concat
        String connString = "Server=" + host + ";Database=" + database
            + ";port=" + port + ";User Id=" + username + ";password=" + password;

        MySqlConnection conn = new MySqlConnection(connString);

        return conn;
    }
}


