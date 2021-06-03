import React, { useState, useEffect, useContext } from 'react';
import {PopUpScoreContainer ,PopUpScoreContent,PopUpScoreHeader,
  PopUpScoreHeaderGroup,PopUpScoreHeaderTime,PopUpScoreHeaderDelay,PopUpScoreHeaderDelayContainer,
  PopUpScoreBtnClose,PopUpScorePageQuesion,PopUpScoreHeaderFile} from './popUpScore.styles.jsx';
import QuestionResponse from './QuestionResponse';
import moment from 'moment';
// import ShowImage from '../imageShow/showImage';
import { useSelector } from 'react-redux';
import ExamPageForTeacher from '../examPageForTeacher.component';
//////////////////query
import {GET_EXAMQUESTIONS_FOR_STUDENT_AND_TEACHER} from '../../../graphql/resolver';
import {useQuery} from 'react-apollo';
/////////////////
// import AppContext from 'app/AppContext';
const PopUpScore = props => {
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  const [questionResponse, setQuestionResponse] = useState([]);
  const [questionResponseStudent, setQuestionResponseStudent] = useState([]);
  // const [delay, setDelay] = useState('0');
  /////////////////////////////////////////

  const [imageSrc, setImageSrc] = useState('');
  const [captionImage, setCaptionImage] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [type, setType] = useState(false);

  const showPic = () => {
    setShowImage(!showImage)
  }
  /////////////////////////////////////

  ////////////////////////////////////////////////////////////
 const { loading, error, data ,refetch  } = useQuery(GET_EXAMQUESTIONS_FOR_STUDENT_AND_TEACHER , {
        variables: {  
            userName: "211",
            password: "211",
            id: props.examIdProps,
        },
        notifyOnNetworkStatusChange: true
    });
  ////////////////////////////////////////////////////////////
  const [Items, setItems] = useState([]);
  const [delay,setDelay] = useState('');
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////
  useEffect(()=>{
    console.log('data0',data);
    if(data){
      // setItems(data.examChilds[0]);
      if(data.examChilds && data.examChilds.length > 0 && data.examChilds[0].examParent && data.examChilds[0].examParent.length > 0
        && data.examChilds[0].examParent[0].responseInfo && data.examChilds[0].examParent[0].responseInfo.length > 0){
          setDelay(data.examChilds[0].examParent[0].responseInfo[0].delay);
        }
      
        MergeQuestions(data.examChilds[0].questionParent);
    }
    
},[data]);
useEffect(()=>{
    console.log('data1',props.examIdProps);
    
    
},[])
/////////////////////////
const MergeQuestions = async(examC) => {
    var mergeQ = [];
    var allQuestons = examC;
    for await (let myallQuestion of allQuestons) {//questions Parent
      var QuestionsParent = myallQuestion;
        if( QuestionsParent && QuestionsParent.questionChild){
          var questionChild = QuestionsParent.questionChild;
          console.log('questionChild',questionChild);
            for (let j = 0; j < questionChild.length; j++) {
                if(questionChild[j] && questionChild.length > 0){
                    mergeQ.push({...questionChild[j]});
                }
            }
        }
    }
    console.log('mergeQ',mergeQ);
    setItems(mergeQ);
}

    //////////////////////////////////////////////////////
    // const MergeQuestions = async(examP) => {
    //     var mergeQ = [];
    //     var mergeQInfo = {};
    //     var examChildLink = myallQuestion.examChild_pdf;
    //     var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
    //     var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
    //     console.log('teacherName', teacherName);
    //     mergeQInfo.courseName=courseName;
    //     mergeQInfo.teacherName=teacherName;
    //     mergeQInfo.examChildLink=examChildLink;
    //     mergeQInfo.courseName=courseName;
    //     var examEndDate = examP.examParent_stop_date;
    //     var examEndTime = examP.examParent_end;
    //     var allQuestons = examP.examChild;
    //     for await (let myallQuestion of allQuestons) {
    //       var counterQuestionsParent = myallQuestion;
    //         var questionParentForExamChild = counterQuestionsParent.questionParent;
    //         if( questionParentForExamChild && questionParentForExamChild.length > 0){
    //             for (let j = 0; j < questionParentForExamChild.length; j++) {
    //                 if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
    //                     mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
    //                         // examParentId:setRefExamParentID.current,
    //                         // courseName:courseName,
    //                         // teacherName:teacherName,
    //                         // examChildLink:examChildLink,
    //                         // examEndDate :examEndDate,
    //                         // examEndTime :examEndTime,
    //                     });
    //                 }
    //             }
    //         }
    //     }
    //     console.log('mergeQ',mergeQ);
    //     setItems(mergeQ);
    // }

  return (
    <PopUpScoreContainer>
      <PopUpScoreContent>
        <PopUpScoreHeader>
          <PopUpScoreHeaderGroup>
            {
              props.popUpScoreStudent.examParent_start_date == props.popUpScoreStudent.examParent_stop_date ? 
              <>
              <PopUpScoreHeaderTime>
                {/* زمان شروع : {moment(props.startTime).format('HH:mm:00')} */}
                زمان شروع : {props.popUpScoreStudent.examParent_start}
              </PopUpScoreHeaderTime>
              <PopUpScoreHeaderTime>
                {/* زمان پایان : {moment(props.endTime).format('HH:mm:00')} */}
                زمان پایان : {props.popUpScoreStudent.examParent_end}
              </PopUpScoreHeaderTime>
              </>
              : <>
              <PopUpScoreHeaderTime>
                {/* زمان شروع : {moment(props.startTime).format('HH:mm:00')} */}
                تاریخ شروع : {props.popUpScoreStudent.examParent_start_date}
              </PopUpScoreHeaderTime>
              <PopUpScoreHeaderTime>
                {/* زمان پایان : {moment(props.endTime).format('HH:mm:00')} */}
                تاریخ پایان : {props.popUpScoreStudent.examParent_stop_date}
              </PopUpScoreHeaderTime>
              <PopUpScoreHeaderTime>
                {/* زمان پایان : {moment(props.endTime).format('HH:mm:00')} */}
                مدت زمان : {props.popUpScoreStudent.examParent_duration}
              </PopUpScoreHeaderTime>
              </>
            }

        
          </PopUpScoreHeaderGroup>
          <PopUpScoreHeaderGroup>
          {props.popUpScoreStudent.examTopic ?  <PopUpScoreHeaderTime>
            موضوع : {props.popUpScoreStudent.examTopic}
            </PopUpScoreHeaderTime> : ''}
            {data.examChilds && data.examChilds.length > 0 && data.examChilds[0].examChild_courseCoefficient ?  <PopUpScoreHeaderTime>
            ضریب درس : {data.examChilds[0].examChild_courseCoefficient}
            </PopUpScoreHeaderTime> : ''}
            {data.examChilds && data.examChilds.length > 0 && data.examChilds[0].examChild_falseCoefficient ?  <PopUpScoreHeaderTime>
            ضریب منفی : {data.examChilds[0].examChild_falseCoefficient}
            </PopUpScoreHeaderTime> : ''}
          </PopUpScoreHeaderGroup>
          <PopUpScoreHeaderGroup>
            <PopUpScoreHeaderTime>
              نام معلم : {props.popUpScoreStudent.teacher_name}
            </PopUpScoreHeaderTime>
            <PopUpScoreHeaderTime>
              نام درس : {props.popUpScoreStudent.exam_courseName}
            </PopUpScoreHeaderTime>
          
          </PopUpScoreHeaderGroup>
        </PopUpScoreHeader>
        <PopUpScoreHeaderDelayContainer>
          <PopUpScoreHeaderDelay> زمان تحویل : {delay ? delay : 'تاخیر نداشت' }</PopUpScoreHeaderDelay>
          {
            data.examChilds && data.examChilds.length > 0 && data.examChilds[0].examChild_pdf ?
              <PopUpScoreHeaderFile href={data.examChilds[0].examChild_pdf}>فایل امتحان</PopUpScoreHeaderFile>
            :
            ''
          }
          
         
          {/* exam_delay: String, */}
        </PopUpScoreHeaderDelayContainer>
        <PopUpScorePageQuesion>
          <ExamPageForTeacher 
          // type = {'1' } 
          type = {props.type ?  props.type : '1' } 
          examIdProps = {props.examIdProps ? props.examIdProps : ''}
          Items={Items.length > 0 ? Items : []} 
          />
          {/* {questionResponse.length
            ? questionResponse.map((res, index) => {
              return (
                <div key={index}>
                  <QuestionResponse
                    // key={index}
                    setCaptionImage={setCaptionImage}
                    setImageSrc={setImageSrc}
                    showPic={showPic}
                    setType={setType}
                    number={index}
                    question={res}
                    StudentItem={
                      questionResponseStudent.length > 0 && questionResponseStudent[index]
                        ? questionResponseStudent[index].split(',')[1]
                        : ''
                    }
                  />
                </div>
              );
            })
            : ''} */}
        </PopUpScorePageQuesion>
      </PopUpScoreContent>
      <PopUpScoreBtnClose onClick={props.closePopUp}>
        بستن
      </PopUpScoreBtnClose>
      {/* {
        showImage ? <ShowImage imageSrc={imageSrc} caption={captionImage} close={showPic} type={type} /> : ''
      } */}
    </PopUpScoreContainer>
  );
};

export default PopUpScore;
