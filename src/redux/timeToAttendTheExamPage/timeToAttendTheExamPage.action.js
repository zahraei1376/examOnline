import TimeLoginToPageTypes from './timeToAttendTheExamPage.types';

export const SetTimeToAttendTheExamPage = (time)=>({
    type:TimeLoginToPageTypes.TIMETOATTENDTHEEXAMPAGE,
    payload:time,
});

export const ClearTimeToAttendTheExamPage = (id)=>({
    type:TimeLoginToPageTypes.CLEARTIMETOATTENDTHEEXAMPAGE,
    payload:id,
});

export const ClearTimeToAttendTheExamPageWithTimeOut = ()=>({
    type:TimeLoginToPageTypes.CLEARTIMETOATTENDTHEEXAMPAGEWITHTIMEOUT,
});