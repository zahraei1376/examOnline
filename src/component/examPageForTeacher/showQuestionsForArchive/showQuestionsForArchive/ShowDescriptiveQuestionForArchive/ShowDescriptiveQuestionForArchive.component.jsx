import React,{useEffect, useState} from "react";
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



const DescriptionItemForArchive = ({number,descriptionRes,descriptionResLink , setShowImage ,setImageSrc})=>{

    // const [responseQuestion,setResponseQuestion] = useState('');

    // const handleChange = (e) =>{
    //     setResponseQuestion(e.target.value);
    // }
    const handleShowImage = () =>{
        setImageSrc(IamgeRes);
        setShowImage(true);
    }

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
                    onClick={handleShowImage}
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

const ShowDescriptiveQuestionForArchive = ({question, number ,type,responseQuestion}) =>{

    useEffect(()=>{
        console.log('questionnnnnnnnnnnnnnnn',question);
    },[])
    // const changeShowImage = () => {
    //     //changedData
    // }

    return(
        <ShowBodyQuestionsForArchive myType={type} 
        // changeShowImage = {changeShowImage()}
         question={question} number={number} responseScore = {responseQuestion ? responseQuestion.response_score : ''} >
            <DescriptionItemForArchive 
            // changeShowImage = {changeShowImage()}
             number={number} descriptionRes={responseQuestion ? responseQuestion.response_descriptionQuestion : ''} descriptionResLink={responseQuestion ? responseQuestion.response_descriptionImageLink : ''}/>
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowDescriptiveQuestionForArchive;