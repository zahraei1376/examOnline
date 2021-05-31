import { createSelector } from 'reselect';

const selectQIndex = state => state.questionIndex;

export const selectIndex = createSelector(
    [selectQIndex],
    (questionIndex)=>questionIndex.indexQuestion,
);

export const finalIndex = createSelector(
    [selectQIndex],
    (questionIndex)=>questionIndex.questionsLenght,
);

export const typeIncreaseQuestions = createSelector(
    [selectQIndex],
    (questionIndex)=>questionIndex.typeIncreaseQuestions,
);

export const timeOutToSolveQuestions = createSelector(
    [selectQIndex],
    (questionIndex)=>questionIndex.runningTomeOfTime,
);

export const getValueTimeOutToSolveQuestions = (id) =>{
    console.log('questionId' ,id);
    return(
    createSelector(
        [timeOutToSolveQuestions],
        (runningTomeOfTime) => 
        {
            console.log('runningTomeOfTime' ,runningTomeOfTime);
             ////////////////////////////////////////////
            var disableReturn = false;
            var flag = false;
            for (let index = 0; index < runningTomeOfTime.length; index++) {
                console.log('runningTomeOfTime[index].id' ,runningTomeOfTime[index].id);
                if(runningTomeOfTime[index].id === id){
                    flag=true;
                    // return timeToAttendTheExamPage[index].timeAttend;
                    console.log('runningTomeOfTime[index].val' ,runningTomeOfTime[index].val);
                    disableReturn = runningTomeOfTime[index].val;
                }
                // else{
                //     return null;
                // }                 
            }

            if(!flag){
                // console.log('timeLiginIs foundddd');
                disableReturn = false;
            }
            //////////////////////////////////////
            // if(runningTomeOfTime.length > 0){
            //     var flag = false;
            //     for (let index = 0; index < runningTomeOfTime.length; index++) {
            //         if(runningTomeOfTime[index].id === id){
            //             flag=true;
            //             // return timeToAttendTheExamPage[index].timeAttend;
            //             disableReturn = runningTomeOfTime[index].val;
            //         }
            //         // else{
            //         //     return null;
            //         // }                 
            //     }

            //     if(!flag){
            //         // console.log('timeLiginIs foundddd');
            //         disableReturn = false;
            //     }

                    
            //         // console.log('existIDIf' ,existID);
            //         // responseStudent.map(item => item.id === questionId ? item.res : null );
            //     // }else{
            //     //     return null;
            //     // }
            // }else{
            //     // console.log('timeLiginIsnot found');
            //     disableReturn = false;
            // }
            // console.log('timeAttendReturn',timeAttendReturn);
            console.log('disableReturn',disableReturn);
            return disableReturn;
        }
    )
)}


// export const getValueTimeOutToSolveQuestions = createSelector(
//     [timeOutToSolveQuestions],
//     (runningTomeOfTime)=>{
//         questionIndex.runningTomeOfTime
//         ////////////////////////////////////////////
//         var disableReturn = '';
//         if(runningTomeOfTime.length > 0){
//             var flag = false;
//             for (let index = 0; index < runningTomeOfTime.length; index++) {
//                 if(runningTomeOfTime[index].id === epId){
//                     flag=true;
//                     // return timeToAttendTheExamPage[index].timeAttend;
//                     disableReturn = timeToAttendTheExamPage[index].timeAttend;
//                 }
//                 // else{
//                 //     return null;
//                 // }                 
//             }

//             if(!flag){
//                 // console.log('timeLiginIs foundddd');
//                 disableReturn = false;
//             }

                
//                 // console.log('existIDIf' ,existID);
//                 // responseStudent.map(item => item.id === questionId ? item.res : null );
//             // }else{
//             //     return null;
//             // }
//         }else{
//             // console.log('timeLiginIsnot found');
//             disableReturn = false;
//         }
//         // console.log('timeAttendReturn',timeAttendReturn);
//         return disableReturn;
//     }
// );