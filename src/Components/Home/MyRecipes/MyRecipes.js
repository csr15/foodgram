import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../../Store/index';
import UpdateMyRecipe from './UpdateMyRecipe';
import './MyRecipes.css';

class MyRecipes extends Component {
    constructor(){
        super()
        this.state = {
            recipeDetails: [],
            recipeImages: []
        }
    }
    
    componentDidMount() {
        this.props.fetchRecipes(this.props.localId);
    };

    static getDerivedStateFromProps(props, state){
        if(state.recipeDetails !== props.myRecpData){
            const fetchedRecipes = [];
            const fetchedImages = [];
            for(let key in props.myRecpData){
                fetchedRecipes.push({
                    ...props.myRecpData[key],
                    id: key
                });
            };
            return { 
                recipeDetails: fetchedRecipes, 
                recipeImages: fetchedImages
            }
        };
    }

    render() {
        return (
            <div className="my-recipes-layout">
                <div className="row">
                    {
                        this.state.recipeDetails ?
                        this.state.recipeDetails.map(recp => (
                            <UpdateMyRecipe 
                                key={recp.id} 
                                name={recp.recipeName} 
                                desc={recp.description} 
                                ing={recp.ingredients} 
                                ins={recp.instructions} 
                                recpImg={this.state.recipeImages}
                            />
                        ))
                        :
                        null
                    }
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 m-5 mx-auto text-center">
                                <Link to="/uploadRecipe"><button className="btn-add-more-recp">Add More Recipes</button></Link> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return{
        localId: state.auth.localId,
        myRecpData: state.myRecp.myRecpData
    }
}
const mapDispatchToProps = dispatch => {
    return{
        fetchRecipes: (localId) => dispatch(actions.fetchRecipes(localId))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(MyRecipes);
