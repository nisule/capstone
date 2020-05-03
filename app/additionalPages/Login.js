import React, {Component} from 'react';
import { Text, ScrollView, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Dimensions, Keyboard, Animated} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { getURL } from '../URL.js';
import cup from './img/saucer.png';

const window = Dimensions.get('window');
const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width /7;
const viewHeight = window.height;


export default class loginView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        text: '',
        email: '',
        password: '',
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

    login() {
      // check if both email and password are blank
      if (this.state.email === "" && this.state.password === "")
        alert("Please fill out the fields and try again.")
      else {
      // check if email is blank
      if (this.state.email != "") {
        // check if password is blank
        if (this.state.password != "") {
          // call to API to try to log in
          RNFetchBlob.config({
              trusty: true
          }).fetch( 'PUT', getURL('aws') + 'Login', { 'Content-Type': 'application/json'},  JSON.stringify({
              email: this.state.email,
              password : this.state.password
            }))
            .then( (response) => response.json())
            .then( (responseJson) => {  
              let status = responseJson.status;

              global.firstName = responseJson.firstName;
              // if status is 200 then login was succesful
              if(status == 200) {
                this.storeUserInfo(responseJson);
                this.storeToken(responseJson.authToken + "");
                
                // clear fields after logging in
                this.Password.clear();
                this.Email.clear();
                this.state.email = "";
                this.state.password = "";
                this.props.navigation.navigate('Menu')
              }else if (status == 400)
                alert("Incorrect credentials, please try again.")   
              else 
                alert("Error Connecting...");
            })
            .catch((error) => {
              console.error(error);
              alert("Request could not be handled.")
          })
        } else 
          alert("Please enter your password and try again.")
      } else 
        alert("Please enter your email and try again.")    
      }
    }

    render() {
      const {navigate} = this.props.navigation;
      this.resetCartItems();

      return (
      <View style={{flex:1,backgroundColor:'#181818',alignItems:'center'}}>
        <Text style={{color:'white', fontSize: 30}}>Cunning Coders' Cafe</Text>
        <Animated.Image source={cup} style={[styles.cup, {height: this.imageHeight}]} />
        <ScrollView style={{flex:1}}>
          <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
          >
          
            <TextInput
              style={styles.loginBoxes}
              placeholder="Email"
              placeholderTextColor='white'
              onChangeText={(text) => this.setState({email: text})}
              emailInput={this.state.text}
              keyboardType={"email-address"}
              returnKeyType = { "next" }
              onSubmitEditing={() => { this.Password.focus(); }}
              blurOnSubmit={false}
              ref={(input) => { this.Email = input; }}
            />
            
            <TextInput
              style={styles.loginBoxes}
              placeholder="Password"
              placeholderTextColor='white'
              onChangeText={(text) => this.setState({password: text})}
              passwordInput={this.state.text}
              secureTextEntry
              ref={(input) => { this.Password = input; }}
              onSubmitEditing={() => { this.login(); }}
            />

            <TouchableOpacity style={styles.loginButtons} onPress={() => {
              this.login();
            }}
            ref={(touchable) => this._touchable = touchable}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButtons} onPress={() => navigate('Signup')}>
              <Text style={styles.loginButtonText}>Signup</Text>
            </TouchableOpacity>
            
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      );
    }

    // this should check with api that your token is valid when you open app
    // but apparently the token is always undefined when you try to do that
    // so this kinda broke rn
    // initAuthToken = async () => {
    //   const authData = await AsyncStorage.getItem('authentication_data');
    //   const {navigate} = this.props.navigation;

    //   if (authData !== null) {
    //     const authDataJson = JSON.parse(authData);

    //     RNFetchBlob.config({
    //         trusty: true
    //       }).fetch('POST', 'http://kc499.us-west-2.elasticbeanstalk.com/AuthToken', {
    //           'Content-Type': 'application/json'
    //         },
    //         JSON.stringify({
    //           authToken: authData.authToken
    //         }))
    //       .then((response) => {
    //         let status = response.info().status;
    //         if (status == 200) {
    //           // user had valid token
    //           navigate('Menu');
    //         } else {
    //           // user does not have valid token, needs to login
    //           navigate('Login');
    //         }
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         alert("Request could not be handled.");
    //       })

    //   } else {
    //     navigate("Login");
    //   }
    // }

    // stores authToken after logging in
    storeToken = async (token) => {
      try {
        await AsyncStorage.setItem('authentication_data', JSON.stringify(token));
      } catch (error) {
        console.error(error)
      }
    }

    storeUserInfo = async (info) => {
      try {
        await AsyncStorage.setItem('user_info', JSON.stringify(info));
      } catch (error) {
        console.error(error)
      }
    }

    // TODO: figure out to return the token cuz putting 'return token' was giving 'object object'
    getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authentication_data');
        if (token !== null) {
          alert(token);
        }
      } catch (error) {
        console.error(error);
      }
    }

    componentDidUpdate() {
      const {navigate} = this.props.navigation;
      if (this.props.userSettings !== undefined) {
        navigate("Login");
      }

      if(this.props.signedIn !== undefined) {
        this.props.navigate("Login");
      }
    }

    // When the user logs out we want to reset the cart items.
    resetCartItems = async () => {
      try {
        await AsyncStorage.removeItem('Cart');
      } catch (error) {
          alert("Error adding to cart.");
      }
    }

  }

  const styles = StyleSheet.create({
      loginBoxes: {
        flex: 0.2,
        fontSize: 18,
        backgroundColor: '#303030',
        color:'white',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        width: window.width - 30,
        height: viewHeight/10
      },
      loginButtons: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#fbba37',
        alignItems: 'center',
        fontSize: 30,
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
      container: {
        backgroundColor: '#181818',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cup: {
        resizeMode: 'contain',
        marginBottom: 20,
        padding:10,
        marginTop:20
      },
  });