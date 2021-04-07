import React, { useState, useEffect, useContext } from 'react';
import {PopUpScoreContainer ,PopUpScoreContent,PopUpScoreHeader,PopUpScoreHeaderGroup,PopUpScoreHeaderTime,PopUpScoreHeaderDelay,
  PopUpScoreBtnClose,PopUpScorePageQuesion} from './popUpScore.styles.jsx';
import QuestionResponse from './QuestionResponse';
import moment from 'moment';
// import ShowImage from '../imageShow/showImage';
import { useSelector } from 'react-redux';
import ExamPageForTeacher from '../examPageForTeacher.component';
// import AppContext from 'app/AppContext';
const graphql_server_uri = '/graphql';


const PopUpScore = props => {
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  const [questionResponse, setQuestionResponse] = useState([]);
  const [questionResponseStudent, setQuestionResponseStudent] = useState([]);
  const [delay, setDelay] = useState('0');
  /////////////////////////////////////////

  const [imageSrc, setImageSrc] = useState('');
  const [captionImage, setCaptionImage] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [type, setType] = useState(false);

  const showPic = () => {
    setShowImage(!showImage)
  }
  /////////////////////////////////////

  // useEffect(() => {
  //   /////////////////////////////
  //   if (user.role.indexOf('student') !== -1) {
  //     fetch(graphql_server_uri, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         query: `
  //                   mutation{
  //                       getQuestions(
  //                           axamQuestion_input: {
  //                               axamQuestions_id: "${props.axamIdProps}"
  //                         }
  //                       ){
  //                           axamQuestions_id
  //                           question
  //                           question_link
  //                           question_optionOne
  //                           question_optionTwo
  //                           question_optionThree
  //                           question_optionFour
  //                           question_currentOption
  //                           question_timeTosolveProblem
  //                           question_score
  //                           question_explane
  //                           exam_link
  //                       }
  //                   }
  //               `,
  //       }),
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         var Questions = res.data.getQuestions;
  //         // setQuestionResponse(res.data.getQuestions);
  //         fetch(graphql_server_uri, {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             query: `
  //                       mutation{
  //                         getAxamResponse(
  //                           axamResponse_input: {
  //                             exam_id: "${props.axamIdProps}"
  //                             student_id: "${user.user.person_id}"
  //                             examResponse_className: "${user.user.class_name}"
  //                             examResponse_level: "${user.user.level}"
  //                             }
  //                           ){
  //                             exam_id
  //                             student_id
  //                             exam_QuestionResponse
  //                             exam_delay
  //                           }
  //                       }
  //                   `,
  //           }),
  //         })
  //           .then(res => res.json())
  //           .then(res => {
  //             if (res.data.getAxamResponse) {
  //               var tempArray = res.data.getAxamResponse.exam_QuestionResponse[0].split(
  //                 '$',
  //               );
  //               setDelay(res.data.getAxamResponse.exam_delay);
  //               setQuestionResponseStudent(tempArray);
  //               setQuestionResponse(Questions);
  //             } else {
  //               setQuestionResponse(Questions);
  //             }
  //           });
  //       });
  //   } else if (user.role.indexOf('teacher') !== -1) {
  //     fetch(graphql_server_uri, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         query: `
  //                   mutation{
  //                       getQuestions(
  //                           axamQuestion_input: {
  //                               axamQuestions_id: "${props.axamIdProps}"
  //                         }
  //                       ){
  //                           axamQuestions_id
  //                           question
  //                           question_link
  //                           question_optionOne
  //                           question_optionTwo
  //                           question_optionThree
  //                           question_optionFour
  //                           question_currentOption
  //                           question_timeTosolveProblem
  //                           question_score
  //                           question_explane
  //                           exam_link
  //                       }
  //                   }
  //               `,
  //       }),
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         var Questions = res.data.getQuestions;
  //         fetch(graphql_server_uri, {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             query: `
  //                       mutation{
  //                         getAxamResponse(
  //                           axamResponse_input: {
  //                             exam_id: "${props.axamIdProps}"
  //                             student_id: "${props.popUpScoreStudent.person_id}"
  //                             examResponse_className: "${props.popUpScoreStudent.class_name}"
  //                             examResponse_level: "${props.popUpScoreStudent.level}"
  //                             }
  //                           ){
  //                             exam_id
  //                             student_id
  //                             exam_QuestionResponse
  //                             exam_delay
  //                           }
  //                       }
  //                   `,
  //           }),
  //         })
  //           .then(res => res.json())
  //           .then(res => {
  //             if (res.data.getAxamResponse) {
  //               var tempArray = res.data.getAxamResponse.exam_QuestionResponse[0].split(
  //                 '$',
  //               );
  //               setDelay(res.data.getAxamResponse.exam_delay);
  //               setQuestionResponseStudent(tempArray);
  //               setQuestionResponse(Questions);
  //             } else {
  //               setQuestionResponse(Questions);
  //             }
  //           });
  //       });
  //   }
  // }, []);

  return (
    <PopUpScoreContainer>
      <PopUpScoreContent>
        <PopUpScoreHeader>
          <PopUpScoreHeaderGroup>
            <PopUpScoreHeaderTime>
              زمان شروع : {moment(props.startTime).format('HH:mm:00')}
            </PopUpScoreHeaderTime>
            <PopUpScoreHeaderTime>
              زمان پایان : {moment(props.endTime).format('HH:mm:00')}
            </PopUpScoreHeaderTime>
          </PopUpScoreHeaderGroup>
          <PopUpScoreHeaderGroup>
            <PopUpScoreHeaderTime>
              نام معلم : {props.teacherName}
            </PopUpScoreHeaderTime>
            <PopUpScoreHeaderTime>
              نام درس : {parseInt(props.courseName) ===
                parseInt(props.courseName, 10)
                ? props.courseName
                // appContext.initConfig.newCourseName[props.courseName]
                : props.courseName}
            </PopUpScoreHeaderTime>
           {props.examTopic ?  <PopUpScoreHeaderTime>
            موضوع : {props.examTopic}
            </PopUpScoreHeaderTime> : ''}
          </PopUpScoreHeaderGroup>
        </PopUpScoreHeader>
        <PopUpScoreHeaderDelay>
          زمان تحویل : {delay}
          {/* exam_delay: String, */}
        </PopUpScoreHeaderDelay>
        <PopUpScorePageQuesion>
          <ExamPageForTeacher/>
          {/* {questionResponse.length
            ? questionResponse.map((res, index) => {
              return (
                <div key={index}>
                  <QuestionResponse
                    // key={index}
                    setCaptionImage={setCaptionImage}
                    setImageSrc={setImageSrc}
                    showPic={showPic}
                    setType={setType}
                    number={index}
                    question={res}
                    StudentItem={
                      questionResponseStudent.length > 0 && questionResponseStudent[index]
                        ? questionResponseStudent[index].split(',')[1]
                        : ''
                    }
                  />
                </div>
              );
            })
            : ''} */}
        </PopUpScorePageQuesion>
      </PopUpScoreContent>
      <PopUpScoreBtnClose onClick={props.closePopUp}>
        بستن
      </PopUpScoreBtnClose>
      {/* {
        showImage ? <ShowImage imageSrc={imageSrc} caption={captionImage} close={showPic} type={type} /> : ''
      } */}
    </PopUpScoreContainer>
  );
};

export default PopUpScore;
