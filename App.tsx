/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment, useEffect} from 'react';
import { Provider } from 'react-redux';
import Router from './src/router/Router';
import createStore from './src/redux';
import { setNavigator } from './src/config/navigation-config';

const store = createStore();

const App = () => {
  this.navigationRef = React.createRef();

  useEffect(() => {
    setNavigator(this.navigationRef.current)
  }, [])

  return (
    <Fragment>
      <Provider store={store}>
        <Router ref={this.navigationRef}/>
      </Provider>
    </Fragment>
  );
};

export default App;
