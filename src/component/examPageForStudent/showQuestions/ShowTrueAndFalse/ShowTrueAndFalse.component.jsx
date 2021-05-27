import React,{useEffect, useState ,useRef} from "react";
import {TrueAndFalseConatiner,TrueAndFalseitemDiv,Item,InputRadio,InputLabel} from './ShowTrueAndFalse.styles';
import ShowBodyQuestions from '../showBodyQuestion.component';
// import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////////////////////////////////////////
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getResponseStudentWithIndex } from '../../../../redux/responsesStudent/responsesStudent.selector';
/////////////////////////////////////////////////
const ShowTrueAndFalseItems = ({number,question,ResItem ,setResForRedux})=>{
    // const checkedRef = useRef(null);
    // useEffect(()=>{
    //     console.log('createeeeeeeeeeeeeee');
    //     // return ()=>{
    //     //   checkedRef.current = null;
    //     // }
    // },[])

    const [checked ,setChecked] = useState(ResItem ? ResItem : '');

    useEffect(()=>{
      // console.log('ResItem' ,ResItem);
      setResForRedux(ResItem);
      setChecked(ResItem);

      // checkedRef.current = ResItem ? ResItem : null ;
    },[ResItem]);

    const setOneAnswer = (e) =>{
      // console.log('e.target.value',e.target.value);
      setChecked(e.target.value);
      // checkedRef.current = e.target.value;
      setResForRedux(e.target.value);
    }

    const handleChecked = (checkId) =>{
      if( ResItem == checkId ){
        return true;
      }else{
        return false
      }
    }

    return(
        <TrueAndFalseConatiner>
            {question.question_optionOne && question.question_optionOne != '' ? (
              <TrueAndFalseitemDiv>
                <Item>1 </Item>
                <InputRadio
                  type="radio"
                  id={`optionOne${number}`}
                  name={number}
                  value={'1'}
                  onChange={e => setOneAnswer(e)}
                  checked = {checked == '1'}
                  // checked = {checkedRef.current == '1'}
                  // defaultChecked={checked == '1' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionOne${number}`}
                >
                  {question.question_optionOne.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {question.question_optionTwo && question.question_optionTwo != '' ? (
              <TrueAndFalseitemDiv>
                <Item>2</Item>
                <InputRadio
                  type="radio"
                  id={`optionTwo${number}`}
                  name={number}
                  value={'2'}
                  onChange={e => setOneAnswer(e)}
                  checked = {checked == '2'}
                  // checked = {checkedRef.current == '2'}
                  // defaultChecked={checked == '2' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionTwo${number}`}
                >
                  {question.question_optionTwo.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}           
        </TrueAndFalseConatiner>
    )
}

const ShowTrueAndFalseQuestion = ({question, number,ResItem ,getResponseStudentWithIndex}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}>
            <ShowTrueAndFalseItems number={number} question={question} 
            ResItem={getResponseStudentWithIndex  ? getResponseStudentWithIndex : ResItem}
            // ResItem={ResItem ? ResItem : getResponseStudentWithIndex}
            />
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
  getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowTrueAndFalseQuestion);