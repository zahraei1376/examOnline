import React from "react";
import {TrueAndFalseConatiner,TrueAndFalseitemDiv,Item,InputLabel,QuestionSquare} from './ShowTrueAndFalseQuestionForArchive.styles';
import ShowBodyQuestionsForArchive from '../showBodyQuestionForArchive.component';
// import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////
const ShowTrueAndFalseItemsForArchive = ({number,item ,StudentItem})=>{

    return(
        <TrueAndFalseConatiner>
            {item.question_optionOne && item.question_optionOne != 'undefined' ? (
              <TrueAndFalseitemDiv>
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
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {item.question_optionTwo && item.question_optionTwo != 'undefined' ? (
              <TrueAndFalseitemDiv>
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
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {/* {item.question_optionThree && item.question_optionThree != 'undefined' ? (
              <TrueAndFalseitemDiv>
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
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {item.question_optionFour && item.question_optionFour != 'undefined' ? (
              <TrueAndFalseitemDiv>
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
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}             */}
        </TrueAndFalseConatiner>
    )
}

const ShowTrueAndFalseQuestionForArchive = ({question, number,type ,responseQuestion}) =>{
    return(
        <ShowBodyQuestionsForArchive myType={type} question={question} number={number} responseScore = {responseQuestion ? responseQuestion.response_score : ''}>
          <ShowTrueAndFalseItemsForArchive number={number} item={question} StudentItem={responseQuestion ? responseQuestion.response_studentItem : ''} />
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowTrueAndFalseQuestionForArchive;