import QuestionIndexTypes from './questionIndex.types';

export const setLengthQuestions = (len)=>({
    type:QuestionIndexTypes.SET_LENGTH,
    payload:len,
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