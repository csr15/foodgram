import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';

import Home from './Components/Home/Home';
import Signup from './Components/Auth/Signup/Signup';
import Navigation from './Components/UI/Navigation/Navigation';
import Login from './Components/Auth/Login/Login';
import MainLayout from './Components/MainLayout/MainLayout';
import NotFound from './Components/NotFound/NotFound';
import { ProtectedRoute } from './Components/Auth/ProtectedRoute/ProtectedRoute';
import * as actionTypes from './Store/index';
import asyncComponents from './HOC/AsyncComponents/asyncComponents';

const MyRecipeAsync = asyncComponents(() => {
    return import('./Components/Home/MyRecipes/MyRecipes');
});

const UploadRecipeAsync = asyncComponents(() => {
    return import('./Components/Home/RecipeUpload/RecipeUpload');
});

const SearchRecipeAsync = asyncComponents(() => {
    return import('./Components/Home/SearchRecipe/SearchRecipe');
});

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
        this.props.fetchRecipes(this.props.localId);
    }
    render(){
        return (
            <div>
                <Navigation />
                <Switch>
                    <Route path="/" exact component={MainLayout} /> 
                    <Route path="/login" exact component={Login} /> 
                    <Route path="/signup" exact component={Signup} />
    
                    {/* allows only authenticated user to access */}
                    <ProtectedRoute path="/home" exact component={Home} />
                    <ProtectedRoute path="/my-recipes" exact component={MyRecipeAsync} />
                    <Route path="/upload-recipes" exact component={UploadRecipeAsync} />
                    <Route path="/search-recipes" exact component={SearchRecipeAsync} />
    
                    {/* Not Found page */}
                    <Route render={NotFound} />
                </Switch>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return{
        localId: state.auth.localId,
        recpImgUrl: state.myRecp.recpImgUrl
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onTryAutoSignup: () => dispatch(actionTypes.authCheckState()),
        fetchRecipes: (localId) => dispatch(actionTypes.fetchRecipes(localId)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
