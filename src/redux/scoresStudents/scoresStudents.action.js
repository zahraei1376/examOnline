import ScoresStudents from './scoresStudents.types';

export const SetStudentId = (studentId)=>({
    type:ScoresStudents.SET_STUDENTID,
    payload:studentId,
});

export const IncreaseStudent = (students)=>({
    type:ScoresStudents.INCREASE_STUDENT,
    payload:students,
});

export const IncreaseScore = (scoreItems)=>({
    // , 'students':info.students
    type:ScoresStudents.INCREASE_SCORE,
    payload: scoreItems,
});

export const DecreaseScore = (score)=>({
    type:ScoresStudents.DECREASE_SCORE,
    payload:score,
});