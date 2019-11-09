import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import loginView from '../additionalPages/Login';
import  signupView  from '../additionalPages/createAccount';
import menuView from '../additionalPages/MainMenu';

const WIDTH = Dimensions.get("window").width;

const DrawerNavigator = createDrawerNavigator({
    Login: {
        screen: loginView,
      },
      Signup: {
        screen: signupView,
      },
      Menu: {
        screen: menuView,
      }
});

export default createAppContainer(DrawerNavigator);