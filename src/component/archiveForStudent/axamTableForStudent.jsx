import React, { useContext, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
// import moment from 'moment';
import PopUpScore from '../popUpScore/popUpScore';
import { fixNumbers } from '@components/FixNumbers/fixNumbers';
import { realeTime } from '@components/Clock/getTime';
// import { ConvertToString } from '@components/ConvertToString/ConvertToString';
import { useSelector } from 'react-redux';
import AppContext from 'app/AppContext';


var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();

var moment = require('moment-jalaali');
moment().format('jYYYY/jMM/jDD');
const graphql_server_uri = '/graphql';

const MaterialTableAxamsForStudent = ({ selectedDate, setCourseName, setLevel, setClassName, setExamID, axamId, setShowRank }) => {
  /////////////////////////
  const appContext = useContext(AppContext);
  const user = useSelector(({ auth }) => auth.user);
  const [showPopUpScore, setShowPopUpScore] = useState(false);
  const [popUpScoreStudent, setPopUpScoreStudent] = useState(null);
  const [time, setTime] = useState(
    realeTime.toLocaleTimeString([], {
      timeZone: "Asia/Tehran",
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }));
  const [getDate, setGetDate] = useState(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));

  const togglePopup = () => {
    setExamID('');
    setShowPopUpScore(!showPopUpScore);
  };
  //////////////////////////
  const [columns, setColumns] = React.useState({
    columns: [
      { title: 'تاریخ', field: 'exam_data', editable: 'never' },
      {
        title: ' شروع امتحان',
        field: 'exam_Start',
        editable: 'never',
        type: 'datetime',
        render: data => {
          return moment2(data.exam_Start).tz('Asia/Tehran').format('HH:mm:00');
        },
      },
      {
        title: ' پایان امتحان',
        field: 'exam_end',
        editable: 'never',
        type: 'datetime',
        render: data => {
          return moment2(data.exam_end).tz('Asia/Tehran').format('HH:mm:00');
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
        title: 'نام معلم', field: 'exam_teacherName', editable: 'never',
        render: data => {
          return (<p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '80px' }}>{data.exam_teacherName}</p>)
        },
      },
      {
        title: 'پایه',
        field: 'exam_level',
        editable: 'never',
        lookup: appContext.initConfig.newLevel,
        render: data => {
          return (
            <p
              style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
              {parseInt(data.exam_level) === parseInt(data.exam_level, 10)
                ? appContext.initConfig.newLevel[data.exam_level]
                : data.exam_level}
            </p>
          );
        },
      },
      {
        title: 'نام کلاس',
        field: 'exam_className',
        editable: 'never',
        lookup: appContext.initConfig.newClassName,
        render: data => {
          return (
            <p
              style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
              {parseInt(data.exam_className) ===
                parseInt(data.exam_className, 10)
                ? appContext.initConfig.newClassName[data.exam_className]
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
                ? appContext.initConfig.newCourseName[data.exam_courseName]
                : data.exam_courseName
              }
            </p>)
        },
      },
      {
        title: 'حداکثر نمره', field: 'exam_maxScore', editable: 'never',
        render: data => {
          return (<p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>{data.exam_maxScore}</p>)
        },
      },
      {
        title: 'نمره', field: 'exam_score', editable: 'never',
        render: data => {
          var newEndTime = fixNumbers(moment2(data.exam_end).tz('Asia/Tehran').format('HH:mm:00'));
          var filterSlectedEndTime = newEndTime.split(":").join("");
          var temp = fixNumbers(realeTime.toLocaleTimeString([], {
            timeZone: "Asia/Tehran",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }));
          var filterGetTime = temp.split(":").join("");
          var newsSelectedDate = data.selectedDate;
          var filterSlectedDate = newsSelectedDate.split("/").join("");
          var newDate = fixNumbers(data.getDate);
          var filterGetDate = newDate.split("/").join("");

          return (<p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>{filterGetDate > filterSlectedDate ? data.exam_score : filterGetDate == filterSlectedDate && filterGetTime > filterSlectedEndTime ? data.exam_score : '****'}</p>)
        },
      },
    ],
    data: [],
  });

  const [state, setState] = React.useState({
    columns: [
      { title: 'تاریخ', field: 'exam_data', editable: 'never' },
      { title: ' شروع امتحان', field: 'exam_Start', editable: 'never' },
      { title: ' پایان امتحان', field: 'exam_end', editable: 'never' },
      // { title: 'سوالات', field: 'exam_pdf', editable: 'never' },
      { title: 'نام معلم', field: 'exam_teacherName', editable: 'never' },
      { title: 'پایه', field: 'exam_level', editable: 'never' },
      { title: 'نام کلاس', field: 'exam_className', editable: 'never' },
      { title: 'نام درس', field: 'exam_courseName', editable: 'never' },
      { title: 'حداکثر نمره', field: 'exam_maxScore', editable: 'never' },
      { title: 'نمره', field: 'exam_score', editable: 'never' },
    ],
    data: [],
  });


  useEffect(() => {
    var timerClear = setInterval(() => {
      setGetDate(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));
      // setGetDate(fixNumbers(realeTime.toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })));
      setTime(
        realeTime.toLocaleTimeString([], {
          timeZone: "Asia/Tehran",
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      );
    }, 1000);
    return () => {
      clearInterval(timerClear);
    };
  }, [time, getDate]);
  ////////////////////////

  const handleSetDateForRankStudent = (info) => {
    var newsSelectedDate = selectedDate;
    var newEndTime = fixNumbers(moment2(info.exam_end).tz('Asia/Tehran').format('HH:mm:00'));
    var filterSlectedDate = newsSelectedDate.split("/").join("");
    var newDate = fixNumbers(getDate);
    var filterGetDate = newDate.split("/").join("");
    var filterSlectedEndTime = newEndTime.split(":").join("");
    var temp = fixNumbers(time);
    var filterGetTime = temp.split(":").join("");

    if (filterGetDate > filterSlectedDate) {
      setCourseName(info.exam_courseName);
      setLevel(info.exam_level);
      setClassName(info.exam_className);
      setExamID(info.exam_id);
      setShowRank(true);
    } else if (filterGetDate == filterSlectedDate && filterGetTime > filterSlectedEndTime) {
      setCourseName(info.exam_courseName);
      setLevel(info.exam_level);
      setClassName(info.exam_className);
      setExamID(info.exam_id);
      setShowRank(true);
    }
    else {
      alert("پس از زمان پایان امتحان مراجعه نمایید!!!");
    }
  }

  const getScore = (student) => {
    var newsSelectedDate = selectedDate;
    var newEndTime = fixNumbers(moment2(student.exam_end).tz('Asia/Tehran').format('HH:mm:00'));
    var filterSlectedDate = newsSelectedDate.split("/").join("");
    var newDate = fixNumbers(getDate);
    var filterGetDate = newDate.split("/").join("");
    var filterSlectedEndTime = newEndTime.split(":").join("");
    var temp = fixNumbers(time);
    var filterGetTime = temp.split(":").join("");

    if (filterGetDate > filterSlectedDate) {
      setExamID(student.exam_id);
      setPopUpScoreStudent(student);
      setShowPopUpScore(true);
      setShowRank(false);
    } else if (filterGetDate == filterSlectedDate && filterGetTime > filterSlectedEndTime) {
      setExamID(student.exam_id);
      setPopUpScoreStudent(student);
      setShowPopUpScore(true);
      setShowRank(false);
    }
    else {
      alert("پس از زمان پایان امتحان مراجعه نمایید!!!");
    }
  };

  const refteshData = () => {
    async function fetchData() {
      /////////////////////
      const result = await fetch(graphql_server_uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
                    mutation{
                        getExamsWithDateClassNameAndLevel(
                            axam_input: {
                                exam_level: "${user.user.level}"
                                exam_className: "${user.user.class_name}"
                                exam_data: "${selectedDate}"
                          }
                        ){
                            exam_id
                            exam_data
                            exam_Start
                            exam_end
                            exam_teacherId
                            exam_teacherName
                            exam_level
                            exam_className
                            exam_courseName
                            exam_maxScore
                            exam_topic
                        }
                    }                      
                `,
        }),
      })
        .then(res => res.json())
        .then(res => {
          return res.data;
        });
      var temp = [];
      temp.push(...result.getExamsWithDateClassNameAndLevel);
      if (result.getExamsWithDateClassNameAndLevel.length !== 0) {
        var temp = result.getExamsWithDateClassNameAndLevel;
        for (let index = 0; index < temp.length; index++) {
          await fetch(graphql_server_uri, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
                        mutation{
                          getAxamResponse(
                            axamResponse_input: {
                              exam_id: "${temp[index].exam_id}"
                              student_id: "${user.user.person_id}"
                              }
                            ){
                              exam_score
                            }
                        }                      
                    `,
            }),
          })
            .then(res => res.json())
            .then(res => {
              if (res.data.getAxamResponse) {
                temp[index] = { ...temp[index], exam_score: res.data.getAxamResponse.exam_score, selectedDate: selectedDate, getDate: getDate };
              } else {
                temp[index] = { ...temp[index], exam_score: 0, selectedDate: selectedDate, getDate: getDate };
              }
            });
        }
        setColumns(prevState => ({
          ...prevState,
          data: temp,
        }));
      } else {
        setColumns(prevState => ({
          ...prevState,
          data: [],
        }));
      }
    }
    fetchData();
  };

  React.useEffect(() => {
    refteshData();
  }, [selectedDate]);

  return (
    <div dir="rtl">
      <MaterialTable
        title="امتحان"
        columns={columns.columns}
        data={columns.data}
        actions={[
          {
            icon: 'library_books',
            tooltip: 'گزارش امتحان',
            onClick: (event, rowData) => getScore(rowData),
            // style:{fontSize: 40, color: '#1f4971' }
          },
          {
            icon: 'trending_up',
            tooltip: 'نمودار پیشرفت تحصیلی این درس',
            onClick: (event, rowData) => handleSetDateForRankStudent(rowData),
            // style:{fontSize: 40, color: '#1f4971' }
          },
        ]}
        options={{
          showTitle: false,
          headerStyle: {
            fontFamily: 'BTitrBold',
            textAlign: 'center',
            backgroundColor: '#6c95BD',
            color: '#FFF',
            zIndex: 0,
            fontSize: '12px',
          },
          rowStyle: rowData => ({
            backgroundColor: rowData.tableData.id % 2 === 0 ? '#EEE' : '#FFF',
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
          popUpScoreStudent={popUpScoreStudent}
          closePopUp={togglePopup}
          axamIdProps={axamId}
          startTime={popUpScoreStudent.exam_Start}
          endTime={popUpScoreStudent.exam_end}
          teacherName={popUpScoreStudent.exam_teacherName}
          courseName={popUpScoreStudent.exam_courseName}
        />
      ) : (
          ''
        )}
    </div>
  );
};
export default React.memo(MaterialTableAxamsForStudent);
