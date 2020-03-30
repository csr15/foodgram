import React, { Component } from 'react'

import { Aux } from '../../../HOC/Auxilary/Auxilary';
import './Search.css';
import startSearchImg from '../Images/search.png';

class SearchRecipe extends Component {
    render() {
        return (
            <Aux>
                <div className="search-layout">    
                    <div className="container-fluid search">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-xs-12 col-lg-12 col-12 text-center search-header">
                                    <h1>Search. Learn. Cook.</h1>
                                </div>
                                <div className="col-md-12 col-xs-12 col-lg-12 col-12 text-center search-form">
                                    <form>
                                        <input type="text" name="searchRecipe" id="searchRecipe"/>
                                        <button type="submit" className="btn btn-search"><i className="fas fa-search"></i>Search</button>
                                    </form>
                                </div>
    
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 start-search-image text-center">
                            <img src={startSearchImg} alt="search recipes.....!" />
                            <h3>Start searching...!</h3>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default SearchRecipe;
