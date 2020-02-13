using System.Diagnostics;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http;
using Account;
using DTOs;
using Newtonsoft.Json;


namespace API.Controllers {
    [ApiController]
    public class AppController : ControllerBase {

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("Login")]
        public StatusCodeResult ValidateCredentials([Microsoft.AspNetCore.Mvc.FromBody]AccountCredentials data) {
            // todo remove debug line 
            Debug.WriteLine(data.email + " " + data.password);
            if (AccountValidator.compareCredentials(data.email, data.password)) {
                return StatusCode(200);
            } else {
                return StatusCode(400);
            }
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("CreateAccount")]
        public HttpResponseMessage AddNewUser([System.Web.Http.FromBody]AccountCredentials data) {
            //TODO: use factory to create object instance
            AccountCreator c = new AccountCreator();

            //TODO: check if any fields are null -> return proper response code

            Debug.WriteLine(data.userID + " " + data.firstName + " " + data.lastName + " " + data.email + " " + data.password);
            if (c.storeNewAccount(data.userID, data.firstName, data.lastName, data.email, data.password))
                return new HttpResponseMessage(System.Net.HttpStatusCode.OK);

            return new HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError);
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