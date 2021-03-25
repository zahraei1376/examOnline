import React from 'react';
import { QuestionPageContainer } from './questionPage.styles';
import Questions from '../component/questionComponent/questionComponent';


const QuestionPage = () =>{
    return (
        <QuestionPageContainer>
            <Questions/>
        </QuestionPageContainer>
    )
};

export default QuestionPage;