import React, { Component } from 'react'

import { Aux } from '../../../HOC/Auxilary/Auxilary';
import { connect } from 'react-redux';
import Firebase from '../../Fire/base';
import Skeleton from 'react-loading-skeleton'

class UpdateMyRecipe extends Component {

    state = {
        recipeImagesUrl: ''
    }

    componentDidMount(){
            for(let recpName in this.props.name){
                const storageRef = Firebase.storage();
                storageRef.ref(`/RecipeImage/${this.props.localId}/${this.props.name[recpName]}`)
                .getDownloadURL().then(url => this.setState({ recipeImagesUrl: url }))
            };
    }

    render() {
        //Recipe names....
        const recipeName = [];
        for(let recpName in this.props.name){
            recipeName.push(this.props.name[recpName]);
        };
        const recipeTitle = recipeName.map((names, index) => {
            return <h2 key={index}>{names}</h2>
        });

        //Recipe descriptions...
        const recipeDesc = [];
        for(let recpDesc in this.props.desc){
            recipeDesc.push(this.props.desc[recpDesc]);
        };
        const recpieDescriptions = recipeDesc.map((desc, index) => {
            return <p key={index}>{desc}</p>
        });

        //Recipe Ingredinets
        const allRecipeIngredients = [];
        for(let recpIng in this.props.ing){
            allRecipeIngredients.push({
                name: recpIng,
                amount: this.props.ing[recpIng]
            });
        };
        const recipeIngredients = allRecipeIngredients.map((ing, index) => {
            return <button key={index}>{ing.name} <span className="recp-ing-amount">{ing.amount}</span> </button>
        });

        //Recipe Instructions
        const AllrecipeInstructions = [];
        for(let recpIns in this.props.ins){
            AllrecipeInstructions.push(this.props.ins[recpIns]);
        };

        let recipeInstructions = '';
        if(AllrecipeInstructions){
            recipeInstructions = AllrecipeInstructions.map((el, index) => (
                <p key={index}><span className="instr-step">{index + 1}</span>{el}</p>
            ));
        }
        
        return (
            <Aux>
                <div className="my-recipes container">
                    <div className="row">
                        <div className="col-md-4 recp-img mx-auto my-auto text-center">
                            {
                                this.state.recipeImagesUrl ?
                                <img src={this.state.recipeImagesUrl} alt="Recipes Snap" className="img-responsive" />
                                :
                                <Skeleton height={250} width={250}/>
                            }
                        </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6 recp-details">
                                <div className="highlight">
                                    {recipeTitle}
                                    {recpieDescriptions}
                                </div>
                                <div className="recp-ing">
                                    <h4>Ingredients</h4>
                                    <div className="recp-ing-details">
                                        {recipeIngredients}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 recp-instructions">
                                <h4>Instructions</h4>                                <div className="recp-inst-list ">
                                {recipeInstructions}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
        );
    };
};

const mapStateToProps = state => {
    return{
        localId: state.auth.localId,
        myRecpData: state.myRecp.myRecpData
    }
}

export default connect(mapStateToProps)(UpdateMyRecipe);
