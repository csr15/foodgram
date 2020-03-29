import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'

import * as actions from '../../../Store/index';
import UpdateMyRecipe from './UpdateMyRecipe';
import './MyRecipes.css';

class MyRecipes extends Component {
    is_mounted = false;
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
        this.is_mounted = true;
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

    componentWillUnmount(){
        this.is_mounted = false;
    }

    render() {
        let skeletonLayout = (
            <div className="container skull-layout text-center">
                <div className="row">
                    <div className="col-md-4 my-auto">
                        <Skeleton height={200} width={200} /> 
                    </div>
                    <div className="col-md-8">
                        <Skeleton count={8}/>
                    </div>
                </div>
            </div>
        );
        console.log(this.is_mounted);
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
                                        isMounted={this.is_mounted}
                                        recpImg={this.state.recipeImages}
                                    />
                                )))
                                :
                                null
                        :
                        <div className="container skull-layout text-center">
                            {skeletonLayout}
                            {skeletonLayout}
                            {skeletonLayout}
                        </div>
                    }
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 m-5 mx-auto text-center">
                                <Link to="/upload-recipes"><button className="btn-add-more-recp">Add More Recipes</button></Link> 
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
