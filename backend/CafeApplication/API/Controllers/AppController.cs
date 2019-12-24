using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    public class AppController : ControllerBase
    {
        [Route("KelleyCafe")]
        public string[] GetHelloWorld() {
            return new string[]
            {
                "Hello",
                "World"
            };
        }

        [Route("Test")]
        public string[] GetTest() {
            return new string[]
            {
                "Testing",
                "123"
            };
        }

    }
}