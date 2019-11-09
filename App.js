import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Text, StyleSheet, TextInput, View , TouchableOpacity, KeyboardAvoidingView, Image} from 'react-native';

import  signupView  from './additionalPages/createAccount.js';
import menuView from './additionalPages/MainMenu.js';
import loginView from './additionalPages/Login.js';

const AppNavigator = createStackNavigator({
  Login: {
    screen: loginView,
    navigationOptions: {
      header: null,
    }
  },
  Signup: {
    screen: signupView,
    navigationOptions: {
      header: null,
    }
  },
  Menu: {
    screen: menuView,
    navigationOptions: {
      header: null,
    }
  }
});

module.exports = createAppContainer(AppNavigator);