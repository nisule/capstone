using System.Diagnostics;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Account;
using DTOs;
using Newtonsoft.Json;


namespace API.Controllers {
    [ApiController]
    public class AppController : ControllerBase {

        [HttpPost]
        [Route("Login")]
        public StatusCodeResult ValidateCredentials([FromBody]AccountCredentials data) { 
            if (data.email.Equals("") || data.password.Equals("")) 
                return StatusCode(400);
           
            int status = AccountValidator.compareCredentials(data.email, data.password);

            if (status == 1) //valid credentials
                return StatusCode(200);
            else if (status == 0) //invalid credentials
                return StatusCode(400);
            else  //Null error
                return StatusCode(404);
        }

        [HttpPost]
        [Route("CreateAccount")]
        public StatusCodeResult AddNewUser([FromBody]AccountCredentials data) {
            //TODO: use factory to create object instance
            AccountCreator c = new AccountCreator();

            //TODO: probably a lot more checks we could add to make data we get can actually go in DB

            // return 400 if anything was an empty string
            if (data.userID.Equals("") || data.firstName.Equals("") || data.lastName.Equals("") || data.email.Equals("") || data.password.Equals("") || data.password2.Equals("")) 
                return StatusCode(400);
            

            // if account gets stored in db successfully
            if (c.storeNewAccount(data.userID, data.firstName, data.lastName, data.email, data.password)) {
                // check that both passwords are the same
                if (data.password.Equals(data.password2) && data.password.Length > 7) 
                    return StatusCode(200);
                
                else {
                    Debug.WriteLine("response 400");
                    return StatusCode(400);
                }
            } else {
                Debug.WriteLine("response 400");
                return StatusCode(400);
            }

        }

        [HttpPost]
        [Route("IsEmployee")]
        public string isEmployee([FromBody]AccountCredentials data) {
            bool isEmployee = AccountValidator.isEmployee(data.email);

            string output = JsonConvert.SerializeObject(isEmployee);
            return output;
        }

        [HttpGet]
        [Route("DrinkItems")]
        public string MainMenuItems() {
            var DTO = new ItemDetails();

            var items = DTO.getAllItems();
            string output = JsonConvert.SerializeObject(items);

            return output;
        }
    }

}
