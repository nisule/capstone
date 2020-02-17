using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Diagnostics;

namespace Account {
    public static class AccountValidator {
        public static void Main(string[] args) {
         
        }

        // return true if credentials are valid, false otherwise
        public static bool compareCredentials(string email, string password) {
            string salt = DBAccess.getSalt(email);
            string passwordWithSalt = password + salt;
            string hashedPassword = Security.hashPassword(passwordWithSalt);
            Debug.Print("hashedPassword = " + hashedPassword);

            //Query the DB for the entered credentials
            var data = DBAccess.getAllAccountCredentials(email, hashedPassword) ;

            // getAllAccountCredentials will return null if the credentials are invalid.
            if (data.Rows.Count == 1) { 
                Debug.Print("correct credentials");
                return true;
            }

            Debug.Print("incorrect credentials");
            return false;
        }

        public static bool isEmployee(string email) {
            return DBAccess.isEmployee(email);
        }

        


    }
}
