import React from 'react';
import {BodyContainer,BodyQuestion,BodyQuestionBox,BodyDiv,ImageQuestion,ImageQuestionContainer,
    ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer,
    FooterQuestionContainer,FooterBtnsContainer , FooterBtn} from './showBodyQuestion.styles';
import ExplainQuestion from '../../explainQuestionComponent/explainQuestionComponent.component';
import MyPic from '../../../assets/img/images.jpg';
import MyPic2 from '../../../assets/img/image2.jpg';
/////////////////////////
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import AddIcon from '@material-ui/icons/Add';


const ShowBodyQuestions = ({question,number}) =>{
    return(
    <BodyContainer>
        <BodyQuestionBox>
            {question.exam_link ? (
                 <ImageWithQuestionContainer>
                 <ImageWithQuestion
                 // onClick={() => handleShowPic(`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`)}
                 // src={question.question_link}
                 src={MyPic2}
                 // src={`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`}
                 />
                  {/* <ExplainQuestion number={number} explain={question.question__explane} time={question.question__timeTosolveProblem}/>
                 <br />
                 <ScoreTag
                 >
                 (نمره {question.question__score})
                 </ScoreTag> */}
             </ImageWithQuestionContainer>
             ///////////////////////
               
                ) : (
                    ''
            )}
            {question.question_link ? (
                 <ImageQuestionMainContainer>
                 <ImageQuestionContainer>
                     <ImageQuestion
                     // onClick={() =>
                     //     handleShowPic(
                     //     `https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.exam_link}`,
                     //     )
                     // }
                     src={MyPic}
                     // src={question.exam_link}
                     // src={`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.exam_link}`}
                     />
                     <ExplainQuestion number={number} explain={question.question__explane} time={question.question__timeTosolveProblem}/>
                 </ImageQuestionContainer>
                 <ScoreTag
                 >
                 (نمره {question.question__score})
                 </ScoreTag>
                 
                 
             </ImageQuestionMainContainer>
            ) : question.question ? (
                <BodyDiv>
                    <BodyQuestion
                        // className={
                        // question.exam_link
                        //     ? 'questionComponent__question'
                        //     : 'questionComponent__questionwidth'
                        // }
                    >
                        {question.question.split('%0A').join('\r\n')}
                        <br/> (
                        {question.question__score} نمره)
                    </BodyQuestion>
                    <ExplainQuestion number={number} explain={question.question__explane} time={question.question__timeTosolveProblem}/>
                </BodyDiv>
            ) : (
                ''
                )}
        </BodyQuestionBox>
        {/* /////////////////////////////////footer */}
        <FooterQuestionContainer>
            <FooterBtnsContainer>
                <Tooltip title="سوال قبلی" aria-label="سوال قبلی"  style={{ fontSize:'3rem'}}>
                    <FooterBtn>
                        <ArrowBackIosIcon style={{ fontSize:'3rem'}} />
                    </FooterBtn>
                </Tooltip>
                
                <Tooltip title="سوال بعدی" aria-label="سوال بعدی" style={{ fontSize:'3rem'}}>
                    <FooterBtn>
                        <ArrowForwardIosIcon style={{ fontSize:'3rem'}} />
                    </FooterBtn>
                </Tooltip>

            </FooterBtnsContainer>
        </FooterQuestionContainer>
    </BodyContainer>
    )
};

export default ShowBodyQuestions;