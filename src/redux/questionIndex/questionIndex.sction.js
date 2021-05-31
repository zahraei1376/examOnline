import QuestionIndexTypes from './questionIndex.types';

export const setLengthQuestions = (len)=>({
    type:QuestionIndexTypes.SET_LENGTH,
    payload:len,
});

export const setTypeIncreaseQuestions = (type)=>({
    type:QuestionIndexTypes.SET_TYPE_INCREASE_QUESTIONS,
    payload:type,
});

export const runningTimeOfTimeForSolveQuestions = (val)=>({
    type:QuestionIndexTypes.RUNNING_OUT_OF_TIME,
    payload:val,
});

export const getRunningTimeOfTimeForSolveQuestions = (val)=>({
    type:QuestionIndexTypes.GET_RUNNING_OUT_OF_TIME,
    payload:val,
});

export const clearRunningTimeOfTimeForSolveQuestions =(id)=>({
    type:QuestionIndexTypes.CLEAR_RUNNING_OUT_OF_TIME,
    payload:id,
})

export const setIndex = (index)=>({
    type:QuestionIndexTypes.SET_INDEX,
    payload:index,
});

export const IncreaseIndex = ()=>({
    type:QuestionIndexTypes.INCREASE_INDEX,
    // payload:index,
});

export const DecreaseIndex = ()=>({
    type:QuestionIndexTypes.DECREASE_INDEX,
    // payload:index,
});

export const SetTimeToAttendTheExamPage = (time)=>({
    type:QuestionIndexTypes.TIMETOATTENDTHEEXAMPAGE,
    payload:time,
});