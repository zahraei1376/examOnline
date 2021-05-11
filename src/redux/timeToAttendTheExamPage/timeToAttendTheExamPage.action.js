import TimeLoginToPageTypes from './timeToAttendTheExamPage.types';

export const SetTimeToAttendTheExamPage = (time)=>({
    type:TimeLoginToPageTypes.TIMETOATTENDTHEEXAMPAGE,
    payload:time,
});