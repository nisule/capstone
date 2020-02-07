using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace Account {
    public static class AccountValidator {
        public static void Main(string[] args) {
            //bool b = AccountValidator.compareCredentials("blaha@test.com", "yolo");
           

            //string salt = DBAccess.getSalt("blaha@test.com");

            //bool bb = c.storeNewAccount("345","Genius", "Tester", "Tester@gmail.com", "abc");
            
        }

        // return true if credentials are valid, false otherwise
        public static bool compareCredentials(string email, string password) {
            string salt = DBAccess.getSalt(email);
            string passwordWithSalt = password + salt;
            string hashedPassword = Security.hashPassword(passwordWithSalt);

            //Query the DB for the entered credentials
            var data = DBAccess.getAllAccountCredentials(email, password) ;
            
            // getAllAccountCredentials will return null if the credentials are invalid.
            if (data.Rows.Count == 1)
                return true;

            return false;
        }

        


    }
}
