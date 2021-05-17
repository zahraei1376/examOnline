import TimeLoginToPageTypes from './timeToAttendTheExamPage.types';

const INITIALSTATE = {
    timeToAttendTheExamPage: '00:00:00',
}

const TimeLoginReducer = (state = INITIALSTATE ,action)=>{
    switch (action.type) {
        case TimeLoginToPageTypes.TIMETOATTENDTHEEXAMPAGE:
            return {
                ...state,
                timeToAttendTheExamPage:action.payload,
            }
            
        default:
            return state;
            // break;
    }
};

export default TimeLoginReducer;