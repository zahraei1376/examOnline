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
/////////////



const VacancyItem = ({number,Vitems})=>{

    const [responseVancyQuestion,setResponseVancyQuestion] = useState([]);
    const [NOfVancy,setNOfVancy] = useState([]);

    const handleChange = (i,value) =>{
        var temp =[...responseVancyQuestion];
        temp[i][0]=i;
        temp[i][1]=value;
        setResponseVancyQuestion(temp);
    }

    // const handleSetResponseVancy = (num)=>{
    //     const [responseVancyQuestion,setResponseVancyQuestion] = useState(Array(num.length).fill(0).map(row => new Array(2).fill('')))
    // }

    

    useEffect(()=>{

        console.log('Vitems',Vitems);
        var VItemsCount = Vitems.split('$%A'); 
        var NOV = [];
        // Vitems.split(' ').reduce((acc,cur) => {
        //     if(cur.indexOf('$%A') > -1){
        //         NOV.push('1');
        //         // NOV ++;
        //         return acc + 1;
        //     }
        // }, 0);
        // NOV = 
        VItemsCount.map(item => item != "" ?
        NOV.push(item) : "" )
        console.log('NOV',NOV);
        setResponseVancyQuestion(Array(NOV.length).fill(0).map(row => new Array(2).fill('')));
        setNOfVancy(NOV);
        // handleSetResponseVancy(NOV);

        // 
    },[])

    useEffect(()=>{
        console.log('responseVancyQuestion',responseVancyQuestion);
        // const [responseVancyQuestion,setResponseVancyQuestion] = useState(Array(NOfVancy.length).fill(0).map(row => new Array(2).fill('')))
    },[responseVancyQuestion])

    return(
        <VacancyItemConatiner>
            <VacancyQuestion>سوال ) {Vitems.replaceAll('$%A', '......')}</VacancyQuestion>
            <VnacyTextsContainer>
                {
                    NOfVancy.map((item,index)=>(
                        <VnacyTextDiv key={index}>
                        <VnacySpan>{index + 1}</VnacySpan><VnacyText type="text" onChange={e=>handleChange(index,e.target.value)} />
                        </VnacyTextDiv>
                    ))
                }
            </VnacyTextsContainer>
        </VacancyItemConatiner>
    )
}

const ShowVacancyQuestion = ({question, number,Vitems}) =>{
    // useEffect(()=>{
    //     console.log('question.Vitems',question.Vitems);
    // },[]);
    return(
        <ShowBodyQuestions question={question} number={number}><VacancyItem number={number} Vitems={Vitems}/></ShowBodyQuestions>
    )
};

export default ShowVacancyQuestion;