import { createSelector } from 'reselect';

const selectQIndex = state => state.questionIndex;

export const selectIndex =createSelector(
    [selectQIndex],
    (questionIndex)=>questionIndex.indexQuestion,
);

export const finalIndex =createSelector(
    [selectQIndex],
    (questionIndex)=>questionIndex.questionsLenght,
);