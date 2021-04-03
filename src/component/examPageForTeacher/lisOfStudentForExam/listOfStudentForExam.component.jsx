import React, { useState, useEffect } from 'react';
import {GridContainer,MyGrid} from './listOfStudentForExam.styles.jsx';
// import PopUpScore from '../popUpScore/popUpScore';
import BoxListStudent from './boxListStudent/boxListStudent.component';
import ListStudentHeader from './listStudentHeader/listStudentHeader.component';
import moment from 'moment';
import axios from 'axios';
// import { fixNumbers } from '@components/FixNumbers/fixNumbers';
import { fixNumbers } from '../../../generalComponent/fixNumbers';
// import { realeTime } from '@components/Clock/getTime';
import { Grid } from '@material-ui/core';

const graphql_server_uri = '/graphql';

const ListOfStudentForExam = ({
  setListOfStudentsScore,
  listOfStudentsScore,
  selectedDate,
  axamId,
  startTime,
  endTime,
  teacherName,
  courseName,
  examTopic,
  Nameclass,
  level,
  groupId,
  examDate
}) => {
  const [listOfStudents, setListOfStudents] = useState([{person_name:'zahra' ,person_surname:'alipor'},{person_name:'zahra' ,person_surname:'alipor'},{person_name:'zahra' ,person_surname:'alipor'},{person_name:'zahra' ,person_surname:'alipor'}]);
  const [studentsCurrentWroung, setStudentscurrentWroung] = useState([]);
  const [numberTakeAnExam, setNumberTakeAnExam] = useState(0);
  const [topStudent, setTopStudent] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [score, setScore] = useState('');
  const [showPopUpScore, setShowPopUpScore] = useState(false);
  const [popUpScoreStudent, setPopUpScoreStudent] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [time, setTime] = useState('');
  const [getDate, setGetDate] = useState('');

  // useEffect(() => {
  //   var timerClear = setInterval(() => {
  //     setGetDate(fixNumbers(realeTime.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })));
  //     setTime(
  //       realeTime.toLocaleTimeString([], {
  //         hour: '2-digit',
  //         minute: '2-digit',
  //         second: '2-digit',
  //         hour12: false,
  //       }),
  //     );
  //     calcTime();
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerClear);
  //   };
  // });

  // const calcTime = () => {
  //   var formatEndTime = fixNumbers(moment(endTime).format('HH:mm:00'));
  //   var formatStartTime = fixNumbers(moment(startTime).format('HH:mm:00'));
  //   var newEndTime = formatEndTime.split(":");
  //   var newTime = time.split(":");
  //   var filterSlectedDate = selectedDate.split("/").join("");
  //   var newDate = fixNumbers(getDate);
  //   var filterGetDate = newDate.split("/").join("");
  //   var filterSlectedEndTime = formatEndTime.split(":").join("");
  //   var filterSlectedStartTime = formatStartTime.split(":").join("");
  //   var temp = fixNumbers(time);
  //   var filterGetTime = temp.split(":").join("");
  //   if (filterGetDate == filterSlectedDate) {
  //     if (filterGetTime < filterSlectedEndTime && filterGetTime > filterSlectedStartTime) {
  //       var convertToSecEnd = parseInt(newEndTime[0]) * 3600 + parseInt(newEndTime[1]) * 60 + parseInt(newEndTime[2]);
  //       var convertToSecTime = parseInt(newTime[0]) * 3600 + parseInt(newTime[1]) * 60 + parseInt(newTime[2]);
  //       var timeToEndExam = convertToSecEnd - convertToSecTime;
  //       var hour = 0, min = 0, sec = 0;
  //       hour = timeToEndExam / 3600;
  //       timeToEndExam = timeToEndExam % 3600;
  //       min = timeToEndExam / 60;
  //       sec = timeToEndExam % 60;
  //       setRemainingTime(`${hour > 1 ? 1 : 0}:${Math.floor(min)}.${sec}`);
  //     } else {
  //       setRemainingTime(0);
  //     }
  //   }
  //   else {
  //     setRemainingTime(0);
  //   }
  // }

  // useEffect(() => {
  //   axios({
  //     method: 'post',
  //     url: '/getStudentListWithCurrentNumberResponse',
  //     data: {
  //       level: level,
  //       class_name: Nameclass,
  //       exam_id: axamId,
  //     },
  //   })
  //     .then(res => {
  //       setListOfStudents([]);
  //       if (res.data.currentWroungList) {
  //         setStudentscurrentWroung(res.data.currentWroungList);
  //         setListOfStudents(res.data.students);
  //         setNumberTakeAnExam(res.data.tedad);
  //         setTopStudent(res.data.topStudent);
  //         setAverageScore(res.data.average)
  //       } else {
  //         setStudentscurrentWroung([]);
  //         setListOfStudents(
  //           [{person_name:'zahra' ,person_surname:'alipor'},{person_name:'zahra' ,person_surname:'alipor'},{person_name:'zahra' ,person_surname:'alipor'},{person_name:'zahra' ,person_surname:'alipor'}]);
  //         setNumberTakeAnExam(0);
  //         setTopStudent([]);
  //         setAverageScore(0);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   //////////////////////
  // }, [axamId, Nameclass]);
  /////////////////

  //////////////////////////////////////
  const togglePopup = () => {
    setShowPopUpScore(!showPopUpScore);
  };

  const handleScore = e => {
    setScore(e.target.value);
  };

  const getScore = student => {
    setPopUpScoreStudent(student);
    setShowPopUpScore(true);
  };

  const setOneScore = student => {
    var check = document.getElementById(student.person_id);
    check.style.color = 'green';
    var temp = [...listOfStudentsScore];
    temp.push({
      score_id: '',
      score_student_name: student.person_name + ' ' + student.person_surname,
      score_date: selectedDate,
      score: score,
      score_assessment: '',
      score_absencePresence: '',
      score_group_id: '',
    });
    setListOfStudentsScore(temp);
    // /////////////////////////////////////
    fetch(graphql_server_uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
                    mutation{
                      AddSCoreForAxam(
                        axamResponse_input: {
                          exam_id: "${axamId}"
                          student_id: "${student.person_id}"
                          exam_score: "${score}"
                          examResponse_level: "${student.level}"
                          examResponse_className: "${student.class_name}"
                          scoreGroupId: "${groupId}"
                          score_type:"${0}"
                          score_date:"${examDate}"
                          }
                        ){
                          exam_id
                        }
                    }
                `,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('sendddd');
      }).catch(err => {
        console.log(err);
      })
  };

  return (
    <GridContainer container spacing={3}>
      <MyGrid item xs={12} sm={12} md={12}>
        <ListStudentHeader numberTakeAnExam={numberTakeAnExam} topStudent={topStudent} averageScore={averageScore} 
        // remainingTime={remainingTime}
        remainingTime={0}
         />
      </MyGrid>
      {listOfStudents
        ? listOfStudents.map((student, index) => (
          <MyGrid item xs={12} sm={6} md={4} key={index}>
            <BoxListStudent
              key={index}
              student={student}
              // studentsCurrentWroung={studentsCurrentWroung[index]}
              setOneScore={setOneScore}
              handleScore={handleScore}
              getScore={getScore}
              axamId={axamId}
            />
          </MyGrid>
        ))
        : ''}
      {listOfStudents.length > 0 ? (
        <br />
      ) : (
          ''
        )}
      {/* {
        showPopUpScore ? (
          <PopUpScore
            popUpScoreStudent={popUpScoreStudent}
            closePopUp={togglePopup}
            axamIdProps={axamId}
            startTime={startTime}
            endTime={endTime}
            teacherName={teacherName}
            courseName={courseName}
            examTopic={examTopic}
          />
        ) : (
            ''
          )
      } */}
    </GridContainer >
  );
};

export default ListOfStudentForExam;
