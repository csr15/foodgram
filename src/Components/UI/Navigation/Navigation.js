import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Navigation.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../../Store/index';

class Navigation extends Component {
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
                        {/* Only if the user is Authenticated navigations are displayed else Login is displayed */}
                        {   
                            this.props.localId  ?
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home"><i className="fas fa-home" style={{marginRight: '3px'}}></i>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/my-recipes"><i className="fas fa-stream" style={{marginRight: '3px'}}></i>My Recipes</Link>
                                </li>
                                <li className="nav-item" onClick={this.props.onLogout}>
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
    };
};

const mapStateToProps = state => {
    return{
        localId: state.auth.localId
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(actionTypes.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));