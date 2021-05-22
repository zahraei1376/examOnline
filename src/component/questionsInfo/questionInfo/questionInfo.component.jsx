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
import { useQuery ,useMutation} from 'react-apollo';
import {SET_INFO_EXAMCHILD} from '../../../graphql/resolver';
//////////////////////////////////////
import MySpinner from '../../MySpinner/MySpinner.component';
import { Link } from 'react-router-dom';
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
    const[examChildPdf,setExamChildPdf] = useState('');
    //////////////////////////////////////////
    const [MyFileId,setMyFileId] = useState('');
    const [QuesionInfoDataState,setQuesionInfoDataState] = useState('');
    ////////////////////////////////////////////
    const [canSend , SetCanSend] = useState(true);
    useEffect(()=>{
        console.log('selectedEPId',selectedEPId);
        console.log('course.group ? course.group : ',course.group ? course.group : '');
        console.log('course.coefficient',course.coefficient);
        setExamChildPdf(course.examChild_pdf);
        setCoefficient(course.coefficient);
        setNegativeCoefficient(course.negativeCoefficient);
        setMyFileId(course.group && course.group.length > 0 ? course.group[0] : '')
    },[course])

    // useEffect(()=>{
    //     console.log('QuesionInfoData',QuesionInfoData);
    //     setQuesionInfoDataState(QuesionInfoData && QuesionInfoData.examParents && QuesionInfoData.examParents.length > 0 ? QuesionInfoData.examParents[0].examChildByGId[0] : '');
    // },[QuesionInfoData])

    // useEffect(()=>{
    //     setCoefficient(QuesionInfoDataState.examChild_courseCoefficient);
    //     setNegativeCoefficient(QuesionInfoDataState.examChild_falseCoefficient);
    //     setQuesionInfoDataState(QuesionInfoData && QuesionInfoData.examParents && QuesionInfoData.examParents.length > 0 ? QuesionInfoData.examParents[0].examChildByGId[0] : '');
    // },[QuesionInfoDataState])

    //////////////////
    // examChild_falseCoefficient
    //   examChild_courseCoefficient
    //   examChild_pdf
    //   /////////////////////

    const sendInfo = () =>{
        setClicked(true);
        setLoading(true);
        const SendFilePromise = new Promise((resolve, reject) => {
            if(fileName != ''){
                console.log('exist file');
                var myForm = document.getElementById(`myForm${MyFileId}`);
                if(myForm){
                    console.log('canSendcanSend',canSend);
                    if(!!canSend){
                        document.getElementById(`myForm${MyFileId}`).submit();
                        resolve();
                    }else{
                        // setFileName('');
                        // document.getElementById(`uploadPhotoAws${MyFileId}`).value='';
                        reject("فایل درستی را امتخاب کنید!!!");
                        // reject(new Error("فایل درستی را امتخاب کنید!!!"));
                    }
                    
                }
            }else{
                console.log('not file');
                // reject("فایل درستی را امتخاب کنید!!!");
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
                dataExam.examChild_pdf = `https://s3.ir-thr-at1.arvanstorage.com/raysa/${fileName}`;
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
            },5000);
            
        })
        .catch(err =>{
            console.log(err);
            setStatus('0')
            setMessage(err)
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
                {/* <QuestionNameContainer>
                        <QuestionInfoCourseName>
                            {course.course}
                        </QuestionInfoCourseName>
                        {
                            examChildPdf ? <a href = {examChildPdf}>لینک</a> : ''
                        }
                        
                        {loading ? <MySpinner/> : ''}
                </QuestionNameContainer> */}
                <QuestionExteraInfo>

                    <QuestionInfoGroup>
                        <QuestionInfoCourseName>
                            {course.course}
                        </QuestionInfoCourseName>
                        {/* {
                            examChildPdf ? <a href = {examChildPdf}>لینک</a> : ''
                        } */}
                        
                        {/* {loading ? <MySpinner/> : ''} */}
                    </QuestionInfoGroup>
                    <QuestionInfoUpload>
                        <UploaderQuestionsFile 
                            handleGetFileName={handleGetFileName} 
                            fileId={MyFileId}
                            SetCanSend={SetCanSend}
                        />
                    </QuestionInfoUpload>
                
                
                    <QuestionInfoGroup>
                        <MyTextField id="standard-basic" style={{textAlign:'center'}} type="number" label="ضریب درس" value={coefficient} onChange={e => setCoefficient(e.target.value)} />
                        {/* <QuestionInfoLabel>ضریب درس</QuestionInfoLabel>
                        <QuestionInfoInput type="number" onChange={e => setCoefficient(e.target.value)} /> */}
                    </QuestionInfoGroup>
                    <QuestionInfoGroup>
                        <MyTextField id="standard-basic" style={{textAlign:'center'}} type="number" label="ضریب منفی" value={negativeCoefficient} onChange={e => setNegativeCoefficient(e.target.value)} />
                        {/* <QuestionInfoLabel>ضریب منفی</QuestionInfoLabel>
                        <QuestionInfoInput type="number" onChange={e => setNegativeCoefficient(e.target.value)} /> */}
                    </QuestionInfoGroup>
                    <QuestionInfoGroup>
                        <Tooltip title="تایید" aria-label="تایید"  style={{ fontSize:'3rem'}} >
                        {/* <BtnOk 
                            onClick={sendInfo}
                        >
                            <DoneIcon style={{ fontSize:'3rem'}} />
                        </BtnOk> */}
                        {/* <BtnOk variant="outlined" color="primary" onClick={sendInfo} disabled={clicked}>
                            <DoneIcon style={{ fontSize:'3rem'}} />
                        </BtnOk> */}
                        <BtnOk onClick={sendInfo} disabled={clicked}>
                            <DoneIcon style={{ fontSize:'3rem',marginTop:'2px'}} />
                        </BtnOk>
                    </Tooltip>
                    {loading ? <MySpinner/> : ''}
                    </QuestionInfoGroup>
                    
            
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