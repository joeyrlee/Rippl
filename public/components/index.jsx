import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRedirect, browserHistory} from 'react-router';
import Stats from './Stats.jsx';
import Container from './Container.jsx';
import AuthService from './AuthService.jsx'
import Login from './Login.jsx';
import App from './App.jsx';

const auth = new AuthService('Xr0bBUTsbbKA0ko1I8Wz9ZLE8t4Tsban', 'comesm.auth0.com');

const requireAuth = (nextState, replace) => {
  if(!auth.loggedIn()) {
    replace({pathname: '/login'});
  }
}

const routes =  (<Route path="/" component={Container} auth={auth}>
  <IndexRedirect to="/home"/>
  <Route path="home" component={Stats} onEnter={requireAuth} />
  <Route path="login" component={Login} />
</Route>)


ReactDOM.render(<App history={browserHistory}
        routes={routes} />
  ,
  document.getElementById('app')
);