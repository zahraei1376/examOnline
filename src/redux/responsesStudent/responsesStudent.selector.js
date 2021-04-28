import { createSelector} from 'reselect';

const getResponse = state =>state.SaveResponseStudent;

export const getResponseStudentArray = createSelector(
    [getResponse],
    (SaveResponseStudent) => SaveResponseStudent.responseStudent,
);

export const getResponseStudentWithIndex = (questionId) =>{
    console.log('questionId' ,questionId);
    return(
    createSelector(
        [getResponseStudentArray],
        (responseStudent) => 
        {
            var existID =  responseStudent.find(item => item.id === questionId);
            console.log('existID' ,existID);
            if(existID) {
                for (let index = 0; index < responseStudent.length; index++) {
                    if(responseStudent[index].id === questionId){
                        return responseStudent[index].res;
                    }
                    // else{
                    //     return null;
                    // }                 
                }

                return null;
                // console.log('existIDIf' ,existID);
                // responseStudent.map(item => item.id === questionId ? item.res : null );
            }else{
                return null;
            }
            
        }
    )
)}

// export const totalScore = (studentId) =>(
//     createSelector(
//         [getStudent],
//         arraysStudentsScores => 
//         {
//             const ArrStudents = arraysStudentsScores.students;
//             ///////////////////
//             for (let index = 0; index < ArrStudents.length; index++) {
//                 if(ArrStudents[index].studentId === studentId) {
//                     var total = 0 ;
//                     ArrStudents[index].scores.map(score =>{
//                         total += parseFloat(score);
//                     })
//                     console.log('total',total);
//                     return total;
//                 }
//             }
//         }
//     )
// );