using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace Account {
    public class AccountValidator {
        public static void Main(string[] args) {
            AccountValidator a = new AccountValidator();

            AccountCreator c = new AccountCreator();
            bool bb = c.storeNewAccount("345","Genius", "Tester", "Tester@gmail.com", "abc");
            
        }

        private bool compareCredentials(string email, string password, string salt) {
            string passwordWithSalt = password + salt;
            string hashedPassword = Security.hashPassword(passwordWithSalt);

            //Query the DB for the entered credentials
            var data = DBAccess.getAllAccountCredentials(email, hashedPassword) ;

            if (data.Rows.Count == 1)
                return true;

            return false;
        }

        


    }
}
