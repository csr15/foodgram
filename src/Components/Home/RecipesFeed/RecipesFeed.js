import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'

import '../Home.css'
import Firebase from '../../Fire/base';

class RecipesFeed extends React.Component {
    is_Mounted = false;

    constructor(props){
        super(props);
        this.is_Mounted = true;
        this.state = {
            data: [],
            didImgRecieved: false,
        }
    };

    componentDidMount(){
        const strgRef = Firebase.database().ref(`Recipes/${this.props.localId}`);
        strgRef.on("value", (data) => {
            return data.exists() ? 
            this.setState({ didRecipesUploaded: true }) 
            : ({ didRecipesUploaded: false })
        })
        this.props.updater();
        this.is_Mounted = true;
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.didImgRecieved=== false && this.props.updateValue >= 1 && this.is_Mounted){
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

    componentWillUnmount(){
        this.is_Mounted = false;
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
                            <div className="container">    
                                <div className="row">
                                    <div className="col-md-12 skull-layout p-2 m-3">
                                        <h5><Skeleton width={100} height={50}/></h5>
                                        <h5><Skeleton width={100} height={50}/></h5>
                                        <h5><Skeleton width={100} height={50}/></h5>
                                        <h5><Skeleton width={100} height={50}/></h5>
                                        <h5><Skeleton width={100} height={50}/></h5>
                                        <h5><Skeleton width={100} height={50}/></h5>
                                    </div>
                                </div>
                            </div>
                        }
                        <Link to="/upload-recipes"><button className="btn-home-add-recp">Add More Recipe<i className="fas fa-chevron-right" style={{marginLeft: '3px'}}></i></button></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipesFeed);