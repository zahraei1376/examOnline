import React, { useContext, useEffect, useState } from 'react';
import {GroupDiv ,DatesDiv,DateDiv,ClocksDivContainer ,ClocksDiv,ClockDiv,TimeDiv,InputTimeContainer,InputTime,LabelTime, SelectDiv , Select , LabelGroup , InputGroup,BtnGroupContainer,BtnSend,Option,ContainerForm,Form} from './addExamComponent.styles';
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
////////////////////
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
  /////////////////////////////
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
    selectedstartTime:'',
    selectedEndTime:'',
    //////////////////
    axamId: '',
    examCourseName:'',
    examMaxScore:'',
    examTopic:'',
    getExamClassTeacher:[],
    getExamLevelTeacher:[],
    getExamCourseNamesTeacher:[],
    examclassName:'',
    examLevels:[],
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
  const [groups, setGroups] = useState([]);
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
    // if (typeOfPerson === 'teacher') {
      // user.user.person_id
    fetch(graphql_server_uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
                      mutation{
                        getGroupsByPersonId(
                          person_id_input: {
                                person_id: "${'1'}"
                                person_password: "${'1'}"
                          }
                        ){
                          group_id
                          group_course_name
                          class_name
                          level
                        }
                      }                      
                    `,
      }),
    })
      .then(res => res.json())
      .then(res => {
        ///////////////////////////////
        var newLevels = [];
        for (
          var count = 0;
          count < res.data.getGroupsByPersonId.length;
          count++
        ) {
          var existFlag = false;
          for (var count2 = 0; count2 < newLevels.length; count2++) {
            if (
              // newLevels[count2].class_name ===
              // res.data.getGroupsByPersonId[count].class_name &&
              newLevels[count2].level ===
              res.data.getGroupsByPersonId[count].level
              // &&
              // newLevels[count2].group_course_name ===
              // res.data.getGroupsByPersonId[count].group_course_name
            ) {
              existFlag = true;
              break;
            }
          }
          if (!existFlag) {
            newLevels.push({ group_id: res.data.getGroupsByPersonId[count].group_id, level: res.data.getGroupsByPersonId[count].level });
          }
        }
        setState({getExamLevelTeacher : newLevels});

        /////////////////////////////
        var newClassName = [];
        for (
          var count = 0;
          count < res.data.getGroupsByPersonId.length;
          count++
        ) {
          var existFlag = false;
          for (var count2 = 0; count2 < newClassName.length; count2++) {
            if (
              // newLevels[count2].class_name ===
              // res.data.getGroupsByPersonId[count].class_name &&
              newClassName[count2].class_name ===
              res.data.getGroupsByPersonId[count].class_name
              // &&
              // newLevels[count2].group_course_name ===
              // res.data.getGroupsByPersonId[count].group_course_name
            ) {
              existFlag = true;
              break;
            }
          }
          if (!existFlag) {
            newClassName.push({ group_id: res.data.getGroupsByPersonId[count].group_id, class_name: res.data.getGroupsByPersonId[count].class_name });
          }
        }
        setState({getExamClassTeacher : newClassName});
        ////////////////////////
        var newCourseNames = [];
        for (
          var count = 0;
          count < res.data.getGroupsByPersonId.length;
          count++
        ) {
          var existFlag = false;
          for (var count2 = 0; count2 < newCourseNames.length; count2++) {
            if (
              // newLevels[count2].class_name ===
              // res.data.getGroupsByPersonId[count].class_name &&
              newCourseNames[count2].group_course_name ===
              res.data.getGroupsByPersonId[count].group_course_name
              // &&
              // newLevels[count2].group_course_name ===
              // res.data.getGroupsByPersonId[count].group_course_name
            ) {
              existFlag = true;
              break;
            }
          }
          if (!existFlag) {
            newCourseNames.push({ group_id: res.data.getGroupsByPersonId[count].group_id, group_course_name: res.data.getGroupsByPersonId[count].group_course_name });
          }
        }
        setState({getExamCourseNamesTeacher : newCourseNames});
      });
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
    //       exam_Start:selectedstartTime,
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
                type="text"
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
                <Select
                  name="groupIdSelect"
                  onChange={e => {
                    setState({examclassName:e.target.value});
                    // setClassN(e.target.value);
                  }}
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
                </Select>
              </SelectDiv>
              <LabelGroup>
                نام کلاس
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <SelectDiv>
                <Select
                  name="groupIdSelect"
                  onChange={e => {
                    // alert(e.target.value);
                    setState({examLevels:e.target.value})
                    // setLevel(e.target.value);
                    // groupId = e.target.value;
                  }}
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
                </Select>
              </SelectDiv>
              <LabelGroup>
                پایه
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <SelectDiv>
                <Select
                  name="groupIdSelect"
                  onChange={e => {
                    // alert(e.target.value);
                    setState({examCourseName:e.target.value});
                    // setExamCourseName(e.target.value);
                    // groupId = e.target.value;
                  }}
                >
                  <Option value="">
                    یکی از درس های زیر را انتخاب کنید
                        </Option>
                  {state.getExamCourseNamesTeacher
                    ? state.getExamCourseNamesTeacher.map((group, index) => (
                      <Option key={index} value={`${group.group_course_name}/${group.group_id}`}>
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
                </Select>
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
                <Select
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
                </Select>
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
