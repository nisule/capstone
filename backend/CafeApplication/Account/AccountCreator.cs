using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace Account {
    class AccountCreator {
        private static String generateSalt()
        {
            var random = new RNGCryptoServiceProvider();
            // length of salt
            int length = 16; 

            byte[] salt = new byte[length];

            // Build the random bytes
            random.GetNonZeroBytes(salt);

            // Return the string encoded salt as UTF8
            return Encoding.UTF8.GetString(salt);
        }
    }
}
