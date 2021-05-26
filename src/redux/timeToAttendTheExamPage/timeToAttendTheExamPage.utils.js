export const foundTimeToAttend = (id , timeArray) => {
    console.log('responseresponse', timeArray);
    // if(timeArray)
    // var existId = timeArray.find(item => item.id === id);
    // console.log('existId',existId);
    // if(existId){
        console.log('id id exist');
        console.log('timeArray.length',timeArray.length);
        // timeArray.map(item => item.id === res.id ? {...item , res : res.res} : item);
        for (let index = 0; index < timeArray.length; index++) {
            console.log('timeArray[index].id',timeArray[index].id);
            if(timeArray[index].id === id){
                timeArray.splice(index , 1 , {id:id , timeAttend:'00:00:00'});
                console.log('timeArray',timeArray); 
            }
        }
    // }else{
        
    // }

    return timeArray;
}

export const setTimeToAttend = (id , timeArray,time) => {
    console.log('responseresponse', timeArray);
    var existId = timeArray.find(item => item.id === id);
    console.log('existId',existId);
    if(existId){
        console.log('id id exist');
        console.log('timeArray.length',timeArray.length);
        // timeArray.map(item => item.id === res.id ? {...item , res : res.res} : item);
        for (let index = 0; index < timeArray.length; index++) {
            console.log('timeArray[index].id',timeArray[index].id);
            if(timeArray[index].id === id){
                timeArray.splice(index , 1 , {id:id , timeAttend:time});
                console.log('timeArray',timeArray); 
            }
        }
    }else{
        timeArray.push({id:id , timeAttend:time})
    }

    return timeArray;
}