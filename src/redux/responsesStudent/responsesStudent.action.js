import ResponsesStudentTypes from './responsesStudent.types';

export const setExamParentIdForResponse = (res) => ({
    type:ResponsesStudentTypes.SET_EXAM_PARENT_ID_FOR_RESPONSR,
    payload:res,
});

export const setRepsonseStudent = (res) => {
    // console.log('res', res);
    return({
    type:ResponsesStudentTypes.SET_RESPONSE_STUDENT,
    payload:res,
})};

export const getRepsonseStudent = (res) => ({
    type:ResponsesStudentTypes.GET_RESPONSE_STUDENT,
    payload:res,
});

export const clearRepsonseStudent = (res) => ({
    type:ResponsesStudentTypes.CLEAR_RESPONSE_STUDENT,
    payload:res,
});

export const clearResponseStudentTimeOut = () => ({
    type:ResponsesStudentTypes.CLEAR_RESPONSE_STUDENT_TIMEOUT,
    // payload:res,
});