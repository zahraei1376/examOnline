import React,{useEffect, useState} from "react";
import {ComparativeItemsConatiner} from './ShowComparativeQuestion.styles';
import ShowBodyQuestions from '../showBodyQuestion.component';
import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////////////////////////////////////////
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getResponseStudentWithIndex } from '../../../../redux/responsesStudent/responsesStudent.selector';
/////////////////////////////////////////////////
const ShowComparativeItems = ({number,items ,ResItem, setResForRedux})=>{

    const [questionRes,setQuestionRes] = useState(Array(items.length).fill(0).map(row => new Array(2).fill('')));
    useEffect(()=>{
        console.log('ResItem' ,ResItem);
        setResForRedux(ResItem);
    },[]);
    const handleRes = (i , text) =>{
        var temp =[...questionRes];
        temp[i][0]=i;
        temp[i][1]=text;
        setResForRedux(temp);
        setQuestionRes(temp);
    }

    useEffect(()=>{
        console.log('items',items);//فرستادن مقدار رندوم شده
    },[items])

    return(
        <ComparativeItemsConatiner>
            {
                items.map((item , index) =>(
                    <ShowComparativeItem item={item} 
                        ResItem={ResItem && ResItem.length > 0 ? ResItem[index] : ''} 
                        key={index} 
                        myIndex={index} 
                        handleRes={handleRes} />
                ))
            }
            
        </ComparativeItemsConatiner>
    )
}

const ShowComparativeQuestion = ({question, number,items ,ResItem ,getResponseStudentWithIndex}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}>
            <ShowComparativeItems number={number}  items={items} ResItem={ResItem ? ResItem : getResponseStudentWithIndex}/>
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
    getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowComparativeQuestion);