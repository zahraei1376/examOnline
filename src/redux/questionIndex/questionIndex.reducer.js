import QuestionIndexTypes from './questionIndex.types';
import {AddIndexQuestion ,LowOffIndexQuestion} from './questionIndex.utils';

const INITIALSTATE = {
    indexQuestion: 0,
    questionsLenght:0,
    typeIncreaseQuestions : false,
    runningTomeOfTime:false,
}

const QuestionIndexReducer = (state = INITIALSTATE ,action)=>{
    switch (action.type) {
        case QuestionIndexTypes.SET_INDEX:
            return {
                ...state,
                indexQuestion:action.payload,
            }
        case QuestionIndexTypes.SET_TYPE_INCREASE_QUESTIONS:
            return {
                ...state,
                typeIncreaseQuestions:action.payload,
            }
            // break;
        case QuestionIndexTypes.INCREASE_INDEX:
            return {
                ...state,
                indexQuestion:AddIndexQuestion(state.indexQuestion,state.questionsLenght),
                // indexQuestion:state.indexQuestion + 1,
            }
            // break;
        case QuestionIndexTypes.DECREASE_INDEX:
            return {
                ...state,
                indexQuestion:LowOffIndexQuestion(state.indexQuestion),
                // indexQuestion:state.indexQuestion - 1,
            }

        case QuestionIndexTypes.SET_LENGTH:
            return {
                ...state,
                questionsLenght:action.payload,
                // indexQuestion:state.indexQuestion - 1,
            }
            // break;

        case QuestionIndexTypes.RUNNING_OUT_OF_TIME:
            return {
                ...state,
                runningTomeOfTime:action.payload,
            }
            // break;
        default:
            return state;
            // break;
    }
};

export default QuestionIndexReducer;