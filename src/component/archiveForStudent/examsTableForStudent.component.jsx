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
/////////////////////////////
/////////////////////////////////////////////////query
import { useQuery} from 'react-apollo';
import { GET_EXAMS_FOR_STUDENT } from '../../graphql/resolver';
////////////////////////////////////////////////

var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();

var moment = require('moment-jalaali');
moment().format('jYYYY/jMM/jDD');
const graphql_server_uri = '/graphql';

const MaterialTableAxamsForStudent = ({ selectedDate, setCourseName, setLevel, setClassName, setShowRank }) => {
  /////////////////////////
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  /////////////////////////////////////////////////////////////////
  const { loading, error, data ,refetch  } = useQuery(GET_EXAMS_FOR_STUDENT , {
    variables: {  userName: "210",
    password: "210",
    level: "1",
    class: "1",
    date: selectedDate },
    notifyOnNetworkStatusChange: true
  });
////////////////////////////////////////////////////////////////////////
  const [showPopUpScore, setShowPopUpScore] = useState(false);
  const [popUpScoreStudent, setPopUpScoreStudent] = useState(null);
  const [examId , setExamId] = useState('');
  const [rowsTable,setRowsTable] =  useState([]);
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

    useEffect(()=>{
      refetch()
    },[selectedDate]);

    useEffect(()=>{
      if(data && data.groupsListByStudent){
        console.log('data.groupsListByStudent',data.groupsListByStudent);
          // setDate(data.groupsListByStudent);
          createRows(data.groupsListByStudent);
      }
  },[data]);

  const [getDate, setGetDate] = useState(fixNumbers(moment().format('jYYYY/jMM/jDD')));
///////////////////////////////////////
////////////////////////////////////
function createData(
  id,
  course_name ,
  teacher_name,
  examParent_topic ,
  examParent_start_date,
  examParent_stop_date,
  examParent_start,
  examParent_end,
  ) {
  return {
      id : id,
      exam_courseName : course_name ,
      teacher_name : teacher_name ,
      examParent_topic : examParent_topic ,
      examParent_start_date : examParent_start_date ,
      examParent_stop_date : examParent_stop_date ,
      examParent_start : examParent_start ,
      examParent_end : examParent_end ,
  }
}
////////////////////////////////////
function createRows(exams){
  console.log('exams',exams);
  var MyRows = [];
  for (let index = 0; index < exams.length; index++) {
      var EPD = exams[index].examParentsListByDate;
      if(EPD && EPD.length > 0 ){
          var cn = exams[index].course;
          for (let index2 = 0; index2 < EPD.length; index2++) {
              MyRows.push(createData(
                  EPD[index2].id,
                  cn,
                  exams[index].people[0].name + ' ' + exams[index].people[0].surname ,
                  EPD[index2].examParent_topic,
                  EPD[index2].examParent_start_date,
                  EPD[index2].examParent_stop_date,
                  EPD[index2].examParent_start,
                  EPD[index2].examParent_end,
                  )
              )
              
          }
          
      }else{

      }
  }
  console.log('MyRowsMyRows',MyRows);
  setRowsTable(MyRows);
}
////////////////////////////////////

  const togglePopup = () => {
    // setExamId('');
    // setShowPopUpScore(!showPopUpScore);
    setShowPopUpScore(false);
  };
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
            {data.examParent_start_date}
          </p>)
      },
    },
    {
      title: 'تاریخ پایان امتحان',
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
      title: ' شروع امتحان',
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
            {data.examParent_start}
            {/* {moment(data.exam_start).format('HH:mm:00')} */}
          </p>)
      },
    },
    {
      title: ' پایان امتحان',
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
            {data.examParent_end}
            {/* {moment(data.exam_end).format('HH:mm:00')} */}
          </p>)
      },
    },
    {
      title: 'نام کلاس',
      field: 'teacher_name',
      editable: 'never',
      // lookup:['ب', 'الف'],
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
      title: 'نام درس', field: 'exam_courseName', editable: 'never',
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
      title: 'موضوع امتحان', field: 'examParent_topic', editable: 'never',
      render: data => {
        return (
          <p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
           {data.examParent_topic}
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
        }}>{data.examParent_maxScore}</p>)
      },
    },
  ]);

  const [state, setState] = React.useState({
    columns: [
      { title: 'تاریخ شروع', field: 'examParent_start_date', editable: 'never' },
      { title: 'تاریخ پایان', field: 'examParent_stop_date', editable: 'never' },
      { title: ' شروع امتحان', field: 'examParent_start', editable: 'never' },
      { title: ' پایان امتحان', field: 'examParent_end', editable: 'never' },
      // { title: 'سوالات', field: 'exam_pdf', editable: 'never' },
      { title: 'نام معلم', field: 'teacher_name', editable: 'never' },
      // { title: 'نام کلاس', field: 'exam_className', editable: 'never' },
      { title: 'نام درس', field: 'exam_courseName', editable: 'never' },
      { title: 'موضوع امتحان', field: 'examParent_topic', editable: 'never' },
      { title: 'حداکثر نمره', field: 'examParent_maxScore', editable: 'never' },
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
        data={rowsTable}
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
