import React,{useEffect, useState} from "react";
import {TrueAndFalseConatiner,TrueAndFalseitemDiv,Item,InputRadio,InputLabel} from './ShowTrueAndFalse.styles';
import ShowBodyQuestions from '../showBodyQuestion.component';
// import ShowComparativeItem from './compareItem/ShowComparativeItem.component';
/////////////
const ShowTrueAndFalseItems = ({number,item})=>{

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
        <TrueAndFalseConatiner>
            {item.question_optionOne && item.question_optionOne != 'undefined' ? (
              <TrueAndFalseitemDiv>
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
                  {item.question_optionOne.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {item.question_optionTwo && item.question_optionTwo != 'undefined' ? (
              <TrueAndFalseitemDiv>
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
                  {item.question_optionTwo.split('%0A').join('\r\n')}
                </InputLabel>
                {/* <div className="questionComponent_questionSquare"></div>
        <div className="questionComponent_questionItem">
          {question.question_optionTwo}
        </div> */}
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {item.question_optionThree && item.question_optionThree != 'undefined' ? (
              <TrueAndFalseitemDiv>
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
                  {item.question_optionThree.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}
            {item.question_optionFour && item.question_optionFour != 'undefined' ? (
              <TrueAndFalseitemDiv>
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
                  {item.question_optionFour.split('%0A').join('\r\n')}
                </InputLabel>
              </TrueAndFalseitemDiv>
            ) : (
                ''
              )}            
        </TrueAndFalseConatiner>
    )
}

const ShowTrueAndFalseQuestion = ({question, number,items}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}><ShowTrueAndFalseItems number={number} item={question}/></ShowBodyQuestions>
    )
};

export default ShowTrueAndFalseQuestion;