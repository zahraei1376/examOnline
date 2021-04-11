import ScoresStudents from './scoresStudents.types';
import {AddStudentUtil,
    IncreaseScoreUtil,DecreseScoreUtil
} from './scoresStudents.utils';

const INITIALATATE = {
    students:[],
    studentId:'',
}


const ScoreReducer = (state = INITIALATATE , action) =>{
    switch (action.type) {
        case ScoresStudents.INCREASE_STUDENT:
            return{
                ...state,
                students:AddStudentUtil(action.payload , state.students),
                // students:action.payload.map(student => AddStudentUtil(student , state.students))
            }

        case ScoresStudents.INCREASE_SCORE:
            return{
                // 'index':number, 'score':score , studentId: '1'
                ...state,
                students:IncreaseScoreUtil(action.payload ,state.students),
            }

        case ScoresStudents.SET_STUDENTID:
            console.log('action.payload',action.payload);
            return{
                // 'index':number, 'score':score , studentId: '1'
                ...state,
                studentId:action.payload,
            }

        case ScoresStudents.DECREASE_SCORE:
            return{
                ...state,
                students:[]
            }

        default:
            return state;
    }
};

export default ScoreReducer;