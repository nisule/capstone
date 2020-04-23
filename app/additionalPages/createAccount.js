import React, {Component} from 'react';
import { Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions, Keyboard, Animated, Image} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { getURL } from '../URL.js';
import pic from './img/addUser.png';

const window = Dimensions.get('window');
const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width /7;
const viewHeight = window.height;

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
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardDidShow = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  createAccount() {
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
                this.props.navigation.navigate("Login");
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
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex:1,backgroundColor:'#181818',alignItems:'center'}}>
        <Animated.Image source={pic} style={[styles.pic, {height: this.imageHeight}]} />
        <ScrollView style={{flex:1}}>
          <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
          >

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
            
            <TextInput
              style={styles.signupBoxes}
              placeholder="Confirm Password"
              placeholderTextColor='white'
              onChangeText={(text) => this.setState({password2: text})}
              passwordInput={this.state.text}
              secureTextEntry
              onSubmitEditing={() => { this.createAccount(); }}
              ref={(input) => { this.confirmPassword = input; }}
              // TODO: make onSubmitEditing hit 'create account'
            />
           

            <View style={styles.bottom}>
              <TouchableOpacity style={styles.signupButton} onPress={() => {
              this.createAccount();
              }}
              ref={(touchable) => this._touchable = touchable}
              >
              
                <Text style={styles.loginButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
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
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
    height: viewHeight/12
  },
  nameBoxes: {
    flex: 1,
    fontSize: 17,
    backgroundColor: '#303030',
    color:'white',
    borderRadius: 6,
    paddingLeft: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
    height: viewHeight/12
  },
  signupButton: {
    justifyContent: "center",
    backgroundColor: '#fbba37',
    alignItems: 'center',
    fontSize: 50,
    flex: 1,
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 6,
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
    height: viewHeight/10
  },
  loginButtonText: {
    color: 'white',
    fontSize: 29
  },
  pic: {
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20
  },
  container: {
    backgroundColor: '#181818',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})