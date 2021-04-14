import React, { useState } from 'react';
import { QuestionPageContainer ,QuestionPageDiv,UploadSectionContainer,} from './questionPage.styles';
import Questions from '../component/questionComponent/questionComponent';
import UploadQuestions from '../component/questionComponent/uploadQuestions/uploadQiestions.component';
import FastAccessToQuestions from '../component/questionComponent/fastAccessToquestions/fastAccessToquestions.component';
//////////////////////////////
const QuestionPage = () =>{
    const [numberOfQuestions,seNumberOfQuestions] = useState('');
    return (
        <QuestionPageContainer>
            <FastAccessToQuestions seNumberOfQuestions={seNumberOfQuestions} numberOfQuestions={numberOfQuestions}/>
            <QuestionPageDiv>
                {/* <UploadSectionContainer>
                    <UploadQuestions seNumberOfQuestions={seNumberOfQuestions} numberOfQuestions={numberOfQuestions} />
                </UploadSectionContainer> */}
                <Questions seNumberOfQuestions={seNumberOfQuestions} numberOfQuestions={numberOfQuestions}/>
            </QuestionPageDiv>
        </QuestionPageContainer>
    )
};

export default QuestionPage;