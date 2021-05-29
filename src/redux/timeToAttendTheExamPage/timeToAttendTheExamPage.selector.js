import { createSelector } from 'reselect';

const selectTimeLogin = state => state.TimeLoginReducer;

export const getTimeToAttendTheExamPage =createSelector(
    [selectTimeLogin],
    (TimeLoginReducer)=>TimeLoginReducer.timeToAttendTheExamPage,
);


export const getTimeToAttendTheExamPageWithID = (epId) =>{
    // console.log('questionId' ,questionId);
    return(
    createSelector(
        [getTimeToAttendTheExamPage],
        (timeToAttendTheExamPage) => 
        {
            // console.log('responseStudentresponseStudentTomeeeeeeeeeeeeee',epId);
            var timeAttendReturn = '';
            if(timeToAttendTheExamPage.length > 0){
                // console.log('timeToAttendTheExamPage',timeToAttendTheExamPage);
                // var existID =  responseStudent.find(item => item.id === questionId);
                // console.log('existID' ,existID);
                // if(existID) {
                var flag = false;
                // for await (let myTime of timeToAttendTheExamPage) {
                //     console.log('myTime.id',myTime.id); 
                //     console.log('epId',epId); 
                //     if(myTime.id === epId){
                //         flag = true;
                //         console.log('myTime.timeAttend',myTime); 
                //         timeAttendReturn = myTime.timeAttend;
                //         return;
                //     }
                // }
                for (let index = 0; index < timeToAttendTheExamPage.length; index++) {
                    if(timeToAttendTheExamPage[index].id === epId){
                        flag=true;
                        // return timeToAttendTheExamPage[index].timeAttend;
                        timeAttendReturn = timeToAttendTheExamPage[index].timeAttend;
                    }
                    // else{
                    //     return null;
                    // }                 
                }

                if(!flag){
                    // console.log('timeLiginIs foundddd');
                    timeAttendReturn = '00:00:00';
                }
    
                    
                    // console.log('existIDIf' ,existID);
                    // responseStudent.map(item => item.id === questionId ? item.res : null );
                // }else{
                //     return null;
                // }
            }else{
                // console.log('timeLiginIsnot found');
                timeAttendReturn = '00:00:00';
            }
            // console.log('timeAttendReturn',timeAttendReturn);
            return timeAttendReturn;
        }
    )
)}