namespace DTOs {
    public class AccountCredentials {
        public string userID { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string password2 { get; set; }
        public bool isEmployee { get; set; }

        public AccountCredentials getUserInfo(string email) {

            var itemTable = DBAccess.getUserInfo(email);
            AccountCredentials info = new AccountCredentials();

            info.firstName = itemTable.Rows[0].ItemArray[0].ToString();
            info.email = itemTable.Rows[0].ItemArray[1].ToString();

            string isEmpStr = itemTable.Rows[0].ItemArray[2].ToString();

            if (string.Equals(isEmpStr, "True"))
                info.isEmployee = true;
            else if (string.Equals(isEmpStr, "False"))
                info.isEmployee = false;
           
            return info;
        }
    }
    
}
