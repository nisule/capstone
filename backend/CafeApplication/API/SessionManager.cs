using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Diagnostics;

namespace API {
    public class SessionManager {
        // key = email, value = token
        Dictionary<string, string> usersAuthTokens;

        public SessionManager()     {
            usersAuthTokens = new Dictionary<string, string>();
        }

        // generates a random token
        private string generateAuthToken() {
            var random = new RNGCryptoServiceProvider();
            byte[] ary = new byte[64];
            random.GetNonZeroBytes(ary);
            string authToken = Convert.ToBase64String(ary);

            return authToken;
        }

        // return true if token received matches token stored for an email, false if they don't match or other error
        // used for API calls after logging in
        // TODO might not need email for this
        public bool verifyToken(string email, string token) {
            // check if key (email) is in dict
            if (usersAuthTokens.ContainsKey(email) == false) 
                return false;

            // try to get value for the key
            if (usersAuthTokens.TryGetValue(email, out string value)) {
                // if value matches token sent 
                if (value.Equals(token))
                    return true;
                else
                    return false;
            }
            else
                return false;
        }

        // returns true if token is in dict, false otherwise
        public bool ifTokenValid(string token) {
            foreach (KeyValuePair<string, string> dict in usersAuthTokens) {
                if (dict.Value.Equals(token))
                    return true;
            }
            return false;
        }

        // returns true if token is in dict and if user is an employee
        public bool ifTokenValidForEmployee(string token) {
            foreach (KeyValuePair<string, string> dict in usersAuthTokens) {
                if (dict.Value.Equals(token)) {
                    string email = dict.Key;
                    return DBAccess.isEmployee(email);
                }
            }
            return false;
        }

        // Used whenever someone logs in, generates a new token
        public void updateToken(string email) {
            usersAuthTokens.Add(email, generateAuthToken());
        }

        // Used whenever someone logs out
        public Boolean removeToken(string token) {
            // this is broken, not removing properly. no change before and after
            string email = "";
            foreach (KeyValuePair<string, string> dict in usersAuthTokens) {
                if (dict.Value.Equals(token))
                    email = dict.Key;
                break;
            }

            return usersAuthTokens.Remove(email);
        }

        // return email asssociated with token
        public string getEmail(string token) {
            // this is broken, not removing properly. no change before and after
            string email = "";
            foreach (KeyValuePair<string, string> dict in usersAuthTokens) {
                if (dict.Value.Equals(token))
                    email = dict.Key;
                break;
            }

            return email;
        }

        // check if user already in dict
        public bool ifUserExists(string email) {
            if (usersAuthTokens.ContainsKey(email))
                return true;
            else
                return false;
        }

        // gets the token for a user
        public string getToken(string email) {
            string token = "";
            if (usersAuthTokens.TryGetValue(email, out token))
                return token;
            else 
                return "";
        }

        // TODO: remove after testing
        public void seeDict() {
            foreach (KeyValuePair<string, string> dict in usersAuthTokens) {
                Debug.WriteLine("{0} {1}", dict.Key, dict.Value);
            }
        }



    }
}
