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
            bool b = a.compareCredentials("sam@email.com", "test");

        }

        private bool compareCredentials(string email, string password) {
            StringBuilder Sb = new StringBuilder();

            //Hash the password
            using (SHA256 hash = SHA256.Create()) {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(password));

                foreach (Byte b in result)
                    //append each byte in hexadecimal
                    Sb.Append(b.ToString("x2"));
            }

            //Query the DB for the entered credentials
            var data = DBAccess.getAllAccountCredentials(email, Sb.ToString()) ;

            if (data.Rows.Count == 1)
                return true;

            return false;
        }


    }
}
