import axios from '../../axios-order';
import * as actionTypes from '../ActionTypes';

export const updateMyRecpState = (myRecpData) => {
    return{
        type: actionTypes.UPDATE_MY_RECIPE,
        myRecpData: myRecpData
    }
}

export const fetchRecipes = (localId) => {
    return dispatch => {
        axios.get(`/Recipes/${localId}.json`)
        .then((response) => {
            dispatch(updateMyRecpState(response.data));
        })
        .catch(error => console.log(error));
    };
};

export const updateFetchedRecipe = (url) => {
    return {
        type: actionTypes.FETCH_RECIPE_IMAGES,
        data: url
    }
}

//----------------Depricated---------
//--------------Soon will be modified------------

// export const fetchImage = () => {
//     return (dispatch, getState) => {
//         const fetchedRecpData = [];
//         const fetchedRecpImg = [];
//         for(let key in getState().myRecp.myRecpData){
//             fetchedRecpData.push(getState().myRecp.myRecpData[key].recipeName);
//         }
//         fetchedRecpData.map(el => {
//             const userId = localStorage.getItem('userId')
//             const strgRef = Firebase.storage();
//             const imgRef = strgRef.ref(`RecipeImage/${userId}/${el.recipeName}`);
//             imgRef.getDownloadURL()
//             .then((url) => {
//                 fetchedRecpImg.push({
//                     [el.recipeName]: url
//                 });
//             });
//             return dispatch(updateFetchedRecipe(fetchedRecpImg));
//         })
//     }
// }