import React, {Component} from 'react';
import { Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

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

      <View style={{padding: '5%', flex: 1, justifyContent: 'flex-end'}}>

      <View style={{flex: .5, alignItems:'center'}}>
          <Image
            style={{flex: 1, resizeMode: 'cover', width: '60%'}} 
            source={require('./img/addUser.png')} />    
        </View>
        <View style={{flex:0.025}}/>

      <View style = {{flex: 0.135, flexDirection: 'row'}}>
        <TextInput
        // TODO: add a box for studentID
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
          ref={(input) => { this.confirmPassword = input; }}
          // TODO: add check so that the passwords are equal to each other
          // make onSubmitEditing hit 'create account'
        />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.signupButton} onPress={() => {
           RNFetchBlob.config({
            trusty: true
            // fix the route
        }).fetch( 'POST', 'https:10.0.2.2:5001/CreateAccount', 
          { 'Content-Type': 'application/json'}, 
          JSON.stringify({ 
            // add all the fields
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
              navigate('Menu')
            } else{
              // account creation failed
            }
          })
          .catch((error) => {
            console.error(error);
            alert("Request could not be handled.")
        })
        }}>
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
      fontSize: 18,
      backgroundColor: '#303030',
      color:'white',
      borderRadius: 6,
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