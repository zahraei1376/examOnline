import ScoresStudents from './scoresStudents.types';
import {addStudentUtil,IncreaseScoreUtil,DecreseScoreUtil} from './scoresStudents.utils';

const INITIALATATE = {
    students:[],
}


const ScoreReducer = (state = INITIALATATE , action) =>{
    switch (action.type) {
        case ScoresStudents.INCREASE_STUDENT:
            return{
                ...state,
                students:addStudentUtil(state.students,action.payload)
            }

        case ScoresStudents.INCREASE_SCORE:
            return{
                ...state,
                students:[]
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