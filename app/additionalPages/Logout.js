import React, { Component } from 'react';
import { Text, TouchableOpacity, SafeAreaView, View, Button, AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import RNFetchBlob from 'rn-fetch-blob';
import { getURL } from '../URL.js';

var viewWidth = Dimensions.get('window').width; 

export default class Logout extends Component {
    constructor(props) {
      super(props);
      this.state = {
          authToken: '',
      };
    }

  render() {
    const {goBack} = this.props.navigation;
    
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style= {styles.titleText}>Are you sure you want to log out?</Text>
          <View style={{ flexDirection: "row"}}>

            <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                  this.props.navigation.navigate('Login');
                  this.logoutCall();
                  } }>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.buttonStyle} onPress={() => {
               goBack() } }>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    );
  }

  logoutCall = async () => {

    try {
      const info = await AsyncStorage.getItem('authentication_data');
      if (info !== null) {
        const infoJson = JSON.parse(info);
        this.setState({authToken: infoJson});
      }
    } catch (error) {
      console.error(error);
    }
  
    
    RNFetchBlob.config({
        trusty: true
    }).fetch( 'POST', getURL('aws') + 'Logout', { 'Content-Type': 'application/json'},  JSON.stringify({
      // TODO: figure out why for some reason doing an alert to see the auth token works perfectly fine, but this is just an empty string
        authToken: this.state.authToken
      }))
      .then((response) => { 
        let status = response.info().status;

        if (status == 200) {
            this.deleteToken();
        } else {
            alert("Error logging out from api call");
        }
      })
}

  deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('authentication_data');
    } catch (error) {
        alert("Error logging out in delete token");
    }
  }
}

const styles = StyleSheet.create({
  titleText:{
    fontSize: 28, 
    color: 'white'
  },
  titleStyle:{
    marginBottom: 15,
    backgroundColor:'grey',
    alignItems:'center'
  },
  textStyle: {
    color: 'white',
    fontSize: 24
  },
  viewStyle: {
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: 'grey',
  },
  buttonStyle: {
    flex: 1,
        justifyContent: "center",
        backgroundColor: '#fbba37',
        alignItems: 'center',
        fontSize: 30,
        borderWidth: 1,
        borderColor: '#404040',
        borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 29
  }
});