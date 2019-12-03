import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import drawerNavigator from './DrawerNavigator';
import loginView from '../additionalPages/Login';
import signupView  from '../additionalPages/createAccount';

const Navigator = createStackNavigator({
      Login: {
        screen: loginView,
        navigationOptions: {
            header: null
        }
      },
      Signup: {
        screen: signupView,
        navigationOptions: {
            header: null
        }
      },
      Menu: {
        screen: drawerNavigator,
        navigationOptions: {
            header: null
        }
      }
});

export default createAppContainer(Navigator);