import React, {Component} from 'react';
import {  View } from 'react-native';

import DrawerNavigator from './navigation/Navigator'

export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <DrawerNavigator />
      </View>
    );
  }
}
