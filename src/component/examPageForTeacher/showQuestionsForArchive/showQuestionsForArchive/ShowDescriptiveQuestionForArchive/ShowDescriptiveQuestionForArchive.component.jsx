import React,{useState} from "react";
import {TextArea ,ShowDescriptionButton,DescriptionItemConatiner,DescriptionResImageContainer,DescriptionResImage} from './ShowDescriptiveQuestionForArchive.styles';
// import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
//     ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
// import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
// import MyPic from '../../../../assets/img/images.jpg';
// import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestionsForArchive from '../showBodyQuestionForArchive.component';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from "@material-ui/core";
/////////////
import IamgeRes  from '../../../../../assets/img/image2.jpg';



const DescriptionItemForArchive = ({number,descriptionRes,descriptionResLink,changeShowImage})=>{

    // const [responseQuestion,setResponseQuestion] = useState('');

    // const handleChange = (e) =>{
    //     setResponseQuestion(e.target.value);
    // }

    return(
        <DescriptionItemConatiner>
            <TextArea rows="6" cols="50" 
            // value={responseQuestion} 
            readOnly
            value={descriptionRes}
            // onChange={e => handleChange(e)}
            >
            
            </TextArea>
            {descriptionResLink ? <DescriptionResImageContainer>
                <DescriptionResImage 
                    src={IamgeRes} 
                    onClick={changeShowImage}
                    // src={descriptionResLink} 
                />
            </DescriptionResImageContainer> : ''}
            {/* <Tooltip title="آپلود جواب">
                <label htmlFor={`upload${number}Pic`}>
                    <input type="file" style={{display:'none'}} id={`upload${number}Pic`}/>

                    <ShowDescriptionButton variant="contained" component="span">
                        <AddIcon style={{fontSize:'4rem'}}
                        // style={{color:'#009688'}}
                        />
                    </ShowDescriptionButton>
                </label>
            </Tooltip> */}
        </DescriptionItemConatiner>
    )
}

const ShowDescriptiveQuestionForArchive = ({question, number}) =>{
    const changeShowImage = () => {
        //changedData
    }

    return(
        <ShowBodyQuestionsForArchive changeShowImage = {changeShowImage()} question={question} number={number}>
            <DescriptionItemForArchive changeShowImage = {changeShowImage()} number={number} descriptionRes={question.exam_descriptionRes} descriptionResLink={question.exam_descriptionResImageLink}/>
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowDescriptiveQuestionForArchive;