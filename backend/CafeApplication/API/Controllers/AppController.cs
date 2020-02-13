using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Account;

namespace API.Controllers {
    [ApiController]
    public class AppController : ControllerBase {

        [HttpPost]
        [Route("Login")]
        public StatusCodeResult ValidateCredentials([FromBody]AccountCredentials data) {
            // todo remove debug line 
            Debug.WriteLine(data.email + " " + data.password);
            if (AccountValidator.compareCredentials(data.email, data.password) == true) {
                return StatusCode(200);
            } else {
                return StatusCode(400);
            }
        }

        [HttpPost]
        [Route("CreateAccount")]
        public HttpResponseMessage AddNewUser([FromBody]AccountCredentials data) {
            //TODO: use factory to create object instance
            AccountCreator c = new AccountCreator();

            //TODO: probably a lot more checks we could add to make data we get can actually go in DB

            Debug.WriteLine(data.userID + " " + data.firstName + " " + data.lastName + " " + data.email + " " + data.password + " " + data.password2);
            
            // return 400 if anything was an empty string
            if (data.userID.Equals("") || data.firstName.Equals("") || data.lastName.Equals("") || data.email.Equals("") || data.password.Equals("") || data.password2.Equals("")) {
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            }

            if (c.storeNewAccount(data.userID, data.firstName, data.lastName, data.email, data.password)) {
                // check that both passwords are the same
                if (data.password.Equals(data.password2) && data.password.Length > 7) {
                    return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                }
                else {
                    return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
                }
            } else {
                return new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest);
            }

        }

    }


    public class AccountCredentials {
        public string userID { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public string password2 { get; set; }

    }
}