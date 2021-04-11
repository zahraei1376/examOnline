import React, { useEffect, useState } from 'react';
import MaterialTableEditAxams from './editeAxamTable/editeAxamTable.component';
// import PopUp from '@components/UI/popUp/popup';
import Questions from '../questionComponent/questionComponent';
import {LableDiv ,Lable ,TableContainer ,DateContainer,QuestionsContainer} from './editeaxamPage.styles';
import {fixNumbers} from '../../generalComponent/fixNumbers';
import PersianDatePicker from '../../generalComponent/MaterialDatePicker/MaterialDatePicker';
// import { fixNumbers } from '@components/FixNumbers/fixNumbers';
// import PersianDatePicker from '@components/MaterialDatePicker/MaterialDatePicker';
import { Grid } from '@material-ui/core';
////////////
var moment = require('moment-jalaali')

const EditeAxamPageForTeacher = () => {
  const [selectedDate, handleDateChange] = useState(moment());
  const [newSelectedDate, setNewSelectedDate] = useState('');
  // const [message, setMessage] = React.useState('');
  // const [status, setStatus] = React.useState(0);
  // const [ShowPopup, setShowPopup] = React.useState(false);
  const [examId, setExamID] = React.useState('');
  /////////
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    setNewSelectedDate(fixNumbers(moment(selectedDate,
    ).format('jYYYY/jMM/jDD')));
  }, [selectedDate]);

  const getQuestionsId = Id => {
    setExamID(Id);
  };

  // const togglePopup = () => {
  //   setShowPopup(!ShowPopup);
  // };

  /////////////////////////
  return (
    <div>
      <Grid 
      // container spacing={3}
      style={{border:'1px solid #90A4AE',margin:'3rem'}}
      // style={{backgroundColor:'#CFD8DC'}}
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
          <MaterialTableEditAxams
              selectedDate={newSelectedDate}
              getQuestionsId={getQuestionsId}
          /> 
        </Grid>
        </TableContainer>
        <Grid item xs={12} sm={12} md={12}>
          {examId ? 
            <QuestionsContainer>
               <Questions  examId={examId} />
            </QuestionsContainer> : ''}
        </Grid>
       
      </Grid>
    </div >
  );
};
export default EditeAxamPageForTeacher;
