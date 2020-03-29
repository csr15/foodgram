import axios from '../../HOC/Axios/axios';
import Firebase from '../../Components/Fire/base';
import* as actionTypes from '../ActionTypes';

export const uploadDatabase = (localId, totalPersons, name, desc, ingredients, instructions, img) => {
    return dispatch => {
        const recpieDatas = {
            totalPersons: totalPersons,
            recipeName: {recipeName: name},
            description: {recipeDesc: desc},
            ingredients: ingredients,
            instructions: instructions
        };

        console.log(' I am executing..!');
        if(img){
            Firebase.storage().ref(`RecipeImage/${localId}/${name}`).put(img)
            .then(snap => {
                console.log(snap, "UPLOADED SUCCCESSFULLY");
            })
            .catch(err => console.log(err));
        }

        axios.post(`https://foodgram-15.firebaseio.com/Recipes/${localId}.json`, recpieDatas)
        .then((response) => dispatch(onUploadedSuccessfully));
    }
}

export const onUploadedSuccessfully = () => {
    return dispatch => [
        dispatch(actionTypes.UPLOADED_SUCCESSFULLY)
    ]
}