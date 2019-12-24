import React, {Component} from 'react';
import { Text, StyleSheet, View, SafeAreaView} from 'react-native';
import FooterView from './Footer';

export default class AppSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Settings</Text>
            </View>

        </SafeAreaView>
    );
  }
}