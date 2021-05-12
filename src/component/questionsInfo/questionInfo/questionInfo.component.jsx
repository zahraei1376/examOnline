import React ,{ useState ,useEffect } from 'react';
import { QuestionInfoContainer ,QuestionInfoUpload, QuestionInfoGroup ,
    QuestionInfoLabel,QuestionInfoCourseName ,QuestionInfoInput ,BtnOk,MyTextField,
    QuestionNameContainer ,QuestionExteraInfo} from './questionInfo.styles';
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
import MySpinner from '../../MySpinner/MySpinner.component';
/////////////////////////////////////
const QuestionInfo = ({course ,selectedEPId}) => {
    const [addExamChildInfo ,{ data }] = useMutation(SET_INFO_EXAMCHILD);
    ///////////////////////////////////////
    const [loading,setLoading] = useState(false);
    /////////////////////////
    const [clicked,setClicked] = useState(false);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    //////////////////////////////////////////
    const [fileName , setFileName ] = useState('');
    const [coefficient , setCoefficient ] = useState('');
    const [negativeCoefficient , setNegativeCoefficient ] = useState('');
    //////////////////////////////////////////
    const [MyFileId,setMyFileId] = useState('');
    ////////////////////////////////////////////
    const [canSend , SetCanSend] = useState(true);
    useEffect(()=>{
        console.log('course',course.group && course.group.length > 0 ? course.group[0] : '');
        setMyFileId(course.group && course.group.length > 0 ? course.group[0] : '')
    },[])

    const sendInfo = () =>{
        setClicked(true);
        setLoading(true);
        const SendFilePromise = new Promise((resolve, reject) => {
            if(fileName != ''){
                var myForm = document.getElementById(`myForm${MyFileId}`);
                if(myForm){
                    if(!!canSend){
                        document.getElementById(`myForm${MyFileId}`).submit();
                        resolve();
                    }else{
                        reject();
                        // reject(new Error("فایل درستی را امتخاب کنید!!!"));
                    }
                    
                }
            }else{
                resolve();
            }
        });

        SendFilePromise
        .then( handleResolvedA => {

            var dataExam = {
                userName: "211",
                password: "211",
                examChild_epId:selectedEPId,
                gId: course.group,
                // examChild_falseCoefficient : negativeCoefficient,
                // examChild_courseCoefficient : coefficient,
                // examChild_pdf: fileName,
            }

            if(negativeCoefficient != ''){
                dataExam.examChild_falseCoefficient = negativeCoefficient;
            }
            if(coefficient != ''){
                dataExam.examChild_courseCoefficient = coefficient;
            }
            if(fileName != ''){
                dataExam.examChild_pdf = fileName;
            }
            console.log('handleResolvedA' , fileName);
           
            console.log('dataExam',dataExam);
            setTimeout(()=>{
                addExamChildInfo({ variables: dataExam
                }).then(res=>{
                  console.log('res.data.addExamChildInfo',res.data);
                  if(res.data && res.data.updateExamChild){
                    setMessage('اطلاعات ثبت شد');
                    setStatus('1');
                    setShowMessage(!showMessage);
                    setClicked(false);
                    setLoading(false);
                  }else{
                    setStatus('0')
                    setMessage('اطلاعات ثبت نشد')
                    setShowMessage(!showMessage);
                    setClicked(false);
                    setLoading(false);
                  }
                })
            },3000);
            
        })
        .catch(err =>{
            console.log(err);
            setStatus('0')
            // setMessage(err)
            setShowMessage(!showMessage);
            setClicked(false);
            setLoading(false);
        });
    }

    const handleGetFileName = (fileName) => {
        console.log('fileName2' , fileName);
        setFileName(fileName);
    }

    return (
        <>
            <QuestionInfoContainer>
                <QuestionNameContainer>
                    {/* <QuestionInfoGroup> */}
                        <QuestionInfoCourseName>
                            {course.course}
                        </QuestionInfoCourseName>
                        {loading ? <MySpinner/> : ''}
                    {/* </QuestionInfoGroup> */}
                </QuestionNameContainer>
                <QuestionExteraInfo>
                    <QuestionInfoUpload>
                        <UploaderQuestionsFile 
                            handleGetFileName={handleGetFileName} 
                            fileId={MyFileId}
                            SetCanSend={SetCanSend}
                        />
                    </QuestionInfoUpload>
                
                
                    <QuestionInfoGroup>
                        <MyTextField id="standard-basic" type="number" label="ضریب درس" onChange={e => setCoefficient(e.target.value)} />
                        {/* <QuestionInfoLabel>ضریب درس</QuestionInfoLabel>
                        <QuestionInfoInput type="number" onChange={e => setCoefficient(e.target.value)} /> */}
                    </QuestionInfoGroup>
                    <QuestionInfoGroup>
                        <MyTextField id="standard-basic" type="number" label="ضریب منفی" onChange={e => setNegativeCoefficient(e.target.value)} />
                        {/* <QuestionInfoLabel>ضریب منفی</QuestionInfoLabel>
                        <QuestionInfoInput type="number" onChange={e => setNegativeCoefficient(e.target.value)} /> */}
                    </QuestionInfoGroup>
                    <Tooltip title="تایید" aria-label="تایید"  style={{ fontSize:'3rem'}} >
                        {/* <BtnOk 
                            onClick={sendInfo}
                        >
                            <DoneIcon style={{ fontSize:'3rem'}} />
                        </BtnOk> */}
                        <BtnOk variant="outlined" color="primary" onClick={sendInfo} disabled={clicked}>
                            <DoneIcon style={{ fontSize:'3rem'}} />
                        </BtnOk>
                    </Tooltip>
            
                </QuestionExteraInfo>
                
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