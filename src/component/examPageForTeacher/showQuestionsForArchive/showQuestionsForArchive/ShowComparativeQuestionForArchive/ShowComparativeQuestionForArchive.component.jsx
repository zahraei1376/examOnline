import React,{useEffect, useState} from "react";
import {ComparativeItemsConatiner} from './ShowComparativeQuestionForArchive.styles';
import ShowBodyQuestionsForArchive from '../showBodyQuestionForArchive.component';
import ShowComparativeItemForArchive from './compareItemForArchive/ShowComparativeItemForArchive.component';
/////////////
const ShowComparativeItemsForArchive = ({number,items,comparativeRes})=>{

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
                    <ShowComparativeItemForArchive item={item} resItem={comparativeRes[index]} key={index} myIndex={index} handleRes={handleRes} />
                ))
            }
            
        </ComparativeItemsConatiner>
    )
}

const ShowComparativeQuestionForArchive = ({question, number,type ,responseQuestion}) =>{
    return(
        <ShowBodyQuestionsForArchive myType={type} question={question} number={number} 
        responseScore = {responseQuestion ? responseQuestion.response_score : ''}
        // responseScore = {responseQuestion.response_score}
        >
            <ShowComparativeItemsForArchive number={number} 
            // items={question} 
            items={responseQuestion && responseQuestion.response_comparativeQuestionRandom && responseQuestion.response_comparativeQuestionRandom.length > 0 ? responseQuestion.response_comparativeQuestionRandom : question.question_compItems} 
            comparativeRes={responseQuestion ? responseQuestion.response_comparativeQuestion : ''}
            // comparativeRes={responseQuestion ? responseQuestion.response_comparativeQuestionRandom : ''}
            />
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowComparativeQuestionForArchive;