using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    public class AppController : ControllerBase
    {
        [HttpPost]
        [Route("Login")]
        public string[] ValidateCredentials([FromBody]AccountCredentials data) {
            Debug.WriteLine(data.email + " " + data.password);
            return new string[]
            {
                data.email,
                data.password
            };
        }

        [HttpGet]
        [Route("CreateAccount")]
        public string[] GetTest() {
            return new string[]
            {
                "Testing",
                "123"
            };
        }

    }

    public class AccountCredentials {
        public string email { get; set; }
        public string password { get; set; }
    }
}