import React, { useEffect ,useState } from 'react';
import {InputDivContainer , InputPre ,FirstSideContainer,SecondSideContainer,
    FirstSideResContainer,
    FirstSideRes,
    SecondSideNumberContainer,
    SecondSideNumber,
     InputContainerButton ,InputContainerIcon} from './ShowComparativeItem.styles';
// import Icon from '@material-ui/core/Icon';

const ShowComparativeItem =({myIndex , item ,ResItem ,handleIndexDelete , handleIndexSet,handleRes})=>{

    const [myResItem , setMyResItem] = useState(null);
    useEffect(()=>{
        console.log('myResItemmyResItem',myResItem);
    },[myResItem])

    useEffect(()=>{
        console.log('zzzzzzzzzzzzzzzzzzzzzz',item);
        console.log('eeeeeeeeeeeee',ResItem);
        setMyResItem(ResItem && ResItem.length > 0 ? ResItem[1] : '')
    },[ResItem])

    const hanldeValue = (vl) =>{
        console.log('vl',vl);
        setMyResItem(vl);
        handleRes(myIndex , vl);
    }


    return(
        <InputDivContainer>
            <FirstSideContainer>
                <InputPre>
                    {item[0]}
                </InputPre>
                <FirstSideResContainer>
                    <FirstSideRes 
                    // type="number" 
                    value = {myResItem}
                     onChange={e => hanldeValue(e.target.value)} />
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