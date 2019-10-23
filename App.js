import React, { Component } from 'react';
import { Button, Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class loginView extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
    <KeyboardAvoidingView keyboardVerticalOffset = '-600' style = {{flex: 1, backgroundColor: '#181818'}} behavior="padding" >

      <View style={{padding: '5%', flex: 1, justifyContent: 'center' }}>
        <TextInput
          style={styles.loginBoxes}
          placeholder="Email"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
          emailInput={this.state.text}

        />
        <View style={{flex:0.025}}/>
        <TextInput
          style={styles.loginBoxes}
          placeholder="Password"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
          passwordInput={this.state.text}
          secureTextEntry
        />
      </View>

      <View style={styles.bottom}>

        <TouchableOpacity style={styles.loginButtons}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButtons}>
          <Text style={styles.loginButtonText}>Signup</Text>
        </TouchableOpacity>         
          
      </View>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    bottom: {
      justifyContent: 'flex-end',
      marginBottom: 0
    },
    loginBoxes: { 
      flex: 0.15, 
      fontSize: 22, 
      backgroundColor: '#303030', 
      color:'white',
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginButtons: {
      justifyContent: "center",
      backgroundColor: '#d4af37',
      alignItems: 'center',
      fontSize: 30,
      height: '20.5%',
      borderWidth: 1,
      borderColor: '#404040',
      borderRadius: 6,
    },
    loginButtonText: {
      color: 'white'
    }

})
