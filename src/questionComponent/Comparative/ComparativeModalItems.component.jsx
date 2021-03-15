import React from 'react';
import {InputDivContainer , Input , InputContainerButton ,InputContainerIcon} from './ComparativeModalItems.styles';
// import Icon from '@material-ui/core/Icon';

const ComparativeModalItems =({myIndex , handleIndexDelete , handleIndexSet})=>{
    const handleDelete = () =>{
        handleIndexDelete(myIndex);
    }


    return(
        <InputDivContainer>
            <Input type="text" onChange={(e) => handleIndexSet(myIndex , 1 ,e.target.value)} />
            <Input type="text" onChange={(e) => handleIndexSet(myIndex , 0 ,e.target.value)}/>
            <InputContainerButton onClick={handleDelete}><InputContainerIcon>delete</InputContainerIcon></InputContainerButton>
        </InputDivContainer>
    )
};

export default ComparativeModalItems;