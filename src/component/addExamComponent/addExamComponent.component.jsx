import React, { useContext, useEffect, useState } from 'react';
import {GroupDiv ,DatesDiv,DateDiv,ClocksDivContainer ,ClocksDiv,ClockDiv,TimeDiv,InputTimeContainer,InputTime,LabelTime, SelectDiv , MySelect , LabelGroup , InputGroup,BtnGroupContainer,BtnSend,Option,ContainerForm,Form} from './addExamComponent.styles';
// import './addAxamForTeacher.scss';
// import PopUp from '@components/UI/popUp/popup';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { v4 as uuidv4 } from 'uuid';
// import MaterialTableQuestions from './addQuestions';
import { useSelector } from 'react-redux';
import { fixNumbers } from '../../generalComponent/fixNumbers';
import PersianDatePicker from '../../generalComponent/MaterialDatePicker/MaterialDatePicker';
// import PersianDatePicker from '@components/MaterialDatePicker/MaterialDatePicker';
// import { ConvertToString } from '@components/ConvertToString/ConvertToString';
import { Grid } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
// import { realeTime } from '@components/Clock/getTime';
// import AppContext from 'app/AppContext';
////////////////////////////////////////////////////
import axios from 'axios'
//////////////end Pdf 
var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();
moment2.tz.setDefault('Asia/Tehran');
const graphql_server_uri = '/graphql';
var moment = require('moment-jalaali');
 /////////////upload pdf


