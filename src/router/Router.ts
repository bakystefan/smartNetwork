import { createStackNavigator } from 'react-navigation-stack';

import Routes from './Routes';
import { LoginScreen, DashboardScreen } from '../screens';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';


const AuthStack = createStackNavigator({
  [Routes.LoginScreen]: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white',
      },
    }
  },
},
{
  initialRouteName: Routes.LoginScreen,
});


const AppStack = createStackNavigator({
  [Routes.DashboardScreen]: {
    screen: DashboardScreen,
    navigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white',
      },
    }
  },
},
{
  initialRouteName: Routes.DashboardScreen,
})


export default createAppContainer(createSwitchNavigator({
  AuthStack,
  AppStack
  // some other stack
},
{
  navigationOptions: () => ({
    cardStyle: {
      backgroundColor: 'white',
    },
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }),
}));
