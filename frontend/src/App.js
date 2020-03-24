import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Hoc/Layout/Layout';
import Breeds from './containers/Breeds/Breeds';

import { Provider } from 'react-redux';
import store from './store';

import {loadUser} from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';




class App extends Component {

componentDidMount() {
  store.dispatch(loadUser());
}

  render() {
    return (
      <Provider store={store}>
        <div>
          <Layout>
            <Switch>
              <Route path="/" exact component={Breeds} />
            </Switch>
          </Layout>
        </div>
      </Provider>
    );
  }
}


export default App;
