import { createSelector } from 'reselect';

const selectTimeLogin = state => state.TimeLoginReducer;

export const getTimeToAttendTheExamPage =createSelector(
    [selectTimeLogin],
    (TimeLoginReducer)=>TimeLoginReducer.timeToAttendTheExamPage,
);