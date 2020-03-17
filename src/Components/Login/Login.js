import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import Firebase from '../Fire/base';
import Auth from '../Auth/Auth';

import './Login.css'

class Login extends React.Component {
    state = {
      mail: '',
      password: '',
      error: '',
    };
   handleInputChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };
    
   handleSubmit = (event) => {
        event.preventDefault();
        const { mail, password } = this.state;
        Firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then((user) => {
                Auth.login(() => {
                    this.props.history.push("/home");
                });
            })
            .catch((error) => {
                this.setState({ error: error.message });
            });
   };
    render(){
        return (
            <div className="login">
                <div className="login-layout">
                    <h4>Login To <span style={{color: "#000", borderBottom: "3px solid #fcc135", paddingBottom: "3px", fontSize: "34px", fontWeight: "bold"}}>FoodGram</span></h4>
                    <form onSubmit={this.handleSubmit}>
                        <input type="mail" name="mail" id="mail" autoComplete="off" placeholder="Mail ID" onChange={this.handleInputChange} required/>
                        <input type="password" name="password" id="password" placeholder="Password" style={this.state.error ? {border: '2px solid red'} : null} onChange={this.handleInputChange} required/>
                            <p className="text-muted" style={{fontSize: "14px", margin: "10px auto", width: "70%", textAlign: 'center'}}>{this.state.error}</p>
                        <button type="submit" className="btn btn-login" onClick={this.loginHandler}>Login</button>
                        <p className="text-muted">Don't have an account in FoodGram? <Link to="/signup">Signup</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}    

export default withRouter(Login);