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

        // returns -1 on null error, 0 for no data, and 1 if credentials match
        public static int compareCredentials(string email, string password) {
            string salt = DBAccess.getSalt(email);
            string passwordWithSalt = password + salt;
            string hashedPassword = Security.hashPassword(passwordWithSalt);

            //Query the DB for the entered credentials
            var data = DBAccess.getAllAccountCredentials(email, hashedPassword) ;

            if (data is null)
                return -1;

            // getAllAccountCredentials will return null if the credentials are invalid.
            if (data.Rows.Count == 1) 
                return 1;

            return 0;
        }

        public static bool isEmployee(string email) {
            return DBAccess.isEmployee(email);
        }

        


    }
}
