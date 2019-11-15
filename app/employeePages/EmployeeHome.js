import React, {Component} from 'react';
import { Text, StyleSheet, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


export default class EmployeeHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Employee Page</Text>
            </View>

            
           

        </View>
    );
  }
}



const styles = StyleSheet.create({

})

