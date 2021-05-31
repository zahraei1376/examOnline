import { realeTime } from '../../generalComponent/Clock/getTime';
import { fixNumbers } from '../../generalComponent/fixNumbers';
//////////////////////////////////////////
var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();

var moment = require('moment-jalaali');
moment().format('jYYYY/jMM/jDD')

export const foundTimeToAttend = (id , timeArray) => {
    // console.log('responseresponse', timeArray);
    // if(timeArray)
    // var existId = timeArray.find(item => item.id === id);
    // console.log('existId',existId);
    // if(existId){
        // console.log('id id exist');
        // console.log('timeArray.length',timeArray.length);
        // timeArray.map(item => item.id === res.id ? {...item , res : res.res} : item);
        for (let index = 0; index < timeArray.length; index++) {
            // console.log('timeArray[index].id',timeArray[index].id);
            if(timeArray[index].id === id){
                timeArray.splice(index , 1 , {id:id , timeAttend:'00:00:00'});
                // console.log('timeArray',timeArray); 
            }
        }
    // }else{
        
    // }

    return timeArray;
}

export const foundTimeToAttendWithTimeOut = (timeArray) => {
    ///////////////////////////////////////////////////////////////
    var nowDate = fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD'));
    console.log('nowDate',nowDate);
    var myNowDate = nowDate.split('/').join('');
    ////////////////////////////////////////////////////////////////
    console.log('responseArrayresponseArray',timeArray); 
    if (timeArray && timeArray.length > 0) {
        for (let index = 0; index < timeArray.length; index++) {
            
            console.log('timeArray[index].endDateExam',timeArray[index].endDateExam);
            if(timeArray[index].endDateExam){
                var myEndDate = timeArray[index].endDateExam.split('/').join('');
                console.log('responseArrayresponseArray',myNowDate); 
                console.log('responseArrayresponseArray',myEndDate); 
                if(myNowDate > myEndDate){
                    timeArray.splice(index , 1);
                    // console.log('responseArray',responseArray); 
                    // return;
                }
            }
            
            
        }

        // for await (let [i, res] of timeArray.entries()) {
        //     // console.log('responseArray',i); 
        //     // if(res.examPID === examPID){
        //     if(nowDate > res.endDateExam){
        //         timeArray.splice(i , 1);
        //         // console.log('responseArray',responseArray); 
        //         // return;
        //     }
        // }
    }
    console.log('responseArrayresponseArray',timeArray); 
    return  timeArray;
    // return [];
}

export const setTimeToAttend = (id , timeArray,time) => {
    console.log('responseresponse', timeArray);
    if(timeArray.length > 0){
    //     var existId = timeArray.find(item => item.id === id);
    // // console.log('existId',existId);
    //     if(existId){
            var flag = false;
            for (let index = 0; index < timeArray.length; index++) {
                // console.log('timeArray[index].id',timeArray[index].id);
                if(timeArray[index].id === id){
                    flag = true;
                    timeArray.splice(index , 1 , {id:id , timeAttend:time});
                    // console.log('timeArray',timeArray); 
                }
            }

            if(!flag){
                timeArray.push({id:id , timeAttend:time});
            }
        // }else{
        //     timeArray.push({id:id , timeAttend:time})
        // }
    }else{
        timeArray.push({id:id , timeAttend:time});
    }
    

    return timeArray;
}