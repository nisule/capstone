﻿using System.Diagnostics;
using System.Net.Http;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Account;
using DTOs;
using OrderHandling;
using Newtonsoft.Json;

namespace API.Controllers {
    [ApiController]
    public class AppController : ControllerBase {

        [HttpPut]
        [Route("Login")]
        public string ValidateCredentials([FromBody]UserInfoDTO data) {
            var DTO = new UserInfoDTO();
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
        public StatusCodeResult Logout([FromBody]UserInfoDTO data) {

            // make sure user is authenticated
            if (SessionController.sm.ifTokenValid(data.authToken)) {
                
                if (SessionController.sm.removeToken(data.authToken))
                    return StatusCode(200);
                else
                    return StatusCode(400);
            } else {
                // return 401 (unauthenticated)
                return StatusCode(401);
            }
        }

        [HttpPost]
        [Route("ChangePassword")]
        public StatusCodeResult ChangePassword([FromBody]UserInfoDTO data) {
            string email = "";
            // get users email from the token sent
            email = SessionController.sm.getEmail(data.authToken);

            // make sure user is authenticated 
            if (SessionController.sm.ifTokenValid(data.authToken)) {
                AccountCreator c = new AccountCreator();

                // check that passwords match and length is 8 or more
                if (data.password.Equals(data.password2) && data.password.Length > 7) {
                    // check that old password was correct
                    int status = AccountValidator.compareCredentials(email, data.currentPassword);

                    // if current password was valid, go through with password change
                    if (status == 1) {
                        c.changePassword(data.password, email);
                        return StatusCode(200);
                    } else {
                        return StatusCode(400);
                    }


                } else {
                    return StatusCode(400);
                }

            } else {
                return StatusCode(401);
            }
            
        }

        [HttpPost]
        [Route("AuthToken")]
        public StatusCodeResult AuthToken([FromBody]UserInfoDTO data) {

            if (SessionController.sm.ifTokenValid(data.authToken))
                return StatusCode(200);
            else
                return StatusCode(401);
        }


        [HttpPost]
        [Route("CreateAccount")]
        public StatusCodeResult AddNewUser([FromBody]UserInfoDTO data) {
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
            var DTO = new ItemDetailsDTO();
            var items = DTO.getDrinkItems();
            string output = JsonConvert.SerializeObject(items);
            return output;
        }

        [HttpGet]
        [Route("FoodItems")]
        public string FoodItems() {
            var DTO = new ItemDetailsDTO();
            var items = DTO.getFoodItems();
            string output = JsonConvert.SerializeObject(items);
            return output;
        }

        [HttpPost]
        [Route("SubmitOrder")]
        public StatusCodeResult SubmitOrder([FromBody]OrderInfoDTO data) {
            if (SessionController.sm.ifTokenValid(data.authToken)) {
                //TODO: populate and create order id
                string orderID = EmployeeOrderQueue.generateOrderID();

                if (orderID is null)
                    return StatusCode(500);

                EmployeeOrderQueue.addOrder(new Order(orderID, data.userID, data.firstName, data.lastName,
                    data.returnItemsAsDictionary(), data.total, DateTime.Now));

                return StatusCode(200);
            } else {
                return StatusCode(401);
            }
        }

        [HttpPost]
        [Route("GetOrderQueue")]
        public string GetOrderQueue([FromBody]OrderInfoDTO data) {
            // validate that they are an employee and have valid token
            if (SessionController.sm.ifTokenValidForEmployee(data.authToken)) {
                
                var DTO = new OrderQueueDTO();
                List<Order> queue = EmployeeOrderQueue.getOrderQueue();
                foreach (var order in queue) {
                    //TODO: don't pass in total from frontend
                    DTO.populateOrder(order.orderID, order.userID.ToString(), order.firstName, order.lastName,
                        order.getTotal().ToString(), order.getDate().ToString(), order.getItemsDictionary());
                }

                string output = JsonConvert.SerializeObject(DTO);
                return output;
            } else {
                return "";
            }
        }

        [HttpPost]
        [Route("ApproveOrder")]
        public StatusCodeResult ApproveOrder([FromBody]OrderInfoDTO data) {
            if (SessionController.sm.ifTokenValidForEmployee(data.authToken)) {
                int result = EmployeeOrderQueue.approveOrder(data.orderID);
                if (result == 1) {
                    return StatusCode(200);
                } 
                else if (result == 0) {
                    return StatusCode(403);
                }
                else {
                    //Internal Server Error
                    return StatusCode(500);
                }
            } else {
                return StatusCode(401);
            }

            
        }

        [HttpPost]
        [Route("DenyOrder")]
        public StatusCodeResult DenyOrder([FromBody]OrderInfoDTO data) {
            if (SessionController.sm.ifTokenValidForEmployee(data.authToken)) {
                if (EmployeeOrderQueue.denyOrder(data.orderID)) {
                    return StatusCode(200);
                }

                //Internal Server Error
                return StatusCode(500);
            } else {
                return StatusCode(401);
            }
        }
    }

}
