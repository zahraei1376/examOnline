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

    const [responseVancyQuestion,setResponseVancyQuestion] = useState(null);
    const [NOfVancy,setNOfVancy] = useState([]);
    const [myRes , setMyRes] = useState(null);
    useEffect(()=>{
        console.log('myResmyResmyResmyRes' ,myRes);
        // setResForRedux(ResItem);
        // setResponseVancyQuestion(ResItem ? ResItem : []);
    },[myRes]);

    const handleChange = (i,value) =>{
        var temp =[...responseVancyQuestion];
        temp[i][0] = i == 0 ? '0' : (i).toString();
        temp[i][1] = value;
        setResForRedux(temp);
        setResponseVancyQuestion(temp);
        setMyRes(temp);
    }

    useEffect(()=>{
        // console.log('ResItemVancy' ,ResItem);
        // setResForRedux(ResItem);
        // setResponseVancyQuestion(ResItem ? ResItem : []);

        // console.log('items',items);
        var VItemsCount = items.split('$%A'); 
        var NOV = [];
        ///////////////////////////////////////////////
        if(VItemsCount.length > 1){
            VItemsCount.map(item => item != "" ?
            NOV.push(item) : "" )
            setNOfVancy(NOV);
            var temp = Array(NOV.length).fill(0).map(row => new Array(2).fill(''));
            for (let i = 0; i < NOV.length; i++) {  
                var tempRes = ResItem && ResItem.length > 0 ? ResItem[i] : '';
                if(tempRes){
                    temp[i][0] = i == 0 ? '0' : (i).toString();
                    temp[i][1] = tempRes[1];
                }
                else{
                    temp[i][0] = i == 0 ? '0' : (i).toString();
                    temp[i][1] = '';
                }
            }
            setResForRedux(temp);
            setResponseVancyQuestion(temp);
            console.log('temptemptemptemp',temp);
            setMyRes(temp);
        }else{
            setResForRedux([]);
            setResponseVancyQuestion(Array(0).fill(0).map(row => new Array(2).fill('')));
            setNOfVancy([]);
            setMyRes([]);
        }
    },[ResItem])

    return(
        <VacancyItemConatiner>
            <VacancyQuestion>سوال ) {items.replaceAll('$%A', '......')}</VacancyQuestion>
            <VnacyTextsContainer>
                {
                    NOfVancy.map((item,index)=>(
                        <VnacyTextDiv key={index}>
                        <VnacySpan>{index + 1}</VnacySpan>
                        {/* <VnacyText type="text" defaultValue={ResItem && ResItem.length > 0 && ResItem[index] ? ResItem[index][1] : ''} onChange={e=>handleChange(index,e.target.value)} /> */}
                        <VnacyText type="text" value={myRes && myRes.length > 0 && myRes[index] ? myRes[index][1] : ''} onChange={e => handleChange(index,e.target.value)} />
                        </VnacyTextDiv>
                    ))
                }
            </VnacyTextsContainer>
        </VacancyItemConatiner>
    )
}

const ShowVacancyQuestion = ({question, number,items ,ResItem ,getResponseStudentWithIndex}) =>{
    console.log('ResItemVancyQuestion',ResItem);

    // useEffect(() =>{

    // },[]);

    return(
        <ShowBodyQuestions question={question} number={number}>
            <VacancyItem number={number} items={items} ResItem={getResponseStudentWithIndex  ? getResponseStudentWithIndex : ResItem} />
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
    getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowVacancyQuestion);