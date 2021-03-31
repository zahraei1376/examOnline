import { combineReducers } from 'redux';
import ToggleReducer from './toggleQuesion/toggleQuestion.reducer';
import QuestionIndexReducer from './questionIndex/questionIndex.reducer';

export const RootReducer =combineReducers({
    toggle:ToggleReducer,
    questionIndex:QuestionIndexReducer,
});