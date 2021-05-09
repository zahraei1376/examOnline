import { createSelector } from 'reselect';

const selectCourseName = state => state.QuestionsCourseName;

export const selectedCourseName = createSelector(
    [selectCourseName],
    (QuestionsCourseName) => QuestionsCourseName.courseName,
);

export const selectedExamParentId = createSelector(
    [selectCourseName],
    (QuestionsCourseName) => QuestionsCourseName.examPid,
);