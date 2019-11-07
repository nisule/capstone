import React, {Component} from 'react';
import { Text, StyleSheet, View} from 'react-native';
import FooterView from './Footer.js';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';


import DrinkMenu from './DrinkMenu.js';
import FoodMenu from './FoodMenu.js';
import Search from './Search.js';
import AccountSettings from './Account.js';
import AppSettings from './AppSettings.js'

export default class menuView extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
        <View style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'white'}}>Cunning Coders' Cafe</Text>
            </View>
          
 
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <FooterView navigation={this.props.navigation}/>
            </View>

        </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  DrinkMenuView: DrinkMenu,
  FoodMenuView: FoodMenu,
});


module.exports =  createAppContainer(TabNavigator);

const styles = StyleSheet.create({

})