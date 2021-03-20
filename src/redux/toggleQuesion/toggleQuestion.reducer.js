import ToggleQuestionTypes from './toggleQuestion.types';

const INITIAL_STATE = {
    toggle:false,
}

const ToggleReducer = (state = INITIAL_STATE , action) =>{
    switch (action.type) {
        case ToggleQuestionTypes.SET_TOGGLE:
            return{
                ...state,
                toggle: !state.toggle,
            }
    
        default:
            return{
                ...state,
            }
    }
};

export default ToggleReducer;