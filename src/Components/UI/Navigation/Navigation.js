import React, { Component } from 'react';
import './Navigation.css';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../Auth/Auth';
import Firebase from '../../Fire/base';
import { connect } from 'react-redux';
class Navigation extends Component {
    logoutHander = () => {
        Auth.logout(() => {
            Firebase.auth().signOut().then(() => {
                window.location.reload();
            });
        })
    }
    render(){
        return(
            <div className="custom-container-fluid">
                <nav className="navbar navbar-expand-md text-center">
                    <div className="container">
                        <a className="navbar-brand" href="/">FG</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                        {
                            Auth.isAuthenticated() === true  ?
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home"><i className="fas fa-home" style={{marginRight: '3px'}}></i>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/myrecipe"><i className="fas fa-stream" style={{marginRight: '3px'}}></i>My Recipes</Link>
                                </li>
                                <li className="nav-item"  onClick={this.logoutHander}>
                                    <Link className="nav-link" to="/"><i className="fas fa-user" style={{marginRight: '3px'}}></i>Logout</Link>
                                </li>
                                <li className="nav-item upload-nav">
                                    <Link className="nav-link" to="/uploadRecipe"><i className="fas fa-upload" style={{marginRight: '3px'}}></i>Upload Recipe</Link>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login"><button className="btn nav-btn-signup"><i className="fas fa-user" style={{marginRight: '3px'}}></i>Login</button></Link>
                                </li>
                            </ul>
                        }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setValue: () => dispatch({type: 'VALUE'})
    }
}
export default withRouter(connect(null, mapDispatchToProps)(Navigation))