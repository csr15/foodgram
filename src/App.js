import React from 'react';
import Signup from './Components/Signup/Signup';
import Navigation from './Components/UI/Navigation/Navigation';
import { Switch, Route } from 'react-router';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { ProtectedRoute } from './Components/ProtectedRoute/ProtectedRoute';
import MainLayout from './Components/MainLayout/MainLayout';
import RecipeUpload from './Components/Home/RecipeUpload/RecipeUpload';
import MyRecipe from './Components/Home/MyRecipes/MyRecipes';

function App() {
  return (
    <div>
        <Navigation />
        <Switch>
          <Route path="/" exact component={MainLayout} /> 
          <Route path="/login" exact component={Login} /> 
          <Route path="/signup" component={Signup} /> 
          <ProtectedRoute path="/myrecipe" component={MyRecipe} />
          <ProtectedRoute path="/uploadRecipe" component={RecipeUpload} /> 
          <ProtectedRoute path="/home" exact component={Home} />
          <Route render={() => <h1>404 Page Not Found</h1>} />
        </Switch>
    </div>
  );
}

export default App;
