import React,{useState} from "react";
import {TextArea ,ShowVacancyButton,VacancyItemConatiner} from './ShowVacancyuestion.styles';
// import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
//     ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
// import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
// import MyPic from '../../../../assets/img/images.jpg';
// import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestions from '../showBodyQuestion.component';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from "@material-ui/core";
/////////////



const VacancyItem = ({number})=>{

    const [responseQuestion,setResponseQuestion] = useState('');

    const handleChange = (e) =>{
        setResponseQuestion(e.target.value);
    }

    return(
        <VacancyItemConatiner>
            <TextArea rows="6" cols="50" value={responseQuestion} onChange={e => handleChange(e)}>
            
            </TextArea>
            <Tooltip title="آپلود جواب">
                <label htmlFor={`upload${number}Pic`}>
                    <input type="file" style={{display:'none'}} id={`upload${number}Pic`}/>

                    <ShowVacancyButton variant="contained" component="span">
                        <AddIcon style={{fontSize:'4rem'}}
                        // style={{color:'#009688'}}
                        />
                    </ShowVacancyButton>
                </label>
            </Tooltip>
        </VacancyItemConatiner>
    )
}

const ShowVacancyQuestion = ({question, number}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}><VacancyItem number={number}/></ShowBodyQuestions>
    )
};

export default ShowVacancyQuestion;