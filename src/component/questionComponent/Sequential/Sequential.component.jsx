//ترتیبی 
import React ,{useState , useEffect} from "react";
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import {loadVariable} from '../questionComponent';
import SequentialModal from './SequentialModal.component';
import {connect} from 'react-redux';
import setToggle from '../../../redux/toggleQuesion/toggleQuestion.action';
import MySnackbar from '../../../messageBox/messageBox.component';
/////////////////////////query
import { useMutation} from 'react-apollo';
import {SET_QUESTION_CHILD ,DELETE_QUESTIONCHILD , SendRequestQuestionChild} from '../../../graphql/resolver';
/////////////////////////query
import {selectedCourseName} from '../../../redux/questionsCourses/questionsCourses.selector';
import { createStructuredSelector } from 'reselect';
/////////////////////////////////////////
import UploaderQuestionsImage from '../uploaderQuestionsImage/uploaderQuestionsImage.component';

const Sequential = ({setToggle ,courseName, ...props}) => {
    const [innerData, setInnerData] = useState([]);
    const [setQuestionChild ,{ QuestionChildData }] = useMutation(SET_QUESTION_CHILD);
    const [deleteQuestionChild ,{ DQuestionChildData }] = useMutation(DELETE_QUESTIONCHILD);
    const [seqItems,setSeqItems] = useState([]);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    /////////////////////////////////////////
    const [clieckedButton, setClieckedButton] = useState(false);
    //////////////////////////////////////////
    const [selectedFile, SetselectedFile] = useState(null);
    const [selectedFileName, SetselectedFileName] = useState(null);
    ///////////////////////////////////////////
    
    useEffect(()=>{

      if(!loadVariable.load){
        loadVariable.load = true;
        setInnerData(props.rowData);
      }

      return ()=>{
        loadVariable.load = false;
      }

    },[]);
    ////////////////////////////////////
    const handleSetSeqItems =(sq) =>{
      setSeqItems(sq);
    }
    /////////////////////////////////
    const handleGetFileName = (fn) =>{
      SetselectedFileName(fn)
    }
    //////////////////////////////////////////
    const [innerColumns, setInnerColumns] = useState([
        {
          title: 'سوال',
          field: 'question',
          textAlign: 'center',
          minWidth: 500,
          // emptyValue
          editComponent: props => (
            <TextField
              style={{ minWidth: '500px', textAlign:'right',direction:'rtl' }}
              value={props.value}
              // defaultValue=""
              fullWidth={true}
              multiline={true}
            //   var newQuestion = newData.question
            //             ? newData.question.split('\r\n').join('%0A')
            //             : '';
            //           var newQuestion2 = newQuestion
            //             ? newQuestion.split('\n').join('%0A')
            //             : '';
              onChange={e => {props.onChange(e.target.value)}}
            />
          ),
          render: data => {
            // return moment(data.group_start_time).format('HH:mm:00');
            return (
              <pre
                style={{
                  fontSize: '20px',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  textAlign: 'center',
                  width: '500px',
                  fontFamily: 'BNazanin',
                  fontSize: 16,
                }}
              >
                {data.question}
              </pre>
            );
          },
        },
        {
          title: 'عکس سوال',
          field: 'question_link',
          textAlign: 'center',
          defaultFilter: '',
          minWidth: 150,
          render: rowData =>rowData.question_link ? <img src={rowData.question_link} style={{width: 40, borderRadius: '50%'}}/> :'',
          editComponent: props => (
            <UploaderQuestionsImage 
            fileId = {`question_link${props.rowData.id}`}
            handleGetFileName={handleGetFileName}
            SetselectedFile={SetselectedFile}
          />
            // <label htmlFor="upload-photo">
            //     <input
            //         style={{ display: 'none' }}
            //         defaultValue=""
            //         id="upload-photo"
            //         name="upload-photo"
            //         type="file"
            //         onChange={e => uploadFileQuestion(e)}
            //     />

            //     <ComparativeButton variant="contained" component="span">
            //         <BackupIcon/>
            //     </ComparativeButton>
            // </label>
          ),
        },
        {
          title: 'زمان تقریبی',
          textAlign: 'center',
          field: 'question_timeToSolveProblem',
          minWidth: 150,
          render: data => {
            return (
              <p
                style={{
                  fontFamily: 'BNazanin',
                  fontSize: 16,
                  textAlign: 'center',
                  width: '50px',
                }}
              >
                {data.question_timeToSolveProblem}
              </p>
            );
          },
        },
        {
          title: 'نمره',
          type: 'numeric',
          textAlign: 'center',
          field: 'question_score',
          editComponent: props => (
            <input
              style={{
                minWidth: '50px',
                borderRadius: "4px",
                textAlign: 'center'
              }}
              type="number"
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
            />
          ),
          render: data => {
            return (
              <p
                style={{
                  fontFamily: 'BNazanin',
                  fontSize: 16,
                  textAlign: 'center',
                  width: '50px',
                }}
              >
                {data.question_score}
              </p>
            );
          },
        },
        {
          title: 'توضیحات',
          textAlign: 'center',
          field: 'question_explane',
          render: data => {
            return (
              <pre
                style={{
                  fontSize: '20px',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  textAlign: 'center',
                  width: '200px',
                  fontFamily: 'BNazanin',
                  fontSize: 16,
                }}
              >
                {data.question_explane}
              </pre>
            );
          },
          editComponent: props => (
            <TextField
              style={{ minWidth: '200px' }}
              value={props.value}
              fullWidth={true}
              multiline={true}
              onChange={e => props.onChange(e.target.value)}
            />
          ),
        },
        {
          title: 'عکس',
          field: 'exam_link',
          textAlign: 'center',
          defaultFilter: '',
          render: rowData => rowData.exam_link ? <img src={rowData.exam_link} style={{width: 40, borderRadius: '50%'}}/> : '',
          editComponent: props => (
            <UploaderQuestionsImage 
              fileId = {`exam_link${props.rowData.id}`}
              handleGetFileName={handleGetFileName}
              SetselectedFile={SetselectedFile}
            />
          ),
        },
        {
          title: 'آیتم ها',
          type: 'numeric',
          textAlign: 'center',
          field: 'question__items',
          minWidth: 150,
          editComponent: props => (
            <SequentialModal 
              handleSetSeqItems={handleSetSeqItems}
              existSeqItems={props.rowData.question_SeqItems}
            />
          ),
          render: data => {
            return (
            <pre
                style={{
                  fontSize: '20px',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  textAlign: 'center',
                  width: '200px',
                  fontFamily: 'BNazanin',
                  fontSize: 16,
                }}
              >
                گزینه ها
              </pre>
            );
          },
        },
    ]);
    ////////////////////////////////////////////////
    function convertText(text){
      var new1Text = text
      ? text.split('\r\n').join('%0A')
      : text;
      var new2Text = new1Text
      ? new1Text.split('\n').join('%0A')
      : new1Text;
      var new3Text = new2Text
      ? new2Text.split('"').join("'")
      : '';

      return new3Text;
    }
  ////////////////////////////////////////////////
    return (
      <div>
      {innerData.length > 0 ? <MaterialTable style={{boxShadow: '0 3px 3px rgba(0,0,0,.4'}}
        title=""
        columns={innerColumns}
        data={innerData}
        options={{
          pageSize: 1,
          
          pageSizeOptions: [1,],
          sorting: true,
          paging: false,
            search: false,
            toolbar:false,
            cellStyle: {
              color: '#000'
            },
            headerStyle: {
              backgroundColor: '#009688',
              color:'#fff',
              textAlign:'center',
            },
            rowStyle:{
              backgroundColor: '#fff',
            }
            
          }}

          // actions={[
          //   {
          //     icon: 'delete',
          //     tooltip: 'حذف',
          //     onClick: async(event, rowData) => {
          //       if(props.rowData && props.rowData.length > 0 && props.rowData[0].id){
          //         const dataDelete = [...innerData];
          //         const index = rowData.tableData.id;
          //         console.log('id', props.rowData[0].id);
          //         await deleteQuestionChild({ variables: { 
          //           userName: "211",
          //           password: "211",
          //           id: props.rowData[0].id
          //           } 
          //         }).then(res=>{
          //           if(res.data && res.data.deleteQuestionChild){
          //             props.handleFetchData();
          //           }else{
          //             props.handleFetchData();
          //           }
          //         })
          //         dataDelete.splice(index, 1);
          //         setInnerData([...dataDelete]);
          //       }else{
          //         setStatus('0')
          //         setMessage('اطلاعاتی برای حذف وجود ندارد!!!')
          //         setShowMessage(!showMessage);
          //       }
                 
          //     }
          //   },
          // ]}
        editable={{
           //////////////////////////////////
           onRowUpdateBefore: () =>
           new Promise((resolve, reject) => {
             setToggle(true);
             resolve();
           }),
         //////////////////////////////////////////
          onRowUpdateCancelled: rowData => {
            loadVariable.load = true;
            setToggle(true);
          },
          //////////////////////////////////////////
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              if(courseName != ''){
                if(props.rowData && props.rowData.length > 0 && props.rowData[0].qpId ){
                  setTimeout(async() => {
                    /////////////myCode
                    if (
                      selectedFile && selectedFile == "picInsteadText"
                    ) {
                       //////////////////////////////////////////
                       var questionData = { 
                          userName: "211", 
                          password: "211", 
                          qpId: props.rowData[0].qpId,
                          examChildId:courseName,
                          question: "", 
                          question_score: newData.question_score ? newData.question_score : '', 
                          question_explain: convertText(newData.question_explane),
                          question_timeToSolveProblem: convertText(newData.question_timeToSolveProblem), 
                          question_correctOption: "", 
                          question_optionOne: "",
                          question_optionTwo: "",
                          question_optionThree: "",
                          question_optionFour: "",
                          question_link: "https://s3.ir-thr-at1.arvanstorage.com/raysa/" + selectedFileName,
                          exam_link: "", 
                          question_type: props.typeQuestion,
                          question_seqItems: seqItems,
                          question_vancyItems: "", 
                          question_compItems: []
                      } 

                      console.log(`question_link${props.rowData[0].id}`);
                      
                      var callBack = await SendRequestQuestionChild(questionData , `question_link${props.rowData[0].id}` , selectedFileName ,setQuestionChild);
                      console.log('callBack',callBack);  
                      if(callBack && callBack.err === false){
                        SetselectedFile(null);
                        SetselectedFileName(null);
                        setMessage(callBack.message);
                        setStatus('1');
                        setShowMessage(!showMessage);
                        resolve();
                        props.handleFetchData();
                      }else if (callBack && callBack.err === true){
                        setStatus('0')
                        setMessage(callBack.message)
                        setShowMessage(!showMessage);
                        reject();
                      }else{
                        setStatus('0')
                        setMessage('خطایی رخ داده است!!!');
                        setShowMessage(!showMessage);
                        reject();
                      }
                      ////////////////////////////////////////////
                    } else if (
                      selectedFile && selectedFile == "picWithText"
                    ) {
                      ////////////////////////////////////////////
                       var questionData = { 
                          userName: "211", 
                          password: "211", 
                          qpId: props.rowData[0].qpId,
                          examChildId:courseName,
                          question: convertText(newData.question), 
                          question_score: newData.question_score ? newData.question_score : '', 
                          question_explain: convertText(newData.question_explane),
                          question_timeToSolveProblem: convertText(newData.question_timeToSolveProblem), 
                          question_correctOption: "", 
                          question_optionOne: "",
                          question_optionTwo: "",
                          question_optionThree: "",
                          question_optionFour: "",
                          question_link: "",
                          exam_link:"https://s3.ir-thr-at1.arvanstorage.com/raysa/" + selectedFileName,
                          question_type: props.typeQuestion,
                          question_seqItems: seqItems,
                          question_vancyItems: "", 
                          question_compItems: []
                      } 
                      
                      var callBack = await SendRequestQuestionChild(questionData , `exam_link${props.rowData[0].id}`, selectedFileName ,setQuestionChild);
                        if(callBack && callBack.err === false){
                          SetselectedFile(null);
                          SetselectedFileName(null);
                          setMessage(callBack.message);
                          setStatus('1');
                          setShowMessage(!showMessage);
                          resolve();
                          props.handleFetchData();
                        }else if (callBack && callBack.err === true){
                          setStatus('0')
                          setMessage(callBack.message)
                          setShowMessage(!showMessage);
                          reject();
                        }
                        else{
                          setStatus('0')
                          setMessage('خطایی رخ داده است!!!');
                          setShowMessage(!showMessage);
                          reject();
                        }
                      ////////////////////////////////////////////////
                    } else {
                       ////////////////////////////////////////////
                       var questionData = { 
                        userName: "211", 
                        password: "211", 
                        qpId: props.rowData[0].qpId,
                        examChildId:courseName,
                        question: convertText(newData.question), 
                        question_score: newData.question_score ? newData.question_score : '', 
                        question_explain: convertText(newData.question_explane),
                        question_timeToSolveProblem: convertText(newData.question_timeToSolveProblem), 
                        question_correctOption: "", 
                        question_optionOne: "",
                        question_optionTwo: "",
                        question_optionThree: "",
                        question_optionFour: "",
                        question_link: "",
                        exam_link: "", 
                        question_type: props.typeQuestion,
                        question_seqItems: seqItems,
                        question_vancyItems: "", 
                        question_compItems: [],
                      } 
                      
                      var callBack = await SendRequestQuestionChild(questionData , '', selectedFileName ,setQuestionChild);
                      if(callBack && callBack.err === false){
                        SetselectedFile(null);
                        SetselectedFileName(null);
                        setMessage(callBack.message);
                        setStatus('1');
                        setShowMessage(!showMessage);
                        resolve();
                        props.handleFetchData();
                      }else if (callBack && callBack.err === true){
                        setStatus('0')
                        setMessage(callBack.message)
                        setShowMessage(!showMessage);
                        reject();
                      }
                    }
                    ///////////////////////////////////////////////////
                  }, 1000)
                }else{
                  setStatus('0')
                  setMessage('خطایی رخ داده است!!!')
                  setShowMessage(!showMessage);
                  reject();
                }
              }else{
                setStatus('0')
                setMessage('ابتدا درس را انتخاب کنید!!!');
                setShowMessage(!showMessage);
                reject();
              }
            
              //////////////
              setToggle(false);
          }),
          //////////////////////////////////////////
          onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                  setTimeout(async() => {
                      // const dataDelete = [...data];
                      // const index = oldData.tableData.id;
                      // dataDelete.splice(index, 1);
                      // setData([...dataDelete]);
                      ///////////////////////////////
                      if(props.rowData && props.rowData.length > 0 && props.rowData[0].id){
                        // const dataDelete = [...innerData];
                        // const index = rowData.tableData.id;
                        console.log('id', props.rowData[0].id);
                        await deleteQuestionChild({ variables: { 
                          userName: "211",
                          password: "211",
                          id: props.rowData[0].id
                          } 
                        }).then(res=>{
                          if(res.data && res.data.deleteQuestionChild){
                            props.handleFetchData();
                          }else{
                            props.handleFetchData();
                          }
                        })
                        // dataDelete.splice(index, 1);
                        // setInnerData([...dataDelete]);
                      }else{
                        setStatus('0')
                        setMessage('اطلاعاتی برای حذف وجود ندارد!!!')
                        setShowMessage(!showMessage);
                      }

                      resolve();
                  }, 1000);
          })
        }}
      /> : ''}
      {clieckedButton ? <SequentialModal/> : ''}
      {
            showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
          }
      </div>
    )
};

const mapDispatchToProps = dispatch =>({
  setToggle: toggle => dispatch(setToggle(toggle)),
});

const mapStateToProps = createStructuredSelector({
  courseName : selectedCourseName,
});

export default connect(mapStateToProps,mapDispatchToProps)(Sequential);