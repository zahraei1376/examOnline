// export const setQuestionResponseForStudent = (id , res , responseArray) =>{
export const setQuestionResponseForStudent = (res , responseArray) =>{
    console.log('response', res);
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