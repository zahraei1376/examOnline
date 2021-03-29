import React,{useState} from "react";
import {ComparativeItemsConatiner} from './ShowComparativeQuestion.styles';
import ShowBodyQuestions from '../showBodyQuestion.component';
import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////
const ShowComparativeItems = ({number,items})=>{

    return(
        <ComparativeItemsConatiner>
            {
                items.map((item , index) =>(
                    <ShowComparativeItem item={item} key={index} myIndex={index} />
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