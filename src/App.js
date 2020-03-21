import React from 'react';
import { Switch, Route } from 'react-router';

import { ProtectedRoute } from './Components/Auth/ProtectedRoute/ProtectedRoute';
import Home from './Components/Home/Home';
import Signup from './Components/Auth/Signup/Signup';
import Navigation from './Components/UI/Navigation/Navigation';
import Login from './Components/Auth/Login/Login';
import MainLayout from './Components/MainLayout/MainLayout';

function App() {
  return (
    <div>
        <Navigation />
        <Switch>
          <Route path="/" exact component={MainLayout} /> 
          <Route path="/login" exact component={Login} /> 
          <Route path="/signup" exact component={Signup} /> 
          <ProtectedRoute path="/home" exact component={Home} />
          <Route render={() => <h1>404 Page Not Found</h1>} />
        </Switch>
    </div>
  );
}

export default App;
