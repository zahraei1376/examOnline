import React, { useEffect } from 'react';
import {InputDivContainer , InputPre ,FirstSideContainer,SecondSideContainer,
    FirstSideResContainer,
    FirstSideRes,
    SecondSideNumberContainer,
    SecondSideNumber,
     InputContainerButton ,InputContainerIcon} from './ShowComparativeItemForArchive.styles';
// import Icon from '@material-ui/core/Icon';

const ShowComparativeItemForArchive =({myIndex , item ,resItem})=>{
    // const handleDelete = () =>{
    //     handleIndexDelete(myIndex);
    // }
    // useEffect(()=>{
    //     console.log('zzzzzzzzzzzzzzzzzzzzzz',item);
    // },[])


    return(
        <InputDivContainer>
            <FirstSideContainer>
                <InputPre>
                    {item[0]}
                </InputPre>
                <FirstSideResContainer>
                    <FirstSideRes 
                    type="text" 
                    readOnly
                    value={resItem[1]}
                    // onChange={e => handleRes(myIndex , e.target.value)}
                     />
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

export default ShowComparativeItemForArchive;