import React , {useState,useEffect,useRef} from 'react';
import { useLocation  } from "react-router-dom";
import { useHistory , withRouter } from "react-router-dom";
import ShowDescriptiveQuestion from './showQuestions/ShowDescriptiveQuestion/ShowDescriptiveQuestion.component';
import ShowComparativeQuestion from './showQuestions/ShowComparativeQuestion/ShowComparativeQuestion.component';
import MultipleChoiceConatiner from './showQuestions/ShowMultipleChoice/ShowMultipleChoice.component';
import ShowTrueAndFalseQuestion from './showQuestions/ShowTrueAndFalse/ShowTrueAndFalse.component';
import ShowSequentialQuestion from './showQuestions/ShowSequentialQuestion/ShowSequentialQuestion.component';
import ShowVacancyQuestion from './showQuestions/ShowVacancyQuestion/ShowVacancyuestion.component';
import {connect} from 'react-redux';
import {getExamParentIdResponse} from '../../redux/responsesStudent/responsesStudent.selector';
import {selectIndex } from '../../redux/questionIndex/questionIndex.selector';
import {setLengthQuestions ,setTypeIncreaseQuestions ,runningTimeOfTimeForSolveQuestions,clearRunningTimeOfTimeForSolveQuestions } from '../../redux/questionIndex/questionIndex.sction';
import {clearRepsonseStudent ,setExamParentIdForResponse,clearResponseStudentTimeOut } from '../../redux/responsesStudent/responsesStudent.action';
import {getTimeToAttendTheExamPage ,getTimeToAttendTheExamPageWithID } from '../../redux/timeToAttendTheExamPage/timeToAttendTheExamPage.selector';
import {SetTimeToAttendTheExamPage , ClearTimeToAttendTheExamPage ,ClearTimeToAttendTheExamPageWithTimeOut} from '../../redux/timeToAttendTheExamPage/timeToAttendTheExamPage.action';
import { createStructuredSelector} from 'reselect';
import ExamInfoHeader from './examInfo/examInfo.component';
/////////////////////////////////
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
/////////////////////query
import { GET_QUESTIONS ,GET_EXAMSINFO_FOR_STUDENT } from '../../graphql/resolver';
import { useQuery ,useMutation} from 'react-apollo';
import { SET_DEALY_RESPONSE_STUDENT } from '../../graphql/resolver';
/////////////////////////message
import MySnackbar from '../../messageBox/messageBox.component';
////////////////////////////////
import {ShowQuestionsContainer,ShowInfoExam ,ShowQuestionsCourseNameContainer ,
     ShowQuestionsCourseName ,ShowLoginTimeContainer ,ShowLoginTime,
     ExitButtonContainer,ExitButton,QuestipnsLinkDiv,QuestipnsLink} from './examPageForStudent.styles';
///////////////////////////////////////time
// import { realeTime } from '@components/Clock/getTime';
// import { fixNumbers } from '@components/FixNumbers/fixNumbers';
import { realeTime } from '../../generalComponent/Clock/getTime';
import { fixNumbers } from '../../generalComponent/fixNumbers';
//////////////////////////////////////////
var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();

