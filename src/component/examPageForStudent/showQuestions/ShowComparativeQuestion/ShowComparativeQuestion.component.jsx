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

    // const [questionRes,setQuestionRes] = useState(null);
    const [questionRes,setQuestionRes] = useState(null);      
    const [MyRes,setMyRes] = useState(null);

    useEffect(()=>{
        console.log('ResItem' , ResItem);
        // setQuestionRes(Array(items.length).fill(0).map(row => new Array(2).fill('')));
        // setResForRedux(ResItem);
        // setMyRes(ResItem);
        ///////////////////////////
        // var temp = [...questionRes];
        var temp = Array(items.length).fill(0).map(row => new Array(2).fill(''));
        for (let index = 0; index < items.length; index++) {  
            var tempRes = ResItem && ResItem.length > 0 ? ResItem[index] : '';
            // console.log('tempRes',tempRes);
            if(tempRes){
                temp[index][0] = index == 0 ? '0' : (index).toString();
                temp[index][1] = tempRes[1];
                /////////////
                // temp[index][0] = tempRes[1];
                // console.log('temp',temp);
                // setResForRedux(temp);
                // setQuestionRes(temp);
                // setMyRes(temp);
            }
            else{

                temp[index][0] = index == 0 ? '0' : (index).toString();
                temp[index][1] = '';
                // setResForRedux(temp);
                // setQuestionRes(temp);
                // setMyRes(temp);
                // setResForRedux('');
                // setQuestionRes(Array(items.length).fill(0).map(row => new Array(2).fill('')));
                // setMyRes('');
            }
            
            
        }
        setResForRedux(temp);
        setQuestionRes(temp);
        setMyRes(temp);
    },[ResItem]);

    useEffect(()=>{
        console.log('MyRes',MyRes);
    },[MyRes])

    const handleRes = (i , text) =>{
       
        var temp =[...questionRes];
        temp[i][0] = i == 0 ? '0' : (i).toString();
        temp[i][1] = text;
        console.log('temp',temp);
        setResForRedux(temp);
        setQuestionRes(temp);
        setMyRes(temp);
    }

    useEffect(()=>{
        console.log('items',items);//فرستادن مقدار رندوم شده
    },[items])

    return(
        <ComparativeItemsConatiner>
            
            {
                items.map((item , index) =>(
                    <ShowComparativeItem item={item} 
                        ResItem={MyRes && MyRes.length > 0 ? MyRes[index] : ''} 
                        key={index} 
                        myIndex={index} 
                        handleRes={handleRes} />
                ))
            }
            
        </ComparativeItemsConatiner>
    )
}

const ShowComparativeQuestion = ({question, number,items ,ResItem ,getResponseStudentWithIndex}) =>{
    console.log('ResItemComparativeQuestion',ResItem);
    return(
        <ShowBodyQuestions question={question} number={number}>

            <ShowComparativeItems number={number}  items={items} 
            ResItem={getResponseStudentWithIndex  ? getResponseStudentWithIndex : ResItem}
            // ResItem={ResItem && ResItem.length > 0 ? ResItem : getResponseStudentWithIndex}
            />
            
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
    getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowComparativeQuestion);