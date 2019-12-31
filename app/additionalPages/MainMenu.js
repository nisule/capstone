import React, {Component} from 'react';
import { Text, StyleSheet, View, SafeAreaView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import DrinkMenu from './DrinkMenu.js';
import FoodMenu from './FoodMenu.js';
import AccountSettings from './Account.js';
import AppSettings from './AppSettings.js';
import { FooterView } from './Footer.js';


export default class menuView extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#181818'}}>

            <View style={styles.titleStyle}>
                <Text style={styles.titleText}>Cunning Coders' Cafe</Text>
            </View>
        </SafeAreaView>
    );
  }
}
const TabNavigator = createBottomTabNavigator(
  {
    MainMenuView: {
      screen: menuView,
    },
    DrinkMenuView: {
      screen: DrinkMenu,
    },
    FoodMenuView: {
      screen: FoodMenu,
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
      <FooterView{...props} />
      ),
  },
);
const styles = StyleSheet.create({
  titleText:{
    fontSize: 30, 
    color: 'white'
  },
  titleStyle:{
    marginBottom: 15,
    backgroundColor:'grey',
    alignItems:'center'
  },
})
module.exports = createAppContainer(TabNavigator);