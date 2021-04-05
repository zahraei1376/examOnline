import React from "react";
import {TrueAndFalseConatiner,TrueAndFalseitemDiv,Item,InputLabel,QuestionSquare} from './ShowTrueAndFalseQuestionForArchive.styles';
import ShowBodyQuestionsForArchive from '../showBodyQuestionForArchive.component';
// import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////
const ShowTrueAndFalseItemsForArchive = ({number,item})=>{

    return(
        <TrueAndFalseConatiner>
            {item.question__optionOne && item.question__optionOne != 'undefined' ? (
              <TrueAndFalseitemDiv>
                <Item>1 </Item>
                <QuestionSquare
                  style={{
                    backgroundColor:
                      item.StudentItem == '1' && item.question__currentOption == '1'
                        ? 'green'
                        : item.StudentItem == '1' &&
                        item.question__currentOption != '1'
                          ? 'red'
                          : item.question__currentOption == '1'
                            ? 'green'
                            : 'rgb(78, 76, 76)',
                  }}
                ></QuestionSquare>
                <InputLabel
                  htmlFor={`optionOne${number}`}
                >
                  {item.question__optionOne.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {item.question__optionTwo && item.question__optionTwo != 'undefined' ? (
              <TrueAndFalseitemDiv>
                <Item>2</Item>
                <QuestionSquare
                  style={{
                    backgroundColor:
                      item.StudentItem == '2' && item.question__currentOption == '2'
                        ? 'green'
                        : item.StudentItem == '2' &&
                        item.question__currentOption != '2'
                          ? 'red'
                          : item.question__currentOption == '2'
                            ? 'green'
                            : 'rgb(78, 76, 76)',
                  }}
                ></QuestionSquare>
                <InputLabel
                  htmlFor={`optionTwo${number}`}
                >
                  {item.question__optionTwo.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {/* {item.question__optionTree && item.question__optionTree != 'undefined' ? (
              <TrueAndFalseitemDiv>
                <Item>3</Item>
                <QuestionSquare
                  style={{
                    backgroundColor:
                      item.StudentItem == '3' && item.question__currentOption == '3'
                        ? 'green'
                        : item.StudentItem == '3' &&
                        item.question__currentOption != '3'
                          ? 'red'
                          : item.question__currentOption == '3'
                            ? 'green'
                            : 'rgb(78, 76, 76)',
                  }}
                ></QuestionSquare>
                <InputLabel
                  htmlFor={`optionTree${number}`}
                >
                  {item.question__optionTree.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {item.question__optionFour && item.question__optionFour != 'undefined' ? (
              <TrueAndFalseitemDiv>
                <Item>4</Item>
                <QuestionSquare
                  style={{
                    backgroundColor:
                      item.StudentItem == '4' && item.question__currentOption == '4'
                        ? 'green'
                        : item.StudentItem == '4' &&
                        item.question__currentOption != '4'
                          ? 'red'
                          : item.question__currentOption == '4'
                            ? 'green'
                            : 'rgb(78, 76, 76)',
                  }}
                ></QuestionSquare>
                <InputLabel
                  htmlFor={`optionFour${number}`}
                >
                  {item.question__optionFour.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}             */}
        </TrueAndFalseConatiner>
    )
}

const ShowTrueAndFalseQuestionForArchive = ({question, number,items}) =>{
    return(
        <ShowBodyQuestionsForArchive question={question} number={number}>
          <ShowTrueAndFalseItemsForArchive number={number} item={question} />
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowTrueAndFalseQuestionForArchive;