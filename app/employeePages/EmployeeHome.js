import React, {Component} from 'react';
import { Text, StyleSheet, View, SafeAreaView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class EmployeeHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigate} = this.props.navigation;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Employee Page</Text>
            </View>
            
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

})
