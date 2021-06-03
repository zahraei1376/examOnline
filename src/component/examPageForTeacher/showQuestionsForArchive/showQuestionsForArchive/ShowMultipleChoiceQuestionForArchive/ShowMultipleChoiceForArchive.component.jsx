import React from "react";
import {MultipleChoiceConatiner,MultipleChoiceitemDiv,Item,InputLabel,QuestionSquare} from './ShowMultipleChoiceForArchive.styles';
import ShowBodyQuestionsForArchive from '../showBodyQuestionForArchive.component';
// import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////
const ShowMultipleChoiceItemsForArchive = ({number,item ,StudentItem})=>{

    return(
        <MultipleChoiceConatiner>
            {item.question_optionOne && item.question_optionOne != 'undefined' ? (
              <MultipleChoiceitemDiv>
                <Item>1 </Item>
                <QuestionSquare
                  style={{
                    backgroundColor:
                      StudentItem == '1' && item.question_correctOption == '1'
                        ? 'green'
                        : StudentItem == '1' &&
                        item.question_correctOption != '1'
                          ? 'red'
                          : item.question_correctOption == '1'
                            ? 'green'
                            : 'rgb(78, 76, 76)',
                  }}
                ></QuestionSquare>
                <InputLabel
                  htmlFor={`optionOne${number}`}
                >
                  {item.question_optionOne.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {item.question_optionTwo && item.question_optionTwo != 'undefined' ? (
              <MultipleChoiceitemDiv>
                <Item>2</Item>
                <QuestionSquare
                  style={{
                    backgroundColor:
                      StudentItem == '2' && item.question_correctOption == '2'
                        ? 'green'
                        : StudentItem == '2' &&
                        item.question_correctOption != '2'
                          ? 'red'
                          : item.question_correctOption == '2'
                            ? 'green'
                            : 'rgb(78, 76, 76)',
                  }}
                ></QuestionSquare>
                <InputLabel
                  htmlFor={`optionTwo${number}`}
                >
                  {item.question_optionTwo.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {item.question_optionThree && item.question_optionThree != 'undefined' ? (
              <MultipleChoiceitemDiv>
                <Item>3</Item>
                <QuestionSquare
                  style={{
                    backgroundColor:
                      StudentItem == '3' && item.question_correctOption == '3'
                        ? 'green'
                        : StudentItem == '3' &&
                        item.question_correctOption != '3'
                          ? 'red'
                          : item.question_correctOption == '3'
                            ? 'green'
                            : 'rgb(78, 76, 76)',
                  }}
                ></QuestionSquare>
                <InputLabel
                  htmlFor={`optionTree${number}`}
                >
                  {item.question_optionThree.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {item.question_optionFour && item.question_optionFour != 'undefined' ? (
              <MultipleChoiceitemDiv>
                <Item>4</Item>
                <QuestionSquare
                  style={{
                    backgroundColor:
                      StudentItem == '4' && item.question_correctOption == '4'
                        ? 'green'
                        : StudentItem == '4' &&
                        item.question_correctOption != '4'
                          ? 'red'
                          : item.question_correctOption == '4'
                            ? 'green'
                            : 'rgb(78, 76, 76)',
                  }}
                ></QuestionSquare>
                <InputLabel
                  htmlFor={`optionFour${number}`}
                >
                  {item.question_optionFour.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}   
        </MultipleChoiceConatiner>
    )
}

const ShowMultipleChoiceQuestionForArchive = ({question, number,type,responseQuestion}) =>{
    return(
        <ShowBodyQuestionsForArchive myType={type} question={question} number={number} responseScore = {responseQuestion ? responseQuestion.response_score : ''}>
          <ShowMultipleChoiceItemsForArchive number={number} item={question} StudentItem={responseQuestion ? responseQuestion.response_studentItem : ''} />
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowMultipleChoiceQuestionForArchive;