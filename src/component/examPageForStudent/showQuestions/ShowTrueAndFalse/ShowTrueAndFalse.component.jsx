import React,{useEffect, useState} from "react";
import {TrueAndFalseConatiner,TrueAndFalseitemDiv,Item,InputRadio,InputLabel} from './ShowTrueAndFalse.styles';
import ShowBodyQuestions from '../showBodyQuestion.component';
// import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////////////////////////////////////////
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getResponseStudentWithIndex } from '../../../../redux/responsesStudent/responsesStudent.selector';
/////////////////////////////////////////////////
const ShowTrueAndFalseItems = ({number,question,ResItem ,setResForRedux})=>{

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
    const [checked ,setChecked] = useState(ResItem ? ResItem : '');

    useEffect(()=>{
      console.log('ResItem' ,ResItem);
      setResForRedux(ResItem);
  },[]);

    const setOneAnswer = (e) =>{
      console.log('e.target.value',e.target.value);
      setResForRedux(e.target.value);
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
                  // value={number < 9 ? `0${number + 1},1` : `${number + 1},1`}
                  value={'1'}
                  onChange={e => setOneAnswer(e)}
                  defaultChecked={checked == '1' ? true : false}
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
                  // value={number < 9 ? `0${number + 1},2` : `${number + 1},2`}
                  value={'2'}
                  onChange={e => setOneAnswer(e)}
                  defaultChecked={checked == '2' ? true : false}
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
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {question.question_optionThree && question.question_optionThree != '' ? (
              <TrueAndFalseitemDiv>
                <Item>3</Item>
                <InputRadio
                  type="radio"
                  id={`optionTree${number}`}
                  name={number}
                  value={'3'}
                  // value={number < 9 ? `0${number + 1},3` : `${number + 1},3`}
                  onChange={e => setOneAnswer(e)}
                  // defaultChecked={checked == '3' ? true : false}
                />
                <InputLabel
                  // htmlFor="optionTree"
                  htmlFor={`optionTree${number}`}
                >
                  {question.question_optionThree.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {question.question_optionFour && question.question_optionFour != '' ? (
              <TrueAndFalseitemDiv>
                <Item>4</Item>
                <InputRadio
                  type="radio"
                  id={`optionFour${number}`}
                  name={number}
                  // value={number < 9 ? `0${number + 1},4` : `${number + 1},4`}
                  value={'4'}
                  onChange={e => setOneAnswer(e)}
                  // defaultChecked={checked == '4' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionFour${number}`}
                >
                  {question.question_optionFour.split('%0A').join('\r\n')}
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
          <ShowTrueAndFalseItems number={number} question={question} ResItem={ResItem ? ResItem : getResponseStudentWithIndex}/>
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
  getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowTrueAndFalseQuestion);