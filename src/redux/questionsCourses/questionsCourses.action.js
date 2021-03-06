import QuestionCourseTypes from './questionsCourses.types';

export const setCourseName = ( courseName ) =>({
    type:QuestionCourseTypes.SET_QUESTIONS_COURSENAME,
    payload:courseName,
});

export const setNameOfCourse = ( courseName ) =>({
    type:QuestionCourseTypes.SET_QUESTIONS_NAME_OF_COURSE,
    payload:courseName,
});

export const setExamParentId = (id) => ({
    type:QuestionCourseTypes.SET_EXAM_PARENT_ID,
    payload:id,
});