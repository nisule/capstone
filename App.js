import React, { Component } from 'react';
import { Button, Text, StyleSheet, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class loginView extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
     <View style={{
      backgroundColor: 'black',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '5%',

      //alignItems: 'stretch',
    }}>
        <TextInput
          style={{height: 40, fontSize: 20, backgroundColor: 'gray', color:'white'}}
          placeholder="Email"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
          emailInput={this.state.text}

        />
        <View style={{flex:0.025}}/>
        <TextInput
          style={{height: 40, fontSize: 20, backgroundColor: 'gray', color:'white'}}
          placeholder="Password"
          placeholderTextColor='white'
          onChangeText={(text) => this.setState({text})}
          passwordInput={this.state.text}
          secureTextEntry
        />


        <View style={styles.bottom}>

            <Button

            color='#d4af37'
            onPress={() => {
            alert('ayy you logged in');
            }}
            title="Login"
            />

            <Button
            color='#d4af37'
            onPress={() => {
            alert('need to go to sign up page now');
            }}
            title="Signup"
            />

        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        marginTop: 50
    },

})
