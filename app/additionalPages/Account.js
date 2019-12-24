import React, {Component} from 'react';
import { Text, View, SafeAreaView} from 'react-native';
import FooterView from './Footer';

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