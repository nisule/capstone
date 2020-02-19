import { NativeModules } from "react-native";
import { Component } from "react";

export default class UserInfo extends Component{
    constructor(firstName, lastName, email, isEmployee){
        this.firstName = firstName;
        this.email = email;
        this.isEmployee = isEmployee;
    }

    addToCart = () => {
        
    }

    placeOrder = () => {

    }

}