import React,{useEffect, useState} from "react";
import {ComparativeItemsConatiner} from './ShowComparativeQuestion.styles';
import ShowBodyQuestions from '../showBodyQuestion.component';
import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////
const ShowComparativeItems = ({number,items})=>{

    const [questionRes,setQuestionRes] = useState(Array(items.length).fill(0).map(row => new Array(2).fill('')));

    const handleRes = (i , text) =>{
        var temp =[...questionRes];
        temp[i][0]=i;
        temp[i][1]=text;
        setQuestionRes(temp);
    }

    useEffect(()=>{
        console.log('questionRes',questionRes);
    },[questionRes])

    return(
        <ComparativeItemsConatiner>
            {
                items.map((item , index) =>(
                    <ShowComparativeItem item={item} key={index} myIndex={index} handleRes={handleRes} />
                ))
            }
            
        </ComparativeItemsConatiner>
    )
}

const ShowComparativeQuestion = ({question, number,items}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}><ShowComparativeItems number={number} items={items}/></ShowBodyQuestions>
    )
};

export default ShowComparativeQuestion;