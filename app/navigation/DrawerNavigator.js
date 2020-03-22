import { Dimensions, Alert } from 'react-native';
import { React } from 'react';
import { SafeAreaView } from 'react-native-safe-area-view'
import { createDrawerNavigator, DrawerNavigatorItems, DrawerItems, DrawerItemList } from 'react-navigation-drawer';
import { createAppContainer, createNavigator } from 'react-navigation';
import loginView from '../additionalPages/Login';
import menuView from '../additionalPages/MainMenu';
import AccountSettings from '../additionalPages/Account';
import AppSettings from '../additionalPages/AppSettings';
import logoutView from '../additionalPages/Logout';

const WIDTH = Dimensions.get("window").width;

const DrawerNavigator = createAppContainer(createDrawerNavigator(
  {
      Menu: {
        screen: menuView,
      },
      Account: {
        screen: AccountSettings,
      },
      Settings: {
        screen: AppSettings,
      },
      Logout: {
        screen: logoutView
      }
  },
  
    {
      contentOptions: {
        activeTintColor: '#fbba37',
        activeBackgroundColor: '#303030'
      }
    }
    
));

export default createAppContainer(DrawerNavigator);