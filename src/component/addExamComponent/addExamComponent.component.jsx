import React, { useContext, useEffect, useState } from 'react';
import {GroupDiv ,DatesDiv,DateDiv,ClocksDivContainer ,ClocksDiv,ClockDiv,TimeDiv,
  InputTimeContainer,InputTime,LabelTime, SelectDiv , MySelect , LabelGroup , 
  InputGroup,BtnGroupContainer,BtnSend,Option,ContainerForm,Form ,ClsManager} from './addExamComponent.styles';
// import './addAxamForTeacher.scss';
// import PopUp from '@components/UI/popUp/popup';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import { v1, v4 as uuidv4 } from 'uuid';
// import MaterialTableQuestions from './addQuestions';
import { useSelector } from 'react-redux';
import { fixNumbers } from '../../generalComponent/fixNumbers';
import PersianDatePicker from '../../generalComponent/MaterialDatePicker/MaterialDatePicker';
// import PersianDatePicker from '@components/MaterialDatePicker/MaterialDatePicker';
// import { ConvertToString } from '@components/ConvertToString/ConvertToString';
import { Grid } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { realeTime } from '../../generalComponent/Clock/getTime';
// import { realeTime } from '@components/Clock/getTime';
// import AppContext from 'app/AppContext';
////////////////////////////////////////////////////
// import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import axios from 'axios';
import MySnackbar from '../../messageBox/messageBox.component';
import MySpinner from '../MySpinner/MySpinner.component';
// import ApolloClient from "apollo-boost";
// import { gql } from "apollo-boost";

