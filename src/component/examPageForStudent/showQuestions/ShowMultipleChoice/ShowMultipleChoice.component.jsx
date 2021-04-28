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

    // const [questionRes,setQuestionRes] = useState(Array(questions.length).fill(0).map(row => new Array(2).fill('')));

    // const handleRes = (i , text) =>{
    //     var temp =[...questionRes];
    //     temp[i][0]=i;
    //     temp[i][1]=text;
    //     setQuestionRes(temp);
    // }

    // useEffect(()=>{
    //     console.log('questionRes',questionRes);
    // },[questionRes])

    // const [checked ,setChecked] = useState(ResItem ? ResItem : '');
    const [checked ,setChecked] = useState('');
    useEffect(()=>{
      console.log('ResItem' , ResItem);
      console.log('number' , number);
      setResForRedux(ResItem);
      setChecked(ResItem);
    },[number]);

    const setOneAnswer = (e) =>{
      console.log('e.target.value',e.target.value);
      setResForRedux(e.target.value);
    }

    return(
        <MultipleChoiceConatiner>
            {question.question_optionOne && question.question_optionOne != '' ? (
              <MultipleChoiceitemDiv>
                <Item>1 </Item>
                <InputRadio
                  type="radio"
                  id={`optionOne${number}`}
                  name={number}
                  // value={number < 9 ? `0${number + 1},1` : `${number + 1},1`}
                  value={'1'}
                  onChange={e => setOneAnswer(e)}
                  // defaultChecked={checked == '1' ? true : false}
                  checked={checked == '1' ? true : false}
                />
                <InputLabel
                  // htmlFor="optionOne"
                  htmlFor={`optionOne${number}`}
                  // style={{
                  //   fontSize: '20px',
                  //   paddingRight: '10px',
                  //   paddingTop: '5px',
                  //   width:'100%',
                  //   borderRadius:'10px'
                  // }}
                // style={{
                //   fontSize: '20px',
                //   paddingRight: '10px',
                //   paddingTop: '5px',
                //   width:'100%',
                //   borderRadius:'10px'
                // }}
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
                  // value={number < 9 ? `0${number + 1},2` : `${number + 1},2`}
                  value={'2'}
                  onChange={e => setOneAnswer(e)}
                  checked={checked == '2' ? true : false}
                  // defaultChecked={checked == '2' ? true : false}
                />
                <InputLabel
                  // htmlFor="optionTwo"
                  htmlFor={`optionTwo${number}`}
                >
                  {question.question_optionTwo.split('%0A').join('\r\n')}
                </InputLabel>
                {/* <div className="questionComponent_questionSquare"></div>
        <div className="questionComponent_questionItem">
          {question.question_optionTwo}
        </div> */}
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
                  // value={number < 9 ? `0${number + 1},3` : `${number + 1},3`}
                  value={'3'}
                  onChange={e => setOneAnswer(e)}
                  checked={checked == '3' ? true : false}
                  // defaultChecked={checked == '3' ? true : false}
                />
                <InputLabel
                  // htmlFor="optionTree"
                  htmlFor={`optionTree${number}`}
                >
                  {question.question_optionThree.split('%0A').join('\r\n')}
                </InputLabel>
                {/* <div className="questionComponent_questionSquare"></div>
            <div className="questionComponent_questionItem">
              {question.question_optionThree}
            </div> */}
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
                  // value={number < 9 ? `0${number + 1},4` : `${number + 1},4`}
                  value={'4'}
                  onChange={e => setOneAnswer(e)}
                  checked={checked == '4' ? true : false}
                  // defaultChecked={checked == '4' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionFour${number}`}
                >
                  {question.question_optionFour.split('%0A').join('\r\n')}
                </InputLabel>
                {/* <div className="questionComponent_questionSquare"></div>
            <div className="questionComponent_questionItem">
              {question.question_optionFour}
            </div> */}
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}            
        </MultipleChoiceConatiner>
    )
}

const ShowMultipleChoiceQuestion = ({question, number,ResItem ,getResponseStudentWithIndex}) =>{
  // console.log('ResItemMain' ,ResItem)
    return(
        <ShowBodyQuestions question={question} number={number}>
          <ShowMultipleChoiceItems number={number} question={question} ResItem={ResItem ? ResItem : getResponseStudentWithIndex}/>
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
  getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowMultipleChoiceQuestion);