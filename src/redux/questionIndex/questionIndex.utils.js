export const AddIndexQuestion = (index,total) =>{
    if(index == total){
        return index;
    }else{
        return index + 1;
    }
}

export const LowOffIndexQuestion = (index) =>{
    if(index == 0){
        return index;
    }else{
        return index - 1;
    }
}

export const foundExamIDForDisable = (id,disableArray,val) =>{
    console.log('disableArray', disableArray);
    if(disableArray.length > 0){
        var flag = false;
        for (let index = 0; index < disableArray.length; index++) {
            // console.log('timeArray[index].id',timeArray[index].id);
            if(disableArray[index].id === id){
                flag = true;
                disableArray.splice(index , 1 , {id:id , val:val});
                // console.log('timeArray',timeArray); 
            }
        }

        if(!flag){
            disableArray.push({id:id , val:val});
        }
    }else{
        disableArray.push({id:id , val:val});
    }
    

    return disableArray;
}


export const GetDataForDisable = (id,disableArray) =>{
    console.log('disableArray', disableArray);
    if(disableArray.length > 0){
        for (let index = 0; index < disableArray.length; index++) {
            // console.log('timeArray[index].id',timeArray[index].id);
            if(disableArray[index].id === id){
              return disableArray[index].val;
            }
        }
    }
    return false;
}

export const clearDataForDisable = (id,disableArray) =>{
    // console.log('disableArray', disableArray);
    // if(disableArray.length > 0){
    //     for (let index = 0; index < disableArray.length; index++) {
    //         // console.log('timeArray[index].id',timeArray[index].id);
    //         if(disableArray[index].id === id){
    //             disableArray.splice(index , 1 , {id:id , val:val});
    //             // console.log('timeArray',timeArray); 
    //         }
    //     }
    // }else{
    //     disableArray.push({id:id , val:val})
    // }
    

    return [];
}