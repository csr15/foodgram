import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Login.css';
import * as actions from '../../../Store/index';
import { Aux } from '../../../HOC/Auxilary/Auxilary';
import Spinner from '../../UI/Spinner/Spinner';

class Login extends React.Component {
    state = {
      mail: '',
      password: '',
      error: '',
    };

    //Updating state with user inputs
    handleInputChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    };
    
    //SignUp with firebase authentication
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ spin: true });
        const { mail, password } = this.state;
        this.props.onAuth(mail, password, false);        
    };
    render(){
        //Redirecting user to Home page
        if(this.props.localId){
            return <Redirect to="/home" />
        }
        return (
                <Aux>
                    <div className="login-layout" style={this.props.loading ? {opacity: "0.6"} : null}>
                        <h4>Login To <span>FoodGram</span></h4>
                        <form onSubmit={this.handleSubmit}>
                            <input type="mail" name="mail" id="mail" autoComplete="off" value={this.state.mail} placeholder="Mail ID" onChange={this.handleInputChange} required/>
                            <input type="password" name="password" id="password" placeholder="Password" style={this.state.error ? {border: '2px solid red'} : null} onChange={this.handleInputChange} required/>
                            <p className="text-muted" style={{fontSize: "14px", margin: "10px auto", width: "70%", textAlign: 'center'}}>{this.state.error}</p>
                            <button type="submit" className="btn btn-login" onClick={this.loginHandler}>Login</button>
                            {
                                //Loader on submitting 
                                this.props.loading ?
                                <Spinner />
                                :
                                null
                            }
                            {
                                this.props.error ? 
                                <p>{this.props.error.message}</p>
                                :
                                null
                            }
                            <p className="text-muted">Don't have an account in FoodGram? <Link to="/signup">Signup</Link></p>
                        </form>
                    </div>
                </Aux>
        );
    };
};    

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        localId: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (mail, password, signup) => dispatch(actions.auth(mail, password, signup))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));