using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace Account {
    public static class Security {

        public static string generateSalt() {
            // only putting alphanumeric characters in the salt
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            var salt = new char[16];
            
            // pull a random character from chars and put it in the salt array
            for (int i = 0; i < salt.Length; i++) {
                salt[i] = chars[random.Next(chars.Length)];
            }

            // return salt string
            var finalSalt = new String(salt);
            return finalSalt;
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
