import QuestionCourseTypes from './questionsCourses.types';

const INITIAL_STATE = {
    courseName: '',
    examPid : '',
}

const QuestionsCourseNameReducer = (state = INITIAL_STATE , action) =>{
    switch (action.type) {
        case QuestionCourseTypes.SET_QUESTIONS_COURSENAME:
            return {
                ...state,
                courseName:action.payload,
            }
        case QuestionCourseTypes.SET_EXAM_PARENT_ID:
            return {
                ...state,
                examPid:action.payload,
            }
        default:
           return state;
    }
};

export default QuestionsCourseNameReducer;