const AddExamForTeacher = () => {
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  const [selectedStatrtDate, handleStartDateChange] = useState(moment());
  const [selectedEndDate, handleEndDateChange] = useState(moment());
  const [newSelectedStartDate, setNewSelectedStartDate] = useState('');
  const [newSelectedEndDate, setNewSelectedEndDate] = useState('');
/////////////////////////////////
  // const [selectedstartTime, handleSelectedStartTime] = useState(realeTime.toLocaleTimeString([], {
  //   timeZone: 'Asia/Tehran',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false,
  // }));
  // const [selectedEndTime, handleSelectedEndTime] = useState(realeTime.toLocaleTimeString([], {
  //   timeZone: 'Asia/Tehran',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false,
  // }));
  const [selectedEndTime, handleSelectedEndTime] = useState('');
  const [selectedstartTime, handleSelectedStartTime] = useState('');

  ////////////////////////
  const [state,setState] = useState({
    // selectedstartTime:'',
    // selectedEndTime:'',
    //////////////////
    axamId: '',
    examCourseName:'',
    examMaxScore:'',
    examTopic:'',
    getExamClassTeacher:[],
    getExamLevelTeacher:[],
    getExamCourseNamesTeacher:[],
    examclassName:'',
    examLevel:'',
    // examLevel:[],
    handleOneClick:false,
    examMethod:'',
  })
  // const [examCourseName, setExamCourseName] = useState('');
  // const [examMaxScore, setExamMaxScore] = useState('');
  // const [axamId, setAxamId] = React.useState('');
  // const [message, setMessage] = React.useState('');
  // const [examTopic, setexamTopic] = React.useState('');
  // const [status, setStatus] = React.useState(0);
  // const [ShowPopup, setShowPopup] = React.useState(false);
  ///////////
  // const [classN, setClassN] = useState("");
  // const [level, setLevel] = useState("");
  const [groups, setGroups] = useState([
    {class_name:'الف',level:'اول',group_course_name:'علوم',},
    {class_name:'الف',level:'اول',group_course_name:'ریاضی',},
    {class_name:'ب',level:'دوم',group_course_name:'فیزیک',},
    {class_name:'ب',level:'اول',group_course_name:'اجتماعی',},
    {class_name:'ج',level:'سوم',group_course_name:'علوم',},
]);

  const handleItems = (item,myItem) => {
    // var MyClass = groups.map(group => {group.level === myLevel ?  group : ""})
    if(item =="selectedLevel"){
      var Myclass = groups.filter(group =>group.level === myItem);
      console.log('Myclass',Myclass);
      var newClassName = [];
      for (
        var count = 0;
        count < Myclass.length;
        count++
      ) {
        var existFlag = false;
        for (var count2 = 0; count2 < newClassName.length; count2++) {
          if (
            // newLevels[count2].class_name ===
            // res.data.getGroupsByPersonId[count].class_name &&
            newClassName[count2].class_name ===
            Myclass[count].class_name
            // &&
            // newLevels[count2].group_course_name ===
            // res.data.getGroupsByPersonId[count].group_course_name
          ) {
            existFlag = true;
            break;
          }
        }
        if (!existFlag) {
          newClassName.push({ group_id: Myclass[count].group_id, class_name: Myclass[count].class_name });
        }
      }
      setState({...state,getExamCourseNamesTeacher:'' ,getExamClassTeacher : newClassName});
    }else if(item =="selectedClass"){
      var itemsClass = myItem.split(',');
      console.log('itemsClass',itemsClass);
      var MyCourseNames = groups.filter(group =>group.class_name === itemsClass[0]);
      console.log('MyCourseNames',MyCourseNames);
      var newCourseNames = [];
      for (
        var count = 0;
        count < MyCourseNames.length;
        count++
      ) {
        var existFlag = false;
        for (var count2 = 0; count2 < newCourseNames.length; count2++) {
          if (
            newCourseNames[count2].group_course_name ===
            MyCourseNames[count].group_course_name
          ) {
            existFlag = true;
            break;
          }
        }
        if (!existFlag) {
          newCourseNames.push({ group_id: MyCourseNames[count].group_id, group_course_name: MyCourseNames[count].group_course_name });
        }
      }
      console.log('getExamCourseNamesTeacher',newCourseNames);
      setState({...state, getExamCourseNamesTeacher : newCourseNames});
      /////////////////////////////////////////////////
    }
     
  }
  // const [Levels, setLevels] = useState([]);
  // const [classNames, setClassNames] = useState([]);
  // const [courseNames, setCourseNames] = useState([]);
  // const [handleOneClick, sethandleOneClick] = useState(false);
  // const [method, setMethod] = useState('');

  useEffect(() => {
    setNewSelectedStartDate(fixNumbers(moment(selectedStatrtDate,
    ).format('jYYYY/jMM/jDD')));
  }, [selectedStatrtDate]);

  useEffect(() => {
    setNewSelectedEndDate(fixNumbers(moment(selectedEndDate,
    ).format('jYYYY/jMM/jDD')));
  }, [selectedEndDate]);

  useEffect(() => {
      var newLevels = [];
        for (
          var count = 0;
          count < groups.length;
          count++
        ) {
          var existFlag = false;
          for (var count2 = 0; count2 < newLevels.length; count2++) {
            if (
              // newLevels[count2].class_name ===
              // res.data.getGroupsByPersonId[count].class_name &&
              newLevels[count2].level ===
              groups[count].level
              // &&
              // newLevels[count2].group_course_name ===
              // res.data.getGroupsByPersonId[count].group_course_name
            ) {
              existFlag = true;
              break;
            }
          }
          if (!existFlag) {
            newLevels.push({ group_id: groups[count].group_id, level: groups[count].level });
          }
        }
        setState({...state, getExamLevelTeacher : newLevels});
    // fetch(graphql_server_uri, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     query: `
    //                   mutation{
    //                     getGroupsByPersonId(
    //                       person_id_input: {
    //                             person_id: "${'1'}"
    //                             person_password: "${'1'}"
    //                       }
    //                     ){
    //                       group_id
    //                       group_course_name
    //                       class_name
    //                       level
    //                     }
    //                   }                      
    //                 `,
    //   }),
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     ///////////////////////////////
    //     setGroups(res.data.getGroupsByPersonId);
    //     var newLevels = [];
    //     for (
    //       var count = 0;
    //       count < res.data.getGroupsByPersonId.length;
    //       count++
    //     ) {
    //       var existFlag = false;
    //       for (var count2 = 0; count2 < newLevels.length; count2++) {
    //         if (
    //           // newLevels[count2].class_name ===
    //           // res.data.getGroupsByPersonId[count].class_name &&
    //           newLevels[count2].level ===
    //           res.data.getGroupsByPersonId[count].level
    //           // &&
    //           // newLevels[count2].group_course_name ===
    //           // res.data.getGroupsByPersonId[count].group_course_name
    //         ) {
    //           existFlag = true;
    //           break;
    //         }
    //       }
    //       if (!existFlag) {
    //         newLevels.push({ group_id: res.data.getGroupsByPersonId[count].group_id, level: res.data.getGroupsByPersonId[count].level });
    //       }
    //     }
    //     setState({getExamLevelTeacher : newLevels});

    //     /////////////////////////////
    //     var newClassName = [];
    //     for (
    //       var count = 0;
    //       count < res.data.getGroupsByPersonId.length;
    //       count++
    //     ) {
    //       var existFlag = false;
    //       for (var count2 = 0; count2 < newClassName.length; count2++) {
    //         if (
    //           // newLevels[count2].class_name ===
    //           // res.data.getGroupsByPersonId[count].class_name &&
    //           newClassName[count2].class_name ===
    //           res.data.getGroupsByPersonId[count].class_name
    //           // &&
    //           // newLevels[count2].group_course_name ===
    //           // res.data.getGroupsByPersonId[count].group_course_name
    //         ) {
    //           existFlag = true;
    //           break;
    //         }
    //       }
    //       if (!existFlag) {
    //         newClassName.push({ group_id: res.data.getGroupsByPersonId[count].group_id, class_name: res.data.getGroupsByPersonId[count].class_name });
    //       }
    //     }
    //     setState({getExamClassTeacher : newClassName});
    //     ////////////////////////
    //     var newCourseNames = [];
    //     for (
    //       var count = 0;
    //       count < res.data.getGroupsByPersonId.length;
    //       count++
    //     ) {
    //       var existFlag = false;
    //       for (var count2 = 0; count2 < newCourseNames.length; count2++) {
    //         if (
    //           // newLevels[count2].class_name ===
    //           // res.data.getGroupsByPersonId[count].class_name &&
    //           newCourseNames[count2].group_course_name ===
    //           res.data.getGroupsByPersonId[count].group_course_name
    //           // &&
    //           // newLevels[count2].group_course_name ===
    //           // res.data.getGroupsByPersonId[count].group_course_name
    //         ) {
    //           existFlag = true;
    //           break;
    //         }
    //       }
    //       if (!existFlag) {
    //         newCourseNames.push({ group_id: res.data.getGroupsByPersonId[count].group_id, group_course_name: res.data.getGroupsByPersonId[count].group_course_name });
    //       }
    //     }
    //     setState({getExamCourseNamesTeacher : newCourseNames});
    //   });
    // }
  }, []);


  const handleSubmit = event => {
    event.preventDefault();
    // sethandleOneClick(true);
    // if (typeOfPerson === 'teacher') {
    // var teacherName =
    //   user.user.person_name +
    //   ' ' +
    //   user.user.person_surname;
    // //////////////////////////
    // var IdForAxam = uuidv4();
    ///////////
    // if ((level !== "" && classN !== "" && examCourseName !== '' && method !== '')) {
    //   ///////////////
    //   axios({
    //     method: 'post',
    //     url: '/addNewExam',
    //     data: {
    //       exam_id: IdForAxam,
    //       exam_data: newSelectedDate,
    //       exam_start:selectedstartTime,
    //       exam_end: selectedEndTime,
    //       exam_teacherId: user.user.person_id,
    //       exam_teacherName: teacherName,
    //       exam_level: level,
    //       exam_className: classN,
    //       exam_courseName: examCourseName,
    //       exam_maxScore: examMaxScore,
    //       exam_method:method,
    //       exam_topic: examTopic,
    //       // exam_pdf: pdfFile ? pdfFile : ''
    //     },
    //   })
    //     .then(res => {
    //       if (res.data.exam_id) {
    //         sethandleOneClick(false);
    //         setExamCourseName('');
    //         setExamMaxScore('');
    //         setAxamId(res.data.exam_id);
    //         setMessage('اطلاعاتی به درستی ثبت شد');
    //         setStatus(0);
    //         setShowPopup(true);
    //       } else {
    //         sethandleOneClick(false);
    //         // setExamCourseName('');
    //         // setExamMaxScore('');
    //         // setAxamId(res.data.addNewAxam.exam_id);
    //         setMessage('اطلاعاتی به درستی ثبت نشد');
    //         setStatus(1);
    //         setShowPopup(true);
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //     //////////////////////////////////////
      
    // } else {
    //   setMessage('ابتدا اطلاعات خواسته شده را پر کنید!!');
    //   setStatus(1);
    //   setShowPopup(true);
    //   sethandleOneClick(false);
    // }
  };

  function format(time) { 
    // console.log('time',time);  
    // Hours, minutes and seconds
    // var hrs = ~~(time / 3600);
    // var mins = ~~((time % 3600) / 60);
    // var secs = ~~time % 60;
    var hrs = Math.floor(time / 3600);
    var mins = Math.floor((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    // console.log('ret',ret);
    return ret;
}

  useEffect(()=>{
    var EmD = document.getElementById('examDuration');
    if(newSelectedStartDate != '' && newSelectedEndDate !='' && newSelectedStartDate == newSelectedEndDate){
      if(selectedstartTime && selectedEndTime){
        var newStart = selectedstartTime ? moment2(selectedstartTime).tz('Asia/Tehran').format('HH:mm:00').split(':'):'';
        var newEnd = selectedEndTime ? moment2(selectedEndTime).tz('Asia/Tehran').format('HH:mm:00').split(':'):'00:00:00';
        // console.log('selectedEndTime',moment2(selectedEndTime).tz('Asia/Tehran').format('HH:mm:00'));
        var StartHour = fixNumbers(newStart[0]) || 0;
        var EndHour = fixNumbers(newEnd[0]) || 0;
        var StartMinutes = fixNumbers(newStart[1]) || 0;
        var EndMinutes = fixNumbers(newEnd[1]) || 0;
        // var StartHour = fixNumbers(newStart[0]) ;
        // var EndHour = fixNumbers(newEnd[0]);
        // var StartMinutes = fixNumbers(newStart[1]);
        // var EndMinutes = fixNumbers(newEnd[1]);
        // console.log('EndHour',EndHour);
        // console.log('EndMinutes',EndMinutes);
        if(StartHour <= EndHour && StartMinutes <= EndMinutes){
          var hour = EndHour - StartHour;
          var minutes = EndMinutes - StartMinutes;
          EmD.value = `${hour}: ${minutes}: 00`;
        }else{
          var convertStart = StartHour * 3600 + StartMinutes * 60 ;
          var convertEnd = EndHour * 3600 + EndMinutes * 60 ;
          var time = convertEnd - convertStart;
          // console.log('time' ,time);
          if(time < 0){
            // console.log('4');
            alert('زمان امتحان اشتباه است');
            // handleSelectedEndTime('');
            EmD.value = "";
          }else{
            EmD.value = format(time);
          }
        }
      }
     
    }else if(newSelectedStartDate != '' && newSelectedEndDate !='' && newSelectedStartDate != newSelectedEndDate){
      EmD.value = "";
    }
  })

  const ExamDuration = () =>{
    if(newSelectedStartDate != '' && newSelectedEndDate !='' && newSelectedStartDate == newSelectedEndDate){
        var newStart = selectedstartTime ? moment2(selectedstartTime).tz('Asia/Tehran').format('HH:mm:00').split(':'):'';
        var newEnd = selectedEndTime ? moment2(selectedEndTime).tz('Asia/Tehran').format('HH:mm:00').split(':'):'';
        if(newStart[0] < newEnd[0] && newStart[1] < newEnd[1]){
          var hour = newEnd[0] - newStart[0];
          var minutes = newEnd[1] - newStart[1];
          return `${hour}: ${minutes}: 00`
        }
        // console.log('newStart',newStart);
    }
  }

  const checkValue = (field , value) => {
    // console.log('field',field);
    // console.log('value',value);
    console.log('field',field,'value',value);
    // var selectedLevel = document.getElementById("selectedLevel").options.length;
    var selectedLevel = document.getElementById("selectedLevel");
    var selectedClass = document.getElementById("selectedClass");
    var selectedCourse = document.getElementById("selectedCourse");

    if(field === "selectedCourse"){
      console.log('1');
      console.log('state.examclassName',state.examclassName,'state.examLevel',state.examLevel);
      console.log(!state.examclassName && !state.examLevel);
        if(!state.examclassName && !state.examLevel){
          console.log('2');
         
          selectedLevel.style.border="1px solid #000";
          selectedClass.style.border="1px solid #000";
          // const name = event.target.name;
          setState({
            ...state,
            examLevel: value,
          });
          // setState({examLevel:value});
        }else{
          console.log('3');
          selectedLevel.style.border="1px solid red";
          selectedClass.style.border="1px solid red";
        }
    }else if(field === "selectedClass"){
      if(!state.examLevel){
        selectedLevel.style.border="1px solid #000";
        selectedClass.style.border="1px solid #000";
        setState({
          ...state,
          examclassName:value,
        });
        // setState({examclassName:value});
      }else{
        selectedLevel.style.border="1px solid red";
        selectedClass.style.border="1px solid red";
      }
    }
   
  }

  return (
    <ContainerForm>
      <Grid container spacing={3}>
        <Grid item sm={12} md={12}>
          <Form>
            <DatesDiv>
              <DateDiv>
                  <PersianDatePicker selectedDate={selectedStatrtDate} handleDateChange={handleStartDateChange} />
                <LabelGroup>
                    تاریخ شروع امتحان
                </LabelGroup>
              </DateDiv>
              <DateDiv>
                  <PersianDatePicker selectedDate={selectedEndDate} handleDateChange={handleEndDateChange} />
                  <LabelGroup>
                    تاریخ پایان امتحان
                  </LabelGroup>
              </DateDiv>
          </DatesDiv>
          {/* / */}
          <ClocksDivContainer>
            <ClocksDiv>
                <ClockDiv>
                  <MuiPickersUtilsProvider moment={moment2} utils={MomentUtils}>
                  <TimePicker
                    okLabel="تأیید"
                    cancelLabel="لغو"
                    clearLabel="پاک کردن"
                    clearable
                    labelFunc={date => (date ? moment2(date).tz('Asia/Tehran').format('HH:mm:00')
                      : "")}
                    ampm={false}
                    label="24 hours"
                    value={selectedstartTime}
                    onChange={handleSelectedStartTime}
                  />
                </MuiPickersUtilsProvider>
                  <LabelGroup>
                      ساعت شروع امتحان
                  </LabelGroup>
                </ClockDiv>
                <ClockDiv>
                    <MuiPickersUtilsProvider moment={moment2} utils={MomentUtils}>
                
                      <TimePicker
                        okLabel="تأیید"
                        cancelLabel="لغو"
                        clearLabel="پاک کردن"
                        clearable
                        labelFunc={date => (date ? moment2(date).tz('Asia/Tehran').format('HH:mm:00')
                          : "")}
                        ampm={false}
                        label="24 hours"
                        value={selectedEndTime}
                        onChange={handleSelectedEndTime}
                      />
                    </MuiPickersUtilsProvider>
                    <LabelGroup>
                      ساعت پایان امتحان
                    </LabelGroup>
                </ClockDiv>
            </ClocksDiv>
            <TimeDiv>
              <InputTimeContainer>
              <InputTime
                id="examDuration"
                type = "text"
                // value = {ExamDuration}
                // readOnly
                // value={state.examTopic}
                // onChange={e => 
                //   setState({examTopic:e.target.value})
                // }
              />
              </InputTimeContainer>
              <LabelTime>
                مدت زمان امتحان
                    </LabelTime>
            </TimeDiv>
          </ClocksDivContainer>
          {/*  */}
            
          {/* <GroupDiv>
              <SelectDiv>
              <MuiPickersUtilsProvider moment={moment2} utils={MomentUtils}>
                <TimePicker
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  clearable
                  labelFunc={date => (date ? moment2(date).tz('Asia/Tehran').format('HH:mm:00')
                    : "")}
                  ampm={false}
                  label="24 hours"
                  value={selectedstartTime}
                  onChange={handleSelectedStartTime}
                />
              </MuiPickersUtilsProvider>
              </SelectDiv>
              <LabelGroup>
                ساعت شروع امتحان
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <SelectDiv>
                <MuiPickersUtilsProvider moment={moment2} utils={MomentUtils}>
              
                <TimePicker
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  clearable
                  labelFunc={date => (date ? moment2(date).tz('Asia/Tehran').format('HH:mm:00')
                    : "")}
                  ampm={false}
                  label="24 hours"
                  value={selectedEndTime}
                  onChange={handleSelectedEndTime}
                />
              </MuiPickersUtilsProvider>
              </SelectDiv>
              <LabelGroup>
                ساعت پایان امتحان
                    </LabelGroup>
            </GroupDiv> */}
            
            <GroupDiv>
              <SelectDiv>
                <MySelect
                  name="groupIdSelect"
                  id="selectedLevel"
                  // onChange={e=>checkValue("selectedLevel",e.target.value)}
                  onChange={e => handleItems('selectedLevel',e.target.value)}
                  // onChange={e => {
                    
                  //   // alert(e.target.value);
                  //   setState({examLevel:e.target.value})
                  //   // setLevel(e.target.value);
                  //   // groupId = e.target.value;
                  // }}
                >
                  <Option value="">
                    یکی از پایه های زیر را انتخاب کنید
                        </Option>
                  {state.getExamLevelTeacher
                    ? state.getExamLevelTeacher.map((group, index) => (
                      <Option key={index} value={group.level}>
                        {parseInt(group.level) === parseInt(group.level, 10)
                          ? group.level
                          // appContext.initConfig.newLevel[group.level]
                          : group.level}
                      </Option>
                    ))
                    : ''}
                </MySelect>
              </SelectDiv>
              <LabelGroup>
                پایه
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <SelectDiv>
                <MySelect
                  name="groupIdSelect"
                  id="selectedClass"
                  onChange={e => handleItems('selectedClass',e.target.value)}
                  // onChange={e=>checkValue("selectedClass",e.target.value)}
                  // onChange={e => {
                  //   setState({examclassName:e.target.value});
                  //   // setClassN(e.target.value);
                  // }}
                >
                  <Option value="">
                    یکی از کلاس های زیر را انتخاب کنید
                        </Option>
                  {state.getExamClassTeacher
                    ? state.getExamClassTeacher.map((group, index) => (
                      <Option key={index} value={group.class_name}>
                        {parseInt(group.class_name) ===
                          parseInt(group.class_name, 10)
                          ? group.class_name
                          // appContext.initConfig.newClassName[group.class_name]
                          : group.class_name
                        }
                      </Option>
                    ))
                    : ''}
                  <Option value="10,11,12">
                    الف-ب-ج
                          </Option>
                </MySelect>
              </SelectDiv>
              <LabelGroup>
                نام کلاس
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <SelectDiv>
                <MySelect
                  name="groupIdSelect"
                  id="selectedCourse"
                  // onChange={e=>checkValue("selectedCourse",e.target.value)}
                  // onChange={e => {
                  //   // alert(e.target.value);
                  //   setState({examCourseName:e.target.value});
                  //   // setExamCourseName(e.target.value);
                  //   // groupId = e.target.value;
                  // }}
                >
                  <Option value="">
                    یکی از درس های زیر را انتخاب کنید
                        </Option>
                  {state.getExamCourseNamesTeacher
                    ? state.getExamCourseNamesTeacher.map((group, index) => (
                      // <Option key={index} value={`${group.group_course_name}/${group.group_id}`}>
                      <Option key={index} value={group.group_course_name}>
                        {parseInt(group.group_course_name) ===
                          parseInt(group.group_course_name, 10)
                          ? 
                          group.group_course_name
                          // appContext.initConfig.newCourseName[group.group_course_name]
                          : group.group_course_name
                        }
                      </Option>
                    ))
                    : ''}
                </MySelect>
              </SelectDiv>
              <LabelGroup>
                درس
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <InputGroup
                type="text"
                value={state.examTopic}
                onChange={e => 
                  setState({examTopic:e.target.value})
                }
              />
              <LabelGroup>
                موضوع امتحان
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <InputGroup
                type="number"
                id="maxScore"
                name="maxScore"
                value={state.examMaxScore}
                onChange={e => 
                  setState({examMaxScore:e.target.value})
                }
              />
              <LabelGroup>
                از چند نمره
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <SelectDiv>
                <MySelect
                  name="groupIdSelect"
                  onChange={e => {
                    setState({examMethod:e.target.value});
                  }}
                >
                  <Option value="">
                     انتخاب کنید
                        </Option>
                  <Option value="0">
                    پس از پایان امتحان امکان ادامه امتحان توسط دانش آموز نباشد
                          </Option>
                  <Option value="1">
                    پس از پایان امتحان امکان ادامه امتحان توسط دانش آموز باشد
                          </Option>
                </MySelect>
              </SelectDiv>
              <LabelGroup>
                  نحوه عملکردامتحان
              </LabelGroup>
            </GroupDiv>
            <BtnGroupContainer>
              <BtnSend
                type="submit"
                value="ارسال"
                onClick={e => handleSubmit(e)}
                // disabled={handleOneClick}
              />
            </BtnGroupContainer>
          </Form>
        </Grid>
      </ Grid>
    </ContainerForm >
  );
};
export default AddExamForTeacher;
