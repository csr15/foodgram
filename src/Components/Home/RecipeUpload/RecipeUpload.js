import React, { Component } from 'react'
import { connect } from 'react-redux';
import './RecipeUpload.css';
import rightArrow from '../../MainLayout/images/right-arrow.svg'
import { withRouter } from 'react-router';
import uploadImg from './images/cloud.svg';
import Firebase from '../../Fire/base.js';
import axios from '../../../axios-order';

class RecipeUpload extends Component {
    state = {
        recipeName: '',
        recipeShortDesc: '',
        recipIngredients: '',
        recipIngredientsAmount: '',
        instructionCount: 0,
        recipeInstruction: '',
        allInstruction: [],
        uploadStatus: 0,
        fileName: '',
        file: '',
        name: [],
        isAllow: false,
        isShow: true,
        imgFile: ''
    }
    handleStageOne = (e) => {
        e.preventDefault();
        this.props.onStageOneHandler(this.state.recipeName, this.state.recipeShortDesc);
    }
    handleStageTwo = (e) => {
        e.preventDefault();
        const confirmSubmission = window.confirm('Is every ingredients added ?');
        if(confirmSubmission){
            this.props.onStageTwoHandler();
        }
    }
    handleStageThree = (e) => {
        e.preventDefault();
        this.props.onStageThreeHandler();
    }
    handleStageFour = (event) => {
        const fileName = event.target.files[0].name;
        const imgFile = event.target.files[0];
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            fileName: fileName,
            imgFile: imgFile
        });
        this.props.uploadFileName(fileName);
    }
    inputHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    addIngredientsHandler = (e) => {
        const keyValue = e.which || e.keyCode;
        if(keyValue === 13){
            e.preventDefault();
            this.props.updateIngredientsHandler(this.state.recipIngredients, this.state.recipIngredientsAmount);  
            this.setState({ recipIngredients: '',recipIngredientsAmount: '' });
        }
    }
    instructionHandler = (e) => {
        const keyValue = e.which || e.keyCode;
        if(keyValue === 13){
            e.preventDefault();
            this.setState({allInstruction: [...this.state.allInstruction, this.state.recipeInstruction], recipeInstruction: ''})
        }
    }

    //----------Upload to Firebase database
    uploadToDbHandler = () => {
        const userId = Firebase.auth().currentUser.uid;
        Firebase.storage().ref(`RecipeImage/${userId}/${this.state.recipeName}`).put(this.state.imgFile)
        .then(snap => {
            this.props.finalUpload();
            console.log(snap, "UPLOADED SUCCCESSFULLY");
        })
        .catch(err => console.log(err));
        const data = {
            recipeName: this.props.recipeName,
            description: this.props.recipeDesc,
            ingredients: this.props.isIng,
            instructions: this.state.allInstruction
        }
        axios.post(`/Recipes/${userId}.json`, data)
        .then(res => {
            this.props.history.push('/home');
            this.props.finalUpload();
        })
        .catch(err => console.log(err))
        this.setState({isAllow: true})
    }
    render() {
        console.log(this.props.uploadStatus);
        let progressbarWidth = 0;
        if(this.props.uploadStatus === 2){
            progressbarWidth = 25;   
        }else if(this.props.uploadStatus === 3){
            progressbarWidth = 50;
        }else if(this.props.uploadStatus === 4){
            progressbarWidth = 75;
        }
        return (
            <div className="container recipe-layout">
                <h4>Upload A Recipe</h4>
                <div className="progress">
                    <div className="progress-bar" style={{width: `${progressbarWidth}%`}}></div>
                </div>
                {/* -----------FirstStage---------- */}
                <div className="upload-recipe text-center">
                {this.props.uploadStatus === 1 ? 
                    <form onSubmit={this.handleStageOne}>
                        <input type="text" name="recipeName" id="name" autoComplete="off" placeholder="Recipe Title" onChange={this.inputHandler} />
                        <input type="text" name="recipeShortDesc" id="desc" autoComplete="off" placeholder="Short Description Of Recipe" onChange={this.inputHandler} />
                        <button type="submit" className="btn btn-upload">Next <img src={rightArrow} alt="Right Arrow"/></button>
                    </form>
                    :
                    null
                }
                {this.props.uploadStatus === 2 ? 
                    <form onSubmit={this.handleStageTwo}>
                        <input type="text" name="recipIngredients" id="name" value={this.props.recipIngredients} autoComplete="off" placeholder="List your Ingredients" onChange={this.inputHandler}/>
                        <input type="text" name="recipIngredientsAmount" id="recipIngredientsAmount" value={this.props.recipIngredientsAmount} autoComplete="off" placeholder="Quantity" onChange={this.inputHandler} onKeyPress={this.addIngredientsHandler}/>
                        <p className="text-muted" style={{fontSize: '12px', display: 'block'}}>Mention Kilogram(kg) & Liter(l), Avoid Mentoning pieces</p>
                        <div className="ingredients">
                        <p>{this.state.recipIngredients}<span className="badge">{this.state.recipIngredientsAmount}</span></p>
                        </div>
                        <div className="ingredients-total">
                            {Object.keys(this.props.isIng).map((el, index) => {
                                return <p key={index}>{el}: <span className="badge">{this.props.isIng[el]}</span> </p>
                            })}
                        </div>
                        <button type="submit" className="btn btn-upload">Next <img src={rightArrow} alt="Right Arrow"/></button>
                    </form>
                    :
                    null
                }
                {this.props.uploadStatus === 3 ? 
                    <form onSubmit={this.handleStageThree}>
                        <div className="ingredients-total">
                            {Object.keys(this.props.isIng).map((el, index) => {
                                return <p key={index}>{el}: <span className="badge">{this.props.isIng[el]}</span> </p>
                            })}
                        </div>
                        <textarea name="recipeInstruction" id="textStyled" placeholder="Add Instructions..!" onChange={this.inputHandler} onKeyPress={this.instructionHandler} value={this.state.recipeInstruction}></textarea>
                        <div className="recipe-instruction">
                            {this.state.allInstruction.map((el, index) => {
                                return <p key={index}> <span className="step-class">Step {index + 1}:</span> &nbsp; {el}</p>
                            })}
                            <p>{this.state.recipeInstruction}</p>
                        </div>
                        <button type="submit" className="btn btn-upload">Next <img src={rightArrow} alt="Upload to cloud"/></button>
                    </form>
                    :
                    null
                }
                {
                    this.props.uploadStatus === 4 ? 
                    <div className="upload-image">
                        <form>
                            <label>
                                Upload Recipe Image
                                <input onChange={this.handleStageFour} type="file" name="imgUpload" id="imgUpload"/>
                            </label>
                        </form>
                        {this.state.file || this.state.fileName? 
                        <div>
                            <p className="text-muted"><strong>File : </strong>{this.state.fileName}</p> 
                            <img className="preview-image" src={this.state.file} alt="preview of recipes"/>
                            {
                                this.state.name.map((el, index) => {
                                    return(
                                        <p key={index}>{el}</p>
                                    )
                                })
                            }
                            { this.state.allow ? console.log(`name: ${this.props.recipeName}, desc: ${this.props.recipeDesc}, isIng: ${this.props.isIng}, recipeIns: ${this.props.recipeIns}, allRecipeIng: ${this.props.allRecipeIng}`) : null }
                            <button className="btn btn-upload-to-database" onClick={this.uploadToDbHandler}>upload <img src={uploadImg} alt="Upload to database" style={{marginTop: '-5px', marginLeft: '10px'}} /></button>
                        </div>
                        : null
                        }                        
                    </div>
                    :
                    null
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uploadStatus: state.recipeUploadStatus,
        recipeName: state.recipeName,
        recipeDesc: state.recipeDesc,
        isIng: state.isIng,
        recipeIns: state.recipeIns,
        allIng: state.allIngredient
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onStageOneHandler: (recipeName, recipeDesc) => dispatch({type: 'STAGE_ONE', recipeName: {recipeName}, recipeDesc: {recipeDesc}}),
        onStageTwoHandler: () => dispatch({type: 'STAGE_TWO'}),
        onStageThreeHandler: () => dispatch({type: 'ALL_ING'}),
        updateIngredientsHandler: (ingredientName, ingredientAmount) => dispatch({type: 'UPDATE_INGREDIENTS_STATE', ingredientDetail: {[ingredientName]: ingredientAmount}}),
        uploadFileName: (fileName) => dispatch({type: 'FILE_NAME', fileName: {fileName}}),
        finalUpload: () => dispatch({type: 'ON_UPLOADED_SUCCESSFULLY'})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecipeUpload));
