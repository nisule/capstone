using System.Diagnostics;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Account;
using DTOs;
using Newtonsoft.Json;


namespace API.Controllers {
    [ApiController]
    public class AppController : ControllerBase {

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("Login")]
        public StatusCodeResult ValidateCredentials([Microsoft.AspNetCore.Mvc.FromBody]AccountCredentials data) {
            // todo remove debug lines
            Debug.WriteLine(data.email + " " + data.password);

            // return 400 if anything was an empty string
            if (data.email.Equals("") || data.password.Equals("")) {
                Debug.WriteLine("response 400");
                return StatusCode(400);
            }
            
            if (AccountValidator.compareCredentials(data.email, data.password)) {
                Debug.WriteLine("response 200");
                return StatusCode(200);
            } else {
                Debug.WriteLine("response 400");
                return StatusCode(400);
            }
        }


        [HttpPost]
        [Route("CreateAccount")]
        public StatusCodeResult AddNewUser([FromBody]AccountCredentials data) {
            //TODO: use factory to create object instance
            AccountCreator c = new AccountCreator();

            //TODO: probably a lot more checks we could add to make data we get can actually go in DB

            Debug.WriteLine(data.userID + " " + data.firstName + " " + data.lastName + " " + data.email + " " + data.password + " " + data.password2);
            
            // return 400 if anything was an empty string
            if (data.userID.Equals("") || data.firstName.Equals("") || data.lastName.Equals("") || data.email.Equals("") || data.password.Equals("") || data.password2.Equals("")) {
                Debug.WriteLine("response 400");
                return StatusCode(400);
            }

            // if account gets stored in db successfully
            if (c.storeNewAccount(data.userID, data.firstName, data.lastName, data.email, data.password)) {
                // check that both passwords are the same
                if (data.password.Equals(data.password2) && data.password.Length > 7) {
                    Debug.WriteLine("response 200");
                    return StatusCode(200);
                }
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
            Debug.WriteLine(isEmployee);

            string output = JsonConvert.SerializeObject(isEmployee);
            return output;
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("DrinkItems")]
        public string MainMenuItems() {
            var DTO = new ItemDetails();

            var items = DTO.getAllItems();
            string output = JsonConvert.SerializeObject(items);

            return output; 
        }
    }

}