var moment = require('moment-jalaali');
moment().format('jYYYY/jMM/jDD')
/////////////////////////////////////////
const  ExamPageForStudent = ({location,questionIndex ,setLengthQuestions , getTimeToAttendTheExamPage,getTimeToAttendTheExamPageWithID,
    ClearTimeToAttendTheExamPage,ClearTimeToAttendTheExamPageWithTimeOut,clearRepsonseStudent,clearResponseStudentTimeOut,setExamParentIdForResponse,
    setTypeIncreaseQuestions ,runningTimeOfTimeForSolveQuestions ,clearRunningTimeOfTimeForSolveQuestions , SetTimeToAttendTheExamPage,
    getExamParentIdResponse}) =>{
    ///////////////////////////////////////////////////
    let history = useHistory();
    // let location = useLocation();
    //////////////////////////////////
    // const QueryMultiple = () => {
    //     const data = useQuery(GET_QUESTIONS , {
    //         variables: {  
    //             userName: "211",
    //             password: "211",
    //             id: location && location.state.examPId ? location.state.examPId : '',
    //         },
    //         notifyOnNetworkStatusChange: true
    //     });
    //     const data2 = useQuery(GET_EXAMSINFO_FOR_STUDENT , {
    //         variables: {  
    //             userName: "210",
    //             password: "210",
    //             epId: location && location.state.examPId ? location.state.examPId : '',
    //         },
    //         notifyOnNetworkStatusChange: true
    //     });
    //     return [data, data2];
    // }
      
    // const [
    //     { loading: loading1, data : data ,refetch : refetch1 },
    //     { loading: loading2, data: data2 ,refetch : refetch2 }
    // ] = QueryMultiple()
    ///////////////////////////////////////////////////
  
    const { loading, error, data ,refetch  } = useQuery(GET_QUESTIONS , {
        variables: {  
            userName: "211",
            password: "211",
            userNameS: "210",
            passwordS: "210",
            id: location && location.state.examPId ? location.state.examPId : '',
            epId: location && location.state.examPId ? location.state.examPId : '',
        },
        notifyOnNetworkStatusChange: true
    });

    useEffect(()=>{
        console.log('createeeeeeeeeeeeeeeeeee',data);
    },[data])

    // const { loading, error, data ,refetch  } = useQuery(GET_EXAMCHILD_QUESTIONS , {
    //     variables: {  
    //       userName: "211",
    //       password: "211",
    //       id: selectedEPId , //examParentId,
    //       examChild_gId : courseName && courseName.length > 0 ? courseName[0] : '',
    //     },
    //     notifyOnNetworkStatusChange: true
    //   });
    const [setDelayResponseStudent ,{ DelayData }] = useMutation(SET_DEALY_RESPONSE_STUDENT);
    ///////////////////////////////////////////////////
    const [items,setItems] = useState([]);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    const [time, setTime] = useState('0');
    const [getDate, setGetDate] = useState('');
    /////////////////////timer
    const [loginTime, setLoginTime] = useState('0');
    const [sleep, setSleep] = useState(false);
    const [examParentID , setExamParentID] = useState('');
    ///////////////////////////////////////////////////
    const countRef = useRef(loginTime);
    countRef.current = loginTime;
    ///////
    const checkRef = useRef(time);
    checkRef.current = time;
    ////////
    const setRefExamParentID = useRef(examParentID);
    setRefExamParentID.current = examParentID;
    /////////
    const getRefExamTime = useRef(getTimeToAttendTheExamPageWithID);
    getRefExamTime.current = getTimeToAttendTheExamPageWithID;
    // useEffect(()=>{
    //     console.log('loginTime',loginTime);
    //     console.log('second',second);
    // },[loginTime])
    //////////////////////////////////////////////////////
    function spliterTime(myTime){
        var spliterMyTime = myTime.split(':');
        // var MyTimeHour = spliterMyTime[0] ? parseInt(spliterMyTime[0]) : 0;
        // var MyTimeMinutes = spliterMyTime[1] ? parseInt(spliterMyTime[1]) : 0;
        var MyTimeHour = spliterMyTime[0] ? spliterMyTime[0] : 0;
        var MyTimeMinutes = spliterMyTime[1] ? spliterMyTime[1] : 0;
        var convertMyTimeToSecond = MyTimeHour * 3600 + MyTimeMinutes * 60 ;
        return convertMyTimeToSecond;
    }
    //////////////////////////////////////////////////////

    // useEffect(()=>{
    //     if(!sleep && data){
    //         var examData = data.examParents[0];
    //         var examDuration = examData.examParent_duration;
    //         var examDataInfo = data2.responseInfoListByPerson[0];
    //         // console.log('data2data2',data2.responseInfoListByPerson[0]);
    //         /////////////////date
    //         var dateSplited = getDate.split(':').join('');
    //         var stopDateExam = examData.examParent_stop_date;
    //         var stopDateSplitedExam = stopDateExam.split(':').join('');
    //         /////////////////time
    //         var nowTime = time.split(':').join('');
    //         var newEnd = examData.examParent_end.split(':').join('');
    //         ///////////////////
    //         if(examData.examParent_start_date != examData.examParent_stop_date){
    //             // var spiltedInfoTime = examDataInfo.startTime.split(':');
    //             // var nowTime = time.split(':');
    //             // var StartInfoHour = spiltedInfoTime[0];
    //             // var nowHour = nowTime[0];
    //             // var StartInfoMinutes = spiltedInfoTime[1];
    //             // var nowMinutes = nowTime[1];
    //             // var convertInfo = StartInfoHour * 3600 + StartInfoMinutes * 60 ;
    //             // var convertEnd = nowHour * 3600 + nowMinutes * 60 ;
    //             // var calcTime = convertEnd - convertInfo;
    //             // ///////////////////////////////conver examDuration
    //             // var converterExamDuration = examDuration.split(':');
    //             // var durationHour = converterExamDuration[0];
    //             // var durationMinutes = converterExamDuration[1];
    //             // var convertDuraionToSecond = durationHour * 3600 + durationMinutes * 60 ;
    //             // var converterTime = format(calcTime);
                
    //             var convertInfo =  spliterTime(examDataInfo.startTime);
    //             var convertEnd =  spliterTime(time);
    //             console.log('convertInfo',convertInfo);
    //             console.log('convertEnd',convertEnd);
    //             var calcTime = convertEnd - convertInfo;
    //             var convertDuraionToSecond = spliterTime(examDuration);
    //             console.log('convertDuraionToSecond',convertDuraionToSecond);
    //             console.log('calcTime',calcTime);
    //             if(calcTime > convertDuraionToSecond){
    //                 // alert('?????? ???????????? ???????? ?????? ??????');
    //                     //????????
    //             }else{
    //                 second = calcTime;
    //             }
    //         }
    //         // if(dateSplited >= stopDateSplitedExam){
    //         //     alert('?????? ???????? ???????????? ???????? ?????? ??????')
    //         //         ////////////???????????? ?????????? ??????
    //         // }else if(dateSplited == stopDateSplitedExam){//?????????? ?????????? ???????? ????????????
                

    //         // }else if(dateSplited == stopDateSplitedExam && nowTime > newEnd){//?????????? ?????????? ???????? ??????????
    //         //     ////////////???????????? ?????????? ??????
    //         // }
    //     }
    // })
      ///////////////////////////////////////////////////////
    // const { loading, error, data ,refetch  } = useQuery(GET_QUESTIONS , {
    //     variables: {  userName: "211",
    //     password: "211",
    //     id: location && location.state.examPId ? location.state.examPId : '' },
    //     notifyOnNetworkStatusChange: true
    // });

    // const { loading, error, data ,refetch  } = useQuery(GET_EXAMSINFO_FOR_STUDENT , {
    //     variables: {  userName: "211",
    //     password: "211",
    //     epId: location && location.state.examPId ? location.state.examPId : '' },
    //     notifyOnNetworkStatusChange: true
    // });

    
    
     ///////////////////////////////////////////////////
     var second;
     useEffect(()=>{
        //  console.log('location.state.examPId',location.state.examPId);
         setExamParentIdForResponse(location && location.state.examPId ? location.state.examPId : '');
        //  SetTimeToAttendTheExamPage({id: location && location.state.examPId ? location.state.examPId : '' ,time: countRef.current});
         // console.log('getTimeToAttendTheExamPageWithID',getTimeToAttendTheExamPageWithID);
         // console.log('type Of getTimeToAttendTheExamPageWithID',typeof getTimeToAttendTheExamPageWithID);
         // if(){
 
         // }
         
         // var gTime = getTimeToAttendTheExamPageWithID(location && location.state.examPId ? location.state.examPId : '');
        //  var gTime = getTimeToAttendTheExamPageWithID;
        //  console.log('gTime',gTime);
        //  var convertArray;
        //  // var convertArray = getTimeToAttendTheExamPage.split(':');
        //  var hour;
        //  var min ;
        //  var sec;
        //  if(gTime){
        //     convertArray = gTime.split(':');
        //     // var convertArray = getTimeToAttendTheExamPage.split(':');
        //     hour = convertArray && convertArray.length > 0 &&  convertArray[0] ? convertArray[0] : 0;
        //     min = convertArray && convertArray.length > 0 &&  convertArray[1] ? convertArray[1] : 0;
        //     sec = convertArray && convertArray.length > 0 &&  convertArray[2] ? convertArray[2] : 0;
        //  }else{
        //     hour = 0;
        //     min = 0;
        //     sec = 0;
        //  }
        
         
        //  var timeL = (parseInt(hour) * 3600) + (parseInt(min) * 60) + parseInt(sec) ;
        //  // console.log('timeL',timeL);
        //  second = timeL;
        //  setLoginTime(format(timeL));
        //  tickClear.current = setTimeout(function run() {
        //     //  console.log('tickkkkkkk');
        //      tick();
        //      tickClear.current = setTimeout(run, 1000);
        //    }, 1000);
 
         return () =>{
             /////
            //  ClearTimeToAttendTheExamPage(getExamParentIdResponse);
             /////////
             clearInterval(timerClear.current);
             clearInterval(CheckTheEndOfTheExam);
             if(sendReqDelay){
                 clearTimeout(sendReqDelay);
             }
             clearTimeout(setTimeToPageTimeOut);
             clearTimeout(tickClear.current);
             ////////////////////////////////////////////////
             // runningTimeOfTimeForSolveQuestions(true);
             
             // clearRepsonseStudent(getExamParentIdResponse);
         }
     },[]);
     ///////////////////////////////////////////////
    useEffect(()=>{
        // if(!data2){
        //     refetch2();
        // }else{
        //     console.log('loginnnnnnnnnnn');
        //     if(data && data.examParents && data.examParents.length > 0 ){
        //         setExamParentID(location && location.state.examPId ? location.state.examPId : '');
        //         MergeQuestions(data.examParents[0])
        //         // setItems(MergeQuestions(data.examParents[0]));
        //     }
        // }
        if(data && data.examParents && data.examParents.length > 0 ){
            setExamParentID(location && location.state.examPId ? location.state.examPId : '');
            MergeQuestions(data.examParents[0])
            // setItems(MergeQuestions(data.examParents[0]));
        }
    },[data]);
    ///////////////////////////////////////////////////loginTime
    // useEffect(()=>{
    //     setTimeToPageTimeOut = setTimeout(function run() {
    //         console.log("getExamParentIdResponse",getExamParentIdResponse);
    //         SetTimeToAttendTheExamPage({id: setRefExamParentID.current ,time: countRef.current});
    //         // SetTimeToAttendTheExamPage({id: getExamParentIdResponse ,time: countRef.current});
    //         setTimeToPageTimeOut = setTimeout(run, 30000);
    //     }, 30000);
    // },[])
    ///////////////////////////////////////////////////time
    const timerClear = useRef() ;
    const tickClear = useRef() ;
    var sendReqDelay;
    var setTimeToPageTimeOut;
    var CheckTheEndOfTheExam;
    useEffect(() => {
        // console.log('bbbbbbbbbbbbbbbb');
        // clearRunningTimeOfTimeForSolveQuestions('1');
        clearResponseStudentTimeOut();
        ClearTimeToAttendTheExamPageWithTimeOut();
        runningTimeOfTimeForSolveQuestions({id:location && location.state.examPId ? location.state.examPId : '',val:false});
        setGetDate(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));
        setTime(
            realeTime.toLocaleTimeString([], {
            timeZone: "Asia/Tehran",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            }),
        );
        timerClear.current = setInterval(() => {
            setGetDate(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));
            setTime(
                realeTime.toLocaleTimeString([], {
                timeZone: "Asia/Tehran",
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                }),
            );
            // console.log('aaaaaaaaaaaaaaaa');
        }, 1000);
        // return () => clearInterval(timerClear.current);
    }, []);
    ///////////////////////////////////////////////////
    useEffect(()=>{
        // console.log('exist item',items);
        if(items.length > 0){///???????? ?????????????? ????????
            // console.log('datadarvakonmonom',data);
            // console.log('getDategetDate',getDate);
            setDelayResponseStudent({ variables: { 
                userName: "210", 
                password: "210", 
                epId: data.examParents[0].id, 
                delay: '',
                totalScore: '',
                countScore: '',
                startTime: time,
                startDate: getDate,
            } 
            }).then(res=>{
                if(res.data && res.data.addResponseInfo){
                    // console.log('data',res.data);
                    // setMessage('???????????? ?????? ????');
                    // setStatus('1');
                    // setShowMessage(!showMessage);
                }else{
                    // console.log('data',res.data);
                    // setStatus('0')
                    // setMessage('???????????? ?????? ??????')
                    // setShowMessage(!showMessage);
                }
            })
        }
    },[items]);
    //////////////////////////////////////////////////
    useEffect(()=>{
        // console.log('exist item',items);
        if(items.length > 0){///???????? ?????????????? ??????????
            // console.log('datadarvakonmonom',data);
            if (data.examParents[0].examParent_method == 1) {
                sendReqDelay = setInterval(() => {
                    setDelayResponseStudent({ variables: { 
                        userName: "210", 
                        password: "210",
                        epId: data.examParents[0].id,  
                        delay: time,
                        totalScore: '',
                        countScore: '',
                        startTime: '',
                        startDate: '',
                        ////////////
                    } 
                    }).then(res=>{
                        if(res.data && res.data.addResponseInfo){
                            // console.log('data',res.data);
                            // setMessage('???????????? ?????? ????');
                            // setStatus('1');
                            // setShowMessage(!showMessage);
                        }else{
                            // console.log('data',res.data);
                            // setStatus('0')
                            // setMessage('???????????? ?????? ??????')
                            // setShowMessage(!showMessage);
                        }
                    })
                }, 60000);
            }
        }
    },[items]);

    // useEffect(()=>{
    //     console.log('data2data2data2data2data2',data2);
    // },[data2])
    /////////////////////////////////////////////////
    // useEffect(()=>{
    //     // examPID : getExamParentIdResponse ,examEndTime:question.examEndTime , examEndDate : question.examEndDate ,
    //     setGetDate(fixNumbers(moment(realeTime).format('jYYYY/jMM/jDD')));
    //         setTime(
    //             realeTime.toLocaleTimeString([], {
    //             timeZone: "Asia/Tehran",
    //             hour: '2-digit',
    //             minute: '2-digit',
    //             second: '2-digit',
    //             hour12: false,
    //             }),
    //         );

    //     // clearRepsonseStudent()
    // },[]);

    const handleSendWxamDataAfterEndTime = () => {
        console.log('methossssssss1');
        if(data.examParents[0].examParent_start_date === data.examParents[0].examParent_stop_date){
            // console.log('methossssssss2');
            //////////////////////////////???????? ?? ?????????? ???????????? ???? ???? ??????
            // var newEndTime = fixNumbers(moment2(data.examParents[0].examParent_end)
            // .tz('Asia/Tehran').format('HH:mm:00'));
            var newEndTime = data.examParents[0].examParent_end
            // console.log('newEndTime',newEndTime);
            var filterEndTime = newEndTime.split(":").join("");
            var temp = fixNumbers(checkRef.current);
            var filterGetTime = temp.split(":").join("");
            console.log('filterGetTime',filterGetTime);
            console.log('filterEndTime',filterEndTime);
            if (filterGetTime > filterEndTime) {
                console.log('??????????????');
                if (data.examParents[0].examParent_method == "0") { //not
                    // console.log('timerClear',timerClear);
                    runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
                    // ClearTimeToAttendTheExamPage(getExamParentIdResponse);
                    clearRepsonseStudent(getExamParentIdResponse);
                    if(sendReqDelay){
                        clearTimeout(sendReqDelay);
                    }
                    clearTimeout(setTimeToPageTimeOut);
                    clearTimeout(tickClear.current);
                    clearInterval(timerClear.current);
                    clearInterval(CheckTheEndOfTheExam);
                    alert('???????? ???????????? ???????? ?????? ??????!!!');
                } 
                // else if (data.examParents[0].examParent_method == 1) {
                //     sendReqDelay = setInterval(() => {
                //         setDelayResponseStudent({ variables: { 
                //             userName: "210", 
                //             password: "210", 
                //             delay: time,
                //             ecI: data.examParents[0].id, 
                //         } 
                //         }).then(res=>{
                //         if(res.data && res.data.addResponseInfo){
                //             console.log('data',data);
                //             // setMessage('???????????? ?????? ????');
                //             // setStatus('1');
                //             // setShowMessage(!showMessage);
                //         }else{
                //             console.log('data',data);
                //             // setStatus('0')
                //             // setMessage('???????????? ?????? ??????')
                //             // setShowMessage(!showMessage);
                //         }
                //         }
                //         )
                //     }, 60000);
                // }
            }
        }else{
            ////////////////////////////// ???????? ?? ?????????? ???????????? ???? ???? ?????? ??????????
            // console.log('data2.responseInfoListByPerson[0]',data2);
            // var newEndTime = data.examParents[0].examParent_end;
            // var filterEndTime = newEndTime.split(":").join("");
            // var temp = fixNumbers(time);// checkRef.current
            // var filterGetTime = temp.split(":").join("");
            ///////////////////////////////////////////////////
            if(data && data.responseInfoListByPerson.length > 0 && data.responseInfoListByPerson[0].startTime ){
               
               console.log('11');
                var examData = data.examParents[0];
                var examDuration = examData.examParent_duration;
                console.log('data3data3',data);
                var examDataInfo = data.responseInfoListByPerson[0];
                console.log('data2data2',data.responseInfoListByPerson[0]);
                /////////////////date
                var dateSplited = getDate.split(':').join('');
                var stopDateExam = examData.examParent_stop_date;
                var stopDateSplitedExam = stopDateExam.split(':').join('');
                /////////////////time
                var nowTime = time.split(':').join('');
                var newEnd = examData.examParent_end.split(':').join('');
    
                if(dateSplited > stopDateSplitedExam ){
                    runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
                    // ClearTimeToAttendTheExamPage(getExamParentIdResponse);
                    clearRepsonseStudent(getExamParentIdResponse);
                    clearInterval(timerClear.current);
                    clearInterval(CheckTheEndOfTheExam);
                    clearTimeout(setTimeToPageTimeOut);
                    clearTimeout(tickClear.current);
                    // ClearTimeToAttendTheExamPage();
                    // clearRepsonseStudent(getExamParentIdResponse);
                    alert('???????? ???????????? ???????? ?????? ??????!!!');
                }else{
                    var convertInfo =  spliterTime(examDataInfo.startTime);
                    var convertEnd =  spliterTime(checkRef.current);
                    console.log('convertInfo',convertInfo);
                    console.log('convertEnd',convertEnd);
                    var calcTime = convertEnd - convertInfo;
                    var convertDuraionToSecond = spliterTime(examDuration);
                    console.log('convertDuraionToSecond',convertDuraionToSecond);
                    console.log('calcTime',calcTime);
                    if(convertDuraionToSecond <= calcTime){
                        runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
                        // ClearTimeToAttendTheExamPage(getExamParentIdResponse);
                        clearRepsonseStudent(getExamParentIdResponse);
                        clearInterval(timerClear.current);
                        clearInterval(CheckTheEndOfTheExam);
                        clearTimeout(setTimeToPageTimeOut);
                        clearTimeout(tickClear.current);
                        // ClearTimeToAttendTheExamPage();
                        // clearRepsonseStudent(getExamParentIdResponse);
                        alert('???????? ???????????? ???????? ?????? ??????!!!');
                    }else{
                        console.log('55555555555555555555',calcTime);
                        second = calcTime;
                    }
                }
            }else{
                console.log('???????? ???????? ??????????');
                console.log(getRefExamTime.current)
                console.log(data.examParents[0].examParent_duration)
                var timeExam = getRefExamTime.current;
                // var timeExam = getTimeToAttendTheExamPageWithID;
                var newTimeExam = timeExam.split(':').join('');
                var endExam = data.examParents[0].examParent_duration;
                var newEndTimeExam = endExam.split(':').join('');
                if (newTimeExam >= newEndTimeExam) {
                // if (getTimeToAttendTheExamPageWithID == data.examParents[0].examParent_duration) {
                // if (getTimeToAttendTheExamPage == data.examParents[0].examParent_duration) {
                    console.log('2???????? ???????? ??????????')    
                    runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
                    // ClearTimeToAttendTheExamPage(getExamParentIdResponse);
                    clearRepsonseStudent(getExamParentIdResponse);
                    clearInterval(timerClear.current);
                    clearInterval(CheckTheEndOfTheExam);
                    clearTimeout(setTimeToPageTimeOut);
                    clearTimeout(tickClear.current);
                    // ClearTimeToAttendTheExamPage();
                    // clearRepsonseStudent(getExamParentIdResponse);
                    alert('???????? ???????????? ???????? ?????? ??????!!!');
                }
            }
           
            /////////////////////////////////////////////////
            // if (getTimeToAttendTheExamPageWithID == data.examParents[0].examParent_duration) {
            // // if (getTimeToAttendTheExamPage == data.examParents[0].examParent_duration) {
            //     runningTimeOfTimeForSolveQuestions(true);
            //     ClearTimeToAttendTheExamPage(getExamParentIdResponse);
            //     clearRepsonseStudent(getExamParentIdResponse);
            //     clearInterval(timerClear.current);
            //     clearInterval(CheckTheEndOfTheExam);
            //     clearTimeout(setTimeToPageTimeOut);
            //     clearTimeout(tickClear.current);
            //     // ClearTimeToAttendTheExamPage();
            //     // clearRepsonseStudent(getExamParentIdResponse);
            //     alert('???????? ???????????? ???????? ?????? ??????!!!');
            // }
        }
    }
    /////////////////////
    function format(time) { 
        // console.log('time', time);
        var hrs = Math.floor(time / 3600);
        var mins = Math.floor((time % 3600) / 60);
        var secs = time % 60;

        var ret = "";
        if (hrs > 0 && hrs < 10) {
            ret += "" + "0" + hrs + ":" + (mins < 10 ? "0" : "");
        }else if(hrs > 0 && hrs >= 10){
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }else{
            ret += "" + "00" + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        // console.log('ret',ret);
        return ret;
    }
    /////////////////timer
    const tick = () => {
        second += 1;
        // console.log('second', second);
        setLoginTime(format(second));
    };

    // const tickTime = () =>{
    //     setLoginTime()
    // }
    //////////////////////////////////////////////////////
    const MergeQuestions = async(examP) => {
        // setExamParentIdForResponse(location && location.state.examPId ? location.state.examPId : '');
        // console.log('examP', examP );
        // console.log('examP.examParent_backward', examP.examParent_backward );
        // setTypeIncreaseQuestions(examP.type ? examP.type : 'Forward');
        ///////////////////////////////////////////////////////////////////
        setTypeIncreaseQuestions(examP && examP.examParent_backward ? examP.examParent_backward : false);
        var mergeQ = [];
        var examStartDate = examP.examParent_start_date;
        var examEndDate = examP.examParent_stop_date;
        var examEndTime = examP.examParent_end;
        var allQuestons = examP.examChild;
        var examParentId = examP.id;
        // setRefExamParentID.current
        console.log('setRefExamParentID.current',setRefExamParentID.current);
        console.log('examParentId',examParentId);
        if(examEndDate != examStartDate){
            console.log('1111111111111');
            // console.log('data2',data.responseInfoListByPerson);
            // console.log('data2.responseInfoListByPerson.length > 0',data.responseInfoListByPerson.length > 0);
            // console.log('data2.responseInfoListByPerson[0]',data.responseInfoListByPerson[0]);
            // console.log('data2.responseInfoListByPerson[0].startTime',data.responseInfoListByPerson[0].startTime);
            if(data && data.responseInfoListByPerson.length > 0 && data.responseInfoListByPerson[0].startTime ){ 
                console.log('2222222222222');
                 var examData = data.examParents[0];
                 var examDuration = examData.examParent_duration;
                 console.log('data3data3',data);
                 var examDataInfo = data.responseInfoListByPerson[0];
                 console.log('datadata',data.responseInfoListByPerson[0]);
                 /////////////////date
                 var dateSplited = getDate.split('/').join('');
                 var stopDateExam = examData.examParent_stop_date;
                 var stopDateSplitedExam = stopDateExam.split('/').join('');
                 /////////////////time
                 var nowTime = time.split(':').join('');
                 var newEnd = examData.examParent_end.split(':').join('');
     
                 if(dateSplited >= stopDateSplitedExam ){
                     console.log('problem');
                     runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
                    //  ClearTimeToAttendTheExamPage(getExamParentIdResponse);
                     clearRepsonseStudent(getExamParentIdResponse);
                     clearInterval(timerClear.current);
                     clearInterval(CheckTheEndOfTheExam);
                     clearTimeout(setTimeToPageTimeOut);
                     clearTimeout(tickClear.current);
                     // ClearTimeToAttendTheExamPage();
                     // clearRepsonseStudent(getExamParentIdResponse);
                     alert('???????? ???????????? ???????? ?????? ??????!!!');
                 }else{
                     console.log('compare date');
                     var statrtDateExam = examDataInfo.startDate ? examDataInfo.startDate.split('/').join('') : '0';
                     console.log('compare date2',statrtDateExam);
                     if(dateSplited > statrtDateExam){
                        console.log('compare yes',statrtDateExam , dateSplited);
                        runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
                        //  ClearTimeToAttendTheExamPage(getExamParentIdResponse);
                         clearRepsonseStudent(getExamParentIdResponse);
                         clearInterval(timerClear.current);
                         clearInterval(CheckTheEndOfTheExam);
                         clearTimeout(setTimeToPageTimeOut);
                         clearTimeout(tickClear.current);
                         // ClearTimeToAttendTheExamPage();
                         // clearRepsonseStudent(getExamParentIdResponse);
                         alert('?????????? ?????????? ???? ?????????? ???????? ???? ???????? ???????????? ???????? ???????? ?????? ?????????? ???????????? ????????????');
                     }else{
                        var convertInfo =  spliterTime(examDataInfo.startTime);
                        //  var convertEnd =  spliterTime(checkRef.current);
                         var convertEnd =  spliterTime(realeTime.toLocaleTimeString([], {
                            timeZone: "Asia/Tehran",
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false,
                            }),);
                         
                         console.log('convertInfo', convertInfo);
                         console.log('convertEnd', convertEnd);
                         var calcTime = convertEnd - convertInfo;
                         var convertDuraionToSecond = spliterTime(examDuration);
                         console.log('convertDuraionToSecond',convertDuraionToSecond);
                         console.log('calcTimeeeeeeeeeeeeeeee2',typeof calcTime);
                         console.log('calcTimeeeeeeeeeeeeeeee',calcTime);
                         if(convertDuraionToSecond <= calcTime ){
                             runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
                            //  ClearTimeToAttendTheExamPage(getExamParentIdResponse);
                             clearRepsonseStudent(getExamParentIdResponse);
                             clearInterval(timerClear.current);
                             clearInterval(CheckTheEndOfTheExam);
                             clearTimeout(setTimeToPageTimeOut);
                             clearTimeout(tickClear.current);
                             // ClearTimeToAttendTheExamPage();
                             // clearRepsonseStudent(getExamParentIdResponse);
                             alert('???????? ???????????? ???????? ?????? ??????!!!');
                         }else{
                            console.log('calcTime', calcTime);
                             second = calcTime;
                             /////////////////////////////////////
                             setLoginTime(format(calcTime));
                             tickClear.current = setTimeout(function run() {
                                 tick();
                                 tickClear.current = setTimeout(run, 1000);
                               }, 1000);
                             ///////////////////////////////////////////////
                             for await (let myallQuestion of allQuestons) {
                                 var examChildLink = myallQuestion.examChild_pdf;
                                 var counterQuestionsParent = myallQuestion;
                                 var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
                                 var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
                                 var questionParentForExamChild = counterQuestionsParent.questionParent;
                                 if( questionParentForExamChild && questionParentForExamChild.length > 0){
                                    for (let j = 0; j < questionParentForExamChild.length; j++) {
                                        if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
                                            if(questionParentForExamChild[j].questionChild[0].question_type == '6'){
                                              var mySeqRandomArray = SeqRandomArray(questionParentForExamChild[j].questionChild[0].question_seqItems)
                                              mergeQ.push({
                                                  ...questionParentForExamChild[j].questionChild[0] ,
                                                  examParentId:setRefExamParentID.current,
                                                  question_seqItems: mySeqRandomArray,
                                                  courseName:courseName,
                                                 teacherName:teacherName,
                                                 examChildLink:examChildLink,
                                                 examEndDate :examEndDate,
                                                 examEndTime :examEndTime,
                                             });
                                            }else if(questionParentForExamChild[j].questionChild[0].question_type == '5')
                                            {
                                              var myRandomArray = RandomArray(questionParentForExamChild[j].questionChild[0].question_compItems);
                                              mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
                                                examParentId:setRefExamParentID.current,  
                                                question_compItems: myRandomArray,
                                                  courseName:courseName,
                                                 teacherName:teacherName,
                                                 examChildLink:examChildLink,
                                                 examEndDate :examEndDate,
                                                 examEndTime :examEndTime,
                                              });
                                            }else{
                                              mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
                                                examParentId:setRefExamParentID.current,  
                                                courseName:courseName,
                                                 teacherName:teacherName,
                                                 examChildLink:examChildLink,
                                                 examEndDate :examEndDate,
                                                 examEndTime :examEndTime,
                                              });
                                            }
                                          // console.log('myallQuestion[j].questionChild[0]',myallQuestion[j].questionChild[0]);
                                          // mergeQ.push({...myallQuestion[j].questionChild[0] ,
                                          //      courseName:courseName,
                                          //     teacherName:teacherName });
                                          // mergeQ.push(myallQuestion[j].questionChild[0]);
                                        }
                                    }
                                      // console.log('myallQuestion', myallQuestion );
                                      // mergeQ.push(myallQuestion[0])
                                  }
                              }
                             setLengthQuestions(mergeQ.length);
                            //  CheckTheEndOfTheExam = setInterval(() => {
                            //      // console.log('dddddddddddddddddddd');
                            //      handleSendWxamDataAfterEndTime();
                            //  }, 60000);
                             // console.log('mergeQ',mergeQ);
                             setItems(mergeQ);
                         }
                     }

                 }
            }else{
                ///////////////////////////////////////
                console.log('3333333333333');
                // var gTime = getTimeToAttendTheExamPageWithID;
                var gTime = getRefExamTime.current;
                console.log('gTime',gTime);
                var convertArray;
                var hour;
                var min ;
                var sec;
                if(gTime){
                   convertArray = gTime.split(':');
                   hour = convertArray && convertArray.length > 0 &&  convertArray[0] ? convertArray[0] : 0;
                   min = convertArray && convertArray.length > 0 &&  convertArray[1] ? convertArray[1] : 0;
                   sec = convertArray && convertArray.length > 0 &&  convertArray[2] ? convertArray[2] : 0;
                }else{
                   hour = '0';
                   min = '0';
                   sec = '0';
                }
               
                console.log('hour', hour);
                var timeL = (parseInt(hour) * 3600) + (parseInt(min) * 60) + parseInt(sec) ;
                second = timeL;
                setLoginTime(format(timeL));
                tickClear.current = setTimeout(function run() {
                    tick();
                    tickClear.current = setTimeout(run, 1000);
                  }, 1000);
                  ///////////////////////////////////////////////
                 for await (let myallQuestion of allQuestons) {
                    var examChildLink = myallQuestion.examChild_pdf;
                    var counterQuestionsParent = myallQuestion;
                    var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
                    var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
                    var questionParentForExamChild = counterQuestionsParent.questionParent;
                    if( questionParentForExamChild && questionParentForExamChild.length > 0){
                    for (let j = 0; j < questionParentForExamChild.length; j++) {
                        if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
                            if(questionParentForExamChild[j].questionChild[0].question_type == '6'){
                                var mySeqRandomArray = SeqRandomArray(questionParentForExamChild[j].questionChild[0].question_seqItems)
                                mergeQ.push({
                                    ...questionParentForExamChild[j].questionChild[0] ,
                                    examParentId:setRefExamParentID.current,
                                    question_seqItems: mySeqRandomArray,
                                    courseName:courseName,
                                    teacherName:teacherName,
                                    examChildLink:examChildLink,
                                    examEndDate :examEndDate,
                                    examEndTime :examEndTime,
                                });
                            }else if(questionParentForExamChild[j].questionChild[0].question_type == '5')
                            {
                                var myRandomArray = RandomArray(questionParentForExamChild[j].questionChild[0].question_compItems);
                                mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
                                    examParentId:setRefExamParentID.current,
                                    question_compItems: myRandomArray,
                                    courseName:courseName,
                                    teacherName:teacherName,
                                    examChildLink:examChildLink,
                                    examEndDate :examEndDate,
                                    examEndTime :examEndTime,
                                });
                            }else{
                                mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
                                    examParentId:setRefExamParentID.current,
                                    courseName:courseName,
                                    teacherName:teacherName,
                                    examChildLink:examChildLink,
                                    examEndDate :examEndDate,
                                    examEndTime :examEndTime,
                                });
                            }
                            // console.log('myallQuestion[j].questionChild[0]',myallQuestion[j].questionChild[0]);
                            // mergeQ.push({...myallQuestion[j].questionChild[0] ,
                            //      courseName:courseName,
                            //     teacherName:teacherName });
                            // mergeQ.push(myallQuestion[j].questionChild[0]);
                        }
                    }
                        // console.log('myallQuestion', myallQuestion );
                        // mergeQ.push(myallQuestion[0])
                    }
                }
                setLengthQuestions(mergeQ.length);
                // CheckTheEndOfTheExam = setInterval(() => {
                //     // console.log('dddddddddddddddddddd');
                //     handleSendWxamDataAfterEndTime();
                // }, 60000);
                // console.log('mergeQ',mergeQ);
                setItems(mergeQ);
                // return mergeQ;
            }
        }else{
            for await (let myallQuestion of allQuestons) {
                var examChildLink = myallQuestion.examChild_pdf;
                var counterQuestionsParent = myallQuestion;
                var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
                var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
                var questionParentForExamChild = counterQuestionsParent.questionParent;
                if( questionParentForExamChild && questionParentForExamChild.length > 0){
                for (let j = 0; j < questionParentForExamChild.length; j++) {
                    if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
                        if(questionParentForExamChild[j].questionChild[0].question_type == '6'){
                            var mySeqRandomArray = SeqRandomArray(questionParentForExamChild[j].questionChild[0].question_seqItems)
                            mergeQ.push({
                                ...questionParentForExamChild[j].questionChild[0] ,
                                examParentId:setRefExamParentID.current,
                                question_seqItems: mySeqRandomArray,
                                courseName:courseName,
                                teacherName:teacherName,
                                examChildLink:examChildLink,
                                examEndDate :examEndDate,
                                examEndTime :examEndTime,
                            });
                        }else if(questionParentForExamChild[j].questionChild[0].question_type == '5')
                        {
                            var myRandomArray = RandomArray(questionParentForExamChild[j].questionChild[0].question_compItems);
                            mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
                                examParentId:setRefExamParentID.current,
                                question_compItems: myRandomArray,
                                courseName:courseName,
                                teacherName:teacherName,
                                examChildLink:examChildLink,
                                examEndDate :examEndDate,
                                examEndTime :examEndTime,
                            });
                        }else{
                            mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
                                examParentId:setRefExamParentID.current,
                                courseName:courseName,
                                teacherName:teacherName,
                                examChildLink:examChildLink,
                                examEndDate :examEndDate,
                                examEndTime :examEndTime,
                            });
                        }
                       
                    }
                }
                }
            }

            setLengthQuestions(mergeQ.length);
            second = 0
            setItems(mergeQ);
            // tickClear.current = setTimeout(function run() {
            //     tick();
            //     tickClear.current = setTimeout(run, 1000);
            // }, 1000);
            /////////////////////////////////////////////////////////////////////////////////////
            // if(data && data.responseInfoListByPerson.length > 0 && data.responseInfoListByPerson[0].startTime ){ 
            //     var nowTime =  realeTime.toLocaleTimeString([], {
            //         timeZone: "Asia/Tehran",
            //         hour: '2-digit',
            //         minute: '2-digit',
            //         second: '2-digit',
            //         hour12: false,
            //     });

            //     var spliterNowTime = nowTime.split(':').join('');
            //     var examData = data.examParents[0];
            //     var examEnd = examData.examParent_end;
            //     var spliterexamEnd = examEnd.split(':').join('');
            //     console.log('spliterNowTime',spliterNowTime);
            //     console.log('spliterexamEnd',spliterexamEnd);
            //     if(spliterNowTime > spliterexamEnd ){
            //         runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
            //         //  ClearTimeToAttendTheExamPage(getExamParentIdResponse);
            //         clearRepsonseStudent(getExamParentIdResponse);
            //         clearInterval(timerClear.current);
            //         clearInterval(CheckTheEndOfTheExam);
            //         clearTimeout(setTimeToPageTimeOut);
            //         clearTimeout(tickClear.current);
            //         // ClearTimeToAttendTheExamPage();
            //         // clearRepsonseStudent(getExamParentIdResponse);
            //         alert('???????? ???????????? ???????? ?????? ??????!!!');
            //     }else{
            //         console.log('3333333333333');
            //         // var gTime = getTimeToAttendTheExamPageWithID;
            //         var gTime = getRefExamTime.current;
            //         console.log('gTime',gTime);
            //         var convertArray;
            //         var hour;
            //         var min ;
            //         var sec;
            //         if(gTime){
            //            convertArray = gTime.split(':');
            //            hour = convertArray && convertArray.length > 0 &&  convertArray[0] ? convertArray[0] : 0;
            //            min = convertArray && convertArray.length > 0 &&  convertArray[1] ? convertArray[1] : 0;
            //            sec = convertArray && convertArray.length > 0 &&  convertArray[2] ? convertArray[2] : 0;
            //         }else{
            //            hour = '0';
            //            min = '0';
            //            sec = '0';
            //         }
                   
            //         console.log('hour', hour);
            //         var timeL = (parseInt(hour) * 3600) + (parseInt(min) * 60) + parseInt(sec) ;
            //         second = timeL;
            //         console.log('timeL', timeL);
            //         setLoginTime(format(timeL));
            //         for await (let myallQuestion of allQuestons) {
            //             var examChildLink = myallQuestion.examChild_pdf;
            //             var counterQuestionsParent = myallQuestion;
            //             var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
            //             var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
            //             var questionParentForExamChild = counterQuestionsParent.questionParent;
            //             if( questionParentForExamChild && questionParentForExamChild.length > 0){
            //             for (let j = 0; j < questionParentForExamChild.length; j++) {
            //                 if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
            //                     if(questionParentForExamChild[j].questionChild[0].question_type == '6'){
            //                         var mySeqRandomArray = SeqRandomArray(questionParentForExamChild[j].questionChild[0].question_seqItems)
            //                         mergeQ.push({
            //                             ...questionParentForExamChild[j].questionChild[0] ,
            //                             examParentId:setRefExamParentID.current,
            //                             question_seqItems: mySeqRandomArray,
            //                             courseName:courseName,
            //                             teacherName:teacherName,
            //                             examChildLink:examChildLink,
            //                             examEndDate :examEndDate,
            //                             examEndTime :examEndTime,
            //                         });
            //                     }else if(questionParentForExamChild[j].questionChild[0].question_type == '5')
            //                     {
            //                         var myRandomArray = RandomArray(questionParentForExamChild[j].questionChild[0].question_compItems);
            //                         mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
            //                         examParentId:setRefExamParentID.current,  
            //                         question_compItems: myRandomArray,
            //                             courseName:courseName,
            //                             teacherName:teacherName,
            //                             examChildLink:examChildLink,
            //                             examEndDate :examEndDate,
            //                             examEndTime :examEndTime,
            //                         });
            //                     }else{
            //                         mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
            //                         examParentId:setRefExamParentID.current,  
            //                         courseName:courseName,
            //                             teacherName:teacherName,
            //                             examChildLink:examChildLink,
            //                             examEndDate :examEndDate,
            //                             examEndTime :examEndTime,
            //                         });
            //                     }
            //                     // console.log('myallQuestion[j].questionChild[0]',myallQuestion[j].questionChild[0]);
            //                     // mergeQ.push({...myallQuestion[j].questionChild[0] ,
            //                     //      courseName:courseName,
            //                     //     teacherName:teacherName });
            //                     // mergeQ.push(myallQuestion[j].questionChild[0]);
            //                 }
            //             }
            //                 // console.log('myallQuestion', myallQuestion );
            //                 // mergeQ.push(myallQuestion[0])
            //             }
            //         }
            //         setLengthQuestions(mergeQ.length);
            //             setItems(mergeQ);
            //             tickClear.current = setTimeout(function run() {
            //                 tick();
            //                 tickClear.current = setTimeout(run, 1000);
            //               }, 1000);
            //     }

            // }else{
               
            //       ///////////////////////////////////////////////
            //      for await (let myallQuestion of allQuestons) {
            //         var examChildLink = myallQuestion.examChild_pdf;
            //         var counterQuestionsParent = myallQuestion;
            //         var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
            //         var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
            //         var questionParentForExamChild = counterQuestionsParent.questionParent;
            //         if( questionParentForExamChild && questionParentForExamChild.length > 0){
            //         for (let j = 0; j < questionParentForExamChild.length; j++) {
            //             if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
            //                 if(questionParentForExamChild[j].questionChild[0].question_type == '6'){
            //                     var mySeqRandomArray = SeqRandomArray(questionParentForExamChild[j].questionChild[0].question_seqItems)
            //                     mergeQ.push({
            //                         ...questionParentForExamChild[j].questionChild[0] ,
            //                         examParentId:setRefExamParentID.current,
            //                         question_seqItems: mySeqRandomArray,
            //                         courseName:courseName,
            //                         teacherName:teacherName,
            //                         examChildLink:examChildLink,
            //                         examEndDate :examEndDate,
            //                         examEndTime :examEndTime,
            //                     });
            //                 }else if(questionParentForExamChild[j].questionChild[0].question_type == '5')
            //                 {
            //                     var myRandomArray = RandomArray(questionParentForExamChild[j].questionChild[0].question_compItems);
            //                     mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
            //                         examParentId:setRefExamParentID.current,
            //                         question_compItems: myRandomArray,
            //                         courseName:courseName,
            //                         teacherName:teacherName,
            //                         examChildLink:examChildLink,
            //                         examEndDate :examEndDate,
            //                         examEndTime :examEndTime,
            //                     });
            //                 }else{
            //                     mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
            //                         examParentId:setRefExamParentID.current,
            //                         courseName:courseName,
            //                         teacherName:teacherName,
            //                         examChildLink:examChildLink,
            //                         examEndDate :examEndDate,
            //                         examEndTime :examEndTime,
            //                     });
            //                 }
            //                 // console.log('myallQuestion[j].questionChild[0]',myallQuestion[j].questionChild[0]);
            //                 // mergeQ.push({...myallQuestion[j].questionChild[0] ,
            //                 //      courseName:courseName,
            //                 //     teacherName:teacherName });
            //                 // mergeQ.push(myallQuestion[j].questionChild[0]);
            //             }
            //         }
            //             // console.log('myallQuestion', myallQuestion );
            //             // mergeQ.push(myallQuestion[0])
            //         }
            //     }

            //     setLengthQuestions(mergeQ.length);
            // // CheckTheEndOfTheExam = setInterval(() => {
            // //     // console.log('dddddddddddddddddddd');
            // //     handleSendWxamDataAfterEndTime();
            // // }, 60000);
            // // console.log('mergeQ',mergeQ);
            // second = 0
            // setItems(mergeQ);
            // tickClear.current = setTimeout(function run() {
            //     tick();
            //     tickClear.current = setTimeout(run, 1000);
            //   }, 1000);
            // }
            ///////////////////////////////////////////////////////////////////////////////////
            // console.log('4444444444444');
            //  for await (let myallQuestion of allQuestons) {
            //     var examChildLink = myallQuestion.examChild_pdf;
            //     var counterQuestionsParent = myallQuestion;
            //     var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
            //     var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
            //     var questionParentForExamChild = counterQuestionsParent.questionParent;
            //     if( questionParentForExamChild && questionParentForExamChild.length > 0){
            //     for (let j = 0; j < questionParentForExamChild.length; j++) {
            //         if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
            //             if(questionParentForExamChild[j].questionChild[0].question_type == '6'){
            //                 var mySeqRandomArray = SeqRandomArray(questionParentForExamChild[j].questionChild[0].question_seqItems)
            //                 mergeQ.push({
            //                     ...questionParentForExamChild[j].questionChild[0] ,
            //                     examParentId:setRefExamParentID.current,
            //                     question_seqItems: mySeqRandomArray,
            //                     courseName:courseName,
            //                     teacherName:teacherName,
            //                     examChildLink:examChildLink,
            //                     examEndDate :examEndDate,
            //                     examEndTime :examEndTime,
            //                 });
            //             }else if(questionParentForExamChild[j].questionChild[0].question_type == '5')
            //             {
            //                 var myRandomArray = RandomArray(questionParentForExamChild[j].questionChild[0].question_compItems);
            //                 mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
            //                     examParentId:setRefExamParentID.current,
            //                     question_compItems: myRandomArray,
            //                     courseName:courseName,
            //                     teacherName:teacherName,
            //                     examChildLink:examChildLink,
            //                     examEndDate :examEndDate,
            //                     examEndTime :examEndTime,
            //                 });
            //             }else{
            //                 mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
            //                     examParentId:setRefExamParentID.current,
            //                     courseName:courseName,
            //                     teacherName:teacherName,
            //                     examChildLink:examChildLink,
            //                     examEndDate :examEndDate,
            //                     examEndTime :examEndTime,
            //                 });
            //             }
            //             // console.log('myallQuestion[j].questionChild[0]',myallQuestion[j].questionChild[0]);
            //             // mergeQ.push({...myallQuestion[j].questionChild[0] ,
            //             //      courseName:courseName,
            //             //     teacherName:teacherName });
            //             // mergeQ.push(myallQuestion[j].questionChild[0]);
            //         }
            //     }
            //         // console.log('myallQuestion', myallQuestion );
            //         // mergeQ.push(myallQuestion[0])
            //     }
            // }
            // setLengthQuestions(mergeQ.length);
            // // CheckTheEndOfTheExam = setInterval(() => {
            // //     // console.log('dddddddddddddddddddd');
            // //     handleSendWxamDataAfterEndTime();
            // // }, 60000);
            // // console.log('mergeQ',mergeQ);
            // second = 0
            // setItems(mergeQ);
            // tickClear.current = setTimeout(function run() {
            //     tick();
            //     tickClear.current = setTimeout(run, 1000);
            //   }, 1000);
        }
       

        /////////////////////////////////////////////////////////////////////
        // setTypeIncreaseQuestions(examP && examP.examParent_backward ? examP.examParent_backward : false);
        // var mergeQ = [];
        // var examEndDate = examP.examParent_stop_date;
        // var examEndTime = examP.examParent_end;
        // var allQuestons = examP.examChild;
        // // for (let index = 0; index < allQuestons.length; index++) {
        // //    var counterQuestionsParent = allQuestons[index].questionParent;
        // //    var courseName = allQuestons[index] && allQuestons[index].groups && allQuestons[index].groups.length > 0 ? allQuestons[index].groups[0].course : '';
        // //    var teacherName = allQuestons[index] && allQuestons[index].groups && allQuestons[index].groups.length > 0 && allQuestons[index].groups[0].people && allQuestons[index].groups[0].people.length > 0 ?  allQuestons[index].groups[0].people[0].name + ' ' + allQuestons[index].groups[0].people[0].surname : '';
        // //    if(counterQuestionsParent && counterQuestionsParent.length > 0){
        // //       for (let j = 0; j < counterQuestionsParent.length; j++) {
        // //         //   console.log('allQuestons[index].questionParent[j]', allQuestons[index].questionParent[j] );
        // //           if(allQuestons[index].questionParent[j].questionChild && allQuestons[index].questionParent[j].questionChild.length > 0){
        // //               if(allQuestons[index].questionParent[j].questionChild[0].question_type == '6'){
                        
        // //                 var mySeqRandomArray = await SeqRandomArray(allQuestons[index].questionParent[j].questionChild[0].question_seqItems)
        // //                 console.log('allQuestons[index].questionParent[j].questionChild[0]666666666666666', {
        // //                     ...allQuestons[index].questionParent[j].questionChild[0] ,
        // //                     question_seqItems: mySeqRandomArray,
        // //                     courseName:courseName,
        // //                    teacherName:teacherName });
        // //                 mergeQ.push({
        // //                     ...allQuestons[index].questionParent[j].questionChild[0] ,
        // //                     question_seqItems: mySeqRandomArray,
        // //                     courseName:courseName,
        // //                    teacherName:teacherName });
        // //               }else if(allQuestons[index].questionParent[j].questionChild[0].question_type == '5')
        // //               {
        // //                 var myRandomArray = await RandomArray(allQuestons[index].questionParent[j].questionChild[0].question_compItems);
        // //                 console.log('allQuestons[index].questionParent[j].questionChild[0]55555555555555555555', {...allQuestons[index].questionParent[j].questionChild[0] ,
        // //                     question_compItems: myRandomArray,
        // //                     courseName:courseName,
        // //                    teacherName:teacherName });
        // //                 mergeQ.push({...allQuestons[index].questionParent[j].questionChild[0] ,
        // //                     question_compItems: myRandomArray,
        // //                     courseName:courseName,
        // //                    teacherName:teacherName });
        // //               }else{
        // //                 console.log('allQuestons[index].questionParent[j].questionChild[0]',allQuestons[index].questionParent[j].questionChild[0].question_type);
        // //                 mergeQ.push({...allQuestons[index].questionParent[j].questionChild[0] ,
        // //                     courseName:courseName,
        // //                    teacherName:teacherName });
        // //               }
        // //             // console.log('allQuestons[index].questionParent[j].questionChild[0]',allQuestons[index].questionParent[j].questionChild[0]);
        // //             // mergeQ.push({...allQuestons[index].questionParent[j].questionChild[0] ,
        // //             //      courseName:courseName,
        // //             //     teacherName:teacherName });
        // //             // mergeQ.push(allQuestons[index].questionParent[j].questionChild[0]);
        // //           }
        // //       }
        // //         // console.log('allQuestons[index].questionParent', allQuestons[index].questionParent );
        // //         // mergeQ.push(allQuestons[index].questionParent[0])
        // //     }
        // // }
        // // console.log('mergeQ',mergeQ);
        // ///////////////////////////////////////////////
        // for await (let myallQuestion of allQuestons) {
        //     var examChildLink = myallQuestion.examChild_pdf;
        //     var counterQuestionsParent = myallQuestion;
        //     var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
        //     var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
        //     var questionParentForExamChild = counterQuestionsParent.questionParent;
        //     if( questionParentForExamChild && questionParentForExamChild.length > 0){
        //        for (let j = 0; j < questionParentForExamChild.length; j++) {
        //            if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
        //                if(questionParentForExamChild[j].questionChild[0].question_type == '6'){
        //                  var mySeqRandomArray = SeqRandomArray(questionParentForExamChild[j].questionChild[0].question_seqItems)
        //                  mergeQ.push({
        //                      ...questionParentForExamChild[j].questionChild[0] ,
        //                      question_seqItems: mySeqRandomArray,
        //                      courseName:courseName,
        //                     teacherName:teacherName,
        //                     examChildLink:examChildLink,
        //                     examEndDate :examEndDate,
        //                     examEndTime :examEndTime,
        //                 });
        //                }else if(questionParentForExamChild[j].questionChild[0].question_type == '5')
        //                {
        //                  var myRandomArray = RandomArray(questionParentForExamChild[j].questionChild[0].question_compItems);
        //                  mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
        //                      question_compItems: myRandomArray,
        //                      courseName:courseName,
        //                     teacherName:teacherName,
        //                     examChildLink:examChildLink,
        //                     examEndDate :examEndDate,
        //                     examEndTime :examEndTime,
        //                  });
        //                }else{
        //                  mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
        //                      courseName:courseName,
        //                     teacherName:teacherName,
        //                     examChildLink:examChildLink,
        //                     examEndDate :examEndDate,
        //                     examEndTime :examEndTime,
        //                  });
        //                }
        //              // console.log('myallQuestion[j].questionChild[0]',myallQuestion[j].questionChild[0]);
        //              // mergeQ.push({...myallQuestion[j].questionChild[0] ,
        //              //      courseName:courseName,
        //              //     teacherName:teacherName });
        //              // mergeQ.push(myallQuestion[j].questionChild[0]);
        //            }
        //        }
        //          // console.log('myallQuestion', myallQuestion );
        //          // mergeQ.push(myallQuestion[0])
        //      }
        //  }
        // setLengthQuestions(mergeQ.length);
        setTimeToPageTimeOut = setTimeout(function run() {
            console.log("getExamParentIdResponse",getExamParentIdResponse);
            SetTimeToAttendTheExamPage({id: setRefExamParentID.current ,time: countRef.current , endDateExam:examP.examParent_stop_date});
            // SetTimeToAttendTheExamPage({id: getExamParentIdResponse ,time: countRef.current});
            setTimeToPageTimeOut = setTimeout(run, 20000);
        }, 20000);
        CheckTheEndOfTheExam = setInterval(() => {
            // console.log('dddddddddddddddddddd');
            handleSendWxamDataAfterEndTime();
        }, 60000);
        // CheckTheEndOfTheExam = setInterval(function(){
        //     // console.log('dddddddddddddddddddd');
        //     handleSendWxamDataAfterEndTime();
        // }(getTimeToAttendTheExamPage), 60000);
        // // console.log('mergeQ',mergeQ);
        // setItems(mergeQ);
        // return mergeQ;
    }
    ///////////////////////////////////////////////////
    const existence = (list , item) => {
        var flag=false;
        for (let j = 0; j < list.length; j++) {
            if(list[j] === item){
                flag=true;
            }
            
        }

        if(!flag){
            // temp.push(second);
            return true;
        }else{
            return false;
        }
    }
    ///////////////////////////////////////////////////
    const createRandom = (len) =>{
        var second = Math.floor(Math.random() * len);
        return second;
    }
    ///////////////////////////////////////////////////
    const RandomArray = (list) =>{
        var newItem = Array(list.length).fill(0).map(row => new Array(2).fill(''))
        var temp =[];
       for (let index = 0; index < list.length; index++) {
           newItem[index][0]=list[index][0];
        //    console.log('element1',list[index][0]);
           var randomItem = createRandom(list.length);
           if(existence(temp,randomItem)){
                temp.push(randomItem);
                var element2 = list[randomItem][1];
                newItem[index][1]=element2;
           }else{
                index --;
           }
       }
    //    console.log('newItem',newItem);
       return newItem;
    }
    ///////////////////////////////////////////////////
    const SeqExistence = (list , item) => {
        var flag=false;
        for (let j = 0; j < list.length; j++) {
            if(list[j] === item){
                flag=true;
            }
            
        }

        if(!flag){
            // temp.push(second);
            return true;
        }else{
            return false;
        }
    }
     ///////////////////////////////////////////////////
    const SeqRandomArray = (list) =>{
        var newItem = [];
        var temp =[];
       for (let index = 0; index <  list.length; index++) {
           var randomItem = createRandom(list.length);
        //    console.log('randomItem',randomItem);
           if(SeqExistence(temp,randomItem)){
                temp.push(randomItem);
                // console.log('randomItem',randomItem);
                newItem.push(list[randomItem]);
                // var element2 = list[randomItem][1];
                // newItem[index][1]=element2;
           }else{
                index --;
           }
       }
    //    console.log('newItem',newItem);
       return newItem;
    }
    ///////////////////////////////////////////////////
    const handleExitPage = () =>{
        runningTimeOfTimeForSolveQuestions({id:setRefExamParentID.current,val:true});
        // clearInterval(timerClear.current);
        // clearInterval(CheckTheEndOfTheExam);
        // ClearTimeToAttendTheExamPage(getExamParentIdResponse);
        setTimeout(()=>{
            history.push({
                pathname: '/examsList',
                // search: '?query=abc',
                // state: { examPId: loginInfo.id ? loginInfo.id: ''}
            })
        },1000);
        // clearRepsonseStudent(getExamParentIdResponse);
       
        // if(sendReqDelay){
        //     clearTimeout(sendReqDelay);
        // }
        // clearTimeout(setTimeToPageTimeOut);
        // clearTimeout(tickClear.current);
        // setDelayResponseStudent({ variables: { 
        //     userName: "210", 
        //     password: "210", 
        //     pId: "210",
        //     epId: data.examParents[0].id, 
        //     delay: time,
        //     totalScore: '0',
        //     countScore: '0',
        // } 
        // }).then(res=>{
        //     console.log('data3',res.data);
        //     // 
        //     if(res.data && res.data.addResponseInfo){
        //         console.log('dataaaaaaaaaaaaaaaaaa',data);
        //         ClearTimeToAttendTheExamPage(getExamParentIdResponse);
        //         clearRepsonseStudent(getExamParentIdResponse);
        //     }else{
        //         console.log('data',data);
        //     }
        // })
    }
    ///////////////////////////////////////////////////
    return(
        <ShowQuestionsContainer>
            {/* ////////////////////////////// */}
            <ExamInfoHeader 
                startDate = {data && data.examParents.length > 0 ? data.examParents[0].examParent_start_date : ''}
                stopDate = {data && data.examParents.length > 0 ? data.examParents[0].examParent_stop_date : ''}
                examDuration = {data && data.examParents.length > 0 ? data.examParents[0].examParent_duration : ''}
                startTime = {data && data.examParents.length > 0 ? data.examParents[0].examParent_start : ''}
                endTime = {data && data.examParents.length > 0 ? data.examParents[0].examParent_end : ''}
                teacherName = {items.length > 0 ? items[questionIndex].teacherName : ''} 
            />
            {/* ////////////////////////////// */}
            <ShowInfoExam>
                <ExitButtonContainer>
                    <Tooltip title="????????" aria-label="????????"  >
                        <ExitButton onClick={handleExitPage} id="exitBtn">
                            <CloseIcon style={{ fontSize:'3rem'}}/>
                        </ExitButton>
                    </Tooltip>
                    {/* {
                        items.length > 0 && items[questionIndex].examChildLink ? 
                        <ShowLoginTimeContainer>
                            <ShowLoginTime>{data.examParents[0].examParent_start_date != data.examParents[0].examParent_stop_date ? loginTime : checkRef.current }</ShowLoginTime>
                        </ShowLoginTimeContainer>
                        : ''
                    } */}
                   
                </ExitButtonContainer>
                <ShowQuestionsCourseNameContainer>
                    <ShowQuestionsCourseName>?????? ?????? : {items.length > 0 ? items[questionIndex].courseName : ''}</ShowQuestionsCourseName>
                </ShowQuestionsCourseNameContainer>
                {
                    items.length > 0 && items[questionIndex].examChildLink ? 
                    <QuestipnsLinkDiv>
                        <QuestipnsLink href={items[questionIndex].examChildLink}>???????? ????????????</QuestipnsLink>
                    </QuestipnsLinkDiv>
                    : ''
                }
                
            </ShowInfoExam>
            {/* ////////////////////////////// */}
            {(() => {
                if(items.length > 0){
                    if(items[questionIndex].question_type == '1'){
                        return <ShowDescriptiveQuestion question={items[questionIndex]} number={questionIndex} 
                            ResItem = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_descriptionQuestion : ''}
                            ResItemImage = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_descriptionImageLink : ''}
                        /> 
                    }else if(items[questionIndex].question_type == '5'){
                        // return <ShowComparativeQuestion question={items[questionIndex]} number={questionIndex} items={RandomArray(items[questionIndex].question_compItems)} ResItem = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_comparativeQuestion : []} /> 
                        return <ShowComparativeQuestion question={items[questionIndex]} number={questionIndex} items={items[questionIndex].question_compItems} ResItem = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_comparativeQuestion : []} /> 
                    }
                    else if(items[questionIndex].question_type == '2'){
                        return <MultipleChoiceConatiner question={items[questionIndex]} number={questionIndex} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_studentItem : ''} />
                    }
                    else if(items[questionIndex].question_type == '3'){
                        return <ShowTrueAndFalseQuestion question={items[questionIndex]} number={questionIndex} ResItem={ items[questionIndex].response && items[questionIndex].response.length > 0 ? items[questionIndex].response[0].response_studentItem : ''} />
                    }
                    else if(items[questionIndex].question_type == '6'){
                        return <ShowSequentialQuestion question={items[questionIndex]} number={questionIndex} items={items[questionIndex].question_seqItems} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_sequentialQuestion : []} />
                        // return <ShowSequentialQuestion question={items[questionIndex]} number={questionIndex} items={SeqRandomArray(items[questionIndex].question_seqItems)} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_sequentialQuestion : []} />
                    }
                    else if(items[questionIndex].question_type == '4'){
                        return <ShowVacancyQuestion question={items[questionIndex]} number={questionIndex} items={items[questionIndex].question_vancyItems} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_vancyQuestion : ''}/>
                    }
                }
            })()}
            {/* ////////////////////////////// */}
            {
                showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
            }
             {/* ////////////////////////////// */}
        </ShowQuestionsContainer>
    )
};

