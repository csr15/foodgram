import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';

import imgOne from './images/mainImg.jpg';
import './MainLayout.css';
import { Aux } from '../../HOC/Auxilary/Auxilary';

class MainLayout extends Component {
    render() {
        return (
            <Aux>
                <div className="container main-layout">
                    <div className="row">
                        <div className="col-md-6 text-left my-auto">
                            <h1>Food<span className="main-gram-font">Gram</span></h1>
                            <p className="text-muted">Share your food recipe across world, Get likes for tour recipes and do much more things with FoodGram</p>
                            <Link to="/signup"><button className="btn btn-main-layout">Share Your Recipe</button></Link>
                        </div>
                        <div className="col-md-6 mx-auto text-center">
                            <img src={imgOne} alt="Main Layout"/>
                        </div>
                    </div>
                </div>
                <footer className="page-footer font-small">
                    <div className="footer-copyright text-center py-3">© 2020 Copyright:
                        <Link to="https://boxdevs.firebaseapp.com/">BOX-Devs</Link>
                    </div>
                </footer>
            </Aux>
        )
    }
}
export default withRouter(MainLayout);
