import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'

import * as actions from '../../../Store/index';
import UpdateMyRecipe from './UpdateMyRecipe';
import './MyRecipes.css';

class MyRecipes extends Component {
    constructor(){
        super()
        this.state = {
            recipeDetails: [],
            recipeImages: [],
            recipesRecieved: false
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
                recipeImages: fetchedImages,
                recipesRecieved: true
            }
        };
    }

    render() {
        return (
            <div className="my-recipes-layout">
                <div className="row">
                    {
                        this.props.myRecpData ?
                            this.state.recipeDetails ?
                                (this.state.recipeDetails.map(recp => (
                                    <UpdateMyRecipe 
                                        key={recp.id} 
                                        name={recp.recipeName} 
                                        desc={recp.description} 
                                        ing={recp.ingredients} 
                                        ins={recp.instructions} 
                                        recpImg={this.state.recipeImages}
                                    />
                                )))
                                :
                                null
                        :
                        <div className="row">
                            <div className="col-md-5 skull-layout p-2 m-3">
                                <h5><Skeleton width={100} height={50}/></h5>
                                <h5><Skeleton width={100} height={50}/></h5>
                                <h5><Skeleton width={100} height={50}/></h5>
                            </div>
                        </div>
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
