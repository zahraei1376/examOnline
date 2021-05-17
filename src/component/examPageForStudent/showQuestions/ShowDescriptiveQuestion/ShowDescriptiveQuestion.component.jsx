import React,{useEffect, useState} from "react";
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
/////////////////////////
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getResponseStudentWithIndex } from '../../../../redux/responsesStudent/responsesStudent.selector';



const DescriptionItem = ({number ,setResForRedux ,setResponseDesImage ,ResItem ,ResItemImage ,
    // setResponseQuestion ,responseQuestion
})=>{

    const [responseQuestion,setResponseQuestion] = useState(ResItem ? ResItem : '');
    useEffect(()=>{
        console.log('ResItem' ,ResItem);
        setResponseDesImage(ResItemImage ? ResItemImage : '')
        setResForRedux(ResItem ? ResItem : '');
        setResponseQuestion(ResItem ? ResItem : '');
    },[ResItem]);

    // useEffect(()=>{
    //     console.log('createeeeeeeeeeeeeee');
    // },[])

    const handleChange = (e) =>{
        setResponseQuestion(e.target.value);
        setResForRedux(e.target.value);
        // resForRedux = e.target.value;
    }

    const handleGetFileName = (fileName) => {
        setResponseDesImage(fileName);
    }

    return(
        <DescriptionItemConatiner>
            <Tooltip title="آپلود جواب">
                <Uploader handleGetFileName={handleGetFileName} fildID={number} />
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

const ShowDescriptiveQuestion = ({question, number ,ResItem ,ResItemImage, getResponseStudentWithIndex}) =>{
    
    // useEffect(()=>{
    //     console.log('ResItem',ResItem);
    // },[])



    // useEffect(()=>{
    //     console.log('Main createeeeeeeeeeeeeee');
    //     console.log('ResItem Main' ,ResItem);
    // },[])
    return(
        <ShowBodyQuestions question={question} number={number} ResItem={ResItem ? ResItem : getResponseStudentWithIndex}>
            <DescriptionItem number={number} ResItem={ResItem ? ResItem : getResponseStudentWithIndex} ResItemImage={ResItemImage} />  
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
    getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowDescriptiveQuestion);