import React ,{ useState ,useEffect } from 'react';
import { QuestionInfoContainer ,QuestionInfoUpload, QuestionInfoGroup ,QuestionInfoLabel,QuestionInfoCourseName ,QuestionInfoInput ,BtnOk} from './questionInfo.styles';
import Uploader from '../../uploader';
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
    useEffect(()=>{
        console.log('course',course.group && course.group.length > 0 ? course.group[0] : '');
        setMyFileId(course.group && course.group.length > 0 ? course.group[0] : '')
    },[])

    useEffect(()=>{
        console.log('MyFileId',MyFileId);
        // setMyFileId(course.group && course.group.length > 0 ? course.group[0] : '')
    },[MyFileId])

    const sendInfo = () =>{
        const SendFilePromise = new Promise((resolve, reject) => {
            
            var myForm = document.getElementById(`myForm${MyFileId}`);
            if(myForm){
                console.log('myForm', myForm);
                // console.log('myForm',`myForm${MyFileId}`);
                document.getElementById(`myForm${MyFileId}`).submit();
                // return 'ok';
                resolve();
            }
            // document.getElementById(`myForm${MyFileId}`).submit();
            // resolve();
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
                    // console.log('data',data);
                    setMessage('اطلاعات ثبت شد');
                    setStatus('1');
                    setShowMessage(!showMessage);
                  }else{
                    // console.log('data',data);
                    setStatus('0')
                    setMessage('اطلاعات ثبت نشد')
                    setShowMessage(!showMessage);
                  }
                })
            },3000);
            
        })
        .catch(err =>{
            console.log('err');
            // alert(err);
        });
       
        // await addExamChildInfo({ variables: { 
        //     userName: "211",
        //     password: "211",
        //     id: course.group,
        //     examChild_falseCoefficient : negativeCoefficient,
        //     examChild_courseCoefficient : coefficient,
        //     examChild_pdf: fileName,
        //  }
        //   }).then(res=>{
        //     if(res.data && res.data.addExamChildInfo){
        //       // console.log('data',data);
        //       setMessage('اطلاعات ثبت شد');
        //       setStatus('1');
        //       setShowMessage(!showMessage);
        //     }else{
        //       // console.log('data',data);
        //       setStatus('0')
        //       setMessage('اطلاعات ثبت نشد')
        //       setShowMessage(!showMessage);
        //     }
        //   })
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
                    // myForm${fileId}
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

// export default QuestionInfo;

const mapStateToProps = createStructuredSelector({
    selectedEPId:selectedExamParentId,
  });
  
  export default connect(mapStateToProps)(QuestionInfo);