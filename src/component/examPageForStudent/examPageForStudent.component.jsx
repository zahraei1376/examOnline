import React , {useState,useEffect} from 'react';
import ShowDescriptiveQuestion from './showQuestions/ShowDescriptiveQuestion/ShowDescriptiveQuestion.component';
import ShowComparativeQuestion from './showQuestions/ShowComparativeQuestion/ShowComparativeQuestion.component';
import MultipleChoiceConatiner from './showQuestions/ShowMultipleChoice/ShowMultipleChoice.component';
import ShowTrueAndFalseQuestion from './showQuestions/ShowTrueAndFalse/ShowTrueAndFalse.component';
import ShowSequentialQuestion from './showQuestions/ShowSequentialQuestion/ShowSequentialQuestion.component';
import ShowVacancyQuestion from './showQuestions/ShowVacancyQuestion/ShowVacancyuestion.component';
import {connect} from 'react-redux';
import {selectIndex} from '../../redux/questionIndex/questionIndex.selector';
import {setLengthQuestions ,setTypeIncreaseQuestions ,runningTimeOfTimeForSolveQuestions} from '../../redux/questionIndex/questionIndex.sction';
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
     ExitButtonContainer,ExitButton} from './examPageForStudent.styles';
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
const  ExamPageForStudent = ({questionIndex ,setLengthQuestions , setTypeIncreaseQuestions ,runningTimeOfTimeForSolveQuestions}) =>{
    ///////////////////////////////////////////////////
    const { loading, error, data ,refetch  } = useQuery(GET_QUESTIONS , {
        variables: {  userName: "211",
        password: "211",
        id: "607fd8fb3fb30a08d7ce1e53" },
        notifyOnNetworkStatusChange: true
    });

    const [setDelayResponseStudent ,{ DelayData }] = useMutation(SET_DEALY_RESPONSE_STUDENT);
    ///////////////////////////////////////////////////
    const [items,setItems] = useState([]);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    const [time, setTime] = useState('');
    /////////////////////timer
    var second = 0;
    const [loginTime, setLoginTime] = useState(0);
    ///////////////////////////////////////////////////
    // useEffect(()=>{
    //     return ()=>{
    //         if(sendReqDelay){
    //             clearInterval(sendReqDelay);
    //         }
    //     }
    // },[])
    ///////////////////////////////////////////////////
    useEffect(()=>{
        console.log('data',data);
        if(data){
            setItems(MergeQuestions(data.examParents[0]));
        }
        // else{
        //     setMessage('خطایی رخ داده مجددا تلاش کنید');
        //     setStatus('0');
        //     setShowMessage(!showMessage);
        // }
    },[data]);

    useEffect(()=>{
        console.log('items' , items);
        // TimerIntervalSolveQuestions = setTimeout(function run() {
        //     tick();
        //     TimerIntervalSolveQuestions = setTimeout(run, 1000);
        //   }, 1000);


        // TimerIntervalSolveQuestions = setInterval(() => {
        //     tick();
        // }, 1000);
    } ,[items])
    ///////////////////////////////////////////////////time
    var timerClear;
    var sendReqDelay;
    var TimerIntervalSolveQuestions;
    useEffect(() => {
        timerClear = setInterval(() => {
        // setGetDate(moment(realeTime).format('jYYYY/jMM/jDD'));
        setTime(
            realeTime.toLocaleTimeString([], {
            timeZone: "Asia/Tehran",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            }),
        );
            if(data){
                handleSendWxamDataAfterEndTime();
            }
        }, 1000);
        return () => {
        clearInterval(timerClear);
        };
    }, [time]);
    /////////////////////
    const handleSendWxamDataAfterEndTime = () => {
        if(data.examParents[0].examParent_start_date === data.examParents[0].examParent_stop_date){
            //////////////////////////////شروع و پایان امتحان در یک روز
            var newEndTime = fixNumbers(moment2(data.examParents[0].examParent_end)
            .tz('Asia/Tehran').format('HH:mm:00'));
            var filterEndTime = newEndTime.split(":").join("");
            var temp = fixNumbers(time);
            var filterGetTime = temp.split(":").join("");

            if (filterGetTime > filterEndTime) {
                if (data.examParents[0].examParent_method == 0) { //not
                    alert('زمان امتحان تمام شده است!!!');
                    runningTimeOfTimeForSolveQuestions(true);
                    clearInterval(timerClear);
                    if(sendReqDelay){
                        clearInterval(sendReqDelay);
                    }
                    clearInterval(TimerIntervalSolveQuestions);
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

            if (filterGetTime > filterEndTime) {
                alert('زمان امتحان تمام شده است!!!');
                runningTimeOfTimeForSolveQuestions(true);
                clearInterval(timerClear);
                clearInterval(TimerIntervalSolveQuestions);
            }
        }
    }
    /////////////////////
    function format(time) { 
        console.log('time', time);
        var hrs = Math.floor(time / 3600);
        var mins = Math.floor((time % 3600) / 60);
        var secs = time % 60;

        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
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
    const MergeQuestions = (examP) => {
        console.log('examP', examP );
        // setTypeIncreaseQuestions(examP.type ? examP.type : 'Forward');
        setTypeIncreaseQuestions(examP.type ? examP.type : 'justForward');
        var mergeQ = [];
        var allQuestons = examP.examChild;
        for (let index = 0; index < allQuestons.length; index++) {
           var counterQuestionsParent = allQuestons[index].questionParent;
           var courseName = allQuestons[index] && allQuestons[index].groups && allQuestons[index].groups.length > 0 ? allQuestons[index].groups[0].course : '';
           console.log('courseName',courseName); 
           var teacherName = allQuestons[index] && allQuestons[index].groups && allQuestons[index].groups.length > 0 && allQuestons[index].groups[0].people && allQuestons[index].groups[0].people.length > 0 ?  allQuestons[index].groups[0].people[0].name + ' ' + allQuestons[index].groups[0].people[0].surName : '';
           console.log('teacherName',teacherName);
           if(counterQuestionsParent && counterQuestionsParent.length > 0){
              for (let j = 0; j < counterQuestionsParent.length; j++) {
                  console.log('allQuestons[index].questionParent[j]', allQuestons[index].questionParent[j] );
                  if(allQuestons[index].questionParent[j].questionChild && allQuestons[index].questionParent[j].questionChild.length > 0){
                    mergeQ.push({...allQuestons[index].questionParent[j].questionChild[0] ,
                         courseName:courseName,
                        teacherName:teacherName });
                    // mergeQ.push(allQuestons[index].questionParent[j].questionChild[0]);
                  }
              }
                // console.log('allQuestons[index].questionParent', allQuestons[index].questionParent );
                // mergeQ.push(allQuestons[index].questionParent[0])
            }
        }
        console.log('mergeQ',mergeQ);
        setLengthQuestions(mergeQ.length);
        
        return mergeQ;
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
       console.log('newItem',newItem);
       return newItem;
    }
    ///////////////////////////////////////////////////
    const handleExitPage = () =>{
        runningTimeOfTimeForSolveQuestions(true);
        clearInterval(timerClear);
        if(sendReqDelay){
            clearInterval(sendReqDelay);
        }
        clearInterval(TimerIntervalSolveQuestions);
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
                        <ExitButton onClick={handleExitPage}>
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

                {/* <ShowLoginTimeContainer>
                    <ShowLoginTime> مدت زمان گذشته از امتحان : {loginTime}</ShowLoginTime>
                </ShowLoginTimeContainer> */}
                
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
                        return <ShowComparativeQuestion question={items[questionIndex]} number={questionIndex} items={RandomArray(items[questionIndex].question_compItems)} ResItem = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_comparativeQuestion : ''} /> 
                    }
                    else if(items[questionIndex].question_type == '2'){
                        return <MultipleChoiceConatiner question={items[questionIndex]} number={questionIndex} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_studentItem : ''} />
                    }
                    else if(items[questionIndex].question_type == '3'){
                        return <ShowTrueAndFalseQuestion question={items[questionIndex]} number={questionIndex} ResItem={ items[questionIndex].response && items[questionIndex].response.length > 0 ? items[questionIndex].response[0].response_studentItem : ''} />
                    }
                    else if(items[questionIndex].question_type == '6'){
                        return <ShowSequentialQuestion question={items[questionIndex]} number={questionIndex} items={SeqRandomArray(items[questionIndex].question_seqItems)} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_sequentialQuestion : ''} />
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
    questionIndex:selectIndex
});

const mapDispatchToProps = dispatch =>({
    setLengthQuestions: len => dispatch(setLengthQuestions(len)),
    setTypeIncreaseQuestions: type => dispatch(setTypeIncreaseQuestions(type)),
    runningTimeOfTimeForSolveQuestions : (item)=> dispatch(runningTimeOfTimeForSolveQuestions(item)),
})

export default connect(mapStateToProps ,mapDispatchToProps)(ExamPageForStudent);