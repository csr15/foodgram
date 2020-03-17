import React, { Component } from 'react'
import './MyRecipes.css';
import Firebase from '../../Fire/base';
import { Skeleton } from '@material-ui/lab';
class UpdateRecipe extends Component {
    state = {
        recipeImage: ''
    }
    render(){
        //Recipe Name 
        const recipeName = [];
        for(let recpName in this.props.name){
            recipeName.push(this.props.name[recpName]);
        }
        const updatedRecipName = recipeName.map((names, index) => {
            return <span key={index}>{names}</span>
        })

        recipeName.map((names, index) => {
            const userId = Firebase.auth().currentUser.uid;
            const storageRef = Firebase.storage();
            const imageValue = storageRef.ref(`RecipeImage/${userId}/${names}`);
            imageValue.getDownloadURL().then((url) => {
                this.setState({recipeImage: url})
            })
        })

        //Recipe Description
        const respieDesc = [];
        for(let recpDesc in this.props.desc){
            respieDesc.push(this.props.desc[recpDesc]);
        }
        const updatedRecipeDescription = respieDesc.map(g => (
            <span>{g}</span>
        ))
        
        //Recipe Ingredients
        const recipeIng = [];
        for(let recpIng in this.props.ing){
            recipeIng.push({
                name: recpIng,
                amount: this.props.ing[recpIng]
            });
        }
        const outputRecpIng = recipeIng.map(ing => {
            return <button>{ing.name} <span key={ing.name} className="recp-ing-amount">{ing.amount}</span> </button>
        })

        //Recipe Instructions
        const recipeInstructions = [];
        for(let recpIns in this.props.ins){
            recipeInstructions.push(this.props.ins[recpIns]);
        }

        const outputRecipeIns = recipeInstructions.map((el, index) => (
            <p key={index}><span className="instr-step">{index + 1}</span>{el}</p>
        ));
        return(
            <div>
                 <div className="my-recipes container">
                    <div className="row">
                    <div className="col-md-4 recp-img mx-auto text-center">
                        {
                            this.state.recipeImage ? 
                            <img src={this.state.recipeImage} alt="Value" className="img-responsive"/>
                            :
                            <Skeleton variant="rect" height={200} width={300} animation="wave" />
                        }
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6 recp-details">
                                <div className="highlight">
                                    <h2>{updatedRecipName}</h2>
                                    <p>{updatedRecipeDescription}</p>
                                </div>
                                <div className="recp-ing">
                                    <h4>Ingredients</h4>
                                        <div className="recp-ing-details">
                                        {outputRecpIng}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 recp-instructions">
                                <h4>Instructions</h4>
                                <div className="recp-inst-list ">
                                    {outputRecipeIns}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default UpdateRecipe;
