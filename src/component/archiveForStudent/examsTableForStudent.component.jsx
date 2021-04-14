import React, { useContext, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
// import moment from 'moment';
import PopUpScore from '../examPageForTeacher/popUpScore/popUpScore.component';
// import { fixNumbers } from '@components/FixNumbers/fixNumbers';
import {fixNumbers} from '../../generalComponent/fixNumbers';
// import { realeTime } from '@components/Clock/getTime';
// import { ConvertToString } from '@components/ConvertToString/ConvertToString';
// import { useSelector } from 'react-redux';
// import AppContext from 'app/AppContext';


var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();

var moment = require('moment-jalaali');
moment().format('jYYYY/jMM/jDD');
const graphql_server_uri = '/graphql';

const MaterialTableAxamsForStudent = ({ selectedDate, setCourseName, setLevel, setClassName, setShowRank }) => {
  /////////////////////////
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  const [showPopUpScore, setShowPopUpScore] = useState(false);
  const [popUpScoreStudent, setPopUpScoreStudent] = useState(null);
  const [examId , setExamId] = useState('');
  // const [time, setTime] = useState(
  //   realeTime.toLocaleTimeString([], {
  //     timeZone: "Asia/Tehran",
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: false,
  //   }));
  // const [getDate, setGetDate] = useState(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));

  const [time, setTime] = useState('00:00:00'
    // realeTime.toLocaleTimeString([], {
    //   timeZone: "Asia/Tehran",
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   hour12: false,
    // })
    );

  const [getDate, setGetDate] = useState(fixNumbers(moment().format('jYYYY/jMM/jDD')));


  const togglePopup = () => {
    // setExamId('');
    // setShowPopUpScore(!showPopUpScore);
    setShowPopUpScore(false);
  };
  //////////////////////////
  const [data, setData] = React.useState([
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30:00',exam_end:'12:30:00',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30:00',exam_end:'12:30:00',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30:00',exam_end:'12:30:00',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30:00',exam_end:'12:30:00',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30:00',exam_end:'12:30:00',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
  ]);
  //////////////////////////
  const [columns, setColumns] = React.useState([
    {
      title: 'تاریخ شروع امتحان',
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
            {data.exam_data}
          </p>)
      },
    },
    {
      title: 'تاریخ پایان امتحان',
      field: 'exam_end_date',
      editable: 'never',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.exam_data}
          </p>)
      },
    },
    {
      title: ' شروع امتحان',
      field: 'exam_start',
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
            {data.exam_start}
            {/* {moment(data.exam_start).format('HH:mm:00')} */}
          </p>)
      },
    },
    {
      title: ' پایان امتحان',
      field: 'exam_end',
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
            {data.exam_end}
            {/* {moment(data.exam_end).format('HH:mm:00')} */}
          </p>)
      },
    },
    // {
    //   title: 'سوالات',
    //   field: 'exam_pdf',
    //   editable: 'never',
    //   render: data => {
    //     return (
    //       <a href={data.exam_pdf} target="_blank" style={{
    //         textAlign: 'center',
    //         width: '50px',
    //         fontFamily: 'BNazaninBold',
    //         fontSize: 16,
    //         color:'#000',
    //         textDecoration:'none',
    //         backgroundColor:'transparent'
    //       }}>
    //         لینک
    //       </a>)
    //   },
    // },
    {
      title: 'پایه',
      field: 'exam_level',
      editable: 'never',
      lookup:['اول', 'دوم'],
      // lookup: appContext.initConfig.newLevel,
      render: data => {
        return (<p style={{
          fontFamily: 'BNazaninBold',
          fontSize: 16,
          textAlign: 'center',
          width: '50px'
        }}>
          {parseInt(data.exam_level) === parseInt(data.exam_level, 10)
            ? 
            data.exam_level
            // appContext.initConfig.newLevel[data.exam_level]
            : data.exam_level}
        </p>)
      },
    },
    {
      title: 'نام کلاس',
      field: 'exam_className',
      editable: 'never',
      lookup:['ب', 'الف'],
      // appContext.initConfig.newClassName,
      render: data => {
        return (
          <p
            style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
            {parseInt(data.exam_className) ===
              parseInt(data.exam_className, 10)
              ? 
              data.exam_className
              // appContext.initConfig.newClassName[data.exam_className]
              : data.exam_className}
          </p>)
      },
    },
    {
      title: 'نام درس', field: 'exam_courseName', editable: 'never',
      render: data => {
        return (
          <p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
            {parseInt(data.exam_courseName) ===
              parseInt(data.exam_courseName, 10)
              ? 
              data.exam_courseName
              // appContext.initConfig.newCourseName[data.exam_courseName]
              : data.exam_courseName
            }
          </p>)
      },
    },
    {
      title: 'موضوع امتحان', field: 'exam_topic', editable: 'never',
      render: data => {
        return (
          <p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
           {data.exam_topic}
          </p>)
      },
    },
    {
      title: 'حداکثر نمره', field: 'exam_maxScore', editable: 'never',
      render: data => {
        return (<p style={{
          fontFamily: 'BNazaninBold',
          fontSize: 16,
          textAlign: 'center',
          width: '50px'
        }}>{data.exam_maxScore}</p>)
      },
    },
  ]);

  const [state, setState] = React.useState({
    columns: [
      { title: 'تاریخ شروع', field: 'exam_start_date', editable: 'never' },
      { title: 'تاریخ پایان', field: 'exam_end_date', editable: 'never' },
      { title: ' شروع امتحان', field: 'exam_start', editable: 'never' },
      { title: ' پایان امتحان', field: 'exam_end', editable: 'never' },
      // { title: 'سوالات', field: 'exam_pdf', editable: 'never' },
      { title: 'پایه', field: 'exam_level', editable: 'never' },
      { title: 'نام کلاس', field: 'exam_className', editable: 'never' },
      { title: 'نام درس', field: 'exam_courseName', editable: 'never' },
      { title: 'موضوع امتحان', field: 'exam_topic', editable: 'never' },
      { title: 'حداکثر نمره', field: 'exam_maxScore', editable: 'never' },
    ],
    data: [],
  });


  useEffect(() => {
    var timerClear = setInterval(() => {
      // setGetDate(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));
      // // setGetDate(fixNumbers(realeTime.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })));
      // setTime(
      //   realeTime.toLocaleTimeString([], {
      //     timeZone: "Asia/Tehran",
      //     hour: '2-digit',
      //     minute: '2-digit',
      //     second: '2-digit',
      //     hour12: false,
      //   }),
      // );
      setGetDate(fixNumbers(moment().format('jYYYY/jMM/jDD')));
      // setGetDate(fixNumbers(realeTime.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })));
      setTime(
       '00:00:00'
      );
    }, 1000);
    return () => {
      clearInterval(timerClear);
    };
  }, [time, getDate]);
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
  //     alert("پس از زمان پایان امتحان مراجعه نمایید!!!");
  //   }
  // }

  const getScore = (student) => {
    setExamId(student.exam_id);
    setPopUpScoreStudent(student);
    setShowPopUpScore(true);
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
    //   alert("پس از زمان پایان امتحان مراجعه نمایید!!!");
    // }
  };

  // const refteshData = () => {
  //   async function fetchData() {
  //     /////////////////////
  //     const result = await fetch(graphql_server_uri, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         query: `
  //                   mutation{
  //                       getExamsWithDateClassNameAndLevel(
  //                           axam_input: {
  //                               exam_level: "${user.user.level}"
  //                               exam_className: "${user.user.class_name}"
  //                               exam_data: "${selectedDate}"
  //                         }
  //                       ){
  //                           exam_id
  //                           exam_data
  //                           exam_start
  //                           exam_end
  //                           exam_teacherId
  //                           exam_teacherName
  //                           exam_level
  //                           exam_className
  //                           exam_courseName
  //                           exam_maxScore
  //                           exam_topic
  //                       }
  //                   }                      
  //               `,
  //       }),
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         return res.data;
  //       });
  //     var temp = [];
  //     temp.push(...result.getExamsWithDateClassNameAndLevel);
  //     if (result.getExamsWithDateClassNameAndLevel.length !== 0) {
  //       var temp = result.getExamsWithDateClassNameAndLevel;
  //       for (let index = 0; index < temp.length; index++) {
  //         await fetch(graphql_server_uri, {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             query: `
  //                       mutation{
  //                         getAxamResponse(
  //                           axamResponse_input: {
  //                             exam_id: "${temp[index].exam_id}"
  //                             student_id: "${user.user.person_id}"
  //                             }
  //                           ){
  //                             exam_score
  //                           }
  //                       }                      
  //                   `,
  //           }),
  //         })
  //           .then(res => res.json())
  //           .then(res => {
  //             if (res.data.getAxamResponse) {
  //               temp[index] = { ...temp[index], exam_score: res.data.getAxamResponse.exam_score, selectedDate: selectedDate, getDate: getDate };
  //             } else {
  //               temp[index] = { ...temp[index], exam_score: 0, selectedDate: selectedDate, getDate: getDate };
  //             }
  //           });
  //       }
  //       setColumns(prevState => ({
  //         ...prevState,
  //         data: temp,
  //       }));
  //     } else {
  //       setColumns(prevState => ({
  //         ...prevState,
  //         data: [],
  //       }));
  //     }
  //   }
  //   fetchData();
  // };

  // React.useEffect(() => {
  //   refteshData();
  // }, [selectedDate]);

  return (
    <div dir="rtl">
      <MaterialTable
        title="امتحان"
        columns={columns}
        data={data}
        actions={[
          {
            icon: 'library_books',
            tooltip: 'گزارش امتحان',
            onClick: (event, rowData) => getScore(rowData),
            // style:{fontSize: 40, color: '#1f4971' }
          },
          // {
          //   icon: 'library_books',
          //   tooltip: 'گزارش امتحان',
          //   onClick: (event, rowData) => getScore(rowData),
          //   // style:{fontSize: 40, color: '#1f4971' }
          // },
          // {
          //   icon: 'trending_up',
          //   tooltip: 'نمودار پیشرفت تحصیلی این درس',
          //   onClick: (event, rowData) => handleSetDateForRankStudent(rowData),
          //   // style:{fontSize: 40, color: '#1f4971' }
          // },
        ]}
        options={{
          toolbar: false,
          showTitle: false,
          search: false,
          headerStyle: {
            // backgroundColor:'linear-gradient(#3f87a6, #ebf8e1, #f69d3c)' ,
            // '#3f87a6',
            background:'linear-gradient(#3f87a6, #ebf8e1)' ,
            // backgroundRepeat:'no-repeat',
            // backgroundSize:'cover',
            fontFamily: 'BTitrBold',
            textAlign: 'center',
            color: '#000',
            lineHeight:'20px',
            zIndex: 0,
            fontSize: '12px',
            // :last-child 
            // {
            //   borderTopLeftRadius:'1rem',
            // }
            // borderRadius:'1rem',
          },
          rowStyle: rowData => ({
            backgroundColor: rowData.tableData.id % 2 === 0 ? '#EEE' : '#FFF',
            fontFamily: 'BNazaninBold',
            fontSize: 24,
            marginTop: '2px',
            // borderStyle: 'solid',
            // borderStyle: 'double',
            marginTop: '2px',
            // borderStyle: 'double',
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
