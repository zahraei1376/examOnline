import React, { useEffect, useState } from 'react';
import MaterialTableAxams from './axamTable';
import {DateContainer,LableDiv , Lable ,ListOfStudentContainer,TableContainer} from './archiveForTeacher.styles';
// import PopUp from '@components/UI/popUp/popup';
// import PopupPercentageQuestion from './QuestionListPercentage/popupPercentageQuestion';
import ListOfStudentForExam from '../lisOfStudentForExam/listOfStudentForExam.component';
// import Ranking from '../ranking/ranking';
// import PersianDatePicker from '@components/MaterialDatePicker/MaterialDatePicker';
import PersianDatePicker from '../../../generalComponent/MaterialDatePicker/MaterialDatePicker';
import { fixNumbers } from '../../../generalComponent/fixNumbers';
// import { fixNumbers } from '@components/FixNumbers/fixNumbers';
import { Grid } from '@material-ui/core';
////////////
var moment = require('moment-jalaali');
const graphql_server_uri = '/graphql';
const ArchiveForTeacher = () => {
  const [listOfStudentsScore, setListOfStudentsScore] = useState([]);
  const [selectedDate, handleDateChange] = useState(moment());
  const [newSelectedDate, setNewSelectedDate] = useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState(0);
  const [ShowPopup, setShowPopup] = React.useState(false);
  const [axamId, setExamID] = React.useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [examTopic, setExamTopic] = useState('');
  const [Nameclass, setClassName] = useState('');
  const [level, setLevel] = useState('');
  const [showStudentList, setShowStudentList] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showDetails ,setShowDetails] = useState(false);
  //////////////////////////8/9/99
  const [groupId, setGroupId] = useState('');
  const [examDate, setExamDate] = useState('');

  useEffect(() => {
    setNewSelectedDate(
      fixNumbers(moment(selectedDate).format('jYYYY/jMM/jDD')),
    );
  }, [selectedDate]);

  const togglePopup = () => {
    setShowPopup(!ShowPopup);
  };


  const closePopUp = () => {
    setShowDetails(!showDetails);
  }
  /////////////////
  const sendData = () => {
    var score_id = [];
    var score_student_name = [];
    var score_date = [];
    var score = [];
    var score_assessment = [];
    var score_absencePresence = [];
    var score_group_id = [];

    for (let index = 0; index < listOfStudentsScore.length; index++) {
      score_id.push(listOfStudentsScore[index].score_id);
      score_student_name.push(listOfStudentsScore[index].score_student_name);
      score_date.push(listOfStudentsScore[index].score_date);
      score.push(listOfStudentsScore[index].score);
      score_assessment.push(listOfStudentsScore[index].score_assessment);
      score_absencePresence.push(
        listOfStudentsScore[index].score_absencePresence,
      );
      score_group_id.push(listOfStudentsScore[index].score_group_id);
      console.log(score_group_id);
    }

    fetch(graphql_server_uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
            mutation{
              addNewScore(
                  score_input: {
                    score_id: "${score_id}"
                    score_student_name: "${score_student_name}"
                    score_date: "${score_date}"
                    score: "${score}"
                    score_assessment: "${score_assessment}"
                    score_absencePresence: "${score_absencePresence}"
                    score_group_id: "${score_group_id}"
                  }
                ){
                  score_id
                }
            }
        `,
      }),
    })
      .then(res => res.json())
      .then(res => {
        setMessage('اطلاعاتی به درستی ثبت شد');
        setStatus(0);
        setShowPopup(true);
      });
  };

  const handleSetExamID = (
    exam_id,
    exam_className,
    exam_level,
  ) => {
    setExamID(exam_id);
    setClassName(exam_className);
    setLevel(exam_level);
  };
  /////////////////////////
  return (
    <div>
      <Grid 
      // container spacing={3}
      style={{border:'1px solid #000',margin:'3rem'}}
      >
        <TableContainer >
        <DateContainer>
          <LableDiv>
            <Lable>
              تاریخ موردنظر را انتخاب کنید:
            </Lable>
          </LableDiv>
          <PersianDatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </DateContainer>
        <Grid item xs={12} sm={12} md={12}>
          <MaterialTableAxams
            selectedDate={newSelectedDate}
            setShowRank={setShowRank}
            setShowStudentList={setShowStudentList}
            setShowDetails={setShowDetails}
            handleSetExamID={handleSetExamID}
          />
        </Grid>
        </TableContainer>
        <Grid item xs={12} sm={12} md={12}>
          {showStudentList ? 
            <ListOfStudentContainer style={{ marginTop: '60px' }}>
              <ListOfStudentForExam
                setListOfStudentsScore={setListOfStudentsScore}
                listOfStudentsScore={listOfStudentsScore}
                // Click={sendData}
                selectedDate={newSelectedDate}
                axamId={axamId}
                // startTime={startTime}
                // endTime={endTime}
                // teacherName={teacherName}
                // courseName={courseName}
                // examTopic={examTopic}
                Nameclass={Nameclass}
                level={level}
                //8/10/99
                // groupId={groupId}
                // examDate={examDate}
              />
            </ListOfStudentContainer> : ''}
          {/* {showRank ? <div style={{ marginTop: '60px' }}>
            <Ranking
              Nameclass={Nameclass}
              level={level}
              axamId={axamId}
              courseName={courseName}
            />
          </div> : ''}
                {showDetails ? <div style={{ marginTop: '60px' }}>
                  <PopupPercentageQuestion
                    exam_id={axamId}
                    level={level}
                    class_name={Nameclass}
                    close={closePopUp}
                  />
                </div> : ''} */}
        </Grid>
        {/* {ShowPopup ? (
          <PopUp message={message} status={status} closePopup={togglePopup} />
        ) : null} */}
      </Grid>
    </div >
  );
};
export default ArchiveForTeacher;
