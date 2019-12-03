using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database
{
    class DBCredentialsExample
    {
        public static string GetCredentials()
        {
            string database = "";
            string username = "";
            string password = "";

            //On-campus host & port variables
            //private static string host = "";
            //private static int port = ;

            // Off-campus connection host & port variables:
            string host = "localhost";
            int port = 2000;

            string connString = string.Format("Server={0};Database={1};port={2};User Id={3};password={4}", host, database, port, username, password);

            return connString;
        }
    }
}

