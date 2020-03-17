import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import Firebase from '../Fire/base'

import './Signup.css'

class Signup extends React.Component{
    state = {
        name: '',
        age: '',
        mail: '',
        password: '',
        error: ''
    };
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
    handleSubmit = (event) => {
        event.preventDefault();
        const { mail, password, name, age } = this.state;
        Firebase
            .auth()
            .createUserWithEmailAndPassword(mail, password)
            .then((res) => {
                res.user.updateProfile({
                    displayName: name
                })
                const user = Firebase.auth().currentUser;
                const dbRef = Firebase.database().ref('Accounts');
                if(user != null){
                    dbRef.child(Firebase.auth().currentUser.uid).set({
                        name: name,
                        age: age,
                        email: mail,
                        userId: user.uid
                    })
                }
                this.props.history.push('/login');
            })
            .catch((error) => {
                console.log(`Error Code: ${error.code} and Error Message: ${error.message}`)
                this.setState({ error: error.message });
            });
    };
    render(){    
        return (
            <div className="signup">
            <div className="signup-layout">
                <h4>Signup To <span style={{color: "#000", borderBottom: "3px solid #fcc135", paddingBottom: "3px", fontSize: "34px", fontWeight: "bold"}}>FoodGram</span></h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" id="name" autoComplete="off" placeholder="User Name" onChange={this.handleInputChange}/>
                    <input type="mail" name="mail" id="mail" autoComplete="off" placeholder="Mail ID" onChange={this.handleInputChange}/>
                    <input type="number" name="age" id="age" autoComplete="off" placeholder="Age" onChange={this.handleInputChange}/>
                    <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleInputChange}/>
                    <p className="text-muted" style={{fontSize: "14px", margin: "10px auto", width: "70%", textAlign: 'center'}}>{this.state.error}</p>
                    <button type="submit" className="btn btn-signup">Signup</button>
                    <p className="text-muted">*By signingIn you are agreeing with terms and policies of FoodGram</p>
                    <p className="text-muted">Already have account in FoodGram? <Link to="/login">Login</Link></p>
                </form>
            </div>
            </div>
        )
    }
}    

export default withRouter(Signup);