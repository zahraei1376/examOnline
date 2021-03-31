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