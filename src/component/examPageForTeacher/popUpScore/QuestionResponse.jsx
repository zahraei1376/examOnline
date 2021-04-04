// import { green } from '@material-ui/core/colors';
import React, { useState } from 'react';
// import ShowImage from '../imageShow/showImage';
import './QuestionResponse.styles.jsx';
// import '../axamPage/explainQuestion.scss';
//   question__currentOption
//   question__timeTosolveProblem
//   question__score
//   question__explane
const QuestionResponse = ({
  key,
  question,
  StudentItem,
  number,
  setImageSrc,
  setCaptionImage,
  showPic,
  setType,
}) => {
  const [showExplain, setShowExplain] = useState(false);
  const handleShowExplain = () => {
    setShowExplain(!showExplain);
  };

  const handleShowPic = link => {
    if (question.question) {
      setType(true);
      setCaptionImage(
        `${question.question.split('%0A').join('\r\n')}(نمره : ${question.question__score
        })`,
      );
      setImageSrc(link);
      showPic();
    } else {
      setType(false);
      setCaptionImage('');
      setImageSrc(link);
      showPic();
    }

  };
  return (
    <div key={key} className="questionResponse">
      <div className="questionResponse__questionDiv">
        {question.exam_link ? (
          <div className="p1BoxResponse">
            <img
              className="boxedResponse"
              onClick={() =>
                handleShowPic(
                  `https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.exam_link}`,
                )
              }
              src={`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.exam_link}`}
            />
          </div>
        ) : (
            ''
          )}
        {question.question_link ? (
          <div>
            <img
              className="boxedResponseQuestionImage"
              onClick={() => handleShowPic(`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`)}
              src={`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`}
            />
            <br />
            <p
              style={{
                fontFamily: 'BNazanin',
                fontSize: '18px',
                marginTop: '10px',
              }}
            >
              ({question.question__score} نمره)
            </p>
          </div>
        ) : question.question ? (
          <pre
            className={
              question.exam_link
                ? 'questionResponse__question'
                : 'questionResponse__questionwidth'
            }
          >
            {question.question.split('%0A').join('\r\n')}(
            {question.question__score} نمره)
          </pre>
        ) : (
              ''
            )}
        {/* <pre className="questionResponse__question">{question.question.split('%0A').join('\r\n')}({question.question__score})</pre> */}
        <div className="explainQuestion_btnDiv">
          <button className="explainQuestion_btn" onClick={handleShowExplain}>
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
        </div>
      </div>
      <div className="explainQuestion" id="explain">
        {showExplain ? (
          <div className="explainQuestion_explainBox">
            {question.question__explane != 'undefined' ? (
              <pre className="questionResponse_explain-p">
                توضیحات : {question.question__explane.split('%0A').join('\r\n')}
              </pre>
            ) : (
                ''
              )}
            {question.question__timeTosolveProblem != 'undefined' ? (
              <p className="questionResponse_explain-p">
                زمان : {question.question__timeTosolveProblem}
              </p>
            ) : (
                ''
              )}
            {/* {question.question__score != "undefined" ? <p className="questionResponse_explain-p">نمره : {question.question__score}</p> : ''} */}
          </div>
        ) : (
            ''
          )}
      </div>
      {/* <div className="questionResponse__questionExplainDiv">
        <div className="questionResponse_explain">
          {question.question__explane != "undefined" ? question.question__explane : ''}
          {question.question__timeTosolveProblem != "undefined" ? <p>زمان : {question.question__timeTosolveProblem}</p> : ''}
          {question.question__score != "undefined" ? <p>نمره : {question.question__score}</p> : ''}
        </div>
        <div className="questionResponse__questionDiv">
          <div className="questionResponse__question">{question.question}</div>
          <div className="questionResponse__questionCircle">{number + 1}</div>
        </div>
      </div> */}
      <div>
        {question.question__optionOne != 'undefined' ? (
          <div className="questionResponse__itemDiv">
            <div
              className="questionResponse_questionSquare"
              style={{
                backgroundColor:
                  StudentItem == '1' && question.question__currentOption == '1'
                    ? 'green'
                    : StudentItem == '1' &&
                      question.question__currentOption != '1'
                      ? 'red'
                      : question.question__currentOption == '1'
                        ? 'green'
                        : 'rgb(78, 76, 76)',
              }}
            ></div>
            <pre className="questionResponse_questionItem">
              {question.question__optionOne.split('%0A').join('\r\n')}
            </pre>
          </div>
        ) : (
            ''
          )}
        {question.question__optionTwo != 'undefined' ? (
          <div className="questionResponse__itemDiv">
            <div
              className="questionResponse_questionSquare"
              style={{
                backgroundColor:
                  StudentItem == '2' && question.question__currentOption == '2'
                    ? 'green'
                    : StudentItem == '2' &&
                      question.question__currentOption != '2'
                      ? 'red'
                      : question.question__currentOption == '2'
                        ? 'green'
                        : 'rgb(78, 76, 76)',
              }}
            ></div>
            <pre className="questionResponse_questionItem">
              {question.question__optionTwo.split('%0A').join('\r\n')}
            </pre>
          </div>
        ) : (
            ''
          )}
        {question.question__optionTree != 'undefined' ? (
          <div className="questionResponse__itemDiv">
            <div
              className="questionResponse_questionSquare"
              style={{
                backgroundColor:
                  StudentItem == '3' && question.question__currentOption == '3'
                    ? 'green'
                    : StudentItem == '3' &&
                      question.question__currentOption != '3'
                      ? 'red'
                      : question.question__currentOption == '3'
                        ? 'green'
                        : 'rgb(78, 76, 76)',
              }}
            ></div>
            <pre className="questionResponse_questionItem">
              {question.question__optionTree.split('%0A').join('\r\n')}
            </pre>
          </div>
        ) : (
            ''
          )}
        {question.question__optionFour != 'undefined' ? (
          <div className="questionResponse__itemDiv">
            <div
              className="questionResponse_questionSquare"
              style={{
                backgroundColor:
                  StudentItem == '4' && question.question__currentOption == '4'
                    ? 'green'
                    : StudentItem == '4' &&
                      question.question__currentOption != '4'
                      ? 'red'
                      : question.question__currentOption == '4'
                        ? 'green'
                        : 'rgb(78, 76, 76)',
              }}
            // style={{
            //   backgroundColor:
            //     StudentItem != question.question__currentOption
            //       ? 'red'
            //       : StudentItem == question.question__currentOption
            //       ? 'green'
            //       : 'rgb(78, 76, 76)',
            // }}
            ></div>
            <pre className="questionResponse_questionItem">
              {question.question__optionFour.split('%0A').join('\r\n')}
            </pre>
          </div>
        ) : (
            ''
          )}

        {StudentItem == 'null' ? (
          <p className="questionResponse_questionItem-p">
            سوال جواب داده نشده است
          </p>
        ) : (
            ''
          )}
      </div>
    </div>
  );
};

export default QuestionResponse;
