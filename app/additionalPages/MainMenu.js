import React, {Component} from 'react';
import { Text, StyleSheet, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import posed from "react-native-pose";

import DrinkMenu from './DrinkMenu.js';
import FoodMenu from './FoodMenu.js';
import Search from './Search.js';
import AccountSettings from './Account.js';
import AppSettings from './AppSettings.js';
import { FooterView } from './Footer.js';


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

            
            {/* <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <FooterView navigation={this.props.navigation}/>
            </View> */}

        </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    DrinkMenuView: {
      screen: DrinkMenu,
    },
    FoodMenuView: {
      screen: FoodMenu,
    },
    SearchView: {
      screen: Search,
    },
    AccountSettingsView: {
      screen: AccountSettings,
    },
    
    AppSettingsView: { 
      screen: AppSettings, }
  },

  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 20,
        alignContent: 'center',

      },
      style: {
        backgroundColor: 'rgba(52, 52, 52, .9)',

      },
    },
    tabBarComponent: props => (
      <FooterView{...props} style={{backgroundColor: 'green'}} />
      ),
  },

);

const styles = StyleSheet.create({

})

module.exports = createAppContainer(TabNavigator);