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
        public string ValidateCredentials([FromBody]UserInfo data) {
            var DTO = new UserInfo();
            int status = AccountValidator.compareCredentials(data.email, data.password);

            if (status == 1) { //valid credentials
                string token;
                // check to see if user has a token already
                if (SessionController.sm.ifUserExists(data.email))
                    token = SessionController.sm.getToken(data.email);
                else {
                    // generate token for user
                    SessionController.sm.updateToken(data.email);
                    token = SessionController.sm.getToken(data.email);
                }

                DTO.status = "200"; //Set the status
                DTO = DTO.getUserInfo(data.email, token); //Get the user info for return
                string output = JsonConvert.SerializeObject(DTO);

                return output;
            }
            else if (status == 0) { //invalid credentials
                DTO.status = "400";
                string output = JsonConvert.SerializeObject(DTO);
                return output;
            }
            else {  //Null error
                DTO.status = "404";
                string output = JsonConvert.SerializeObject(DTO);
                return output;
            }
        }

        [HttpPost]
        [Route("Logout")]
        public StatusCodeResult logout([FromBody]UserInfo data) {
            // make sure user is authenticated
            // TODO might not need email for verifyToken, maybe use ifTokenValid
            if (SessionController.sm.verifyToken(data.email, data.authToken)) {
                if (SessionController.sm.removeToken(data.email))
                    return StatusCode(200);
                else
                    return StatusCode(400);
            } else {
                // return 401 (unauthenticated)
                return StatusCode(401);
            }
        }

        [HttpPost]
        [Route("AuthToken")]
        public StatusCodeResult authToken([FromBody]UserInfo data) {
            if (SessionController.sm.ifTokenValid(data.authToken))
                return StatusCode(200);
            else
                return StatusCode(401);
        }


        [HttpPost]
        [Route("CreateAccount")]
        public StatusCodeResult AddNewUser([FromBody]UserInfo data) {
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
                else
                    return StatusCode(400);
            }
            else
                return StatusCode(400);
        }

        [HttpGet]
        [Route("DrinkItems")]
        public string DrinkItems() {
            var DTO = new ItemDetails();
            var items = DTO.getDrinkItems();
            string output = JsonConvert.SerializeObject(items);
            return output;
        }

        [HttpGet]
        [Route("FoodItems")]
        public string FoodItems() {
            var DTO = new ItemDetails();
            var items = DTO.getFoodItems();
            string output = JsonConvert.SerializeObject(items);
            return output;
        }
    }

}