// const client = new ApolloClient({
//   uri: "http://192.168.1.36:4000/graphql",
// });
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { useQuery ,gql } from 'apollo-boost';
import { useMutation} from 'react-apollo';
import { useHistory } from "react-router-dom";
// import { gql, useMutation } from '@apollo/client';
// import { addNewExamMutation} from '../../graphql/resolver';
var typePfUser = 1;
//////////////end Pdf 
var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();
moment2.tz.setDefault('Asia/Tehran');
const graphql_server_uri = '/graphql';
var moment = require('moment-jalaali');
 /////////////upload pdf
 const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const addNewExamMutation = gql`
    mutation addExamParent(
        $userName: String!,
        $password: String!,
        $examParent_gId:[String]!,
        $examParent_start_date: String!, 
        $examParent_stop_date: String!, 
        $examParent_start: String!,
        $examParent_end: String!, 
        $examParent_duration: String!,
        $examParent_maxScore: String!, 
        $examParent_method:String!,
        $examParent_topic:String!,
        $examParent_random: Boolean!,
        $examParent_backward: Boolean!,
        ){
          addExamParent(
                userName: $userName, 
                password:$password, 
                examParent_gId: $examParent_gId,
                examParent_start_date: $examParent_start_date, 
                examParent_stop_date: $examParent_stop_date,
                examParent_start: $examParent_start,
                examParent_end: $examParent_end, 
                examParent_duration: $examParent_duration,
                examParent_maxScore: $examParent_maxScore, 
                examParent_method: $examParent_method,
                examParent_topic: $examParent_topic,
                examParent_random: $examParent_random,
                examParent_backward: $examParent_backward,
                ){
                  id
                }
        }
`;
const AddExamForTeacher = ({MyGroups}) => {
  ////////////////////////////////
   // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  ////////////////////////////////////
  const [addExamParent ,{ data }] = useMutation(addNewExamMutation);
  const [selectedClass , setSelectedClass] = useState([]);
  const [selectedLevel,setSelectedLevel] = useState('');
  // const [loading,setLoading] = useState(false);
  // const [clicked,setClicked] = useState(false);
  const [showMessage,setShowMessage] = useState(false);
  const [message,setMessage] =useState('');
  const [status,setStatus] =useState(0);
  /////////////////////////
  let history = useHistory();
  //////////////////////////////////for manager
  const classes = useStyles();
  //////////////////////////////////////////////
  const [values, setValues] = React.useState([]);
  const [valuesClass,setValuesClass] = useState([]);
  //////////////////////////////////////////////
  const clearSelectedCourse = () => {
    setValues([]);
  };

  const clearSelectedClass = () => {
    setValuesClass([]);
  };

  const clearSelected = () =>{
    setValues([]);
    setValuesClass([]);
  }
  ////////////////////////////////////////////
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
  const [selectedEndTime, handleSelectedEndTime] = useState(moment2());
  const [selectedstartTime, handleSelectedStartTime] = useState(moment2());
  // const [selectedEndTime, handleSelectedEndTime] = useState();
  // const [selectedstartTime, handleSelectedStartTime] = useState();
  const [groupsExam,setGroupsExam] = useState([]);
  const [groupWithCourseName,setGroupsExamWithCourseName] = useState([]);
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
    loading:false,
    examMethod: '0',
    backward: "false",
    random : "true",
    duration: '00:00:00',
  })

  const [groups, setGroups] = useState([
    // {class:'الف',level:'اول',course:'علوم',pId:'1'},
    // {class:'الف',level:'اول',course:'ریاضی',pId:'2'},
    // {class:'ب',level:'دوم',course:'فیزیک',pId:'3'},
    // {class:'ب',level:'اول',course:'اجتماعی',pId:'4'},
    // {class:'ج',level:'سوم',course:'علوم',pId:'5'},
]);
  const [uniqGroups,setUniqGroups] = useState([]);
  {/* ///////////////////////////////////////////////*/}
  const handleItems = (item,myItem) => {
    console.log('myItem',myItem);
    // var MyClass = groups.map(group => {group.level === myLevel ?  group : ""})
    if(item =="selectedLevel"){
      clearSelected();
      // setValuesClass([]);
      // setState({...state ,getExamClassTeacher: []});
      setSelectedLevel(myItem);
      var Myclass = uniqGroups.filter(group =>group.level === myItem);
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
            // newLevels[count2].class ===
            // res.data.getGroupsByPersonId[count].class &&
            newClassName[count2].class ===
            Myclass[count].class
            // &&
            // newLevels[count2].course ===
            // res.data.getGroupsByPersonId[count].course
          ) {
            existFlag = true;
            break;
          }
        }
        if (!existFlag) {
          newClassName.push({ id: Myclass[count].id, class: Myclass[count].class });
        }
      }
      console.log('newClassName',newClassName);
      setState({...state,getExamCourseNamesTeacher:'' ,getExamClassTeacher : newClassName});
    }else if(item =="selectedClass"){
      if(typePfUser == 0){
        var itemsClass = myItem.split(',');
        console.log('itemsClass',itemsClass);
        var MyCourseNames = uniqGroups.filter(group =>group.class === itemsClass[0]);
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
              newCourseNames[count2].course ===
              MyCourseNames[count].course
            ) {
              existFlag = true;
              break;
            }
          }
          if (!existFlag) {
            newCourseNames.push({ id: MyCourseNames[count].id, course: MyCourseNames[count].course });
          }
        }
        console.log('getExamCourseNamesTeacher',newCourseNames);
        setState({...state, getExamCourseNamesTeacher : newCourseNames});
      }
      else if(typePfUser == 1){
        setValues([]);
        if(myItem && myItem.length > 0){
          setValuesClass(myItem);
          setSelectedClass(myItem);
          var itemsClass = myItem[0].class;
          console.log('itemsClass',itemsClass);
          var MyCourseNames = uniqGroups.filter(group =>group.class === itemsClass);
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
                newCourseNames[count2].course ===
                MyCourseNames[count].course
              ) {
                existFlag = true;
                break;
              }
            }
            if (!existFlag) {
              newCourseNames.push({ id: MyCourseNames[count].id, course: MyCourseNames[count].course });
            }
          }
          console.log('getExamCourseNamesTeacher',newCourseNames);
          setState({...state, getExamCourseNamesTeacher : newCourseNames});
        }else{
          // clearSelectedCourse();
          // setValuesClass([]);
          clearSelected();
          setSelectedClass([]);
          // setState({...state, getExamCourseNamesTeacher : []});
          setGroupsExam([]);
          setState({...state, getExamCourseNamesTeacher : []});
          // setState({...state,getExamCourseNamesTeacher:[] ,getExamClassTeacher : []});
        }
      }

       /////////////////////////////////////////////////
    }
     
  }
  {/* ///////////////////////////////////////////////*/}
  useEffect(() => {
    setNewSelectedStartDate(fixNumbers(moment(selectedStatrtDate,
    ).format('jYYYY/jMM/jDD')));
  }, [selectedStatrtDate]);

  useEffect(() => {
    setNewSelectedEndDate(fixNumbers(moment(selectedEndDate,
    ).format('jYYYY/jMM/jDD')));
  }, [selectedEndDate]);
  {/* ///////////////////////////////////////////////*/}
  useEffect(()=>{
    var newGrops = [];
    for (
      var count = 0;
      count < MyGroups.length;
      count++
    ) {
      var existFlag = false;
      for (var count2 = 0; count2 < newGrops.length; count2++) {
        if (
          newGrops[count2].level ===
          MyGroups[count].level &&
          newGrops[count2].class ===
          MyGroups[count].class &&
          newGrops[count2].course ===
          MyGroups[count].course
        ) {
          existFlag = true;
          break;
        }
      }
      if (!existFlag) {
        newGrops.push({ id: MyGroups[count].id, class: MyGroups[count].class , level: MyGroups[count].level, course: MyGroups[count].course });
      }
    }
    console.log('newGrops',newGrops);
    setUniqGroups(newGrops);
    // setGroups(MyGroups);
    var newLevels = [];
    for (
      var count = 0;
      count < newGrops.length;
      count++
    ) {
      var existFlag = false;
      for (var count2 = 0; count2 < newLevels.length; count2++) {
        if (
          // newLevels[count2].class ===
          // res.data.getGroupsByPersonId[count].class &&
          newLevels[count2].level ===
          newGrops[count].level
          // &&
          // newLevels[count2].course ===
          // res.data.getGroupsByPersonId[count].course
        ) {
          existFlag = true;
          break;
        }
      }
      if (!existFlag) {
        // console.log('newLevels',newLevels);
        newLevels.push({ id: newGrops[count].id, level: newGrops[count].level });
      }
    }
    // console.log('newLevels',newLevels);
    setState({...state, getExamLevelTeacher : newLevels});
    // setState({...state,getExamCourseNamesTeacher:'' ,getExamClassTeacher : newClassName});
  },[MyGroups])
  {/* ///////////////////////////////////////////////*/}
  const handleGroupsExam = (vl) =>{    
    if(typePfUser === 1){
      setValues(vl);
      var MySelectedGroup = [];
      var MySelectedGroupWithCourseName = [];
      console.log("uniqGroups",uniqGroups);
        for (let i = 0; i < selectedClass.length; i++) {
          for (let j = 0; j < vl.length; j++) {
            console.log("selectedLevel",selectedLevel);
            console.log("selectedClass[i]",selectedClass[i].class);
            console.log("vl[j]",vl[j].course);
            var myGroup = uniqGroups.filter(group => group.level === selectedLevel && 
              group.class === selectedClass[i].class &&
              group.course === vl[j].course);
              console.log("myGroup" ,myGroup);
              MySelectedGroup.push(myGroup[0].id);
              ////////////////////////////////////////////////////////////
              // MySelectedGroupWithCourseName.push({group: [myGroup[0].pId] , course:myGroup[0].course});
              /////////////////////////////////////////////
              ///////////////////////////////////////////////////////////
              // if(MySelectedGroupWithCourseName.length > 0){
                var existFlag = false;
                var count = 0;
                for (let index = 0; index < MySelectedGroupWithCourseName.length; index++) {
                  
                  if(MySelectedGroupWithCourseName[index].course == vl[j].course){
                    existFlag = true;
                    count = index;
                    // console.log('MySelectedGroupWithCourseName',MySelectedGroupWithCourseName);
                    break;
                    // var groupsCN = MySelectedGroupWithCourseName[index].group;
                    // groupsCN.push(myGroup[0].pId);
                    // MySelectedGroupWithCourseName[index] = {group: groupsCN , course:myGroup[0].course}
                    // MySelectedGroupWithCourseName.splice(index, 1, '');
                  }
                  // else{
                  //   MySelectedGroupWithCourseName.push({group: [myGroup[0].pId] , course:myGroup[0].course});
                  // }
                }

                if (existFlag) {
                  MySelectedGroupWithCourseName[count].group.push(myGroup[0].id);
                  console.log('not exist',MySelectedGroupWithCourseName);
                  // listScoreAndCourse[count].average = avg;
                } else {
                  MySelectedGroupWithCourseName.push({group: [myGroup[0].id] , course:myGroup[0].course});
                  console.log('exist',MySelectedGroupWithCourseName);
                  // console.log('listScoreAndCourse');
                  // console.log(listScoreAndCourse);
                }
              // }
              // else{
              //   MySelectedGroupWithCourseName.push({group: [myGroup[0].pId] , course:myGroup[0].course});
              // }
              

              // console.log('MySelectedGroupWithCourseName',MySelectedGroupWithCourseName);
              
          }
          
        }
        console.log("MySelectedGroup" ,MySelectedGroup);
        console.log('MySelectedGroupWithCourseName',MySelectedGroupWithCourseName);
        setGroupsExam(MySelectedGroup);
        setGroupsExamWithCourseName(MySelectedGroupWithCourseName);
    }else if(typePfUser === 0){
      setGroupsExam(vl);
    }
  }
  {/* ///////////////////////////////////////////////*/}
  useEffect(()=>{
      console.log("uniqGroupsExam" , groupsExam);
  },[groupsExam])
 {/* ///////////////////////////////////////////////*/}
  const handleSubmit = async(event) => {
    event.preventDefault();
    setState({...state , handleOneClick:true});
    setState({...state , loading:true});
    if(groupsExam.length > 0){
    //////////////////////
      const myPromise = new Promise((resolve, reject) => {
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
            if(StartHour < EndHour && StartMinutes < EndMinutes){
              var hour = EndHour - StartHour;
              if(hour < 10){
                hour = '0' + hour;
              }
              var minutes = EndMinutes - StartMinutes;
              if(minutes < 10){
                minutes = '0' + minutes;
              }
              // EmD.value = `${hour}: ${minutes}: 00`;
              setState({...state , duration:`${hour}: ${minutes}: 00`});
              resolve(`${hour}: ${minutes}: 00`);
              // EmD.defaultValue = `${hour}: ${minutes}: 00`;
            }
            else if(StartHour == EndHour && StartMinutes == EndMinutes){
                // alert('زمان اشتباه است!!!');
                reject('زمان اشتباه است!!!');
                // EmD.defaultValue = "";
            }
            else{
              var convertStart = StartHour * 3600 + StartMinutes * 60 ;
              var convertEnd = EndHour * 3600 + EndMinutes * 60 ;
              var time = convertEnd - convertStart;
              // console.log('time' ,time);
              if(time < 0){
                // console.log('4');
                // alert('زمان امتحان اشتباه است');
                reject('زمان امتحان اشتباه است');
                // handleSelectedEndTime('');
                // EmD.value = "";
              }else{
                var valueTime =format(time);
                // EmD.value = valueTime;
                resolve(valueTime);
                // EmD.defaultValue = format(time);

              }
            }
          }
        
        }else if(newSelectedStartDate != '' && newSelectedEndDate !='' && newSelectedStartDate != newSelectedEndDate){
          // EmD.value = "";
          resolve(state.duration);
        }

        // resolve();
      });
      // var CT = calcTime();
      myPromise
      .then( handleResolvedA => {
          addExamParent({ variables: { 
            userName: "211", 
            password: "211", 
            examParent_gId: groupsExam,
            examParent_start_date: newSelectedStartDate, 
            examParent_stop_date: newSelectedEndDate,
            examParent_start:selectedstartTime ,
            examParent_end: selectedEndTime , 
            // examParent_start:selectedstartTime ?  moment2(selectedstartTime).tz('Asia/Tehran').format('HH:mm:00') : '',
            // examParent_end: selectedEndTime ?  moment2(selectedEndTime).tz('Asia/Tehran').format('HH:mm:00') : '', 
            examParent_duration:handleResolvedA,
            examParent_maxScore: state.examMaxScore, 
            examParent_method: state.examMethod,
            examParent_topic: state.examTopic,
            examParent_random: state.random == "true" ? true : false,
            examParent_backward: state.backward == "true" ? true : false,
            // //////////////////////////////////////
        }
          }).then(res=>{
            if(res.data && res.data.addExamParent){
              console.log('groupWithCourseName',groupWithCourseName);
              console.log('res.data.addExamParent',res.data.addExamParent);
              setMessage('امتحان ثبت شد');
              setStatus('1');
              setShowMessage(!showMessage);
              
              setState({...state , loading:false});
              // setState({...state , handleOneClick:false});
              setTimeout(()=>{
                // history.push("/questions");
                
              // setState({...state , loading:false});
              setState({...state , handleOneClick:false});
                history.push({
                  pathname: '/questions',
                  // search: '?query=abc',
                  state: { courses: groupWithCourseName ,examParentId: res.data.addExamParent && res.data.addExamParent.id ? res.data.addExamParent.id : ''}
                })
              },1000)
            }else{
              setStatus('0')
              setMessage('امتحان ثبت نشد')
              setShowMessage(!showMessage);
              
              setState({...state , loading:false});
              setState({...state , handleOneClick:false});
            }
          })
      
      })
      .catch(err =>{
        setState({...state , loading:false});
        setState({...state , handleOneClick:false});
        alert(err);
      });
    }else{
      setStatus('0')
      setMessage('باید درسی را انتخاب کنید')
      setShowMessage(!showMessage);
      setState({...state , loading:false});
      setState({...state , handleOneClick:false});
    }
    //////////////////////////
    // if(CT){
    //   if(groupsExam.length > 0){
    //     await addExamParent({ variables: { 
    //       userName: "211", 
    //       password: "211", 
    //       examParent_gId: groupsExam,
    //       examParent_start_date: newSelectedStartDate, 
    //       examParent_stop_date: newSelectedEndDate,
    //       examParent_start:selectedstartTime ?  moment2(selectedstartTime).tz('Asia/Tehran').format('HH:mm:00') : '',
    //       examParent_end: selectedEndTime ?  moment2(selectedEndTime).tz('Asia/Tehran').format('HH:mm:00') : '', 
    //       examParent_duration: state.duration,
    //       examParent_maxScore: state.examMaxScore, 
    //       examParent_method: state.examMethod,
    //       examParent_topic: state.examTopic,
    //       examParent_random: state.random == "true" ? true : false,
    //       examParent_backward: state.backward == "true" ? true : false,
    //       // //////////////////////////////////////
    //    }
    //     }).then(res=>{
    //       if(res.data && res.data.addExamParent){
    //         // console.log('data',data);
    //         setMessage('امتحان ثبت شد');
    //         setStatus('1');
    //         setShowMessage(!showMessage);
    //         setTimeout(()=>{
    //           // history.push("/questions");
    //           history.push({
    //             pathname: '/questions',
    //             // search: '?query=abc',
    //             state: { courses: groupsExam ,examParentId: res.data.addExamParent }
    //           })
    //         },1000)
    //       }else{
    //         // console.log('data',data);
    //         setStatus('0')
    //         setMessage('امتحان ثبت نشد')
    //         setShowMessage(!showMessage);
    //       }
    //     })
    //   }else{
    //     setStatus('0')
    //     setMessage('باید درسی را انتخاب کنید')
    //     setShowMessage(!showMessage);
    //   }
    // }
  };
  {/* ///////////////////////////////////////////////*/}
  function format(time) { 
    console.log('time',time);  
    // Hours, minutes and seconds
    // var hrs = ~~(time / 3600);
    // var mins = ~~((time % 3600) / 60);
    // var secs = ~~time % 60;
    var hrs = Math.floor(time / 3600);
    var mins = Math.floor((time % 3600) / 60);
    var secs = time % 60;
    console.log('hrs',hrs);
    console.log('mins',mins);
    console.log('secs',secs);
    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    // if (hrs > 0) {
    //     ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    // }else{
    //   ret += "00:" + (mins < 10 ? "0" : "");
    // }
    if (hrs > 0 && hrs < 10) {
      ret += "" + "0" + hrs + ":" + (mins < 10 ? "0" : "");
    }else if(hrs > 0 && hrs >= 10){
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }else{
        ret += "" + "00" + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    console.log('ret',ret);
    setState({...state , duration:ret});
    return ret;
  }
  {/* ///////////////////////////////////////////////*/}
  // useEffect(()=>{
  //   // console.log('count' , counter);
  //   // if(counter == 2){
  //     var EmD = document.getElementById('examDuration');
  //     if(newSelectedStartDate != '' && newSelectedEndDate !='' && newSelectedStartDate == newSelectedEndDate){
  //       if(selectedstartTime && selectedEndTime){
  //         var newStart = selectedstartTime ? moment2(selectedstartTime).tz('Asia/Tehran').format('HH:mm:00').split(':'):'';
  //         var newEnd = selectedEndTime ? moment2(selectedEndTime).tz('Asia/Tehran').format('HH:mm:00').split(':'):'00:00:00';
  //         // console.log('selectedEndTime',moment2(selectedEndTime).tz('Asia/Tehran').format('HH:mm:00'));
  //         var StartHour = fixNumbers(newStart[0]) || 0;
  //         var EndHour = fixNumbers(newEnd[0]) || 0;
  //         var StartMinutes = fixNumbers(newStart[1]) || 0;
  //         var EndMinutes = fixNumbers(newEnd[1]) || 0;
  //         // var StartHour = fixNumbers(newStart[0]) ;
  //         // var EndHour = fixNumbers(newEnd[0]);
  //         // var StartMinutes = fixNumbers(newStart[1]);
  //         // var EndMinutes = fixNumbers(newEnd[1]);
  //         // console.log('EndHour',EndHour);
  //         // console.log('EndMinutes',EndMinutes);
  //         if(StartHour < EndHour && StartMinutes < EndMinutes){
  //           var hour = EndHour - StartHour;
  //           if(hour < 10){
  //             hour = '0' + hour;
  //           }
  //           var minutes = EndMinutes - StartMinutes;
  //           if(minutes < 10){
  //             minutes = '0' + minutes;
  //           }
  //           EmD.value = `${hour}: ${minutes}: 00`;
  //           setState({...state , duration:`${hour}: ${minutes}: 00`});
  //           // EmD.defaultValue = `${hour}: ${minutes}: 00`;
  //         }
  //         // else if(StartHour == EndHour && StartMinutes == EndMinutes){
  //         //     alert('زمان اشتباه است!!!');
  //         //     EmD.defaultValue = "";
  //         // }
  //         else{
  //           var convertStart = StartHour * 3600 + StartMinutes * 60 ;
  //           var convertEnd = EndHour * 3600 + EndMinutes * 60 ;
  //           var time = convertEnd - convertStart;
  //           // console.log('time' ,time);
  //           if(time < 0){
  //             // console.log('4');
  //             alert('زمان امتحان اشتباه است');
  //             // handleSelectedEndTime('');
  //             EmD.value = "";
  //           }else{
  //             EmD.value = format(time);
  //             // EmD.defaultValue = format(time);
  
  //           }
  //         }
  //       }
       
  //     }else if(newSelectedStartDate != '' && newSelectedEndDate !='' && newSelectedStartDate != newSelectedEndDate){
  //       // EmD.value = "";
  //     }
  //   // }
  //   // else{
      
  //   //   counter = counter + 1;
  //   //   console.log('counter2',counter);
  //   // }
    

  // })
  {/* ///////////////////////////////////////////////*/}
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
  {/* ///////////////////////////////////////////////*/}
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
  {/* ///////////////////////////////////////////////*/}
  return (
    <ContainerForm>
      {/* ///////////////////////////////////////////////*/}
      <Grid container spacing={3}>
        <Grid item sm={12} md={12}>
          <Form>
            <DatesDiv>
              <DateDiv>
                  <LabelGroup>
                      تاریخ شروع امتحان
                  </LabelGroup>
                  <PersianDatePicker selectedDate={selectedStatrtDate} handleDateChange={handleStartDateChange} />
              </DateDiv>
              <DateDiv>
                  <LabelGroup>
                    تاریخ پایان امتحان
                  </LabelGroup>
                  <PersianDatePicker selectedDate={selectedEndDate} handleDateChange={handleEndDateChange} />
              </DateDiv>
          </DatesDiv>
          {/* / */}
          <ClocksDivContainer>
            <ClocksDiv>
                <ClockDiv>
                  <LabelGroup>
                      ساعت شروع امتحان
                  </LabelGroup>
                  <MuiPickersUtilsProvider moment={moment2} utils={MomentUtils} >
                  <TimePicker
                    style={{fontSize:'3rem'}}
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
                </ClockDiv>
                <ClockDiv>
                    <LabelGroup>
                      ساعت پایان امتحان
                    </LabelGroup>
                    <MuiPickersUtilsProvider moment={moment2} utils={MomentUtils}>
                
                      <TimePicker
                        style={{fontSize:'3rem'}}
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
                </ClockDiv>
            </ClocksDiv>
            {newSelectedStartDate != newSelectedEndDate ? 
            <TimeDiv>
              <LabelTime>
                مدت زمان امتحان
              </LabelTime>
              <InputTimeContainer>
              <InputTime
                id="examDuration"
                type = "text"
                // value = {ExamDuration}
                readOnly ={newSelectedStartDate == newSelectedEndDate}
                // value={state.examTopic}
                onChange={e => 
                  setState({...state , duration:e.target.value})
                }
              />
              </InputTimeContainer>
              
            </TimeDiv> : ''}
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
            {/* ////////////////////////////// */}
            <GroupDiv>
              <LabelGroup>
                پایه
              </LabelGroup>
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
             
            </GroupDiv>
            {/* ////////////////////////////// */}
            <GroupDiv>
              <LabelGroup>
                نام کلاس
              </LabelGroup>
              <SelectDiv>
                {typePfUser == 0 ? <MySelect
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
                      <Option key={index} value={group.class}>
                        {parseInt(group.class) ===
                          parseInt(group.class, 10)
                          ? group.class
                          // appContext.initConfig.newClassName[group.class]
                          : group.class
                        }
                      </Option>
                    ))
                    : ''}
                  <Option value="10,11,12">
                    الف-ب-ج
                          </Option>
                </MySelect> :      
                <ClsManager className={classes.root}>
                  <Autocomplete
                    autoComplete="off"
                    multiple
                    id="size-small-standard-multi"
                    size="small"
                    options={state.getExamClassTeacher && state.getExamClassTeacher.length > 0 ? state.getExamClassTeacher : []}
                    getOptionLabel={(option) => option.class}
                    value={valuesClass}
                    //  defaultValue={[top100Films[0]]}
                    renderInput={(params) => {
                      // console.log('params', params)
                      return(
                      <TextField {...params} variant="standard" label="کلاس ها" placeholder="انتخاب کلاس" />
                    )}}
                    onChange={(event, value) => handleItems('selectedClass',value)}
                    // onChange={(event, value) => console.log(value)}
                  />
                </ClsManager>}
              </SelectDiv>
            </GroupDiv>
            {/* ////////////////////////////// */}
            <GroupDiv>
              <LabelGroup>
                درس
              </LabelGroup>
              <SelectDiv>
                {typePfUser === 0 ? <MySelect
                // style={{direction:'ltr'}}
                  name="groupIdSelect"
                  id="selectedCourse"
                  onChange={event => handleGroupsExam(event.target.value)}
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
                      // <Option key={index} value={`${group.course}/${group.pId}`}>
                      <Option key={index} value={group.course}>
                        {parseInt(group.course) ===
                          parseInt(group.course, 10)
                          ? 
                          group.course
                          // appContext.initConfig.newCourseName[group.course]
                          : group.course
                        }
                      </Option>
                    ))
                    : ''}
                </MySelect> :
                <ClsManager className={classes.root}>
                <Autocomplete
                // style={{direction:'ltr'}}
                  multiple
                  id="size-small-standard-multi"
                  size="small"
                  value={values}
                  options={state.getExamCourseNamesTeacher && state.getExamCourseNamesTeacher.length > 0 ? state.getExamCourseNamesTeacher : []}
                  getOptionLabel={(option) => option.course ? option.course : ''}
                  ///////////////////////////////
                  // options={state.getExamClassTeacher ? state.getExamClassTeacher : ''}
                  //   getOptionLabel={(option) => option.class}
                  //   value={valuesClass}
                  // ref='courseInput'
                  //  defaultValue={[top100Films[0]]}
                  renderInput={(params) => {
                    // console.log('params', params)
                    return(
                    <TextField {...params} variant="standard" label="درس ها" placeholder="انتخاب درس" />
                  )}}

                  onChange={(event,value) => handleGroupsExam(value)}
                  // onChange={(event, value) => handleItems('selectedClass',value)}
                  // onChange={(event, value) => console.log(value)}
                />
              </ClsManager>
                }
              </SelectDiv>
              
            </GroupDiv>
            {/* ////////////////////////////// */}
            <GroupDiv>
              <LabelGroup>
                موضوع امتحان
              </LabelGroup>
              <InputGroup
                type="text"
                value={state.examTopic}
                onChange={e => 
                  setState({...state,examTopic:e.target.value})
                }
              />
              
            </GroupDiv>
            {/* ////////////////////////////// */}
            <GroupDiv>
              <LabelGroup>
                از چند نمره
              </LabelGroup>
              <InputGroup
                type="number"
                id="maxScore"
                name="maxScore"
                value={state.examMaxScore}
                onChange={e => 
                  setState({...state,examMaxScore:e.target.value})
                }
              />
             
            </GroupDiv>
            {/* ////////////////////////////// */}
            <GroupDiv>
              <LabelGroup>
                  نحوه عملکردامتحان
              </LabelGroup>
              <SelectDiv>
                <MySelect
                  name="groupIdSelect"
                  onChange={e => {
                    setState({...state,examMethod:e.target.value});
                  }}
                >
                  <Option value="">
                     انتخاب کنید
                        </Option>
                  <Option value="0" selected="selected">
                    پس از پایان امتحان امکان ادامه امتحان توسط دانش آموز نباشد
                          </Option>
                  <Option value="1">
                    پس از پایان امتحان امکان ادامه امتحان توسط دانش آموز باشد
                          </Option>
                </MySelect>
              </SelectDiv>
              
            </GroupDiv>
            {/* ////////////////////////////// */}
            <GroupDiv>
              <LabelGroup>
                  تصادفی کردن سوالات
              </LabelGroup>
              <SelectDiv>
                <MySelect
                  name="groupIdSelect"
                  data-bind="value: stateString"
                  onChange={e => {
                    setState({...state,random:e.target.value});
                  }}
                >
                  <Option value="">
                     انتخاب کنید
                        </Option>
                  <Option 
                  // value={true}
                  value="true"
                  selected="selected"
                  >
                    بله
                          </Option>
                  <Option 
                  // value={false}
                  value="false"
                  >
                   خیر
                          </Option>
                </MySelect>
              </SelectDiv>
            </GroupDiv>
            {/* /////////////////////////////////////// */}
            <GroupDiv>
              <LabelGroup>
                  بازگشت به سوال قبل
              </LabelGroup>
              <SelectDiv>
                <MySelect
                  name="groupIdSelect"
                  // data-bind="value: stateString"
                  onChange={e => {
                    setState({...state,backward:e.target.value});
                  }}
                >
                  <Option value="">
                     انتخاب کنید
                        </Option>
                  <Option 
                  // value={true}
                  value="true"
                  >
                    بله
                          </Option>
                  <Option 
                  // value={false}
                  value="false"
                  selected="selected"
                  >
                    خیر
                  </Option>
                </MySelect>
              </SelectDiv>
            </GroupDiv>
            {/* //////////////////////////////////////////// */}
            <BtnGroupContainer>
              <BtnSend
                type="submit"
                value="ارسال"
                disabled = {state.handleOneClick}
                onClick={e => handleSubmit(e)}
                // disabled={handleOneClick}
              />
              {state.loading ? <MySpinner/> : ''}
            </BtnGroupContainer>
          </Form>
          {
            showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
          }
          {/* {state.loading ? <MySpinner/> : ''} */}
        </Grid>
      </ Grid>
    </ContainerForm >
  );
};
export default AddExamForTeacher;
// export default compose(
//   graphql(addNewExamMutation, { name: "addNewExamMutation" }),
//   // graphql(addBookMutation, { name: "addBookMutation" })
// )(AddExamForTeacher);
