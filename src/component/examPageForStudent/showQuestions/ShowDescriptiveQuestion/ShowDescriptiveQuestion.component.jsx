import React,{useState} from "react";
import {TextArea ,ShowDescriptionButton,DescriptionItemConatiner} from './ShowDescriptiveQuestion.styles';
// import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
//     ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
// import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
// import MyPic from '../../../../assets/img/images.jpg';
// import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestions from '../showBodyQuestion.component';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from "@material-ui/core";
/////////////
import Uploader from '../../../uploader';



const DescriptionItem = ({number})=>{

    const [responseQuestion,setResponseQuestion] = useState('');

    const handleChange = (e) =>{
        setResponseQuestion(e.target.value);
    }

    const handleGetFileName = (fileName) => {

    }

    return(
        <DescriptionItemConatiner>
            <Tooltip title="آپلود جواب">
                <Uploader handleGetFileName={handleGetFileName} />
                {/* <label htmlFor={`upload${number}Pic`}>
                    <input type="file" style={{display:'none'}} id={`upload${number}Pic`}/>

                    <ShowDescriptionButton variant="contained" component="span">
                        <AddIcon style={{fontSize:'4rem'}}
                        // style={{color:'#009688'}}
                        />
                    </ShowDescriptionButton>
                </label> */}
            </Tooltip>
            <TextArea rows="6" cols="50" value={responseQuestion} onChange={e => handleChange(e)}>
            
            </TextArea>
        </DescriptionItemConatiner>
    )
}

const ShowDescriptiveQuestion = ({question, number}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}><DescriptionItem number={number}/></ShowBodyQuestions>
    )
};

export default ShowDescriptiveQuestion;