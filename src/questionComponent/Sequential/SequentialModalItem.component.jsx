import React, { useEffect } from 'react';
import {InputDivContainer , Input , InputContainerButton ,InputContainerIcon} from './SequentialModalItem.styles';
// import Icon from '@material-ui/core/Icon';

const SequentialModalItems =({myIndex , item ,handleIndexDelete , handleIndexSet})=>{
    const handleDelete = () =>{
        handleIndexDelete(myIndex);
    }
    useEffect(()=>{
        console.log('zzzzzzzzzzzzzzzzzzzzzz',item);
    },[])


    return(
        <InputDivContainer>
            <Input type="text" value={item} onChange={(e) => handleIndexSet(myIndex ,e.target.value)} />
            <InputContainerButton onClick={handleDelete}><InputContainerIcon>delete</InputContainerIcon></InputContainerButton>
        </InputDivContainer>
    )
};

export default SequentialModalItems;