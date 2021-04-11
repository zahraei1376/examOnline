import { combineReducers } from 'redux';
import ToggleReducer from './toggleQuesion/toggleQuestion.reducer';
import QuestionIndexReducer from './questionIndex/questionIndex.reducer';
import ScoreReducer from './scoresStudents/scoresStudents.reducer';

export const RootReducer =combineReducers({
    toggle:ToggleReducer,
    questionIndex:QuestionIndexReducer,
    arraysStudentsScores : ScoreReducer,
});