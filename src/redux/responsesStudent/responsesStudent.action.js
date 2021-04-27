import ResponsesStudentTypes from './responsesStudent.types';

export const setRepsonseStudent = (res) => {
    console.log('res', res);
    return({
    type:ResponsesStudentTypes.SET_RESPONSE_STUDENT,
    payload:res,
})};

export const getRepsonseStudent = (res) => ({
    type:ResponsesStudentTypes.GET_RESPONSE_STUDENT,
    payload:res,
});