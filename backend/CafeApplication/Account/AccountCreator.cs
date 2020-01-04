using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Account {
    public class AccountCreator {

        private string _salt;

        public AccountCreator() {
            _salt = Security.generateSalt(); 
        }

        public bool storeNewAccount(string id, string firstName, string lastName, string email, string password) {
            string saltedPassword = password + _salt;
            string hashedPassword = Security.hashPassword(saltedPassword);

            return DBAccess.InsertNewUser(id, firstName, lastName, email, hashedPassword, _salt);
        }


        
    }
}
