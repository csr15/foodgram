import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Home.css'
import Firebase from '../Fire/base';

class Home extends React.Component {

    state = {
        data: [],
        didImgRecieved: false
    }

    componentDidMount(){
        this.props.updater();
    }

    componentDidUpdate(prevProps, prevState){
        console.log(prevState);
        if(this.state.didImgRecieved=== false && prevProps.updateValue >= 1){
            const fetchedRecpData = [];
            const fetchedRecpImg = [];
            for(let key in this.props.myRecpData){
                fetchedRecpData.push(this.props.myRecpData[key].recipeName);
            }
            fetchedRecpData.map(el => {
                const strgRef = Firebase.storage();
                const imgRef = strgRef.ref(`RecipeImage/${this.props.localId}/${el.recipeName}`);
                return imgRef.getDownloadURL()
                .then((url) => {
                    fetchedRecpImg.push({
                        [el.recipeName]: url
                    });
                    this.setState({data: fetchedRecpImg, didImgRecieved: true});
                });
            });
        }
    }

    render(){
        return(
            <div className="container home-layout">
                <div className="header-user">
                    <div className="row">
                        <div className="col-md-3 user-details">
                            <h2>{this.props.userName}</h2>
                            <p className="text-muted">Recipes Uploaded: <span className="total-recipes">{this.state.data.length}</span> </p>
                        </div>
                        <div className="col-md-9 list-short-recipes my-auto">
                        {
                            this.state.didImgRecieved ? 
                                this.state.data.map((el, index) => {
                                    return Object.keys(el).map(innerEl => (
                                        <span className="recp-img-list"  key={index}>
                                            <Link to="/my-recipes"><p className="my-auto"><span><img src={el[innerEl]} alt="Recipes..!" className="img-responsive my-auto"/>{innerEl}</span></p></Link>
                                        </span> 
                                    ))
                                })
                            : 
                            null
                        }
                        <Link to="/uploadRecipe"><button className="btn-home-add-recp">Add More Recipe<i className="fas fa-chevron-right" style={{marginLeft: '3px'}}></i></button></Link>
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
        userName: state.auth.userName,  
        myRecpData: state.myRecp.myRecpData,
        updateValue: state.myRecp.updateValue
    };
};

const mapDispatchToProps = dispatch => {
    return{
        updater: () => dispatch({type: "UPDATER"})
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home);