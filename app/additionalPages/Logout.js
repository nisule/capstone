import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import RNFetchBlob from 'rn-fetch-blob';

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Are you sure you want to log out?</Text>
        <Button
          title="Yes"
          onPress={() => {
            this.props.navigation.navigate('Login');
            this.logoutCall();
            }
            }
        />
         <Button
          title="No"
          onPress={() => goBack()}
        />
      </View>
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
    }).fetch( 'POST', 'https:10.0.2.2:5001/Logout', { 'Content-Type': 'application/json'},  JSON.stringify({
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