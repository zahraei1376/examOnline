import React,{useState,useEffect} from "react";
import {VnacyTextsContainer,VnacyText ,VacancyQuestion,VacancyItemConatiner,VnacySpan,VnacyTextDiv} from './ShowVacancyuestionForArchive.styles';
// import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
//     ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
// import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
// import MyPic from '../../../../assets/img/images.jpg';
// import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestionsForArchive from '../showBodyQuestionForArchive.component';
// import AddIcon from '@material-ui/icons/Add';
// import { Tooltip } from "@material-ui/core";
/////////////



const VacancyItemForArchive = ({number,items ,vancyRes})=>{

    // const [responseVancyQuestion,setResponseVancyQuestion] = useState([]);
    const [NOfVancy,setNOfVancy] = useState([]);

    // const handleChange = (i,value) =>{
    //     var temp =[...responseVancyQuestion];
    //     temp[i][0]=i;
    //     temp[i][1]=value;
    //     setResponseVancyQuestion(temp);
    // }

    // const handleSetResponseVancy = (num)=>{
    //     const [responseVancyQuestion,setResponseVancyQuestion] = useState(Array(num.length).fill(0).map(row => new Array(2).fill('')))
    // }

    

    useEffect(()=>{
        // var newItems = Vitems.split(' ');
        // newItems.reduce((item , total ) => {

        // })
        
        // var NOV = 0 ;
        var NOV = [];
        items.question_vancyItems.split(' ').reduce((acc,cur) => {
            if(cur.indexOf('$%A') > -1){
                NOV.push('1');
                // NOV ++;
                return acc + 1;
            }
        }, 0);
        // console.log('NOV',NOV);
        // setResponseVancyQuestion(Array(NOV.length).fill(0).map(row => new Array(2).fill('')));
        setNOfVancy(NOV);
        // handleSetResponseVancy(NOV);

        // 
    },[])

    // useEffect(()=>{
    //     console.log('responseVancyQuestion',responseVancyQuestion);
    //     // const [responseVancyQuestion,setResponseVancyQuestion] = useState(Array(NOfVancy.length).fill(0).map(row => new Array(2).fill('')))
    // },[responseVancyQuestion])

    return(
        <VacancyItemConatiner>
            <VacancyQuestion>سوال ) {items.question_vancyItems ? items.question_vancyItems.replaceAll('$%A', '......') : ''}</VacancyQuestion>
            <VnacyTextsContainer>
                {
                    NOfVancy.map((item,index)=>{
                        var res =vancyRes[index]
                        return(
                            <VnacyTextDiv key={index}>
                            <VnacySpan>{index + 1}</VnacySpan>
                            <VnacyText type="text"
                                readOnly
                                value={res ? res[1] : ''} 
                            // onChange={e=>handleChange(index,e.target.value)}
                            />
                            </VnacyTextDiv>
                        )})
                }
            </VnacyTextsContainer>
        </VacancyItemConatiner>
    )
}

const ShowVacancyQuestionForArchive = ({question, number ,type ,responseQuestion }) =>{
    return(
        <ShowBodyQuestionsForArchive myType={type} question={question} number={number} responseScore = {responseQuestion ? responseQuestion.response_score : ''}>
            <VacancyItemForArchive number={number} items={question} vancyRes={responseQuestion ? responseQuestion.response_vancyQuestion : ''} />
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowVacancyQuestionForArchive;