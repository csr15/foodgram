import React, { Component } from 'react'
import Firebase from '../../Fire/base';
import './MyRecipes.css';
import UpdateRecipe from './UpdateMyRecipe';
import axios from '../../../axios-order';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import notFoundImg from '../Images/not-found.gif';

class MyRecipes extends Component {    
    state = {
        name: [],
        desc: [],
        instructions: [],
        ingredients: [],
        recipes: [],
        userImage: '',
        testImage: ''
    }
    componentDidMount() {
        const userId  = Firebase.auth().currentUser.uid;
        axios.get(`Recipes/${userId}.json`)
        .then(res => {
            const fetchedRecipes = [];
            for(let key in res.data){
                fetchedRecipes.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({recipes: fetchedRecipes, show: false});
        })
        .catch(err => console.log(err))
    }
    render() {        
        return (
           <div className="my-recipes-layout">
               <div className="row">
                    {
                        this.props.didUploaded ?
                        <div className="col-md-12 mx-auto my-auto">
                            {
                                this.state.recipes.map(recp => (
                                    <UpdateRecipe key={recp.id} name={recp.recipeName} desc={recp.description} ing={recp.ingredients} ins={recp.instructions} recpImg={this.state.testImage} />
                                ))
                            }
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 m-5 mx-auto text-center">
                                        <Link to="/uploadRecipe"><button className="btn-add-more-recp">Add More Recipes</button></Link> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="col-md-12 text-center not-found">
                            <img src={notFoundImg} alt="Not Found...!!!" className="img-responsive"/>
                            <h3>You did not upload any recipes...!!</h3>
                            <Link to="/uploadRecipe"><button className="btn-add-more-recp">Add Recipes</button></Link> 
                        </div>
                    }
               </div>
           </div>
           
        )
    }
}

const mapDispatchToProps = state => {
    return{
        didUploaded: state.didUploaded
    }
}

export default connect(mapDispatchToProps)(MyRecipes);
