import React,{useState,useEffect} from "react";
import {VnacyTextsContainer,VnacyText ,VacancyQuestion,VacancyItemConatiner,VnacySpan,VnacyTextDiv} from './ShowVacancyuestion.styles';
// import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
//     ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
// import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
// import MyPic from '../../../../assets/img/images.jpg';
// import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestions from '../showBodyQuestion.component';
// import AddIcon from '@material-ui/icons/Add';
// import { Tooltip } from "@material-ui/core";
/////////////////////////////////////////////////
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getResponseStudentWithIndex } from '../../../../redux/responsesStudent/responsesStudent.selector';
/////////////////////////////////////////////////



const VacancyItem = ({number,items ,ResItem ,setResForRedux})=>{

    const [responseVancyQuestion,setResponseVancyQuestion] = useState(ResItem ? ResItem : []);
    const [NOfVancy,setNOfVancy] = useState([]);

    useEffect(()=>{
        console.log('ResItem' ,ResItem);
        setResForRedux(ResItem);
    },[]);

    const handleChange = (i,value) =>{
        var temp =[...responseVancyQuestion];
        temp[i][0]=i;
        temp[i][1]=value;
        setResForRedux(temp);
        setResponseVancyQuestion(temp);
    }

    // const handleSetResponseVancy = (num)=>{
    //     const [responseVancyQuestion,setResponseVancyQuestion] = useState(Array(num.length).fill(0).map(row => new Array(2).fill('')))
    // }

    

    useEffect(()=>{

        console.log('items',items);
        var VItemsCount = items.split('$%A'); 
        var NOV = [];
        // items.split(' ').reduce((acc,cur) => {
        //     if(cur.indexOf('$%A') > -1){
        //         NOV.push('1');
        //         // NOV ++;
        //         return acc + 1;
        //     }
        // }, 0);
        // NOV = 
        if(VItemsCount.length > 1){
            VItemsCount.map(item => item != "" ?
            NOV.push(item) : "" )
            console.log('NOV',NOV);
            setResponseVancyQuestion(Array(NOV.length).fill(0).map(row => new Array(2).fill('')));
            setNOfVancy(NOV);
        }else{
            setResponseVancyQuestion(Array(0).fill(0).map(row => new Array(2).fill('')));
            setNOfVancy([]);
        }
        
        // handleSetResponseVancy(NOV);

        // 
    },[])

    useEffect(()=>{
        console.log('responseVancyQuestion',responseVancyQuestion);
        // const [responseVancyQuestion,setResponseVancyQuestion] = useState(Array(NOfVancy.length).fill(0).map(row => new Array(2).fill('')))
    },[responseVancyQuestion])

    return(
        <VacancyItemConatiner>
            <VacancyQuestion>سوال ) {items.replaceAll('$%A', '......')}</VacancyQuestion>
            <VnacyTextsContainer>
                {
                    NOfVancy.map((item,index)=>(
                        <VnacyTextDiv key={index}>
                        <VnacySpan>{index + 1}</VnacySpan>
                        <VnacyText type="text" defaultValue={ResItem && ResItem.length > 0 && ResItem[index] ? ResItem[index][1] : ''} onChange={e=>handleChange(index,e.target.value)} />
                        </VnacyTextDiv>
                    ))
                }
            </VnacyTextsContainer>
        </VacancyItemConatiner>
    )
}

const ShowVacancyQuestion = ({question, number,items ,ResItem ,getResponseStudentWithIndex}) =>{
    // useEffect(()=>{
    //     console.log('question.items',question.items);
    // },[]);
    return(
        <ShowBodyQuestions question={question} number={number}>
            <VacancyItem number={number} items={items} ResItem={ResItem ? ResItem : getResponseStudentWithIndex}/>
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
    getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowVacancyQuestion);