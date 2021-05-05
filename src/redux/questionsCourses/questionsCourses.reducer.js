import QuestionCourseTypes from './questionsCourses.types';

const INITIAL_STATE = {
    courseName: '',
}

const QuestionsCourseNameReducer = (state = INITIAL_STATE , action) =>{
    switch (action.type) {
        case QuestionCourseTypes.SET_QUESTIONS_COURSENAME:
            return {
                ...state,
                courseName:action.payload,
            }
        default:
           return state;
    }
};

export default QuestionsCourseNameReducer;