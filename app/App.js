import React, {Component} from 'react';
import { View } from 'react-native';

import Navigator from './navigation/InitialNavigator'
console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Navigator/>
      </View>
    );
  }
}
