import QuestionCourseTypes from './questionsCourses.types';

export const setCourseName = ( courseName ) =>({
    type:QuestionCourseTypes.SET_QUESTIONS_COURSENAME,
    payload:courseName,
})