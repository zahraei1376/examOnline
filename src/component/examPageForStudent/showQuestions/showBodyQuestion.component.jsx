import React,{useState,useEffect} from 'react';
import {BodyContainer,BodyQuestion,BodyQuestionBoxWithChildren,BodyQuestionBox,BodyDiv,ImageQuestion,ImageQuestionContainer,
    ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer,
    FooterQuestionContainer,FooterBtnsContainer , FooterBtn} from './showBodyQuestion.styles';
import ExplainQuestion from '../../explainQuestionComponent/explainQuestionComponent.component';
import MyPic from '../../../assets/img/images.jpg';
import MyPic2 from '../../../assets/img/image2.jpg';
/////////////////////////
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ShowImage from '../../imageShow/showImage.component';
// import AddIcon from '@material-ui/icons/Add';
///////////////////////////////////////////////////////
import { connect} from 'react-redux';
import {IncreaseIndex , DecreaseIndex} from '../../../redux/questionIndex/questionIndex.sction';
import {selectIndex ,finalIndex} from '../../../redux/questionIndex/questionIndex.selector';
import { createStructuredSelector} from 'reselect';
const ShowBodyQuestions = ({question,number,children,IncreaseIndexQuestion,DecreaseIndexQuestion,questionIndex ,questionsLenght}) =>{

    // const [state,setState] =useState({
    //     type:false,
    //     imageSrc:null,
    //     captionImage:'',
    //     showImage:false,
    // });
    const [type, setType] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [captionImage, setCaptionImage] = useState(false);
    const [showImage, setShowImage] = useState(false);
    useEffect(()=>{
        console.log('MyQuestions',question);
      },[]);

    // useEffect(()=>{
    //     console.log('captionImage',captionImage);
    //   },[captionImage]);
    
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


    return(
    <BodyContainer>
        <BodyQuestionBoxWithChildren>
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
                     <ExplainQuestion number={number} explain={question.question_explain} time={question.question_timeToSolveProblem}/>
                 </ImageQuestionContainer>
                 <ScoreTag
                 >
                 (نمره {question.question_score})
                 </ScoreTag>
                 
                 
             </ImageQuestionMainContainer>
            ) : question.question ? (
                <BodyDiv>
                    <ExplainQuestion number={number} explain={question.question_explain} time={question.question_timeToSolveProblem}/>
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
                    
                </BodyDiv>
            ) : (
                ''
                )}
        </BodyQuestionBox>
        {/* //////////////////////////////////////////////children */}
        {children}
        </BodyQuestionBoxWithChildren>
        {/* /////////////////////////////////footer */}
        <FooterQuestionContainer>
            <FooterBtnsContainer>
                <Tooltip title="سوال قبلی" aria-label="سوال قبلی"  style={{ fontSize:'3rem'}} >
                    <FooterBtn disabled={questionIndex == 0 ? true :false} onClick={DecreaseIndexQuestion}>
                        <ArrowForwardIosIcon style={{ fontSize:'3rem'}} />
                    </FooterBtn>
                </Tooltip>
                
                <Tooltip title="سوال بعدی" aria-label="سوال بعدی" style={{ fontSize:'3rem'}} >
                    <FooterBtn disabled={questionIndex == questionsLenght -1 ? true :false} onClick={IncreaseIndexQuestion}>
                        <ArrowBackIosIcon style={{ fontSize:'3rem'}} />
                    </FooterBtn>
                </Tooltip>

            </FooterBtnsContainer>
        </FooterQuestionContainer>
        {
            showImage ? <ShowImage imageSrc={imageSrc} caption={captionImage} close={showPic} type={type} /> : ''
        }
    </BodyContainer>
    )
};

// const mapStateToProps = state =>({
//     questionIndex:state.questionIndex.indexQuestion
// });

const mapStateToProps = createStructuredSelector({
    questionIndex:selectIndex,
    questionsLenght:finalIndex
});

// selectIndex

const mapDispatchToProps = dispatch =>({
    IncreaseIndexQuestion: () => dispatch(IncreaseIndex()),
    DecreaseIndexQuestion: () => dispatch(DecreaseIndex()),
});

export default connect(mapStateToProps,mapDispatchToProps)(ShowBodyQuestions);