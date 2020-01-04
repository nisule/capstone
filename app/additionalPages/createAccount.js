import React, {Component} from 'react';
import { Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';


export default class signupView extends Component{
  constructor(props) {
    super(props);
    this.state = {text: ''};  
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
          style={styles.nameBoxes}
          placeholder="First Name"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
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
          onChangeText={(text) => this.setState({text})}
          lastNameInput={this.state.text}

          returnKeyType = { "next" }
          onSubmitEditing={() => { this.Email.focus(); }}
          blurOnSubmit={false}
          ref={(input) => { this.lastName = input; }}
        />
      </View>

      <View style={{flex:0.025}}/>
        <TextInput
          style={styles.signupBoxes}
          placeholder="Email"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
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
          onChangeText={(text) => this.setState({text})}
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
          onChangeText={(text) => this.setState({text})}
          passwordInput={this.state.text}
          secureTextEntry
          ref={(input) => { this.confirmPassword = input; }}
          // make onSubmitEditing hit 'create account'
        />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigate('Login')}>
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