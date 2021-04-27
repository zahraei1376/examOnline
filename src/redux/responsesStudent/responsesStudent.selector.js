import { createSelector} from 'reselect';

const getResponse = state =>state.SaveResponseStudent;

export const getResponseSudentArray = createSelector(
    [getResponse],
    (SaveResponseStudent) => SaveResponseStudent.responseStudent,
);