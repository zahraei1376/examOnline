import React from "react";
import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,ImageQuestion,ImageQuestionContainer,
    ImageWithQuestionContainer , ImageWithQuestion,ScoreTag} from './ShowDescriptiveQuestion.styles';
import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';

const ShowDescriptiveQuestion = ({question, number}) =>{
    return(
        <DescriptiveContainer>
            <DescriptiveQuestionBox>
                {question.exam_link ? (
                    <ImageQuestionContainer>
                        <ImageQuestion
                        // onClick={() =>
                        //     handleShowPic(
                        //     `https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.exam_link}`,
                        //     )
                        // }
                        src={`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.exam_link}`}
                        />
                    </ImageQuestionContainer>
                    ) : (
                        ''
                )}
                {question.question_link ? (
                <ImageWithQuestionContainer>
                    <ImageWithQuestion
                    // onClick={() => handleShowPic(`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`)}
                    src={`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`}
                    />
                    <br />
                    <ScoreTag
                    >
                    (نمره {question.question__score})
                    </ScoreTag>
                </ImageWithQuestionContainer>
                ) : question.question ? (
                <DescriptiveQuestion
                    // className={
                    // question.exam_link
                    //     ? 'questionComponent__question'
                    //     : 'questionComponent__questionwidth'
                    // }
                >
                    {question.question.split('%0A').join('\r\n')}(
                    {question.question__score} نمره)
                </DescriptiveQuestion>
                ) : (
                    ''
                    )}
                {/* <div className="explainQuestion_btnDiv"> */}
                    <ExplainQuestion number={number} explain={question.question__explane} time={question.question__timeTosolveProblem}/>
                {/* <button className="explainQuestion_btn" onClick={handleShowExplain}>
                    <div className="showNumber">{number + 1}</div>
                    <div className="showArr">
                    {!showExplain ? (
                        <i className="fa fa-arrow-down btnIcon" aria-hidden="true"></i>
                    ) : (
                        <i
                            className="fa fa-arrow-up btnIcon btnIconcolor"
                            aria-hidden="true"
                        ></i>
                        )}
                    </div>
                </button>
                <i className="fa fa-arrow-left arrowToLeft"></i>
                </div> */}

            
            </DescriptiveQuestionBox>
      {/* <div className="explainQuestion" id="explain">
        {showExplain ? (
          <div className="explainQuestion_explainBox">
            {question.question__explane != 'undefined' ? (
              <pre className="questionComponent_explain-p">
                توضیحات : {question.question__explane.split('%0A').join('\r\n')}
              </pre>
            ) : (
                ''
              )}
            {question.question__timeTosolveProblem != 'undefined' ? (
              <p className="questionComponent_explain-p">
                زمان : {question.question__timeTosolveProblem}
              </p>
            ) : (
                ''
              )}
          </div>
        ) : (
            ''
          )}
      </div>
      <div className="questionComponent__itemBox">
        {question.question__optionOne != 'undefined' ? (
          <div className="questionComponent__itemDiv">
            <h6 className="item">1 </h6>
            <input
              type="radio"
              id={`optionOne${number}`}
              name={number}
              className="questionComponent__checkbox"
              value={number < 9 ? `0${number + 1},1` : `${number + 1},1`}
              onChange={e => setOneAnswer(e)}
              defaultChecked={checked == '1' ? true : false}
            />
            <label
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
              {question.question__optionOne.split('%0A').join('\r\n')}
            </label>
          </div>
        ) : (
            ''
          )}
        {question.question__optionTwo != 'undefined' ? (
          <div className="questionComponent__itemDiv">
            <h6 className="item">2</h6>
            <input
              type="radio"
              id={`optionTwo${number}`}
              name={number}
              className="questionComponent__checkbox"
              value={number < 9 ? `0${number + 1},2` : `${number + 1},2`}
              onChange={e => setOneAnswer(e)}
              defaultChecked={checked == '2' ? true : false}
            />
            <label
              // htmlFor="optionTwo"
              htmlFor={`optionTwo${number}`}
            >
              {question.question__optionTwo.split('%0A').join('\r\n')}
            </label>
          </div>
        ) : (
            ''
          )}
        {question.question__optionTree != 'undefined' ? (
          <div className="questionComponent__itemDiv">
            <h6 className="item">3</h6>
            <input
              type="radio"
              id={`optionTree${number}`}
              name={number}
              className="questionComponent__checkbox"
              value={number < 9 ? `0${number + 1},3` : `${number + 1},3`}
              onChange={e => setOneAnswer(e)}
              defaultChecked={checked == '3' ? true : false}
            />
            <label
              // htmlFor="optionTree"
              htmlFor={`optionTree${number}`}
            >
              {question.question__optionTree.split('%0A').join('\r\n')}
            </label>
          </div>
        ) : (
            ''
          )}
        {question.question__optionFour != 'undefined' ? (
          <div className="questionComponent__itemDiv">
            <h6 className="item">4</h6>
            <input
              type="radio"
              id={`optionFour${number}`}
              name={number}
              className="questionComponent__checkbox"
              value={number < 9 ? `0${number + 1},4` : `${number + 1},4`}
              onChange={e => setOneAnswer(e)}
              defaultChecked={checked == '4' ? true : false}
            />
            <label
              htmlFor={`optionFour${number}`}
            >
              {question.question__optionFour.split('%0A').join('\r\n')}
            </label>
          </div>
        ) : (
            ''
          )}
      </div> */}


        </DescriptiveContainer>
    )
};

export default ShowDescriptiveQuestion;