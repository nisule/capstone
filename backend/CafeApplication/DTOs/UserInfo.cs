
namespace DTOs {
    public class UserInfo {
        public string status { get; set; }
        public string userID { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string password2 { get; set; }
        public bool isEmployee { get; set; }

        public UserInfo getUserInfo(string email) {

            var itemTable = DBAccess.getUserInfo(email);

            if (!(itemTable is null)) {
                this.firstName = itemTable.Rows[0].ItemArray[0].ToString();
                this.email = itemTable.Rows[0].ItemArray[1].ToString();

                string isEmpStr = itemTable.Rows[0].ItemArray[2].ToString();

                if (string.Equals(isEmpStr, "True"))
                    this.isEmployee = true;
                else if (string.Equals(isEmpStr, "False"))
                    this.isEmployee = false;
            }
            return this;
        }
    }
    
}
