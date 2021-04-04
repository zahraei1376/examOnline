import React,{useEffect, useState} from "react";
import {ComparativeItemsConatiner} from './ShowComparativeQuestionForArchive.styles';
import ShowBodyQuestionsForArchive from '../showBodyQuestionForArchive.component';
import ShowComparativeItemForArchive from './compareItemForArchive/ShowComparativeItemForArchive.component';
/////////////
const ShowComparativeItemsForArchive = ({number,items})=>{

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
                items.items.map((item , index) =>(
                    <ShowComparativeItemForArchive item={item} resItem={items.resItems[index]} key={index} myIndex={index} handleRes={handleRes} />
                ))
            }
            
        </ComparativeItemsConatiner>
    )
}

const ShowComparativeQuestionForArchive = ({question, number,items}) =>{
    return(
        <ShowBodyQuestionsForArchive question={question} number={number}>
            <ShowComparativeItemsForArchive number={number} items={items}/>
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowComparativeQuestionForArchive;