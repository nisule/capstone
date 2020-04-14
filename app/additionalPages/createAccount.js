import React, {Component} from 'react';
import { Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { getURL } from '../URL.js';

export default class signupView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      studentID: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    } 
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
    <KeyboardAvoidingView keyboardVerticalOffset = '-600' style = {{flex: 1, backgroundColor: '#181818'}} behavior="padding" >

      <View style={{padding: '4%', flex: 1, justifyContent: 'flex-end'}}>

      <View style={{flex: .5, alignItems:'center'}}>
          <Image
            style={{flex: 1, resizeMode: 'cover', width: '60%'}} 
            source={require('./img/addUser.png')} />    
        </View>
        <View style={{flex:0.025}}/>

      <View style = {{flex: 0.135, flexDirection: 'row'}}>
        <TextInput
          style={styles.nameBoxes}
          placeholder="First Name"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({firstName: text})}
          firstNameInput={this.state.text}

          returnKeyType = { "next" }
          onSubmitEditing={() => { this.lastName.focus(); }}
          blurOnSubmit={false}
        />
        <View style={{flex:0.015}}/>

        <TextInput
          style={styles.nameBoxes}
          placeholder="Last Name"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({lastName: text})}
          lastNameInput={this.state.text}

          returnKeyType = { "next" }
          onSubmitEditing={() => { this.studentID.focus(); }}
          blurOnSubmit={false}
          ref={(input) => { this.lastName = input; }}
        />
      </View>

      <View style={{flex:0.025}}/>
        <TextInput
          style={styles.signupBoxes}
          placeholder="Student ID"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({studentID: text})}
          emailInput={this.state.text}

          returnKeyType = { "next" }
          onSubmitEditing={() => { this.Email.focus(); }}
          blurOnSubmit={false}
          ref={(input) => { this.studentID = input; }}
        />

      <View style={{flex:0.025}}/>
        <TextInput
          style={styles.signupBoxes}
          placeholder="Email"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({email: text})}
          emailInput={this.state.text}

          returnKeyType = { "next" }
          onSubmitEditing={() => { this.Password.focus(); }}
          blurOnSubmit={false}
          ref={(input) => { this.Email = input; }}
        />

      <View style={{flex:0.025}}/>
        <TextInput
          style={styles.signupBoxes}
          placeholder="Password"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({password: text})}
          passwordInput={this.state.text}
          secureTextEntry

          returnKeyType = { "next" }
          onSubmitEditing={() => { this.confirmPassword.focus(); }}
          blurOnSubmit={false}
          ref={(input) => { this.Password = input; }}
        />
        
        <View style={{flex:0.025}}/>
        <TextInput
          style={styles.signupBoxes}
          placeholder="Confirm Password"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({password2: text})}
          passwordInput={this.state.text}
          secureTextEntry
          onSubmitEditing={() => { this._touchable.touchableHandlePress() }}
          ref={(input) => { this.confirmPassword = input; }}
          // TODO: make onSubmitEditing hit 'create account'
        />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.signupButton} onPress={() => {
          // checks to make sure no field is an empty string
          if (this.state.firstName != "" && this.state.lastName != "" && this.state.userID != "" 
          && this.state.email != "" && this.state.password != "" && this.state.password2 != "") {
            // checks if both password inputs match, send data to create account
            if (this.state.password === this.state.password2) {
              // checks if password is long enough
              if (this.state.password.length > 7) {
                  RNFetchBlob.config({
                    trusty: true
                }).fetch( 'POST', getURL('local') + 'CreateAccount', 
                  { 'Content-Type': 'application/json'}, 
                  JSON.stringify({ 
                    userID: this.state.studentID,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    password2: this.state.password2
                  }))
                  .then((response) => {
                    let status = response.info().status;
                   
                    if(status == 200){
                      // account creation was successful
                      alert("Account successfully created!");
                      navigate("Login");
                    } else{
                      // account creation failed
                      alert("Account creation failed, please try again.");
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                    alert("Request could not be handled.");
                })
              } else {
                alert("Password must be at least 8 characters, please try again.")
              }
            } else {
              // if passwords do not match
              alert("Passwords didn't match, please try again.")
            }
          } else {
            alert("Please fill out all the forms.")
          }
        }}
        ref={(touchable) => this._touchable = touchable}
        >
         
          <Text style={styles.loginButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  bottom: {
    flex: 0.135,
      justifyContent: 'flex-end',
      marginBottom: 0,
  },
    signupBoxes: {
      flex: 0.09,
      fontSize: 18,
      backgroundColor: '#303030',
      color:'white',
      borderRadius: 6,
      alignItems: 'center',
    },
    nameBoxes: {
      flex: 1,
      fontSize: 17,
      backgroundColor: '#303030',
      color:'white',
      borderRadius: 6,
      paddingLeft: 5,
    },
    signupButton: {
      justifyContent: "center",
      backgroundColor: '#fbba37',
      alignItems: 'center',
      fontSize: 50,
      flex: 1,
      borderWidth: 1,
      borderColor: '#404040',
      borderRadius: 6
    },
    loginButtonText: {
      color: 'white',
      fontSize: 29
    },
})