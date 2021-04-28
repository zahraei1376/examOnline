import React, { useEffect } from 'react';
import {InputDivContainer , InputPre ,FirstSideContainer,SecondSideContainer,
    FirstSideResContainer,
    FirstSideRes,
    SecondSideNumberContainer,
    SecondSideNumber,
     InputContainerButton ,InputContainerIcon} from './ShowComparativeItem.styles';
// import Icon from '@material-ui/core/Icon';

const ShowComparativeItem =({myIndex , item ,ResItem ,handleIndexDelete , handleIndexSet,handleRes})=>{
    // const handleDelete = () =>{
    //     handleIndexDelete(myIndex);
    // }
    useEffect(()=>{
        console.log('zzzzzzzzzzzzzzzzzzzzzz',item);
        console.log('eeeeeeeeeeeee',ResItem[1]);
    },[])


    return(
        <InputDivContainer>
            <FirstSideContainer>
                <InputPre>
                    {item[0]}
                </InputPre>
                <FirstSideResContainer>
                    <FirstSideRes type="number" defaultValue={ResItem[1]} onChange={e => handleRes(myIndex , e.target.value)} />
                </FirstSideResContainer>
                

            </FirstSideContainer>
           
             <SecondSideContainer>
                 <SecondSideNumberContainer>
                    <SecondSideNumber>{myIndex + 1}</SecondSideNumber>
                 </SecondSideNumberContainer>
                 <InputPre>
                    {item[1]}
                </InputPre>
             </SecondSideContainer>
            
            {/* <InputContainerButton onClick={handleDelete}><InputContainerIcon>delete</InputContainerIcon></InputContainerButton> */}
        </InputDivContainer>
    )
};

export default ShowComparativeItem;