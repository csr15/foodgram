import * as actionTypes from '../ActionTypes';

const initialState = {
    token: null,
    localId: null,
    error: null,
    loading: false,
    userName: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.AUTH_START: 
            return {
                ...state, 
                error: null, 
                loading: true
            };

        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token: action.idToken,
                localId: action.localId,
                userName: action.userName,
                error: null,
                loading: false
            };   

        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            };
        
        case actionTypes.AUTH_LOGOUT:
            return{
                token: null,
                userId: null
            }

        default: return state
    }
}

export default reducer;