const mapStateToProps = createStructuredSelector({
    questionIndex:selectIndex,
    getTimeToAttendTheExamPage:getTimeToAttendTheExamPage,
    getExamParentIdResponse:getExamParentIdResponse,
    getTimeToAttendTheExamPageWithID : (state, ownProps) => getTimeToAttendTheExamPageWithID(ownProps.location.state.examPId)(state, ownProps),
    // getTimeToAttendTheExamPageWithID : (state, ownProps) => getTimeToAttendTheExamPageWithID(ownProps.getExamParentIdResponse)(state, ownProps),
});

const mapDispatchToProps = dispatch =>({
    setLengthQuestions: len => dispatch(setLengthQuestions(len)),
    setTypeIncreaseQuestions: type => dispatch(setTypeIncreaseQuestions(type)),
    runningTimeOfTimeForSolveQuestions : (item)=> dispatch(runningTimeOfTimeForSolveQuestions(item)),
    clearRunningTimeOfTimeForSolveQuestions : (item)=> dispatch(clearRunningTimeOfTimeForSolveQuestions(item)),
    SetTimeToAttendTheExamPage : (item)=> dispatch(SetTimeToAttendTheExamPage(item)),
    ClearTimeToAttendTheExamPage : (id) => dispatch(ClearTimeToAttendTheExamPage(id)),
    ClearTimeToAttendTheExamPageWithTimeOut : () => dispatch(ClearTimeToAttendTheExamPageWithTimeOut()),
    clearRepsonseStudent : (id) => dispatch(clearRepsonseStudent(id)),
    clearResponseStudentTimeOut : () => dispatch(clearResponseStudentTimeOut()),
    setExamParentIdForResponse : (id) => dispatch(setExamParentIdForResponse(id)),
})

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(ExamPageForStudent));