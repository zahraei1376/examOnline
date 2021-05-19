import React,{useEffect, useState} from "react";
import {MultipleChoiceConatiner,MultipleChoiceitemDiv,Item,InputRadio,InputLabel} from './ShowMultipleChoice.styles';
import ShowBodyQuestions from '../showBodyQuestion.component';
// import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////////////////////////////////////////
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getResponseStudentWithIndex } from '../../../../redux/responsesStudent/responsesStudent.selector';
/////////////////////////////////////////////////
const ShowMultipleChoiceItems = ({number,question,ResItem ,setResForRedux})=>{

    const [checked , setChecked] = useState(ResItem);
    useEffect(()=>{
      console.log('question.id' , question.id);
      console.log('MyResItem' , ResItem);
      console.log('number' , number);
      setResForRedux(ResItem);
      setChecked(ResItem);
    },[ResItem]);

    const setOneAnswer = (e) =>{
      /////////////////////
      console.log('e.target.value',e.target.value);
      setChecked(e.target.value);
      // checkedRef.current = e.target.value;
      setResForRedux(e.target.value);
    }

    useEffect(()=>{
      console.log('createeeeeeeeeeeeeee');
  },[])

    return(
        <MultipleChoiceConatiner>
            {question.question_optionOne && question.question_optionOne != '' ? (
              <MultipleChoiceitemDiv>
                <Item>1 </Item>
                <InputRadio
                  type="radio"
                  id={`optionOne${number}`}
                  name={number}
                  value={'1'}
                  onChange={e => setOneAnswer(e)}
                  checked = {checked == '1'}
                  // defaultChecked={checked === '1' ? true : false}
                  
                  // defaultChecked={number === '1' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionOne${number}`}
                >
                  {question.question_optionOne.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {question.question_optionTwo && question.question_optionTwo != '' ? (
              <MultipleChoiceitemDiv>
                <Item>2</Item>
                <InputRadio
                  type="radio"
                  id={`optionTwo${number}`}
                  name={number}
                  value={'2'}
                  onChange={e => setOneAnswer(e)}
                  checked = {checked == '2'}
                  // defaultChecked={checked == '2' ? true : false}
                  // defaultChecked={number === '2' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionTwo${number}`}
                >
                  {question.question_optionTwo.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {question.question_optionThree && question.question_optionThree != '' ? (
              <MultipleChoiceitemDiv>
                <Item>3</Item>
                <InputRadio
                  type="radio"
                  id={`optionTree${number}`}
                  name={number}
                  value={'3'}
                  onChange={e => setOneAnswer(e)}
                  // defaultChecked={checked === '3' ? true : false}
                  checked = {checked == '3'}
                  // defaultChecked={number === '3' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionTree${number}`}
                >
                  {question.question_optionThree.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {question.question_optionFour && question.question_optionFour != '' ? (
              <MultipleChoiceitemDiv>
                <Item>4</Item>
                <InputRadio
                  type="radio"
                  id={`optionFour${number}`}
                  name={number}
                  value={'4'}
                  onChange={e => setOneAnswer(e)}
                  checked = {checked == '4'}
                  // defaultChecked={checked === '4' ? true : false}
                  // defaultChecked={number === '4' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionFour${number}`}
                >
                  {question.question_optionFour.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}            
        </MultipleChoiceConatiner>
    )
}

const ShowMultipleChoiceQuestion = ({question, number,ResItem ,getResponseStudentWithIndex}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}>
          <ShowMultipleChoiceItems number={number} question={question} 
          ResItem={getResponseStudentWithIndex  ? getResponseStudentWithIndex : ResItem}
          // ResItem={ResItem ? ResItem : getResponseStudentWithIndex}
          />
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
  getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowMultipleChoiceQuestion);