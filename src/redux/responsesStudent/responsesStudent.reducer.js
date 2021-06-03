import ResponsesStudentTypes from './responsesStudent.types';
import { setQuestionResponseForStudent , clearQuestionsResponseForStudent ,clearQuestionsResponseForStudentWhenTimeOut} from './responsesStudent.utils';

const INITIAL_STATE = {
    responseStudent : [],
    responseExamParentID : '',
};

const ResponseStudentReducer = (state = INITIAL_STATE , action) =>{
    // console.log('action',action);
    switch (action.type) {
        case ResponsesStudentTypes.SET_EXAM_PARENT_ID_FOR_RESPONSR:
            return {
                ...state,
                responseExamParentID:action.payload ,
            }

        case ResponsesStudentTypes.SET_RESPONSE_STUDENT:
            return {
                ...state,
                responseStudent:setQuestionResponseForStudent(action.payload , state.responseStudent),
            }

        case ResponsesStudentTypes.CLEAR_RESPONSE_STUDENT:
            return {
                ...state,
                responseStudent:clearQuestionsResponseForStudent(action.payload , state.responseStudent),
            }

        case ResponsesStudentTypes.CLEAR_RESPONSE_STUDENT_TIMEOUT:
            return {
                ...state,
                responseStudent:clearQuestionsResponseForStudentWhenTimeOut(state.responseStudent),
            }

        default:
            return state;
    }
}
export default ResponseStudentReducer;