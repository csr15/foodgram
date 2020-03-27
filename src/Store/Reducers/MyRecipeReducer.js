import * as actionTypes from '../ActionTypes';

const initialState = {
    myRecpData: '',
    imgData: '',
    updateValue: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type){
       case actionTypes.UPDATE_MY_RECIPE:
            return{
                ...state,
                myRecpData: action.myRecpData
            }
       case actionTypes.FETCH_RECIPE_IMAGES:
            return{
                ...state,
                imgData: action.data
            }
        case "UPDATER":
            return{
                ...state,
                updateValue: state.updateValue + 1
            }

        default: return state;
    }
};

export default reducer;