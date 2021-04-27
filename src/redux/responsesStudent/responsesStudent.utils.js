// export const setQuestionResponseForStudent = (id , res , responseArray) =>{
export const setQuestionResponseForStudent = (res , responseArray) =>{
    console.log('response', res);
    var existId = responseArray.find(item => item.id === res.id);

    if(existId){
        responseArray.map(item => item.id === res.id ? {...item , res : res.res} : item)
    }else{
        responseArray.push({id:res.id , res:res.res});
    }

    return  responseArray;
}