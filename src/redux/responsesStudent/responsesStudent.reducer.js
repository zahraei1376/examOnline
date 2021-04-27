import ResponsesStudentTypes from './responsesStudent.types';
import { setQuestionResponseForStudent } from './responsesStudent.utils';

const INITIAL_STATE = {
    responseStudent : [],
};

const ResponseStudentReducer = (state = INITIAL_STATE , action) =>{
    console.log('action',action);
    switch (action.type) {
        case ResponsesStudentTypes.SET_RESPONSE_STUDENT:
            return {
                ...state,
                responseStudent:setQuestionResponseForStudent(action.payload , state.responseStudent),
            }
        default:
            return state;
    }
}
export default ResponseStudentReducer;