import { realeTime } from '../../generalComponent/Clock/getTime';
import { fixNumbers } from '../../generalComponent/fixNumbers';
//////////////////////////////////////////
var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();

var moment = require('moment-jalaali');
moment().format('jYYYY/jMM/jDD')

// export const setQuestionResponseForStudent = (id , res , responseArray) =>{
export const setQuestionResponseForStudent = (res , responseArray) =>{
    console.log('responseresponse', res);
    var existId = responseArray.find(item => item.id === res.id);
    console.log('existId',existId);
    if(existId){
        console.log('id id exist');
        console.log('responseArray.length',responseArray.length);
        // responseArray.map(item => item.id === res.id ? {...item , res : res.res} : item);
        for (let index = 0; index < responseArray.length; index++) {
            console.log('responseArray[index].id',responseArray[index].id);
            if(responseArray[index].id === res.id){
                responseArray.splice(index , 1 ,res);
                console.log('responseArray',responseArray); 
                // return;
            }
        }
        // responseArray.map(item => item.id === res.id ? res : item);
        // console.log('id id exist');
    }else{
        console.log('id is not exist');
        // responseArray.push({id:res.id , res:res.res});
        responseArray.push(res);
    }

    return  responseArray;
}

export const clearQuestionsResponseForStudent = async(examPID , responseArray) =>{
    // for (let index = 0; index < responseArray.length; index++) {
    //     console.log('responseArray[index].id',responseArray[index].examPID);
    //     if(responseArray[index].examPID === examPID){
    //         responseArray.splice(index , 1);
    //         console.log('responseArray',responseArray); 
    //         // return;
    //     }
    // }
    // return  responseArray;

    ////////////////////////////////////////////////////////////////
    if(responseArray.length > 0){
        for await (let [i, res] of responseArray.entries()) {
            console.log('responseArray',i); 
            if(res.examPID === examPID){
                responseArray.splice(i , 1);
                console.log('responseArray',responseArray); 
                // return;
            }
        }
        // if(!responseArray){
        //     return [];
        // }
        // console.log('responseArrayresponseArray',responseArray); 
        // return  responseArray;
    }
    console.log('responseArrayresponseArray',responseArray); 
    return  responseArray;
    
}


export const clearQuestionsResponseForStudentWhenTimeOut = async(responseArray) =>{

    var nowDate = fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD'));
    var nowTime =  realeTime.toLocaleTimeString([], {
        timeZone: "Asia/Tehran",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    ////////////////////////////////////////////////////////////////
    if (responseArray && responseArray.length > 0) {

        for await (let [i, res] of responseArray.entries()) {
            console.log('responseArray',i); 
            // if(res.examPID === examPID){
            if(nowTime > res.examEndTime && nowDate > res.examEndDate){
                responseArray.splice(i , 1);
                console.log('responseArray',responseArray); 
                // return;
            }
        }
    }
    console.log('responseArrayresponseArray',responseArray); 
    return  responseArray;
}