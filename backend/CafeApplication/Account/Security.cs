using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace Account {
    public static class Security {

        public static string generateSalt() {
            var random = new RNGCryptoServiceProvider();
            // length of salt
            int length = 16;

            byte[] salt = new byte[length];

            // Build the random bytes
            random.GetNonZeroBytes(salt);

            // Return the string encoded salt as UTF8
            return Encoding.UTF8.GetString(salt);
        }

        public static string hashPassword(string pass) {
            StringBuilder Sb = new StringBuilder();

            //Hash the password
            using (SHA256 hash = SHA256.Create()) {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(pass));

                foreach (Byte b in result)
                    //append each byte in hexadecimal
                    Sb.Append(b.ToString("x2"));
            }
            return Sb.ToString();
        }


    }
}
