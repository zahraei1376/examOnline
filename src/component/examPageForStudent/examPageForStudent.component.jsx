import React , {useState,useEffect,useRef} from 'react';
import { useLocation } from "react-router-dom";
import ShowDescriptiveQuestion from './showQuestions/ShowDescriptiveQuestion/ShowDescriptiveQuestion.component';
import ShowComparativeQuestion from './showQuestions/ShowComparativeQuestion/ShowComparativeQuestion.component';
import MultipleChoiceConatiner from './showQuestions/ShowMultipleChoice/ShowMultipleChoice.component';
import ShowTrueAndFalseQuestion from './showQuestions/ShowTrueAndFalse/ShowTrueAndFalse.component';
import ShowSequentialQuestion from './showQuestions/ShowSequentialQuestion/ShowSequentialQuestion.component';
import ShowVacancyQuestion from './showQuestions/ShowVacancyQuestion/ShowVacancyuestion.component';
import {connect} from 'react-redux';
import {selectIndex } from '../../redux/questionIndex/questionIndex.selector';
import {setLengthQuestions ,setTypeIncreaseQuestions ,runningTimeOfTimeForSolveQuestions } from '../../redux/questionIndex/questionIndex.sction';

import {getTimeToAttendTheExamPage } from '../../redux/timeToAttendTheExamPage/timeToAttendTheExamPage.selector';
import {SetTimeToAttendTheExamPage} from '../../redux/timeToAttendTheExamPage/timeToAttendTheExamPage.action';
import { createStructuredSelector} from 'reselect';
import ExamInfoHeader from './examInfo/examInfo.component';
/////////////////////////////////
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
/////////////////////query
import { GET_QUESTIONS } from '../../graphql/resolver';
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
const  ExamPageForStudent = ({questionIndex ,setLengthQuestions ,getTimeToAttendTheExamPage, setTypeIncreaseQuestions ,runningTimeOfTimeForSolveQuestions ,SetTimeToAttendTheExamPage}) =>{
    ///////////////////////////////////////////////////
    
    let location = useLocation();

    const { loading, error, data ,refetch  } = useQuery(GET_QUESTIONS , {
        variables: {  userName: "211",
        password: "211",
        id: location && location.state.examPId ? location.state.examPId : '' },
        notifyOnNetworkStatusChange: true
    });

    // window.addEventListener('beforeunload', function (e) {
    //     // Cancel the event
    //     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    //     // Chrome requires returnValue to be set
    //     e.returnValue = 'برای خارج شدن باید دکمه خروج را فشار دهید!!!';
    //   });

    var second;

    useEffect(()=>{
        console.log('getTimeToAttendTheExamPage',getTimeToAttendTheExamPage);
        console.log('type Of getTimeToAttendTheExamPage',typeof getTimeToAttendTheExamPage);
        // if(){

        // }
        var convertArray = getTimeToAttendTheExamPage.split(':');
        var hour = convertArray && convertArray.length > 0 &&  convertArray[0] ? convertArray[0] : 0;
        var min = convertArray && convertArray.length > 0 &&  convertArray[1] ? convertArray[1] : 0;
        var sec = convertArray && convertArray.length > 0 &&  convertArray[2] ? convertArray[2] : 0;
        
        var timeL = (parseInt(hour) * 3600) + (parseInt(min) * 60) + parseInt(sec) ;
        // console.log('timeL',timeL);
        second = timeL;
        setLoginTime(format(timeL));
        tickClear.current = setTimeout(function run() {
            console.log('tickkkkkkk');
            tick();
            tickClear.current = setTimeout(run, 1000);
          }, 1000);

        return () =>{
            clearInterval(timerClear.current);
            clearInterval(CheckTheEndOfTheExam);
            if(sendReqDelay){
                clearTimeout(sendReqDelay);
            }
            clearTimeout(setTimeToPageTimeOut);
            clearTimeout(tickClear.current);
        }
    },[])

    const [setDelayResponseStudent ,{ DelayData }] = useMutation(SET_DEALY_RESPONSE_STUDENT);
    ///////////////////////////////////////////////////
    const [items,setItems] = useState([]);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    const [time, setTime] = useState('');
    /////////////////////timer
    const [loginTime, setLoginTime] = useState('0');
    ///////////////////////////////////////////////////
    const countRef = useRef(loginTime);
    countRef.current = loginTime;
    ///////
    const checkRef = useRef(time);
    checkRef.current = time;
    ///////////////////////////////////////////////////
    useEffect(()=>{
        if(data && data.examParents && data.examParents.length > 0 ){
            MergeQuestions(data.examParents[0])
            // setItems(MergeQuestions(data.examParents[0]));
        }
    },[data]);

    useEffect(()=>{
        console.log('exist item',items);
        if(items.length > 0){///برای فرستادن تاخیر
            console.log('datadarvakonmonom',data);
            if (data.examParents[0].examParent_method == 1) {
                sendReqDelay = setInterval(() => {
                    setDelayResponseStudent({ variables: { 
                        userName: "210", 
                        password: "210", 
                        delay: time,
                        ecI: data.examParents[0].id, 
                    } 
                    }).then(res=>{
                        if(res.data && res.data.setDelayResponseStudent){
                            console.log('data',data);
                            // setMessage('امتحان ثبت شد');
                            // setStatus('1');
                            // setShowMessage(!showMessage);
                        }else{
                            console.log('data',data);
                            // setStatus('0')
                            // setMessage('امتحان ثبت نشد')
                            // setShowMessage(!showMessage);
                        }
                    })
                }, 60000);
            }
        }
    },[items]);

    ///////////////////////////////////////////////////loginTime
    
    useEffect(()=>{
        setTimeToPageTimeOut = setTimeout(function run() {
            SetTimeToAttendTheExamPage(countRef.current)
            setTimeToPageTimeOut = setTimeout(run, 60000);
        }, 60000);
    },[])
    ///////////////////////////////////////////////////time
    const timerClear = useRef() ;
    const tickClear = useRef() ;
    var sendReqDelay;
    var setTimeToPageTimeOut;
    var CheckTheEndOfTheExam;
    useEffect(() => {
        console.log('bbbbbbbbbbbbbbbb');
        timerClear.current = setInterval(() => {
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
    /////////////////////
    const handleSendWxamDataAfterEndTime = () => {
        console.log('methossssssss1');
        if(data.examParents[0].examParent_start_date === data.examParents[0].examParent_stop_date){
            console.log('methossssssss2');
            //////////////////////////////شروع و پایان امتحان در یک روز
            var newEndTime = fixNumbers(moment2(data.examParents[0].examParent_end)
            .tz('Asia/Tehran').format('HH:mm:00'));
            // console.log('newEndTime',newEndTime);
            var filterEndTime = newEndTime.split(":").join("");
            var temp = fixNumbers(checkRef.current);
            var filterGetTime = temp.split(":").join("");
            console.log('filterGetTime',filterGetTime);
            console.log('filterEndTime',filterEndTime);
            if (filterGetTime > filterEndTime) {
                console.log('مخلثققق');
                if (data.examParents[0].examParent_method == "0") { //not
                    console.log('timerClear',timerClear);
                    
                    alert('زمان امتحان تمام شده است!!!');
                    runningTimeOfTimeForSolveQuestions(true);
                    
                    if(sendReqDelay){
                        clearTimeout(sendReqDelay);
                    }
                    clearTimeout(setTimeToPageTimeOut);
                    clearTimeout(tickClear.current);
                    clearInterval(timerClear.current);
                    clearInterval(CheckTheEndOfTheExam);
                    
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
                //         if(res.data && res.data.setDelayResponseStudent){
                //             console.log('data',data);
                //             // setMessage('امتحان ثبت شد');
                //             // setStatus('1');
                //             // setShowMessage(!showMessage);
                //         }else{
                //             console.log('data',data);
                //             // setStatus('0')
                //             // setMessage('امتحان ثبت نشد')
                //             // setShowMessage(!showMessage);
                //         }
                //         }
                //         )
                //     }, 60000);
                // }
            }
        }else{
            ////////////////////////////// شروع و پایان امتحان در یک روز نباشد
            var newEndTime = fixNumbers(moment2(data.examParents[0].examParent_end)
            .tz('Asia/Tehran').format('HH:mm:00'));
            var filterEndTime = newEndTime.split(":").join("");
            var temp = fixNumbers(time);
            var filterGetTime = temp.split(":").join("");

            // if (filterGetTime > filterEndTime) {
            //     alert('زمان امتحان تمام شده است!!!');
            //     runningTimeOfTimeForSolveQuestions(true);
            //     clearInterval(timerClear);
            //     clearInterval(TimerIntervalSolveQuestions);
            // }

            if (getTimeToAttendTheExamPage == data.examParents[0].examParent_duration) {
                alert('زمان امتحان تمام شده است!!!');
                runningTimeOfTimeForSolveQuestions(true);
                clearInterval(timerClear.current);
                clearInterval(CheckTheEndOfTheExam);
                clearTimeout(setTimeToPageTimeOut);
                clearTimeout(tickClear.current);
            }
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
    //////////////////////////////////////////////////////
    const MergeQuestions = async(examP) => {
        // console.log('examP', examP );
        // console.log('examP.examParent_backward', examP.examParent_backward );
        // setTypeIncreaseQuestions(examP.type ? examP.type : 'Forward');
        ///////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        setTypeIncreaseQuestions(examP && examP.examParent_backward ? examP.examParent_backward : false);
        var mergeQ = [];
        var allQuestons = examP.examChild;
        // for (let index = 0; index < allQuestons.length; index++) {
        //    var counterQuestionsParent = allQuestons[index].questionParent;
        //    var courseName = allQuestons[index] && allQuestons[index].groups && allQuestons[index].groups.length > 0 ? allQuestons[index].groups[0].course : '';
        //    var teacherName = allQuestons[index] && allQuestons[index].groups && allQuestons[index].groups.length > 0 && allQuestons[index].groups[0].people && allQuestons[index].groups[0].people.length > 0 ?  allQuestons[index].groups[0].people[0].name + ' ' + allQuestons[index].groups[0].people[0].surname : '';
        //    if(counterQuestionsParent && counterQuestionsParent.length > 0){
        //       for (let j = 0; j < counterQuestionsParent.length; j++) {
        //         //   console.log('allQuestons[index].questionParent[j]', allQuestons[index].questionParent[j] );
        //           if(allQuestons[index].questionParent[j].questionChild && allQuestons[index].questionParent[j].questionChild.length > 0){
        //               if(allQuestons[index].questionParent[j].questionChild[0].question_type == '6'){
                        
        //                 var mySeqRandomArray = await SeqRandomArray(allQuestons[index].questionParent[j].questionChild[0].question_seqItems)
        //                 console.log('allQuestons[index].questionParent[j].questionChild[0]666666666666666', {
        //                     ...allQuestons[index].questionParent[j].questionChild[0] ,
        //                     question_seqItems: mySeqRandomArray,
        //                     courseName:courseName,
        //                    teacherName:teacherName });
        //                 mergeQ.push({
        //                     ...allQuestons[index].questionParent[j].questionChild[0] ,
        //                     question_seqItems: mySeqRandomArray,
        //                     courseName:courseName,
        //                    teacherName:teacherName });
        //               }else if(allQuestons[index].questionParent[j].questionChild[0].question_type == '5')
        //               {
        //                 var myRandomArray = await RandomArray(allQuestons[index].questionParent[j].questionChild[0].question_compItems);
        //                 console.log('allQuestons[index].questionParent[j].questionChild[0]55555555555555555555', {...allQuestons[index].questionParent[j].questionChild[0] ,
        //                     question_compItems: myRandomArray,
        //                     courseName:courseName,
        //                    teacherName:teacherName });
        //                 mergeQ.push({...allQuestons[index].questionParent[j].questionChild[0] ,
        //                     question_compItems: myRandomArray,
        //                     courseName:courseName,
        //                    teacherName:teacherName });
        //               }else{
        //                 console.log('allQuestons[index].questionParent[j].questionChild[0]',allQuestons[index].questionParent[j].questionChild[0].question_type);
        //                 mergeQ.push({...allQuestons[index].questionParent[j].questionChild[0] ,
        //                     courseName:courseName,
        //                    teacherName:teacherName });
        //               }
        //             // console.log('allQuestons[index].questionParent[j].questionChild[0]',allQuestons[index].questionParent[j].questionChild[0]);
        //             // mergeQ.push({...allQuestons[index].questionParent[j].questionChild[0] ,
        //             //      courseName:courseName,
        //             //     teacherName:teacherName });
        //             // mergeQ.push(allQuestons[index].questionParent[j].questionChild[0]);
        //           }
        //       }
        //         // console.log('allQuestons[index].questionParent', allQuestons[index].questionParent );
        //         // mergeQ.push(allQuestons[index].questionParent[0])
        //     }
        // }
        // console.log('mergeQ',mergeQ);
        ///////////////////////////////////////////////
        for await (let myallQuestion of allQuestons) {
            var examChildLink = myallQuestion.examChild_pdf;
            var counterQuestionsParent = myallQuestion;
            var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
            var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
            console.log('counterQuestionsParent',counterQuestionsParent);
            var questionParentForExamChild = counterQuestionsParent.questionParent;
            if( questionParentForExamChild && questionParentForExamChild.length > 0){
               for (let j = 0; j < questionParentForExamChild.length; j++) {
                   console.log('yeyee');
                   var questionLink
                   if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
                       if(questionParentForExamChild[j].questionChild[0].question_type == '6'){
                         
                         var mySeqRandomArray = SeqRandomArray(questionParentForExamChild[j].questionChild[0].question_seqItems)
                         console.log('questionParentForExamChild[j].questionChild[0]666666666666666', {
                             ...questionParentForExamChild[j].questionChild[0] ,
                             question_seqItems: mySeqRandomArray,
                             courseName:courseName,
                            teacherName:teacherName,
                            examChildLink:examChildLink,
                         });
                         mergeQ.push({
                             ...questionParentForExamChild[j].questionChild[0] ,
                             question_seqItems: mySeqRandomArray,
                             courseName:courseName,
                            teacherName:teacherName,
                            examChildLink:examChildLink,
                        });
                       }else if(questionParentForExamChild[j].questionChild[0].question_type == '5')
                       {
                         var myRandomArray = RandomArray(questionParentForExamChild[j].questionChild[0].question_compItems);
                         console.log('questionParentForExamChild[j].questionChild[0]55555555555555555555', {...questionParentForExamChild[j].questionChild[0] ,
                             question_compItems: myRandomArray,
                             courseName:courseName,
                            teacherName:teacherName });
                         mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
                             question_compItems: myRandomArray,
                             courseName:courseName,
                            teacherName:teacherName,
                            examChildLink:examChildLink, });
                       }else{
                         console.log('questionParentForExamChild[j].questionChild[0]',questionParentForExamChild[j].questionChild[0].question_type);
                         mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
                             courseName:courseName,
                            teacherName:teacherName,
                            examChildLink:examChildLink, });
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
        CheckTheEndOfTheExam = setInterval(() => {
            console.log('dddddddddddddddddddd');
            handleSendWxamDataAfterEndTime();
        }, 60000);
        console.log('mergeQ',mergeQ);
        setItems(mergeQ);
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
        // var exitBt = document.getElementById("exitBtn");
        // if(exitBt){
        //     console.log('exitBt',exitBt);
        //     exitBt.disabled = true;
        // }
        // document.getElementById("exitBtn").setAttribute("disabled",true);
        runningTimeOfTimeForSolveQuestions(true);
        clearInterval(timerClear.current);
        clearInterval(CheckTheEndOfTheExam);
        if(sendReqDelay){
            clearTimeout(sendReqDelay);
        }
        clearTimeout(setTimeToPageTimeOut);
        clearTimeout(tickClear.current);
        setDelayResponseStudent({ variables: { 
            userName: "210", 
            password: "210", 
            pId: "210",
            epId: data.examParents[0].id, 
            delay: time,
            totalScore: '0',
            countScore: '0',
        } 
        }).then(res=>{
            if(res.data && res.data.setDelayResponseStudent){
                console.log('data',data);
                // setMessage('امتحان ثبت شد');
                // setStatus('1');
                // setShowMessage(!showMessage);
            }else{
                console.log('data',data);
                // setStatus('0')
                // setMessage('امتحان ثبت نشد')
                // setShowMessage(!showMessage);
            }
        })
    }
    ///////////////////////////////////////////////////
    return(
        <ShowQuestionsContainer>
            {/* ////////////////////////////// */}
            <ExamInfoHeader 
                startDate={data && data.examParents.length > 0 ? data.examParents[0].examParent_start_date : ''} 
                startTime={data && data.examParents.length > 0 ? data.examParents[0].examParent_start : ''}
                endTime={data && data.examParents.length > 0 ? data.examParents[0].examParent_end : ''}
                teacherName={items.length > 0 ? items[questionIndex].teacherName : ''} 
            />
            {/* ////////////////////////////// */}
            <ShowInfoExam>
                <ExitButtonContainer>
                    <Tooltip title="خروج" aria-label="خروج"  >
                        <ExitButton onClick={handleExitPage} id="exitBtn">
                            <CloseIcon style={{ fontSize:'3rem'}}/>
                        </ExitButton>
                    </Tooltip>
                    <ShowLoginTimeContainer>
                        <ShowLoginTime>{loginTime}</ShowLoginTime>
                    </ShowLoginTimeContainer>
                </ExitButtonContainer>
                <ShowQuestionsCourseNameContainer>
                    <ShowQuestionsCourseName>نام درس : {items.length > 0 ? items[questionIndex].courseName : ''}</ShowQuestionsCourseName>
                </ShowQuestionsCourseNameContainer>
                {
                    items.length > 0 && items[questionIndex].examChildLink ? 
                    <QuestipnsLinkDiv>
                        <QuestipnsLink href={items[questionIndex].examChildLink}>لینک سوالات</QuestipnsLink>
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
    getTimeToAttendTheExamPage:getTimeToAttendTheExamPage
    // questionCount : finalIndex,
});

const mapDispatchToProps = dispatch =>({
    setLengthQuestions: len => dispatch(setLengthQuestions(len)),
    setTypeIncreaseQuestions: type => dispatch(setTypeIncreaseQuestions(type)),
    runningTimeOfTimeForSolveQuestions : (item)=> dispatch(runningTimeOfTimeForSolveQuestions(item)),
    SetTimeToAttendTheExamPage : (item)=> dispatch(SetTimeToAttendTheExamPage(item)),
})

export default connect(mapStateToProps ,mapDispatchToProps)(ExamPageForStudent);