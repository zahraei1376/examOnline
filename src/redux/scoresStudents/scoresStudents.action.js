import ScoresStudents from './scoresStudents.types';

export const IncreaseStudent = (student)=>({
    type:ScoresStudents.INCREASE_STUDENT,
    action:student,
});

export const IncreaseScore = (score)=>({
    type:ScoresStudents.INCREASE_SCORE,
    action:score,
});

export const DecreaseScore = (score)=>({
    type:ScoresStudents.DECREASE_SCORE,
    action:score,
});