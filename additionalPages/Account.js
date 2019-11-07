import React, {Component} from 'react';
import { Text, StyleSheet, View} from 'react-native';
import FooterView from './Footer.js';

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    const {navigate} = this.props.navigation;

    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Drinks</Text>
            </View>
          


 
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <FooterView/>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({

})


module.exports = AccountSettings