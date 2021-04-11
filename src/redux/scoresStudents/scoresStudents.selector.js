import { createSelector} from 'reselect';

const getStudent = state => state.arraysStudentsScores;

export const getStudentId = createSelector(
    [getStudent],
    (arraysStudentsScores)=> arraysStudentsScores.studentId,
);

export const getStudents = createSelector(
    [getStudent],
    (arraysStudentsScores)=> arraysStudentsScores.students,
);



export const TotalScore = (studentId) =>(
    createSelector(
        [getStudents],
        // collections => collections[collectionUrlparam]
        students => (students.map(student =>{ 
            if(student.studentId === studentId) {
                var total = 0 ;
                student.scores.map(score =>{
                    total += parseFloat(score);
                })

                return total;
            }else{
                return null;
            }
        }))
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

