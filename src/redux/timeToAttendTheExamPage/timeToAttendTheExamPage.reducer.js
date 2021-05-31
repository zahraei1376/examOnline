import TimeLoginToPageTypes from './timeToAttendTheExamPage.types';
import {foundTimeToAttend ,foundTimeToAttendWithTimeOut, setTimeToAttend } from './timeToAttendTheExamPage.utils';

const INITIALSTATE = {
    // timeToAttendTheExamPage: '00:00:00',
    timeToAttendTheExamPage: [],
}

const TimeLoginReducer = (state = INITIALSTATE ,action)=>{
    switch (action.type) {
        case TimeLoginToPageTypes.TIMETOATTENDTHEEXAMPAGE:
            return {
                ...state,
                timeToAttendTheExamPage:setTimeToAttend(action.payload.id , state.timeToAttendTheExamPage , action.payload.time),
                // timeToAttendTheExamPage:action.payload,
            }

        case TimeLoginToPageTypes.CLEARTIMETOATTENDTHEEXAMPAGE:{
            // console.log('clearrrrrrrrrrrrrrrrrrrrrrrrrrrrr', action.payload);
            return {
                ...state,
                timeToAttendTheExamPage:foundTimeToAttend(action.payload , state.timeToAttendTheExamPage),
                // timeToAttendTheExamPage:'00:00:00',
            }}

        case TimeLoginToPageTypes.CLEARTIMETOATTENDTHEEXAMPAGEWITHTIMEOUT:{
            // console.log('clearrrrrrrrrrrrrrrrrrrrrrrrrrrrr', action.payload);
            return {
                ...state,
                timeToAttendTheExamPage:foundTimeToAttendWithTimeOut(state.timeToAttendTheExamPage),
                // timeToAttendTheExamPage:'00:00:00',
            }}    

        default:
            return state;
            // break;
    }
};

export default TimeLoginReducer;