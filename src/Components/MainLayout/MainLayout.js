import React, { Component } from 'react'
import imgOne from './images/share-food.jpg';
import './MainLayout.css';
import { Link, withRouter } from 'react-router-dom';

class MainLayout extends Component {
    render() {
        return (
            <div>
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
                <div className="footer-copyright text-center p-3 bg-light">© 2020 Copyright:
                    <a href="https://boxdevs.firebaseapp.com/"> Boxdevs </a>
                </div>
            </div>
        )
    }
}
export default withRouter(MainLayout);
