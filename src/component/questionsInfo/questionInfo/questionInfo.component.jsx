import React ,{ useState ,useEffect } from 'react';
import { QuestionInfoContainer ,QuestionInfoUpload, QuestionInfoGroup ,QuestionInfoLabel,QuestionInfoCourseName ,QuestionInfoInput ,BtnOk} from './questionInfo.styles';
import UploaderQuestionsFile from '../uploaderQuestionsFile/uploaderQuestionsFile.component';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
///////////////////////
import {connect} from 'react-redux';
import { createStructuredSelector} from 'reselect';
/////////////////////////////
import MySnackbar from '../../../messageBox/messageBox.component';
/////////////////////////////////
import {selectedCourseName ,selectedExamParentId} from '../../../redux/questionsCourses/questionsCourses.selector';
//////////////////////////////query
import { useMutation} from 'react-apollo';
import {SET_INFO_EXAMCHILD} from '../../../graphql/resolver';
//////////////////////////////////////
const QuestionInfo = ({course ,selectedEPId}) => {
    const [addExamChildInfo ,{ data }] = useMutation(SET_INFO_EXAMCHILD);
    ///////////////////////////////////////
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    //////////////////////////////////////////
    const [fileName , setFileName ] = useState('');
    const [coefficient , setCoefficient ] = useState(1);
    const [negativeCoefficient , setNegativeCoefficient ] = useState(0);
    //////////////////////////////////////////
    const [MyFileId,setMyFileId] = useState('');
    ////////////////////////////////////////////
    const [canSend , SetCanSend] = useState(true);
    useEffect(()=>{
        console.log('course',course.group && course.group.length > 0 ? course.group[0] : '');
        setMyFileId(course.group && course.group.length > 0 ? course.group[0] : '')
    },[])

    const sendInfo = () =>{
        const SendFilePromise = new Promise((resolve, reject) => {
            
            var myForm = document.getElementById(`myForm${MyFileId}`);
            if(myForm){
                if(!!canSend){
                    document.getElementById(`myForm${MyFileId}`).submit();
                    resolve();
                }else{
                    reject(new Error("فایل درستی را امتخاب کنید!!!"));
                }
                
            }
        });

        SendFilePromise
        .then( handleResolvedA => {
            console.log('handleResolvedA' , fileName);
            var dataexam = {
                userName: "211",
                password: "211",
                examChild_epId:selectedEPId,
                gId: course.group,
                examChild_falseCoefficient : negativeCoefficient,
                examChild_courseCoefficient : coefficient,
                examChild_pdf: fileName,
            }
            console.log('dataexam',dataexam);
            setTimeout(()=>{
                addExamChildInfo({ variables: dataexam
                }).then(res=>{
                  console.log('res.data.addExamChildInfo',res.data);
                  if(res.data && res.data.updateExamChild){
                    setMessage('اطلاعات ثبت شد');
                    setStatus('1');
                    setShowMessage(!showMessage);
                  }else{
                    setStatus('0')
                    setMessage('اطلاعات ثبت نشد')
                    setShowMessage(!showMessage);
                  }
                })
            },3000);
            
        })
        .catch(err =>{
            console.log(err);
            setStatus('0')
            // setMessage(err)
            setShowMessage(!showMessage);
        });
    }

    const handleGetFileName = (fileName) => {
        console.log('fileName2' , fileName);
        setFileName(fileName);
    }

    return (
        <>
            <QuestionInfoContainer>
                <QuestionInfoUpload>
                    <UploaderQuestionsFile 
                    handleGetFileName={handleGetFileName} 
                    fileId={MyFileId}
                    SetCanSend={SetCanSend}
                    />
                </QuestionInfoUpload>
                
                <QuestionInfoGroup>
                    <QuestionInfoCourseName>
                        {course.course}
                    </QuestionInfoCourseName>
                    
                </QuestionInfoGroup>
                <QuestionInfoGroup>
                    <QuestionInfoLabel>ضریب درس</QuestionInfoLabel>
                    <QuestionInfoInput type="number" onChange={e => setCoefficient(e.target.value)} />
                </QuestionInfoGroup>
                <QuestionInfoGroup>
                    <QuestionInfoLabel>ضریب منفی</QuestionInfoLabel>
                    <QuestionInfoInput type="number" onChange={e => setNegativeCoefficient(e.target.value)}/>
                </QuestionInfoGroup>
                <Tooltip title="تایید" aria-label="تایید"  style={{ fontSize:'3rem'}} >
                    <BtnOk 
                        onClick={sendInfo}
                    >
                        <DoneIcon style={{ fontSize:'3rem'}} />
                    </BtnOk>
                </Tooltip>
            
            </QuestionInfoContainer>
            {
                showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
            }
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    selectedEPId:selectedExamParentId,
});
  
export default connect(mapStateToProps)(QuestionInfo);