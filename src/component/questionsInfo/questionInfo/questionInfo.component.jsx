import React ,{ useState } from 'react';
import { QuestionInfoContainer ,QuestionInfoUpload, QuestionInfoGroup ,QuestionInfoLabel,QuestionInfoCourseName ,QuestionInfoInput ,BtnOk} from './questionInfo.styles';
import Uploader from '../../uploader';
import UploaderQuestionsFile from '../uploaderQuestionsFile/uploaderQuestionsFile.component';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
/////////////////////////////
import MySnackbar from '../../../messageBox/messageBox.component';
//////////////////////////////query
import { useMutation} from 'react-apollo';
import {SET_INFO_EXAMCHILD} from '../../../graphql/resolver';
//////////////////////////////////////
const QuestionInfo = ({course}) => {
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
    const sendInfo = async() =>{
        await addExamChildInfo({ variables: { 
            userName: "211", 
            password: "211", 
         }
          }).then(res=>{
            if(res.data && res.data.addExamChildInfo){
              // console.log('data',data);
              setMessage('امتحان ثبت شد');
              setStatus('1');
              setShowMessage(!showMessage);
            }else{
              // console.log('data',data);
              setStatus('0')
              setMessage('امتحان ثبت نشد')
              setShowMessage(!showMessage);
            }
          })
    }

    const handleGetFileName = (fileName) => {
        setFileName(fileName);
    }

    return (
        <QuestionInfoContainer>
            <QuestionInfoUpload>
                <UploaderQuestionsFile handleGetFileName={handleGetFileName} />
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
            {
                showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
            }
        </QuestionInfoContainer>
    )
};

export default QuestionInfo;