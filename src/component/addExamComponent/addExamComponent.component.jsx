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
// import { realeTime } from '@components/Clock/getTime';
// import AppContext from 'app/AppContext';
////////////////////////////////////////////////////
// import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
// import ApolloClient from "apollo-boost";
// import { gql } from "apollo-boost";

// const client = new ApolloClient({
//   uri: "http://192.168.1.36:4000/graphql",
// });
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { useQuery ,gql } from 'apollo-boost';
import { useMutation} from 'react-apollo'
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
        $examParent_gId:[ID]!,
        $examParent_start_date: String!, 
        $examParent_stop_date: String!, 
        $examParent_start: String!,
        $examParent_end: String!, 
        $examParent_maxScore: String!, 
        $examParent_method:String!,
        $examParent_topic:String!
        ){
            addExamParent(
                userName: $userName, 
                password:$password, 
                examParent_gId: $examParent_gId,
                examParent_start_date: $examParent_start_date, 
                examParent_stop_date: $examParent_stop_date,
                examParent_start: $examParent_start,
                examParent_end: $examParent_end, 
                examParent_maxScore: $examParent_maxScore, 
                examParent_method: $examParent_method,
                examParent_topic: $examParent_topic
                ){
                  id
                }
        }
`;

const AddExamForTeacher = ({MyGroups}) => {
  // const { loading, error, data } = useQuery(addNewExamMutation);
  const [addExamParent] = useMutation(addNewExamMutation);
  const [selectedClass , setSelectedClass] = useState([]);
  const [selectedLevel,setSelectedLevel] = useState('');
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  //////////////////////////////////for manager
  const classes = useStyles();

  //////////////////////////////////////////////
  const [values, setValues] = React.useState([]);

  const clearSelected = () => {
    setValues([]);
  };
  // const getAllUsersQuery = gql`
  // {
  //   groupsListByPerson(userName: "210", password: "210") {
  //     pId
  //     class
  //     level
  //     course
  //   }
  // }
  // `;
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
  const [selectedEndTime, handleSelectedEndTime] = useState('');
  const [selectedstartTime, handleSelectedStartTime] = useState('');
  const [groupsExam,setGroupsExam] =useState([]);
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
    // {class:'الف',level:'اول',course:'علوم',pId:'1'},
    // {class:'الف',level:'اول',course:'ریاضی',pId:'2'},
    // {class:'ب',level:'دوم',course:'فیزیک',pId:'3'},
    // {class:'ب',level:'اول',course:'اجتماعی',pId:'4'},
    // {class:'ج',level:'سوم',course:'علوم',pId:'5'},
]);
const [uniqGroups,setUniqGroups] = useState([]);

  const handleItems = (item,myItem) => {
    console.log('myItem',myItem);
    // var MyClass = groups.map(group => {group.level === myLevel ?  group : ""})
    if(item =="selectedLevel"){
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
          newClassName.push({ pId: Myclass[count].pId, class: Myclass[count].class });
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
            newCourseNames.push({ pId: MyCourseNames[count].pId, course: MyCourseNames[count].course });
          }
        }
        console.log('getExamCourseNamesTeacher',newCourseNames);
        setState({...state, getExamCourseNamesTeacher : newCourseNames});
      }
      else if(typePfUser == 1){
        if(myItem && myItem.length > 0){
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
              newCourseNames.push({ pId: MyCourseNames[count].pId, course: MyCourseNames[count].course });
            }
          }
          console.log('getExamCourseNamesTeacher',newCourseNames);
          setState({...state, getExamCourseNamesTeacher : newCourseNames});
        }else{
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

  
// async function remoteData() {
//   console.log("Query object - ");
//   return client
//     .query({
//     query: getAllUsersQuery,
//     })
//     .then((res) => {
//       console.log(res.data.groupsListByPerson);
//       // var data = res.data.groupsListByPerson;
//       setGroups(res.data.groupsListByPerson);
//       var newLevels = [];
//       for (
//         var count = 0;
//         count < groups.length;
//         count++
//       ) {
//         var existFlag = false;
//         for (var count2 = 0; count2 < newLevels.length; count2++) {
//           if (
//             // newLevels[count2].class ===
//             // res.data.getGroupsByPersonId[count].class &&
//             newLevels[count2].level ===
//             groups[count].level
//             // &&
//             // newLevels[count2].course ===
//             // res.data.getGroupsByPersonId[count].course
//           ) {
//             existFlag = true;
//             break;
//           }
//         }
//         if (!existFlag) {
//           newLevels.push({ pId: groups[count].pId, level: groups[count].level });
//         }
//       }
//       setState({...state, getExamLevelTeacher : newLevels});
//     });
//   }
//   React.useEffect(() => {
//     console.log("effect");
//     // refteshData();
//     remoteData();
//   }, []);

  // useEffect(() => {
  //   // console.log('MyGroups',MyGroups);
  //   setGroups(MyGroups);
  //   var newLevels = [];
  //   for (
  //     var count = 0;
  //     count < MyGroups.length;
  //     count++
  //   ) {
  //     var existFlag = false;
  //     for (var count2 = 0; count2 < newLevels.length; count2++) {
  //       if (
  //         // newLevels[count2].class ===
  //         // res.data.getGroupsByPersonId[count].class &&
  //         newLevels[count2].level ===
  //         MyGroups[count].level
  //         // &&
  //         // newLevels[count2].course ===
  //         // res.data.getGroupsByPersonId[count].course
  //       ) {
  //         existFlag = true;
  //         break;
  //       }
  //     }
  //     if (!existFlag) {
  //       // console.log('newLevels',newLevels);
  //       newLevels.push({ pId: MyGroups[count].pId, level: MyGroups[count].level });
  //     }
  //   }
  //   // console.log('newLevels',newLevels);
  //   setState({...state, getExamLevelTeacher : newLevels});
  //     // var newLevels = [];
  //     //   for (
  //     //     var count = 0;
  //     //     count < groups.length;
  //     //     count++
  //     //   ) {
  //     //     var existFlag = false;
  //     //     for (var count2 = 0; count2 < newLevels.length; count2++) {
  //     //       if (
  //     //         // newLevels[count2].class ===
  //     //         // res.data.getGroupsByPersonId[count].class &&
  //     //         newLevels[count2].level ===
  //     //         groups[count].level
  //     //         // &&
  //     //         // newLevels[count2].course ===
  //     //         // res.data.getGroupsByPersonId[count].course
  //     //       ) {
  //     //         existFlag = true;
  //     //         break;
  //     //       }
  //     //     }
  //     //     if (!existFlag) {
  //     //       newLevels.push({ pId: groups[count].pId, level: groups[count].level });
  //     //     }
  //     //   }
  //     //   setState({...state, getExamLevelTeacher : newLevels});
      
  //   // fetch(graphql_server_uri, {
  //   //   method: 'POST',
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify({
  //   //     query: `
  //   //                   mutation{
  //   //                     getGroupsByPersonId(
  //   //                       person_id_input: {
  //   //                             person_id: "${'1'}"
  //   //                             person_password: "${'1'}"
  //   //                       }
  //   //                     ){
  //   //                       pId
  //   //                       course
  //   //                       class
  //   //                       level
  //   //                     }
  //   //                   }                      
  //   //                 `,
  //   //   }),
  //   // })
  //   //   .then(res => res.json())
  //   //   .then(res => {
  //   //     ///////////////////////////////
  //   //     setGroups(res.data.getGroupsByPersonId);
  //   //     var newLevels = [];
  //   //     for (
  //   //       var count = 0;
  //   //       count < res.data.getGroupsByPersonId.length;
  //   //       count++
  //   //     ) {
  //   //       var existFlag = false;
  //   //       for (var count2 = 0; count2 < newLevels.length; count2++) {
  //   //         if (
  //   //           // newLevels[count2].class ===
  //   //           // res.data.getGroupsByPersonId[count].class &&
  //   //           newLevels[count2].level ===
  //   //           res.data.getGroupsByPersonId[count].level
  //   //           // &&
  //   //           // newLevels[count2].course ===
  //   //           // res.data.getGroupsByPersonId[count].course
  //   //         ) {
  //   //           existFlag = true;
  //   //           break;
  //   //         }
  //   //       }
  //   //       if (!existFlag) {
  //   //         newLevels.push({ pId: res.data.getGroupsByPersonId[count].pId, level: res.data.getGroupsByPersonId[count].level });
  //   //       }
  //   //     }
  //   //     setState({getExamLevelTeacher : newLevels});

  //   //     // /////////////////////////////
  //   //     // var newClassName = [];
  //   //     // for (
  //   //     //   var count = 0;
  //   //     //   count < res.data.getGroupsByPersonId.length;
  //   //     //   count++
  //   //     // ) {
  //   //     //   var existFlag = false;
  //   //     //   for (var count2 = 0; count2 < newClassName.length; count2++) {
  //   //     //     if (
  //   //     //       // newLevels[count2].class ===
  //   //     //       // res.data.getGroupsByPersonId[count].class &&
  //   //     //       newClassName[count2].class ===
  //   //     //       res.data.getGroupsByPersonId[count].class
  //   //     //       // &&
  //   //     //       // newLevels[count2].course ===
  //   //     //       // res.data.getGroupsByPersonId[count].course
  //   //     //     ) {
  //   //     //       existFlag = true;
  //   //     //       break;
  //   //     //     }
  //   //     //   }
  //   //     //   if (!existFlag) {
  //   //     //     newClassName.push({ pId: res.data.getGroupsByPersonId[count].pId, class: res.data.getGroupsByPersonId[count].class });
  //   //     //   }
  //   //     // }
  //   //     // setState({getExamClassTeacher : newClassName});
  //   //     // ////////////////////////
  //   //     // var newCourseNames = [];
  //   //     // for (
  //   //     //   var count = 0;
  //   //     //   count < res.data.getGroupsByPersonId.length;
  //   //     //   count++
  //   //     // ) {
  //   //     //   var existFlag = false;
  //   //     //   for (var count2 = 0; count2 < newCourseNames.length; count2++) {
  //   //     //     if (
  //   //     //       // newLevels[count2].class ===
  //   //     //       // res.data.getGroupsByPersonId[count].class &&
  //   //     //       newCourseNames[count2].course ===
  //   //     //       res.data.getGroupsByPersonId[count].course
  //   //     //       // &&
  //   //     //       // newLevels[count2].course ===
  //   //     //       // res.data.getGroupsByPersonId[count].course
  //   //     //     ) {
  //   //     //       existFlag = true;
  //   //     //       break;
  //   //     //     }
  //   //     //   }
  //   //     //   if (!existFlag) {
  //   //     //     newCourseNames.push({ pId: res.data.getGroupsByPersonId[count].pId, course: res.data.getGroupsByPersonId[count].course });
  //   //     //   }
  //   //     // }
  //   //     // setState({getExamCourseNamesTeacher : newCourseNames});
  //   //   });
  //   // }
  // }, []);

  useEffect(()=>{
    // var Myclass = groups.filter(group =>group.level === myItem);
    // console.log('Myclass',Myclass);
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
        newGrops.push({ pId: MyGroups[count].pId, class: MyGroups[count].class , level: MyGroups[count].level, course: MyGroups[count].course });
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
        newLevels.push({ pId: newGrops[count].pId, level: newGrops[count].level });
      }
    }
    // console.log('newLevels',newLevels);
    setState({...state, getExamLevelTeacher : newLevels});
    // setState({...state,getExamCourseNamesTeacher:'' ,getExamClassTeacher : newClassName});
  },[MyGroups])


  const handleGroupsExam = (vl) =>{
    // console.log('vl',vl);
    // var temp =[...groupsExam];
    // temp.push(vl);
    // setGroupsExam(temp);
    
    if(typePfUser === 1){
      setValues(vl);
      var MySelectedGroup = [];
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
              MySelectedGroup.push(myGroup[0].pId);
            
          }
          
        }
        console.log("MySelectedGroup" ,MySelectedGroup);
        setGroupsExam(MySelectedGroup);
    }else if(typePfUser === 0){
      setGroupsExam(vl);
    }
  }

  useEffect(()=>{
      console.log("uniqGroupsExam" , groupsExam);
  },[groupsExam])


  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("groupsExam" , groupsExam);
    await addExamParent({ variables: { 
        userName: "211", 
        password: "211", 
        examParent_gId: groupsExam,
        examParent_start_date: newSelectedStartDate, 
        examParent_stop_date: newSelectedEndDate,
        examParent_start: selectedstartTime,
        examParent_end: selectedEndTime, 
        examParent_maxScore: state.examMaxScore, 
        examParent_method: state.examMethod,
        examParent_topic: state.examTopic
     } 
    });
  //   addNewExamMutation({
  //     variables: {
  //       userName: "211", 
  //       password: "211", 
  //       examParent_gId: groupsExam,
  //       examParent_start_date: newSelectedStartDate, 
  //       examParent_stop_date: newSelectedEndDate,
  //       examParent_start: selectedstartTime,
  //       examParent_end: selectedEndTime, 
  //       examParent_maxScore: state.examMaxScore, 
  //       examParent_method: state.examMethod,
  //       examParent_topic: state.examTopic
  //     },
  //     // refetchQueries: [{ query: getBooksQuery }]
  // });
    // sethandleOneClick(true);
    // if (typeOfPerson === 'teacher') {
    // var teacherName =
    //   user.user.person_name +
    //   ' ' +
    //   user.user.person_surname;
    // //////////////////////////
    // var IdForAxam = uuidv4();
    // /////////
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
      {/* ///////////////////////////////////////////////*/

       /**/}
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
                    options={state.getExamClassTeacher ? state.getExamClassTeacher : ''}
                    getOptionLabel={(option) => option.class}
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
              <LabelGroup>
                نام کلاس
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <SelectDiv>
                {typePfUser === 0 ? <MySelect
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
                  multiple
                  id="size-small-standard-multi"
                  size="small"
                  value={values}
                  options={state.getExamCourseNamesTeacher ? state.getExamCourseNamesTeacher : ''}
                  getOptionLabel={(option) => option.course}
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
              <LabelGroup>
                درس
                    </LabelGroup>
            </GroupDiv>
            <GroupDiv>
              <InputGroup
                type="text"
                value={state.examTopic}
                onChange={e => 
                  setState({...state,examTopic:e.target.value})
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
                  setState({...state,examMaxScore:e.target.value})
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
                    setState({...state,examMethod:e.target.value});
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
// export default compose(
//   graphql(addNewExamMutation, { name: "addNewExamMutation" }),
//   // graphql(addBookMutation, { name: "addBookMutation" })
// )(AddExamForTeacher);
