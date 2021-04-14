import React,{useState,useEffect} from 'react';
import {BodyContainer,BodyQuestion,BodyQuestionBoxWithChildren,BodyQuestionBoxContainer,BodyQuestionBox,BodyDiv,ImageQuestion,ImageQuestionContainer,
    ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer,
    InputScoreContainer,InputScore,InputScoreLabel,BtnOk} from './showBodyQuestionForArchive.styles';
import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
import MyPic from '../../../../assets/img/images.jpg';
import MyPic2 from '../../../../assets/img/image2.jpg';
/////////////////////////
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ShowImageForArchive from '../../imageShowForArchive/showImageForArchive.component';
// import AddIcon from '@material-ui/icons/Add';
///////////////////////////////////////////////////////
import {connect} from 'react-redux';
import {IncreaseScore} from '../../../../redux/scoresStudents/scoresStudents.action';
import {getStudentId} from '../../../../redux/scoresStudents/scoresStudents.selector';
import { createStructuredSelector } from 'reselect';
const graphql_server_uri = '/graphql';
// import { connect} from 'react-redux';
// import {IncreaseIndex , DecreaseIndex} from '../../../redux/questionIndex/questionIndex.sction';
// import {selectIndex} from '../../../redux/questionIndex/questionIndex.selector';
// import { createStructuredSelector} from 'reselect';
const ShowBodyQuestionsForArchive = ({question,number,myType,children,responseScore,addScore,studentId}) =>{

    // const [state,setState] =useState({
    //     type:false,
    //     imageSrc:null,
    //     captionImage:'',
    //     showImage:false,
    // });
    const [type, setType] = useState(false);
    // const [forQuesion,setForQuestion] =useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [captionImage, setCaptionImage] = useState(false);
    const [showImage, setShowImage] = useState(false);

    const [score, setScore] = useState(responseScore ? responseScore : '');
    // const [score, setScore] = useState('');


    useEffect(()=>{
        // index,score ,students ,studentId
        // addScore(number, score , studentId)
        console.log('myType',myType);
        if(myType === '1'){
            addScore({'index':number, 'score':score , studentId: studentId})
        }
        
    },[score]);
    
  const showPic = () => {
    setShowImage(!showImage);
    //   setState({...state,showImage:! state.showImage});
  }

  const handleShowPic = link => {
    if (question.question) {
        console.log('question.question1',question.question);
        // setState({...state,type:true});
      setType(true);
        // setState({...state,captionImage:`${question.question.split('%0A').join('\r\n')}(نمره : ${question.question_score
        // })`});
      setCaptionImage(
        `${question.question.split('%0A').join('\r\n')}(نمره : ${question.question_score
        })`,
      );
    // setState({imageSrc:link});
    // setState({...state,imageSrc:MyPic2});
    //   setImageSrc(link);
    setImageSrc(MyPic2);
      showPic();
    } else {
        console.log('question.question2');
        // setState({type:false});
        // setState({captionImage:''});
        // // captionImage('');
        // setState({imageSrc:link});
      setType(false);
      setCaptionImage('');
    //   setImageSrc(link);
        setImageSrc(MyPic);
      showPic();
    }
  };

  const sendScore = () =>{
    console.log('senddddd');
    // fetch(graphql_server_uri, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       query: `
    //           mutation{
    //             addNewScore(
    //                 score_input: {
    //                   score_student_name: "${score_student_name}"
    //                   score_date: "${score_date}"
    //                   score: "${score}"
    //                   score_assessment: "${score_assessment}"
    //                   score_absencePresence: "${score_absencePresence}"
    //                   score_group_id: "${score_group_id}"
    //                 }
    //               ){
    //                 score_id
    //               }
    //           }
    //       `,
    //     }),
    //   })
    //     .then(res => res.json())
    //     .then(res => {
    //         console.log('senddddd');
    // });
  }


    return(
    <BodyContainer>
        <BodyQuestionBoxWithChildren>
        <BodyQuestionBoxContainer>
            <BodyQuestionBox>
            {question.exam_link ? (
                 <ImageWithQuestionContainer>
                 <ImageWithQuestion
                 onClick={() => handleShowPic(`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.exam_link}`)}
                 // onClick={() => handleShowPic(`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`)}
                 // src={question.question_link}
                 src={MyPic2}
                 // src={`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`}
                 />
             </ImageWithQuestionContainer>
             ///////////////////////
               
                ) : (
                    ''
            )}
            {question.question_link ? (
                 <ImageQuestionMainContainer>
                 <ImageQuestionContainer>
                     <ImageQuestion
                     onClick={() =>
                         handleShowPic(
                         `https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.question_link}`,
                         )
                     }
                     src={MyPic}
                     // src={question.exam_link}
                     // src={`https://kamal-exam.s3.ir-thr-at1.arvanstorage.com/${question.exam_link}`}
                     />
                     <ExplainQuestion number={number} explain={question.question_explane} time={question.question_timeToSolveProblem}/>
                 </ImageQuestionContainer>
                 <ScoreTag
                 >
                 (نمره {question.question_score})
                 </ScoreTag>
                 
                 
             </ImageQuestionMainContainer>
            ) : question.question ? (
                <BodyDiv>
                    <BodyQuestion
                        // className={
                        // question.exam_link
                        //     ? 'questionComponent__question'
                        //     : 'questionComponent__questionwidth'
                        // }
                    >
                        {question.question.split('%0A').join('\r\n')}
                        <br/> (
                        {question.question_score} نمره)
                    </BodyQuestion>
                    <ExplainQuestion number={number} explain={question.question_explane} time={question.question_timeTosolveProblem}/>
                </BodyDiv>
            ) : (
                ''
                )}
            </BodyQuestionBox>
            <InputScoreContainer>
                {/* <Tooltip title="تایید" aria-label="تایید"  style={{ fontSize:'3rem'}} >
                    <BtnOk 
                        onClick={sendScore}
                    >
                        <DoneIcon style={{ fontSize:'3rem'}} />
                    </BtnOk>
                </Tooltip> */}
                <InputScore type="number" readOnly={myType == '0' ? true : false} value={score} onChange={e => setScore(e.target.value)} />
                <InputScoreLabel>نمره تخصیص داده شده</InputScoreLabel>
                
            </InputScoreContainer>
        </BodyQuestionBoxContainer>
        
        {/* //////////////////////////////////////////////children */}
        {/* <children/> */}
        {children}
        </BodyQuestionBoxWithChildren>
        {/* /////////////////////////////////footer */}
        {/* <FooterQuestionContainer>
            <FooterBtnsContainer>
                <Tooltip title="سوال قبلی" aria-label="سوال قبلی"  style={{ fontSize:'3rem'}} >
                    <FooterBtn disabled={questionIndex == 0 ? true :false} onClick={DecreaseIndexQuestion}>
                        <ArrowBackIosIcon style={{ fontSize:'3rem'}} />
                    </FooterBtn>
                </Tooltip>
                
                <Tooltip title="سوال بعدی" aria-label="سوال بعدی" style={{ fontSize:'3rem'}} >
                    <FooterBtn disabled={questionIndex == 5 ? true :false} onClick={IncreaseIndexQuestion}>
                        <ArrowForwardIosIcon style={{ fontSize:'3rem'}} />
                    </FooterBtn>
                </Tooltip>

            </FooterBtnsContainer>
        </FooterQuestionContainer> */}
        {
            showImage ? <ShowImageForArchive imageSrc={imageSrc} caption={captionImage} close={showPic} type={type} /> : ''
        }
    </BodyContainer>
    )
};

// const mapStateToProps = state =>({
//     questionIndex:state.questionIndex.indexQuestion
// });

// const mapStateToProps = createStructuredSelector({
//     questionIndex:selectIndex
// });

// // selectIndex

// const mapDispatchToProps = dispatch =>({
//     IncreaseIndexQuestion: () => dispatch(IncreaseIndex()),
//     DecreaseIndexQuestion: () => dispatch(DecreaseIndex()),
// });

// export default connect(mapStateToProps,mapDispatchToProps)(ShowBodyQuestions);
// export default ShowBodyQuestionsForArchive;
const mapStateToProps = createStructuredSelector({
    studentId : getStudentId
});

const mapDispatchToProps = dispatch =>({
    // addScore : (index,score ,studentId) => dispatch(IncreaseScore(index,score ,studentId))
    addScore : (scoreItem) => dispatch(IncreaseScore(scoreItem))
})

export default connect(mapStateToProps , mapDispatchToProps)(ShowBodyQuestionsForArchive);