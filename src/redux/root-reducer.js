import { combineReducers } from 'redux';
import ToggleReducer from './toggleQuesion/toggleQuestion.reducer';
import QuestionIndexReducer from './questionIndex/questionIndex.reducer';
import ScoreReducer from './scoresStudents/scoresStudents.reducer';
import ResponseStudentReducer from './responsesStudent/responsesStudent.reducer';
import QuestionsCourseNameReducer from './questionsCourses/questionsCourses.reducer';
///////////////////////////////////////////////////////////////////////////////////////////
import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session';


const ConfigPersist = {
    key:'root',
    storage: storageSession,
    whiteList:['QuestionsCourseName']
}

// export const RootReducer =combineReducers({
//     toggle:ToggleReducer,
//     questionIndex:QuestionIndexReducer,
//     arraysStudentsScores : ScoreReducer,
//     SaveResponseStudent : ResponseStudentReducer,
//     QuestionsCourseName : QuestionsCourseNameReducer,
// });

const RootReducer = combineReducers({
    toggle:ToggleReducer,
    questionIndex:QuestionIndexReducer,
    arraysStudentsScores : ScoreReducer,
    SaveResponseStudent : ResponseStudentReducer,
    QuestionsCourseName : QuestionsCourseNameReducer,
});

export default persistReducer(ConfigPersist,RootReducer);