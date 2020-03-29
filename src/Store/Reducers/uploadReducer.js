const initialState = {
    didUploaded: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "UPLOADED_SUCCESSFULLY":
            return{
                ...state,
                didUploaded: true
            }
        default: return state
    }
};

export default reducer;