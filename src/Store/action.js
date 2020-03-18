const initialState = {
    recipeUploadStatus: 1,
    recipeName: '',
    recipeDesc: '',
    isIng: '',
    recipeIns: [],
    allIngredients: [],
    fileName: '',
    uploaded: false,
    didUploaded: false,
    test: 'OKKK'
}

const Reducer = (state=initialState, action) => {
    switch(action.type){
        case 'STAGE_ONE':
            return{
                ...state,
                recipeUploadStatus: state.recipeUploadStatus + 1,
                recipeName: action.recipeName,
                recipeDesc: action.recipeDesc
            }
        case 'STAGE_TWO':
            return{
                ...state,
                recipeUploadStatus: state.recipeUploadStatus + 1
            }
        case 'STAGE_THREE':
            return{
                ...state,
                recipeUploadStatus: state.recipeUploadStatus + 1
            }
        case 'STAGE_FOUR':
            return{
                ...state,
                recipeUploadStatus: state.recipeUploadStatus + 1
            }
        case 'UPDATE_INGREDIENTS_STATE':
            return{
                ...state,
                isIng: {
                    ...state.isIng,
                    ...action.ingredientDetail
                },
            }
        case 'ALL_ING':
            return{
                ...state,
                recipeUploadStatus: state.recipeUploadStatus + 1
            }
        case 'FILE_NAME':
            let fileNameValue = null;
            Object.keys(action.fileName).map(el => {
                return fileNameValue = action.fileName[el];
            })
            return{
                ...state,
                fileName: fileNameValue
            }
        case 'ON_UPLOADED_SUCCESSFULLY':
            return{
                ...state,
                uploaded: state.uploaded,
                recipeUploadStatus: 1,
                recipeName: '',
                recipeDesc: '',
                isIng: '',
                recipeIns: [],
                allIngredients: [],
            }
        case 'DID_RECIPES_UPLOADED':
            return{
                ...state,
                didUploaded: true
            }
        case 'VALUE':
            return{
                ...state,
                test: state.test
            }
        default: return state;
    }
}

export default Reducer;