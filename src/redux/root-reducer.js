import { combineReducers } from 'redux';
import ToggleReducer from './toggleQuesion/toggleQuestion.reducer';
import QuestionIndexReducer from './questionIndex/questionIndex.reducer';
import ScoreReducer from './scoresStudents/scoresStudents.reducer';
import ResponseStudentReducer from './responsesStudent/responsesStudent.reducer';
import QuestionsCourseNameReducer from './questionsCourses/questionsCourses.reducer';
import TimeLoginReducer from './timeToAttendTheExamPage/timeToAttendTheExamPage.reducer';
///////////////////////////////////////////////////////////////////////////////////////////
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// import storageSession from 'redux-persist/lib/storage/session';


const ConfigPersist = {
    key:'root',
    storage: storage,
    whiteList:['QuestionsCourseName','TimeLoginReducer']
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
    TimeLoginReducer : TimeLoginReducer,
});

export default persistReducer(ConfigPersist,RootReducer);