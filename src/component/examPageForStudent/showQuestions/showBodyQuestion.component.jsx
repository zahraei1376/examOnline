import React,{useState,useEffect} from 'react';
import {BodyContainer,BodyQuestion,BodyQuestionBoxWithChildren,BodyQuestionBox,BodyDiv,BodyQDiv,ImageQuestion,ImageQuestionContainer,
    ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer,QuestionImageContainer,
    FooterQuestionContainer,FooterBtnsContainer , FooterBtn} from './showBodyQuestion.styles';
import ExplainQuestion from '../../explainQuestionComponent/explainQuestionComponent.component';
import MyPic from '../../../assets/img/images.jpg';
import MyPic2 from '../../../assets/img/image2.jpg';
/////////////////////////
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ShowImage from '../../imageShow/showImage.component';
///////////////////////////////////////////////////////
import { connect} from 'react-redux';
import {IncreaseIndex , DecreaseIndex } from '../../../redux/questionIndex/questionIndex.sction';
import {setRepsonseStudent} from '../../../redux/responsesStudent/responsesStudent.action';
import {selectIndex ,finalIndex ,typeIncreaseQuestions ,timeOutToSolveQuestions} from '../../../redux/questionIndex/questionIndex.selector';
import { createStructuredSelector} from 'reselect';
//////////////////////query
import { useMutation} from 'react-apollo';
import {SET_RESPONSE_STUDENT} from '../../../graphql/resolver';
//////////////////////query
import MySnackbar from '../../../messageBox/messageBox.component';
const ShowBodyQuestions = ({question,number,children,IncreaseIndexQuestion,setRepsonseStudent ,DecreaseIndexQuestion,questionIndex ,questionsLenght ,typeIncreaseQuestions ,timeOutSolveQuestions }) =>{
    ////////////////////////////////////////query
    const [addResponse ,{ data }] = useMutation(SET_RESPONSE_STUDENT);
    /////////////////////////////////////////////////////////
    const [type, setType] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [captionImage, setCaptionImage] = useState(false);
    const [showImage, setShowImage] = useState(false);
    ////////////////////////////////////////setToRedux
    const [resForRedux , setResForRedux] = useState('');
    const [responseDesImage ,setResponseDesImage] = useState('');
    ////////////////////////////////////////////messageBox
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    //////////////////////////////////////////
    useEffect(()=>{
      console.log('question',question);
    },[])
    ///////////////////////////////////////////
    useEffect(()=>{
        console.log('resForRedux',resForRedux);
      },[resForRedux]);
    ///////////////////////////////////////////
    const showPic = () => {
      setShowImage(!showImage);
    }
    ///////////////////////////////////////////
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
      // setImageSrc(MyPic2);
      setImageSrc(link);
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
          // setImageSrc(MyPic);
          setImageSrc(link);
        showPic();
      }
    };
    ///////////////////////////////////////////
    const handleNextQuestion = async() =>{
        console.log("CCCCCCCCC:", resForRedux);
        await addResponse({ variables: { 
            userName: "210",
            password: "210",
            qcId: question.id,
            response_descriptionImageLink:question.question_type == '1' ? responseDesImage : "",
            response_sequentialQuestion: question.question_type == '6' ? resForRedux : [], 
            response_studentItem: question.question_type == '2' || question.question_type == '3'  ? resForRedux : "",
            response_comparativeQuestion: question.question_type == '5' ? resForRedux : [], 
            response_descriptionQuestion: question.question_type == '1' ? resForRedux : "",
            response_vancyQuestion: question.question_type == '4' ? resForRedux : [],
            response_score: "1"
         } 
        }).then(res=>{
          if(res.data && res.data.addResponse){
            setRepsonseStudent({id: question.id , res: resForRedux});
            setMessage('جواب شما ثبت شد');
            setStatus('1');
            setShowMessage(!showMessage);
            if(questionIndex != questionsLenght -1){
              setTimeout(()=>{
                IncreaseIndexQuestion();
              },1000)
            }else{
              alert('سوالات تمام شده است');
            }
          }else{
            setStatus('0')
            setMessage('جواب شما ثبت نشد')
            setShowMessage(!showMessage);
          }
        }
          )
        console.log('{id: question.id , res: resForRedux}',{id: question.id , res: resForRedux});
    }
    ///////////////////////////////////////////
    const handlePrevQuestion = () =>{
        DecreaseIndexQuestion();
    }
    ///////////////////////////////////////////
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { setResForRedux: setResForRedux ,setResponseDesImage:setResponseDesImage });
        }
        return child;
    });
    ///////////////////////////////////////////
    return(
    <BodyContainer>
        <BodyQuestionBoxWithChildren>
        <BodyQuestionBox>
            {(() => {
              if(question.question_link){
                  return <ImageQuestionMainContainer>
                        <ImageQuestionContainer>
                        <ExplainQuestion number={number} explain={question.question_explain} time={question.question_timeToSolveProblem}/>
                            <ImageQuestion
                            onClick={() =>
                                handleShowPic(question.question_link)
                            }
                            // src={MyPic}
                            src={question.question_link}
                            />
                            
                        </ImageQuestionContainer>
                        <ScoreTag
                        >
                        (نمره {question.question_score})
                        </ScoreTag>
                        
                        
                  </ImageQuestionMainContainer>
              }else{
                if(question.exam_link){
                  return (<QuestionImageContainer>
                    <BodyQDiv>
                      <ExplainQuestion number={number} explain={question.question_explain} time={question.question_timeToSolveProblem}/>
                      <BodyQuestion>
                          {question.question.split('%0A').join('\r\n')}
                          <br/> (
                          {question.question_score} نمره)
                      </BodyQuestion>
                      
                  </BodyQDiv>
                    <ImageWithQuestionContainer>
                    <ImageWithQuestion
                    onClick={() => handleShowPic(question.exam_link)}
                    // src={MyPic2}
                    src={question.exam_link}
                    />
                </ImageWithQuestionContainer>
                </QuestionImageContainer>)
                }else{
                  return (<BodyDiv>
                    <ExplainQuestion number={number} explain={question.question_explain} time={question.question_timeToSolveProblem}/>
                    <BodyQuestion>
                        {question.question.split('%0A').join('\r\n')}
                        <br/> (
                        {question.question_score} نمره)
                    </BodyQuestion>
                  
                  </BodyDiv>)
                  
                }
                  
              }
              
            })()}
            
        </BodyQuestionBox>
        {/* //////////////////////////////////////////////children */}
        {childrenWithProps}
        </BodyQuestionBoxWithChildren>
        {/* /////////////////////////////////footer */}
        <FooterQuestionContainer>
            <FooterBtnsContainer>

                <Tooltip title="سوال بعدی" aria-label="سوال بعدی" style={{ fontSize:'3rem'}} >
                    <FooterBtn 
                    
                    disabled={timeOutSolveQuestions == true ? true : false}
                    //  disabled={questionIndex == questionsLenght -1 ? true :false}
                     onClick={handleNextQuestion}>
                        <ArrowForwardIosIcon style={{ fontSize:'3rem'}} />
                    </FooterBtn>
                </Tooltip>

                <Tooltip title="سوال قبلی" aria-label="سوال قبلی"  style={{ fontSize:'3rem'}} >
                    <FooterBtn 
                     disabled={timeOutSolveQuestions == true ? true : typeIncreaseQuestions == false ? true : questionIndex == 0 ? true :false}
                     onClick={handlePrevQuestion}>
                        <ArrowBackIosIcon style={{ fontSize:'3rem'}} />
                    </FooterBtn>
                </Tooltip>
                
            </FooterBtnsContainer>
        </FooterQuestionContainer>
        {
            showImage ? <ShowImage imageSrc={imageSrc} caption={captionImage} close={showPic} type={type} /> : ''
        }
        {
            showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
        }
    </BodyContainer>
    )
};

const mapStateToProps = createStructuredSelector({
    questionIndex:selectIndex,
    questionsLenght:finalIndex,
    typeIncreaseQuestions: typeIncreaseQuestions,
    timeOutSolveQuestions : timeOutToSolveQuestions,
});

const mapDispatchToProps = dispatch =>({
    IncreaseIndexQuestion: () => dispatch(IncreaseIndex()),
    DecreaseIndexQuestion: () => dispatch(DecreaseIndex()),
    setRepsonseStudent: (item)=> dispatch(setRepsonseStudent(item)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ShowBodyQuestions);