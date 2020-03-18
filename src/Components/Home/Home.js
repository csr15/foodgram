import React, { Component } from 'react'
import Firebase from '../Fire/base';
import { connect } from 'react-redux'   
import './Home.css';
import { Link } from 'react-router-dom';
import notFoundImg from './Images/not-found.gif';
// import { Skeleton } from '@material-ui/lab';

class Home extends Component {
    state = {
        userName: 'Prasanna MRG',
        recipeNames: [],
        namesRecieved: true,
        recipeImage: [],
    }
    componentDidMount() {
        const user = Firebase.auth().currentUser;

        //Checking whether the user uploaded recipes or not
        const dbRef = Firebase.database().ref(`Recipes`);
        const storageRef = Firebase.storage();
        let allRecpNames = [];
        let imgValues = [];
        dbRef.orderByKey().equalTo(user.uid).on("value", (snap) => {
            snap.forEach(childSnap => {
                childSnap.forEach(innerChildSnap => {
                    Object.keys(innerChildSnap.val().recipeName).map(el => {
                        let names = innerChildSnap.val().recipeName[el];
                        let childStorageRef = storageRef.ref(`RecipeImage/${user.uid}/${names}`);
                        childStorageRef.getDownloadURL().then(url => {
                            imgValues.push({
                                [names]: url
                            })
                            this.setState({recipeImage: imgValues})
                        })
                        allRecpNames.push(names);
                        this.setState({namesRecieved: false})
                    })
                })
            })
        });

        this.setState({recipeNames: allRecpNames});

        const childRef = Firebase.database().ref(`Recipes/${user.uid}`);
        childRef.on('value', (snap) => {
            if(snap.exists()){
                this.props.didRecipesUploaded();
            }else{
                this.setState({namesRecieved: false})
            }
        })
        
        //Displaying users profile
        if(user){
            this.setState({
                userName: user.displayName,
            })
        }   
    }
    render(){
        return(
            <div className="container home-layout">
                <div className="header-user">
                    {
                        this.props.didUploaded ? 
                        <div className="row">
                            <div className="col-md-3 user-details">
                                <h3>{this.state.userName}</h3>
                                <p>Recipes Uploaded: <span className="total-recipes">{this.state.recipeNames.length}</span> </p>
                            </div>
                            <div className="col-md-9 list-short-recipes my-auto">
                                        {this.state.recipeImage.map(x => {
                                            return Object.keys(x).map(y => (
                                                <span className="recp-img-list  ">
                                                    <Link to="/myRecipe"><p className="my-auto"><span><img src={x[y]} alt={y} className="img-responsive my-auto"/>{y}</span></p></Link>
                                                </span> 
                                            ))
                                        })}
                                <Link to="/uploadRecipe"><button className="btn-home-add-recp">Add More Recipe<i className="fas fa-chevron-right" style={{marginLeft: '3px'}}></i></button></Link>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-md-12 text-center not-found">
                                <img src={notFoundImg} alt="Not Found...!!!" className="img-responsive"/>
                                <h3>You did not upload any recipes...!!</h3>
                                <Link to="/uploadRecipe"><button className="btn-add-more-recp">Add Recipes</button></Link> 
                            </div>
                        </div>
                    }         
                </div>
            </div>
        )
    }
}

const mapStateToProps= state => {
    return{
        didUploaded: state.didUploaded
    }
}

const mapDispatchToProps = dispatch => {
    return{
        didRecipesUploaded: () => dispatch({type: 'DID_RECIPES_UPLOADED'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
