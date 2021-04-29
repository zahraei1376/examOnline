import QuestionIndexTypes from './questionIndex.types';

export const setLengthQuestions = (len)=>({
    type:QuestionIndexTypes.SET_LENGTH,
    payload:len,
});

export const setTypeIncreaseQuestions = (type)=>({
    type:QuestionIndexTypes.SET_TYPE_INCREASE_QUESTIONS,
    payload:type,
});

export const runningTimeOfTimeForSolveQuestions = (type)=>({
    type:QuestionIndexTypes.RUNNING_OUT_OF_TIME,
    payload:type,
});

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