import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createNavigator } from 'react-navigation';

import loginView from '../additionalPages/Login';
import AccountSettings from '../additionalPages/Account';
import AppSettings from '../additionalPages/AppSettings';

const WIDTH = Dimensions.get("window").width;

const DrawerNavigator = createDrawerNavigator({
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
});

export default createAppContainer(DrawerNavigator);