import React, {Component} from 'react';
import { Button, Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';


class signupView extends Component{
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

        <TextInput
          style={styles.signupBoxes}
          placeholder="Username"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
          emailInput={this.state.text}
        />

      <View style={{flex:0.025}}/>
        <TextInput
          style={styles.signupBoxes}
          placeholder="Email"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
          emailInput={this.state.text}
        />

      <View style={{flex:0.025}}/>
        <TextInput
          style={styles.signupBoxes}
          placeholder="Password"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
          passwordInput={this.state.text}
          secureTextEntry
        />

        <View style={{flex:0.025}}/>
        <TextInput
          style={styles.signupBoxes}
          placeholder="Confirm Password"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
          passwordInput={this.state.text}
          secureTextEntry
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
      justifyContent: 'center',
      alignItems: 'center'
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

module.exports = signupView;