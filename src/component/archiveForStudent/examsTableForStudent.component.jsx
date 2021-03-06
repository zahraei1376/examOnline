import React, { useContext, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import PopUpScore from '../examPageForTeacher/popUpScore/popUpScore.component';
// import { fixNumbers } from '@components/FixNumbers/fixNumbers';
import {fixNumbers} from '../../generalComponent/fixNumbers';
import { realeTime } from '../../generalComponent/Clock/getTime';
// import { realeTime } from '@components/Clock/getTime';
// import { ConvertToString } from '@components/ConvertToString/ConvertToString';
// import { useSelector } from 'react-redux';
// import AppContext from 'app/AppContext';
/////////////////////////////
var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();

var moment = require('moment-jalaali');
moment().format('jYYYY/jMM/jDD');
/////////////////////////////
const MaterialTableAxamsForStudent = ({ dataTable ,selectedDate, setCourseName, setLevel, setClassName, setShowRank }) => {
  /////////////////////////
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
 ////////////////////////////////////////////////////////////////////////
  const [showPopUpScore, setShowPopUpScore] = useState(false);
  const [popUpScoreStudent, setPopUpScoreStudent] = useState(null);
  const [examId , setExamId] = useState('');
  const [rowsTable,setRowsTable] =  useState([]);

  useEffect(()=>{
    console.log('showPopUpScore',showPopUpScore);
  },[showPopUpScore])
  // const [getDate, setGetDate] = useState(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));
  // // const [getDate, setGetDate] = useState(fixNumbers(moment().format('jYYYY/jMM/jDD')));
  // const [time, setTime] = useState(
  //   realeTime.toLocaleTimeString([], {
  //     timeZone: "Asia/Tehran",
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: false,
  //   })
  // );
    // const [time, setTime] = useState('00:00:00'
    // // realeTime.toLocaleTimeString([], {
    // //   timeZone: "Asia/Tehran",
    // //   hour: '2-digit',
    // //   minute: '2-digit',
    // //   second: '2-digit',
    // //   hour12: false,
    // // })
    // );
  
  ///////////////////////////////////////
  ////////////////////////////////////
  const togglePopup = () => {
    // setExamId('');
    setShowPopUpScore(prevState => !prevState);
    // setShowPopUpScore(false);
  };
  //////////////////////////
  const [columns, setColumns] = React.useState([
    {
      title: '?????? ????????',
      field: 'teacher_name',
      editable: 'never',
      // lookup:['??', '??????'],
      // appContext.initConfig.newClassName,
      render: data => {
        return (
          <p
            style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
              {data.teacher_name}
          </p>)
      },
    },
    {
      title: '?????? ??????', field: 'exam_courseName', editable: 'never',
      render: data => {
        return (
          <p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
            {data.exam_courseName}
            {/* {parseInt(data.exam_courseName) ===
              parseInt(data.exam_courseName, 10)
              ? 
              data.exam_courseName
              // appContext.initConfig.newCourseName[data.exam_courseName]
              : data.exam_courseName
            } */}
          </p>)
      },
    },
    {
      title: '?????????? ???????? ????????????',
      field: 'exam_start_date',
      editable: 'never',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.examParent_start_date}
          </p>)
      },
    },
    {
      title: '?????????? ?????????? ????????????',
      field: 'examParent_stop_date',
      editable: 'never',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.examParent_stop_date}
          </p>)
      },
    },
    {
      title: ' ???????? ????????????',
      field: 'examParent_start',
      editable: 'never',
      type: 'datetime',
      render: data => {
        return (
          <p style={{
            textAlign: 'center',
            width: '50px',
            fontFamily: 'BNazaninBold',
            fontSize: 16,
          }}>
            {data.examParent_start_date == data.examParent_stop_date ? data.examParent_start : '-'}
            {/* {moment(data.exam_start).format('HH:mm:00')} */}
          </p>)
      },
    },
    {
      title: ' ?????????? ????????????',
      field: 'examParent_end',
      editable: 'never',
      type: 'datetime',
      render: data => {
        return (
          <p style={{
            textAlign: 'center',
            width: '50px',
            fontFamily: 'BNazaninBold',
            fontSize: 16,
          }}>
            {data.examParent_start_date == data.examParent_stop_date ? data.examParent_end : '-'}
            {/* {moment(data.exam_end).format('HH:mm:00')} */}
          </p>)
      },
    },
    {
      title: ' ?????? ???????? ????????????',
      field: 'examParent_end',
      editable: 'never',
      type: 'datetime',
      render: data => {
        return (
          <p style={{
            textAlign: 'center',
            width: '50px',
            fontFamily: 'BNazaninBold',
            fontSize: 16,
          }}>
            {data.examParent_start_date != data.examParent_stop_date ? data.examParent_duration : '-'}
            {/* {moment(data.exam_end).format('HH:mm:00')} */}
          </p>)
      },
    },
    {
      title: '?????????? ????????????', field: 'examParent_topic', editable: 'never',
      render: data => {
        return (
          <p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
           {data.examParent_topic ? data.examParent_topic :'-'}
          </p>)
      },
    },
    {
      title: '???????????? ????????', field: 'exam_maxScore', editable: 'never',
      render: data => {
        return (<p style={{
          fontFamily: 'BNazaninBold',
          fontSize: 16,
          textAlign: 'center',
          width: '50px'
        }}>{data.examParent_maxScore ? data.examParent_maxScore : '-'}</p>)
      },
    },
  ]);

  const [state, setState] = React.useState({
    columns: [
      { title: '?????? ????????', field: 'teacher_name', editable: 'never' },
      // { title: '?????? ????????', field: 'exam_className', editable: 'never' },
      { title: '?????? ??????', field: 'exam_courseName', editable: 'never' },
      { title: '?????????? ????????', field: 'examParent_start_date', editable: 'never' },
      { title: '?????????? ??????????', field: 'examParent_stop_date', editable: 'never' },
      { title: ' ???????? ????????????', field: 'examParent_start', editable: 'never' },
      { title: ' ?????????? ????????????', field: 'examParent_end', editable: 'never' },
      { title: '?????? ???????? ????????????', field: 'examParent_duration', editable: 'never' },
      // { title: '????????????', field: 'exam_pdf', editable: 'never' },
      { title: '?????????? ????????????', field: 'examParent_topic', editable: 'never' },
      { title: '???????????? ????????', field: 'examParent_maxScore', editable: 'never' },
    ],
    data: [],
  });

  // useEffect(()=>{
  //   var timerClear = setInterval(() => {
  //     // setGetDate(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));
  //     // // setGetDate(fixNumbers(realeTime.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })));
  //     setTime(
  //       realeTime.toLocaleTimeString([], {
  //         timeZone: "Asia/Tehran",
  //         hour: '2-digit',
  //         minute: '2-digit',
  //         second: '2-digit',
  //         hour12: false,
  //       }),
  //     );
  //     // setGetDate(fixNumbers(moment().format('jYYYY/jMM/jDD')));
  //     setGetDate(fixNumbers(realeTime.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })));
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerClear);
  //   };
  // },[])


  // useEffect(() => {
  //   var timerClear = setInterval(() => {
  //     // setGetDate(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));
  //     // // setGetDate(fixNumbers(realeTime.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })));
  //     // setTime(
  //     //   realeTime.toLocaleTimeString([], {
  //     //     timeZone: "Asia/Tehran",
  //     //     hour: '2-digit',
  //     //     minute: '2-digit',
  //     //     second: '2-digit',
  //     //     hour12: false,
  //     //   }),
  //     // );
  //     setGetDate(fixNumbers(moment().format('jYYYY/jMM/jDD')));
  //     // setGetDate(fixNumbers(realeTime.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })));
  //     setTime(
  //      '00:00:00'
  //     );
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerClear);
  //   };
  // }, [time, getDate]);
  ////////////////////////

  // const handleSetDateForRankStudent = (info) => {
  //   var newsSelectedDate = selectedDate;
  //   var newEndTime = fixNumbers(moment2(info.exam_end).tz('Asia/Tehran').format('HH:mm:00'));
  //   var filterSlectedDate = newsSelectedDate.split("/").join("");
  //   var newDate = fixNumbers(getDate);
  //   var filterGetDate = newDate.split("/").join("");
  //   var filterSlectedEndTime = newEndTime.split(":").join("");
  //   var temp = fixNumbers(time);
  //   var filterGetTime = temp.split(":").join("");

  //   if (filterGetDate > filterSlectedDate) {
  //     setCourseName(info.exam_courseName);
  //     setLevel(info.exam_level);
  //     setClassName(info.exam_className);
  //     setExamId(info.exam_id);
  //     setShowRank(true);
  //   } else if (filterGetDate == filterSlectedDate && filterGetTime > filterSlectedEndTime) {
  //     setCourseName(info.exam_courseName);
  //     setLevel(info.exam_level);
  //     setClassName(info.exam_className);
  //     setExamId(info.exam_id);
  //     setShowRank(true);
  //   }
  //   else {
  //     alert("???? ???? ???????? ?????????? ???????????? ???????????? ????????????!!!");
  //   }
  // }
  useEffect(()=>{
    console.log('createeeeeeeTable222');
  },[]);

  const getScore = (student) => {
    console.log('student',student);
    console.log('student.exam_id',student.id);
    setExamId(student.id);
    setPopUpScoreStudent(student);
    setShowPopUpScore(prevState => !prevState);
    // setShowPopUpScore(!showPopUpScore);
    // var newsSelectedDate = selectedDate;
    // var newEndTime = fixNumbers(moment2(student.exam_end).tz('Asia/Tehran').format('HH:mm:00'));
    // var filterSlectedDate = newsSelectedDate.split("/").join("");
    // var newDate = fixNumbers(getDate);
    // var filterGetDate = newDate.split("/").join("");
    // var filterSlectedEndTime = newEndTime.split(":").join("");
    // var temp = fixNumbers(time);
    // var filterGetTime = temp.split(":").join("");

    // if (filterGetDate > filterSlectedDate) {
    //   setExamId(student.exam_id);
    //   setPopUpScoreStudent(student);
    //   setShowPopUpScore(true);
    //   // setShowRank(false);
    // } else if (filterGetDate == filterSlectedDate && filterGetTime > filterSlectedEndTime) {
    //   setExamId(student.exam_id);
    //   setPopUpScoreStudent(student);
    //   setShowPopUpScore(true);
    //   // setShowRank(false);
    // }
    // else {
    //   alert("???? ???? ???????? ?????????? ???????????? ???????????? ????????????!!!");
    // }
  };

  return (
    <div dir="rtl">
      <MaterialTable
        title="????????????"
        columns={columns}
        data={dataTable}
        actions={[
          {
            icon: 'library_books',
            tooltip: '?????????? ????????????',
            onClick: (event, rowData) => getScore(rowData),
          },
        ]}
        options={{
          toolbar: false,
          showTitle: false,
          search: false,
          headerStyle: {
            background:'linear-gradient(#3f87a6, #ebf8e1)' ,
            fontFamily: 'BTitrBold',
            textAlign: 'center',
            color: '#000',
            lineHeight:'20px',
            zIndex: 0,
            fontSize: '12px',
          },
          rowStyle: rowData => ({
            backgroundColor: rowData.tableData.id % 2 === 0 ? '#EEE' : '#FFF',
            fontFamily: 'BNazaninBold',
            fontSize: 24,
            marginTop: '2px',
            marginTop: '2px',
          }),
          cellStyle: {
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
          },
        }}

        editable={
          {
          }
        }
      />
      {showPopUpScore ? (
        <PopUpScore
          type="0"
          popUpScoreStudent={popUpScoreStudent}
          closePopUp={togglePopup}
          examIdProps={examId}
        />
      ) : (
          ''
        )}
    </div>
  );
};
export default React.memo(MaterialTableAxamsForStudent);
