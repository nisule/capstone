import React, {Component} from 'react';
import { Text, StyleSheet, View, SafeAreaView} from 'react-native';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  render() {
    const {navigate} = this.props.navigation;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Your Account</Text>
            </View>
              
        </SafeAreaView>
    );
  }
}

module.exports = AccountSettings