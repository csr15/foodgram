import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../Store/index';

import Spinner from '../../UI/Spinner/Spinner';
import { Aux } from '../../../HOC/Auxilary/Auxilary';
import './Signup.css';

class Signup extends React.Component{
    state = {
        name: '',
        age: '',
        mail: '',
        password: '',
    };

    //Handling user inputs
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    //SignUp with firebase authentication
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ spin: true });
        const { mail, password } = this.state;
        this.props.onAuth(mail, password, true);        
    };
    render(){    
        if(this.props.localId){
            return <Redirect to="/login" />
        }
        return (
            <Aux>
                <div className="signup-layout" style={this.state.spin ? {opacity: "0.6"} : null}>
                    <h4>Signup To <span>FoodGram</span></h4>
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
                    {
                        this.props.loading ?
                        <Spinner />
                        :
                        null
                    }
                </div>
            </Aux>
        )
    }
}    

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        localId: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (mail, password, signup) => dispatch(actions.auth(mail, password, signup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);