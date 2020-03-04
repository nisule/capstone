import React, {Component} from 'react';
import { Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Image, AsyncStorage} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';


export default class loginView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        text: '',
        email: '',
        password: '',
      }
    }

    render() {
      const {navigate} = this.props.navigation;
      this.resetCartItems();

      return (
      <KeyboardAvoidingView keyboardVerticalOffset = '-600' style = {{flex: 1, backgroundColor: '#181818'}} behavior="height" >

        <View style={{padding: '5%', flex: 1, justifyContent: 'flex-end'}}>

          <View style={{flex: .5, alignItems:'center', justifyContent: 'center'}}>
            <Image
              style={{flex: 1, resizeMode: 'stretch', width: '100%'}}
              source={require('./img/saucer.png')} />
          </View>
          <View style={{flex:0.025}}/>

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
            />
            
            <View style={{flex:0.025}}/>
            <TextInput
              style={styles.loginBoxes}
              placeholder="Password"
              placeholderTextColor='white'
              onChangeText={(text) => this.setState({password: text})}
              passwordInput={this.state.text}
              secureTextEntry
              ref={(input) => { this.Password = input; }}

              onSubmitEditing={() => { this._touchable.touchableHandlePress() }}
            />
        </View>


        <View style={styles.bottom}>
          <TouchableOpacity style={styles.loginButtons} onPress={() => {
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
                  }).fetch( 'POST', 'https:10.0.2.2:5001/Login', { 'Content-Type': 'application/json'},  JSON.stringify({
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

                        if (responseJson.isEmployee === false) 
                          navigate('Menu')
                        else if (responseJson.isEmployee === true) 
                          navigate('Employee')

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
          }}
          ref={(touchable) => this._touchable = touchable}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButtons} onPress={() => navigate('Signup')}>
            <Text style={styles.loginButtonText}>Signup</Text>
          </TouchableOpacity>
        </View>

        <View style={{justifyContent:'center', alignItems:'center', alignSelf:'center',position: 'absolute', top: '5%'}}>
          <Text style={{color:'white', fontSize: 30}}>Cunning Coders' Cafe</Text>
        </View>

       </KeyboardAvoidingView>
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
    //       }).fetch('POST', 'https:10.0.2.2:5001/AuthToken', {
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
        await AsyncStorage.setItem('authentication_data', token);
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

    // componentDidMount() {
    //   //this.initAuthToken();
    // }

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
      bottom: {
        flex: 0.27,
        justifyContent: 'flex-end',
        marginBottom: 0,
      },
      loginBoxes: {
        flex: 0.09,
        fontSize: 18,
        backgroundColor: '#303030',
        color:'white',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
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
      },
      loginButtonText: {
        color: 'white',
        fontSize: 29
      },
  });