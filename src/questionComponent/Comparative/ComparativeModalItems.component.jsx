import React, { useEffect } from 'react';
import {InputDivContainer , Input , InputContainerButton ,InputContainerIcon} from './ComparativeModalItems.styles';
// import Icon from '@material-ui/core/Icon';

const ComparativeModalItems =({myIndex , item ,handleIndexDelete , handleIndexSet})=>{
    const handleDelete = () =>{
        handleIndexDelete(myIndex);
    }
    useEffect(()=>{
        console.log('zzzzzzzzzzzzzzzzzzzzzz',item);
    },[])


    return(
        <InputDivContainer>
            <Input type="text" value={item[0]} onChange={(e) => handleIndexSet(myIndex , 0 ,e.target.value)} />
            <Input type="text" value={item[1]} onChange={(e) => handleIndexSet(myIndex , 1 ,e.target.value)}/>
            <InputContainerButton onClick={handleDelete}><InputContainerIcon>delete</InputContainerIcon></InputContainerButton>
        </InputDivContainer>
    )
};

export default ComparativeModalItems;