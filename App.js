import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import  signupView  from './additionalPages/createAccount.js';

class loginView extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    const {navigate} = this.props.navigation;

    return (
    <KeyboardAvoidingView keyboardVerticalOffset = '-600' style = {{flex: 1, backgroundColor: '#181818'}} behavior="height" >
      <View style={{flex: .08, alignItems:'center', justifyContent: 'center'}}> 
        <Text style={{color: 'white', fontSize: 21}}>
          Cunning Coder's Cafe
        </Text>
      </View>
    

      <View style={{padding: '5%', flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flex: .5, alignItems:'center', justifyContent: 'center'}}>
          <Image
            style={{flex: 1, resizeMode: 'stretch', width: '100%'}} 
            source={require('./additionalPages/img/saucer.png')} />    
        </View>
        <View style={{flex:0.025}}/>

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

        <TouchableOpacity style={styles.loginButtons} onPress={() => {alert('ayy you logged in');}}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButtons} onPress={() => navigate('Signup')}>
          <Text style={styles.loginButtonText}>Signup</Text>
        </TouchableOpacity>         
      </View>

     </KeyboardAvoidingView>
    );
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
      backgroundColor: '#d4af37',
      alignItems: 'center',
      fontSize: 30,
      // height: '20.5%',
      borderWidth: 1,
      borderColor: '#404040',
      borderRadius: 6,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 29
    },
})

const AppNavigator = createStackNavigator({
  Login: {
    screen: loginView,
    navigationOptions: {
      header: null,
    }
  },
  Signup: {
    screen: signupView,
    navigationOptions: {
      header: null,
    }
  }
});


export default createAppContainer(AppNavigator);
