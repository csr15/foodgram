import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Aux } from '../../../HOC/Auxilary/Auxilary';
import './RecipeUpload.css';
import * as actionTypes from '../../../Store/index';

class RecipeUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            uploadStatus: 0,
            totalPersons: '',
            morePersons: false,
            didMorePersons: true,
            recipeName: '',
            recipeDescription: '',
            recipeIngredients: '',
            recipeIngredientsAmount: '',
            allRecipeIngredients: [],
            recipeInstruction: '',
            allRecipeInstruction: [],
            image: '',
            recipeImage: '',
            recipeImageName: '',
        }
    }

    totalPersonsHandler = (totalPersons) => {
        if(totalPersons === 1){
            this.setState({ totalPersons: 1, morePersons: false });
        }else if(totalPersons === 2){
            this.setState({ totalPersons: 2, morePersons: false });
        }else if(totalPersons === 3){
            this.setState({ morePersons: true });
        }
    }

    submitTotalPersonsHandler = (e) => {
        e.preventDefault();
        if(!this.state.totalPersons){
            this.setState({ didMorePersons: false });
        }else{
            this.setState({uploadStatus: this.state.uploadStatus + 1, didMorePersons: true });
        }
    }

    recpDetailsHandler = (event) => {
        event.preventDefault();
        this.setState({ uploadStatus: this.state.uploadStatus + 1 })
    }

    addIngredientsHandler = (event) => {
        const keyCode = event.keyCode || event.which;
        if(keyCode === 13){
            event.preventDefault();
            this.setState({ allRecipeIngredients: [...this.state.allRecipeIngredients, {[this.state.recipeIngredients]: this.state.recipeIngredientsAmount}], recipeIngredients: '', recipeIngredientsAmount: '' })
        }
    }

    ingredientsHandler = (event) => {
        event.preventDefault();
        this.setState({ uploadStatus: this.state.uploadStatus + 1 })
    }

    instructionHandler = (event) => {
        const keyCode = event.keyCode || event.which;
        if(keyCode === 13){
            event.preventDefault();
            this.setState({allRecipeInstruction: [...this.state.allRecipeInstruction, this.state.recipeInstruction], recipeInstruction: ''})
        }
    }

    allInstructionHandler = (event) => {
        event.preventDefault();
        this.setState({
            uploadStatus: this.state.uploadStatus + 1
        })
    }

    uploadRecipeImageHandler = (event) => {
        event.preventDefault();
        const fileName = event.target.files[0].name;
        const imgPath = event.target.files[0];
        this.setState({
            image: URL.createObjectURL(imgPath),
            recipeImage: imgPath,
            recipeImageName: fileName
        })
        
    }

    uploadRecipeDetailsHandler = (event) => {
        event.preventDefault();
        this.props.uploadToDatabase(this.props.localId, this.state.totalPersons, this.state.recipeName, this.state.recipeDescription, this.state.allRecipeInstruction, this.state.allRecipeInstruction, this.state.recipeImage);
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    previousHandler = (e) => {
        if(window.confirm()){
            this.setState({ uploadStatus: this.state.uploadStatus - 1 })
        }else{
            e.preventDefault();
        }
    }

    render() {
        //UPLOAD RECIPE: Progress bar
        const uploadProgress = (
            <div className="upload-progress">
                <div className="progress-one" style={this.state.uploadStatus === 0 ? {background: "#2364E6", color: "#fff"} : null}> <i className="fas fa-user"></i> </div>
                <div className="progress-two" style={this.state.uploadStatus === 1 ? {background: "#2364E6", color: "#fff"} : null}> <i className="fas fa-info"></i> </div>
                <div className="progress-three" style={this.state.uploadStatus === 2 ? {background: "#2364E6", color: "#fff"} : null}> <i className="fas fa-cookie-bite"></i> </div>
                <div className="progress-four" style={this.state.uploadStatus === 3 ? {background: "#2364E6", color: "#fff"} : null}> <i className="fas fa-clipboard-list"></i> </div>
                <div className="progress-five" style={this.state.uploadStatus === 4  ? {background: "#2364E6", color: "#fff"} : null}> <i className="fas fa-upload"></i> </div>
            </div>
        );

        //UPLOAD RECIPE: Stage 1
        const totalPersons = (
            <form onSubmit={this.submitTotalPersonsHandler}>
                <h4>For how many <span>Persons ? {this.state.totalPersons}</span></h4>
                <div className="select-persons">
                    <span><i className="fas fa-user" onClick={() => this.totalPersonsHandler(1)}></i></span>
                    <span><i className="fas fa-user-friends" onClick={() => this.totalPersonsHandler(2)}></i></span>
                    <span><i className="fas fa-plus" onClick={() => this.totalPersonsHandler(3)}></i></span>
                </div>
                {this.state.didMorePersons ? <p></p> : <p className="textmuted p-0 m-0" style={{color: "#D8000C"}}>Must Specify</p> }
                {
                    this.state.morePersons ? 
                        <div className="more-persons">
                            <input type="text" 
                            name="totalPersons" 
                            autoComplete="off" 
                            onChange={this.inputHandler}
                            placeholder="Numbers of persons" />
                        </div>
                    :
                    null
                }
                <button type="submit" className="btn btn-upload">Next <i className="fas fa-arrow-right"></i> </button>
            </form>
        );

        //UPLOAD RECIPE: Stage 2
        const recipedDetails = (
            <div className="upload-recipe text-center">
                <form onSubmit={this.recpDetailsHandler}>
                    <h4>What is your <span>Recipe name ?</span></h4>
                    <input type="text" name="recipeName" value={this.state.recipeName} autoComplete="off" placeholder="Recipe Title" onChange={this.inputHandler} />
                    <input type="text" name="recipeDescription" value={this.state.recipeDescription} autoComplete="off" placeholder="Short Description Of Recipe" onChange={this.inputHandler} />
                    <div className="d-flex btn-layout">
                        <button className="btn btn-previous" onClick={this.previousHandler}><i className="fas fa-arrow-left"></i> Previous</button>
                        <button type="submit" className="btn btn-upload">Next <i className="fas fa-arrow-right"></i> </button>
                    </div>
                </form>
            </div> 
        );
        
        //UPLOAD RECIPE: Stage 3
        const recipeIngredients = (
            <form onSubmit={this.ingredientsHandler}>
                <h4>Add your recipes <span>Ingredients</span> and amount</h4>
                <input type="text" name="recipeIngredients" value={this.props.recipeIngredients} autoComplete="off" placeholder="List your Ingredients" onChange={this.inputHandler}/>
                <input type="text" name="recipeIngredientsAmount" value={this.props.recipeIngredientsAmount} autoComplete="off" placeholder="Quantity" onChange={this.inputHandler} onKeyPress={this.addIngredientsHandler}/>
                    <p className="text-muted" style={{fontSize: '12px', display: 'block'}}>Mention Kilogram(kg) & Liter(l), Avoid Mentoning pieces</p>
                {
                    this.state.recipeIngredients ? 
                        <div className="ingredients">
                            <p>{this.state.recipeIngredients}<span className="badge">{this.state.recipeIngredientsAmount}</span></p>
                        </div>
                    :
                    null
                }
                
                {
                    this.state.allRecipeIngredients ? 
                    <div className="ingredients-total">
                        {
                        this.state.allRecipeIngredients.map((recipeData, index) => {
                            return Object.keys(recipeData).map((el, index) => {
                                return <p key={index}>{el}: <span className="badge">{recipeData[el]}</span></p>
                            })
                        })
                        }
                    </div>
                    :
                    null
                }
                <div className="d-flex btn-layout">
                    <button className="btn btn-previous" onClick={this.previousHandler}><i className="fas fa-arrow-left"></i> Previous</button>
                    <button type="submit" className="btn btn-upload">Next <i className="fas fa-arrow-right"></i> </button>
                </div>
            </form>
        );

        //UPLOAD RECIPE: Stage 4
        const recipeInstructions = (
            <form onSubmit={this.allInstructionHandler}>
                <h4>List all <span>Instructions</span>for your recipe</h4>
                <div className="ingredients-total">
                {
                    this.state.allRecipeIngredients.map((recipeData) => {
                        return Object.keys(recipeData).map((el, index) => {
                            return <p key={index}>{el}: <span className="badge">{recipeData[el]}</span></p>
                        });
                    })
                }
                </div>
                <textarea name="recipeInstruction" id="textStyled" placeholder="Add Instructions..!" onChange={this.inputHandler} onKeyPress={this.instructionHandler} value={this.state.recipeInstruction}></textarea>
                <div className="recipe-instruction">
                    {this.state.allRecipeInstruction.map((el, index) => {
                        return <p key={index}> <span className="step-class">Step {index + 1}:</span> &nbsp; {el}</p>
                    })}
                    <p>{this.state.recipeInstruction}</p>
                </div>
                <div className="d-flex btn-layout">
                    <button className="btn btn-previous" onClick={this.previousHandler}><i className="fas fa-arrow-left"></i> Previous</button>
                    <button type="submit" className="btn btn-upload">Next <i className="fas fa-arrow-right"></i> </button>
                </div>
            </form>   
        );

        //UPLOAD RECIPE: Stage 5
        const uploadRecipeDetails = (
            <div className="upload-image">
                <form>
                    <h4>Upload a cooked <span>Recipe Image</span> </h4>
                    <label>
                        Upload Recipe Image
                        <input onChange={this.uploadRecipeImageHandler} type="file" name="imgUpload" id="imgUpload"/>
                    </label>
                </form>
                {this.state.recipeImage || this.state.recipeImageName? 
                <div>
                    <p className="text-muted"><strong>File : </strong>{this.state.recipeImageName}</p> 
                    <img className="preview-image" src={this.state.image} alt="recipe Preview"/>
                    <div className="d-flex btn-layout">
                        <button className="btn btn-previous" onClick={this.previousHandler}><i className="fas fa-arrow-left"></i> Previous</button>
                        <button type="submit" className="btn btn-upload" onClick={this.uploadRecipeDetailsHandler}>Preview <i className="fas fa-arrow-right"></i> </button>
                    </div>
                </div>
                : null
                }                        
            </div>
        );

        //Redirect user to home page after uploaded...! 
        if(this.props.didUploaded){
            return <Redirect to="/home" />
        }
        return (
            <Aux>
                {uploadProgress}
                <div className="container recipe-layout">
                    <div className="upload-recipe text-center">
                        {
                            this.state.uploadStatus === 0 ?
                                //Stage 1
                                totalPersons
                            :
                            null
                        }
                        {
                            this.state.uploadStatus === 1 ?
                                //stage 2
                                recipedDetails
                            :
                            null
                        }
                        {
                            this.state.uploadStatus === 2 ? 
                                //Stage 3
                                recipeIngredients
                            :
                                null
                        }
                        {
                            this.state.uploadStatus === 3 ? 
                                //Stage 3
                                recipeInstructions
                            :
                                null
                        }
                        {
                            this.state.uploadStatus === 4 ? 
                                //Stage 4
                                uploadRecipeDetails
                            :
                                null
                        }
                        {
                            this.state.uploadStatus === 5 ? 
                                //Stage 4
                                uploadRecipeDetails
                            :
                                null
                        }
                    </div>
                </div>
            </Aux>
        );
    };
};

const mapStateToProps = (state) => {
    return{
        localId: state.auth.localId,
        didUploaded: state.upload.didUploaded
    }
}

const mapDispatchtoProps = (dispatch) => {
    return{
        uploadToDatabase: (localId, totalPersons, name, desc, ingredients,  instructions, recpImg) => {
            dispatch(actionTypes.uploadDatabase(localId, totalPersons, name, desc, ingredients, instructions, recpImg))
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(RecipeUpload);
