import React from 'react';

import './Home.css';
import RecipesFeed from './RecipesFeed/RecipesFeed';
import { Aux } from '../../HOC/Auxilary/Auxilary';
import { connect } from 'react-redux';

class Home extends React.Component {
    render(){
        return(
            <Aux>
                <RecipesFeed />
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return{ 
        myRecpData: state.myRecp.myRecpData
    };
};

export default connect(mapStateToProps)(Home);