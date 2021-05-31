import QuestionIndexTypes from './questionIndex.types';
import {AddIndexQuestion ,LowOffIndexQuestion,foundExamIDForDisable,clearDataForDisable} from './questionIndex.utils';

const INITIALSTATE = {
    indexQuestion: 0,
    questionsLenght:0,
    typeIncreaseQuestions : false,
    runningTomeOfTime:[],
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
                runningTomeOfTime:foundExamIDForDisable(action.payload.id,state.runningTomeOfTime,action.payload.val),
            }
            // break;

        case QuestionIndexTypes.CLEAR_RUNNING_OUT_OF_TIME:
            return {
                ...state,
                runningTomeOfTime:clearDataForDisable(action.payload.id,state.runningTomeOfTime),
            }

        // case QuestionIndexTypes.GET_RUNNING_OUT_OF_TIME:
        //     return {
        //         ...state,
        //         runningTomeOfTime:clearDataForDisable(action.payload.id,state.runningTomeOfTime),
        //     }
                // break;
        default:
            return state;
            // break;
    }
};

export default QuestionIndexReducer;