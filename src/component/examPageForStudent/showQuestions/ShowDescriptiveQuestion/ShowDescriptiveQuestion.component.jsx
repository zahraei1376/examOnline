import React from "react";
import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
    ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
import MyPic from '../../../../assets/img/images.jpg';
import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestions from '../showBodyQuestion.component';

const ShowDescriptiveQuestion = ({question, number}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}/>
        // <DescriptiveContainer>
        //     <DescriptiveQuestionBox>
        //         {question.exam_link ? (
        //              <ImageWithQuestionContainer>
        //              <ImageWithQuestion
                     
        //              src={MyPic2}
        //              />
                   
        //          </ImageWithQuestionContainer>
        //          ///////////////////////
                   
        //             ) : (
        //                 ''
        //         )}
        //         {question.question_link ? (
        //              <ImageQuestionMainContainer>
        //              <ImageQuestionContainer>
        //                  <ImageQuestion
                       
        //                  src={MyPic}
        //                  />
        //                  <ExplainQuestion number={number} explain={question.question__explane} time={question.question__timeTosolveProblem}/>
        //              </ImageQuestionContainer>
        //              <ScoreTag
        //              >
        //              (نمره {question.question__score})
        //              </ScoreTag>
                     
                     
        //          </ImageQuestionMainContainer>
        //         ) : question.question ? (
        //             <DescriptiveDiv>
        //                 <DescriptiveQuestion
                        
        //                 >
        //                     {question.question.split('%0A').join('\r\n')}
        //                     <br/> (
        //                     {question.question__score} نمره)
        //                 </DescriptiveQuestion>
        //                 <ExplainQuestion number={number} explain={question.question__explane} time={question.question__timeTosolveProblem}/>
        //             </DescriptiveDiv>
        //         ) : (
        //             ''
        //             )}
        //     </DescriptiveQuestionBox>
        // </DescriptiveContainer>
    )
};

export default ShowDescriptiveQuestion;