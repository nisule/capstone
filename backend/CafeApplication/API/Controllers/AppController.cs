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
        public string[] ValidateCredentials([FromBody]AccountCredentials data) {
            Debug.WriteLine(data.email + " " + data.password);
            AccountValidator av = new AccountValidator();

           if (av.compareCredentials(data.email, data.password) == true)
            {
                // probably return 200 or something because credentials were valid
            } else
            {
                // probably return 400 because credentials were invalid
            }

            return new string[]
            {
                data.email,
                data.password
            };
        }

        [HttpPost]
        [Route("CreateAccount")]
        public HttpResponseMessage AddNewUser([FromBody]AccountCredentials data) {
            //TODO: use factory to create object instance
            AccountCreator c = new AccountCreator();

            //TODO: check if any fields are null -> return proper response code
            

            if (c.storeNewAccount(data.userID, data.firstName, data.lastName, data.email, data.password))
                return new HttpResponseMessage(System.Net.HttpStatusCode.OK);

            return new HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError);
        }

    }


    public class AccountCredentials {
        public string userID { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }

    }
}