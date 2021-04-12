import { createSelector} from 'reselect';
import Helpers from './helper';

const getStudent = state => state.arraysStudentsScores;
export const getStudentId = createSelector(
    [getStudent],
    (arraysStudentsScores) => arraysStudentsScores.studentId,
);


export const getStudents = createSelector(
    [getStudent],
    (arraysStudentsScores) => {
        console.log('arraysStudentsScores.students',arraysStudentsScores.students);
        return arraysStudentsScores.students
    },
);

export const totalScore = (studentId) =>(
    createSelector(
        [getStudent],
        arraysStudentsScores => 
        {
            const ArrStudents = arraysStudentsScores.students;
            // console.log('ArrStudents',ArrStudents);
            // console.log('ArrStudents.length',ArrStudents.length);
            console.log('studentId',studentId);
            ///////////////////
            for (let index = 0; index < ArrStudents.length; index++) {
                // console.log('ArrStudents[index]',ArrStudents[index]);
                if(ArrStudents[index].studentId === studentId) {
                    var total = 0 ;
                    ArrStudents[index].scores.map(score =>{
                        total += parseFloat(score);
                    })
                    console.log('total',total);
                    return total;
                }
                // else{
                //     return 0;
                // }
                
            }

            // return ArrStudents.map(student =>{ 
            //     console.log('student',student);
            //     if(student.studentId === '1') {
            //         var total = 0 ; 
            //         student.scores.map(score =>{
            //             total += parseFloat(score);
            //         })
            //         console.log('total',total);
            //         return total;
            //     }
            //     // else{
            //     //     return 0;
            //     // }
            // })
        }
    )
);

// export const TotalScore = (students ,studentId)=>{
//     const existStudent = students.find(student => student.studentId === studentId);

//     if(existStudent){
//         students.map(student =>{ 
//             if(student.studentId === studentId) {
//                 var total = 0 ;
//                 student.scores.map(score =>{
//                     total += parseFloat(score);
//                 })

//                 return total;
//             }
//         })
//     }
//     return 0;
// }


// export const selectCartTotal=createSelector(
//     [selectCartItem],
//     (CartItems)=>CartItems.reduce(
//         (accumalateQuantity,CartItem)=>accumalateQuantity + (CartItem.quantity * CartItem.price),
//     0
//     )
// )


// export const selectCollection = collectionUrlparam =>(
//     createSelector(
//         [selectCollections],
//         // collections => collections[collectionUrlparam]
//         collections => (collections ? collections[collectionUrlparam] : null)
//     )
// );

