import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createNavigator } from 'react-navigation';

import loginView from '../additionalPages/Login';
import menuView from '../additionalPages/MainMenu';
import AccountSettings from '../additionalPages/Account';
import AppSettings from '../additionalPages/AppSettings';

const WIDTH = Dimensions.get("window").width;

const DrawerNavigator = createDrawerNavigator(
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
        screen: loginView,
        navigationOptions: {
          drawerLockMode: 'locked-closed'
        }
      },
    },
    {
      contentOptions: {
        activeTintColor: '#fbba37',
        activeBackgroundColor: '#303030'
      }
    }
    );

export default createAppContainer(DrawerNavigator);