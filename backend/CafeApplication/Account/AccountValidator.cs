namespace Account {
    public static class AccountValidator {

        // returns -1 on null error, 0 for no data, and 1 if credentials match
        public static int compareCredentials(string email, string password) {
            string salt = DBAccess.getSalt(email);
            string passwordWithSalt = password + salt;
            string hashedPassword = Security.hashPassword(passwordWithSalt);

            //Query the DB for the entered credentials
            var data = DBAccess.getAllAccountCredentials(email, hashedPassword) ;

            //Didn't properly query the DB
            if (data is null)
                return -1;

            //Valid Credentials
            if (data.Rows.Count == 1) 
                return 1;

            //If no rows were returned, then the credentials do not match
            return 0;
        }

        public static bool isEmployee(string email) {
            return DBAccess.isEmployee(email);
        }

        


    }
}
