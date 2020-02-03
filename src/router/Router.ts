import { createStackNavigator } from 'react-navigation-stack';
import Routes from './Routes';
import { LoginScreen } from '../screens';
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
  initialRouteName: 'LoginScreen',
});


export default createAppContainer(createSwitchNavigator({
  AuthStack,
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
