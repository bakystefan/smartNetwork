/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';
import { Provider } from 'react-redux';
import Router from './src/router/Router';
import createStore from './src/redux';

const store = createStore();

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Router />
      </Provider>
    </Fragment>
  );
};

export default App;
