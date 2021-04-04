import React,{useEffect, useState} from "react";
import {MultipleChoiceConatiner,MultipleChoiceitemDiv,Item,InputRadio,InputLabel} from './ShowMultipleChoiceForArchive.styles';
import ShowBodyQuestions from '../showBodyQuestionForArchive.component';
// import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////
const ShowMultipleChoiceItems = ({number,item})=>{

    // const [questionRes,setQuestionRes] = useState(Array(items.length).fill(0).map(row => new Array(2).fill('')));

    // const handleRes = (i , text) =>{
    //     var temp =[...questionRes];
    //     temp[i][0]=i;
    //     temp[i][1]=text;
    //     setQuestionRes(temp);
    // }

    // useEffect(()=>{
    //     console.log('questionRes',questionRes);
    // },[questionRes])

    return(
        <MultipleChoiceConatiner>
            {item.question__optionOne && item.question__optionOne != 'undefined' ? (
              <MultipleChoiceitemDiv>
                <Item>1 </Item>
                <InputRadio
                  type="radio"
                  id={`optionOne${number}`}
                  name={number}
                  value={number < 9 ? `0${number + 1},1` : `${number + 1},1`}
                  // onChange={e => setOneAnswer(e)}
                  // defaultChecked={checked == '1' ? true : false}
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
                  {item.question__optionOne.split('%0A').join('\r\n')}
                </InputLabel>
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {item.question__optionTwo && item.question__optionTwo != 'undefined' ? (
              <MultipleChoiceitemDiv>
                <Item>2</Item>
                <InputRadio
                  type="radio"
                  id={`optionTwo${number}`}
                  name={number}
                  value={number < 9 ? `0${number + 1},2` : `${number + 1},2`}
                  // onChange={e => setOneAnswer(e)}
                  // defaultChecked={checked == '2' ? true : false}
                />
                <InputLabel
                  // htmlFor="optionTwo"
                  htmlFor={`optionTwo${number}`}
                >
                  {item.question__optionTwo.split('%0A').join('\r\n')}
                </InputLabel>
                {/* <div className="questionComponent_questionSquare"></div>
        <div className="questionComponent_questionItem">
          {question.question__optionTwo}
        </div> */}
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {item.question__optionTree && item.question__optionTree != 'undefined' ? (
              <MultipleChoiceitemDiv>
                <Item>3</Item>
                <InputRadio
                  type="radio"
                  id={`optionTree${number}`}
                  name={number}
                  value={number < 9 ? `0${number + 1},3` : `${number + 1},3`}
                  // onChange={e => setOneAnswer(e)}
                  // defaultChecked={checked == '3' ? true : false}
                />
                <InputLabel
                  // htmlFor="optionTree"
                  htmlFor={`optionTree${number}`}
                >
                  {item.question__optionTree.split('%0A').join('\r\n')}
                </InputLabel>
                {/* <div className="questionComponent_questionSquare"></div>
            <div className="questionComponent_questionItem">
              {question.question__optionTree}
            </div> */}
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}
            {item.question__optionFour && item.question__optionFour != 'undefined' ? (
              <MultipleChoiceitemDiv>
                <Item>4</Item>
                <InputRadio
                  type="radio"
                  id={`optionFour${number}`}
                  name={number}
                  value={number < 9 ? `0${number + 1},4` : `${number + 1},4`}
                  // onChange={e => setOneAnswer(e)}
                  // defaultChecked={checked == '4' ? true : false}
                />
                <InputLabel
                  htmlFor={`optionFour${number}`}
                >
                  {item.question__optionFour.split('%0A').join('\r\n')}
                </InputLabel>
                {/* <div className="questionComponent_questionSquare"></div>
            <div className="questionComponent_questionItem">
              {question.question__optionFour}
            </div> */}
              </MultipleChoiceitemDiv>
            ) : (
                ''
              )}            
        </MultipleChoiceConatiner>
    )
}

const ShowMultipleChoiceQuestion = ({question, number,items}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}><ShowMultipleChoiceItems number={number} item={question}/></ShowBodyQuestions>
    )
};

export default ShowMultipleChoiceQuestion;