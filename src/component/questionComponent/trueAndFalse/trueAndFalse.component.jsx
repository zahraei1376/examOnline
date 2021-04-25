import React ,{useState , useEffect} from "react";
// import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import {UploadfileToserver} from '../uploadToserver/uploadToserver.component';
// import axios from 'axios';
import MaterialTable , { MTableAction, MTableBodyRow, MTableEditRow } from 'material-table';
import TextField from '@material-ui/core/TextField';
// import {Input,Button, IconButton} from '@material-ui/core';
import {loadVariable} from '../questionComponent';
import { ComparativeButton } from "../Comparative/Comparative.styles";
import BackupIcon from '@material-ui/icons/Backup';
import {connect} from 'react-redux';
import setToggle from '../../../redux/toggleQuesion/toggleQuestion.action';
import MySnackbar from '../../../messageBox/messageBox.component';
// import {ToggleQuestion} from '../../../redux/toggleQuesion/toggleQuestion.selector';
// import { createStructuredSelector} from 'reselect';
// import AddIcon from '@material-ui/icons/Add';
// import BackupIcon from '@material-ui/icons/Backup';
// import {CloudUploadIcon} from '@material-ui/icons';
// var load = false;
/////////////////////////query
import { useQuery ,gql } from 'apollo-boost';
import { useMutation} from 'react-apollo';
import {SET_QUESTION_CHILD ,DELETE_QUESTIONCHILD} from '../../../graphql/resolver';
/////////////////////////query
const graphql_server_uri ='/qraphql';

// const SET_QUESTION_CHILD = gql`
//   mutation addQuestionChild(
//       $userName: String!,
//       $password: String!,
//       $qpId: String!,
//       $question: String!,
//       $question_score: String!,
//       $question_explain: String!,
//       $question_timeToSolveProblem: String!,
//       $question_correctOption: String!,
//       $question_optionOne: String!,
//       $question_optionTwo: String!,
//       $question_optionThree: String!,
//       $question_optionFour: String!,
//       $question_link: String!,
//       $exam_link: String!,
//       $question_type: String!,
//       $question_seqItems: [String]!,
//       $question_vancyItems: String!,
//       $question_compItems: [String]!,
//       ){
//       addQuestionChild(
//         userName: $userName,
//         password: $password,
//         qpId: $qpId,
//         question: $question,
//         question_score: $question_score,
//         question_explain: $question_explain,
//         question_timeToSolveProblem: $question_timeToSolveProblem,
//         question_correctOption: $question_correctOption,
//         question_optionOne: $question_optionOne,
//         question_optionTwo: $question_optionTwo,
//         question_optionThree: $question_optionThree,
//         question_optionFour: $question_optionFour,
//         question_link: $question_link,
//         exam_link: $exam_link,
//         question_type: $question_type,
//         question_seqItems: $question_seqItems,
//         question_vancyItems: $question_vancyItems,
//         question_compItems: $question_compItems,
//       ){
//         id
//       }
//   }
// `;


const TrueAndFalse = ({setToggle ,toggle, ...props}) => {
  // const editActionRef = React.useRef(null);
    const [innerData, setInnerData] = useState([]);
    const [setQuestionChild ,{ QuestionChildData }] = useMutation(SET_QUESTION_CHILD);
    const [deleteQuestionChild ,{ DQuestionChildData }] = useMutation(DELETE_QUESTIONCHILD);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    // const addActionRef = React.useRef();
    /////////////////////////////////////////
    // const [imageQuestion, setImageQuestion] = useState(false);
    // const [QuestionPic, setQuestionPic] = useState(false);
    const [textImage, setTextImage] = useState(false); //pic with text
    const [questionImage, setQuestionImage] = useState(false); //pic instanse text
    const [selectedFile, SetselectedFile] = useState(null);
    const [mimeTypeFile, SetMimeTypeFile] = useState('');
    var format = '';
    ////////////////////////////////////
    useEffect(()=>{

      if(!loadVariable.load){
        loadVariable.load = true;
        // setToggle(true);
        setInnerData(props.rowData);
      }

      return ()=>{
        // if(toggle == true){
        //   setToggle(false);
        // }
        
        loadVariable.load = false;
        // setToggle(false);
      }

    },[]);
    ////////////////////////////////////
    const CheckFile = (myFile) =>{
        var file = myFile;
        var fileName = file.name;
        var fileIdL = fileName.split('.');
        format = fileIdL[fileIdL.length - 1].toLowerCase();
        if (file.size < 10485760) {
            if (format == 'png' || format == 'jpg' || format == 'jpeg') {
            //   SetselectedFile(file);
                var mimetype = '';
                    ///////////////////////////////
                switch (format) {
                case 'jpeg':
                    // JPEG Image
                    mimetype = 'image/jpeg';
                    break;
                case 'jpg':
                    // JPEG Image
                    mimetype = 'image/jpg';
                    break;
                case 'jpgv':
                    // JPGVideo
                    mimetype = 'video/jpeg';
                    break;
                case 'png':
                    // Portable Network Graphics (PNG)
                    mimetype = 'image/png';
                    break;
                default:
                    break;
                }
                SetMimeTypeFile(mimetype);
                return true;
            } else {
              alert('فایل ارسالی باید با فرمت png , jpg  یا jpeg باشد!!!');
              return false;
            }
        } else {
            alert('حجم فایل ارسالی باید کمتر از 10 مگابایت باشد!!!');
            return false;
        }
    }
    ////////////////////////////////////
    const uploadFile = event => {//pic by text
        SetselectedFile(null);
        if (questionImage == true) {
            setQuestionImage(false);
        } else {
            setTextImage(true);
            var file = event.target.files[0];
            // SetselectedFile(null);
            // setQuestionImage(true);
            // setTextImage(false);
            if(CheckFile(file)){
                SetselectedFile(file);
            }
            // var file = event.target.files[0];
            // var fileName = file ?  file.name : '';
            // var fileIdL = fileName ? fileName.split('.') : '';
            // const format = fileIdL[fileIdL.length - 1].toLowerCase();
            // if (file.size < 10485760) {
            //     if (format == 'png' || format == 'jpg' || format == 'jpeg') {
            //         SetselectedFile(file);
            //     } else {
            //         alert('فایل ارسالی باید با فرمت png , jpg  یا jpeg باشد!!!');
            //         // setStatus(0);
            //         // setShowPopup(true);
            //     // setMessage('فایل ارسالی باید با فرمت png , jpg  یا jpeg باشد!!!');
            //     // setStatus(0);
            //     // setShowPopup(true);
            //     }
            // } else {
            //     alert('حجم فایل ارسالی باید کمتر از 10 مگابایت باشد!!!');
            //     // setMessage('حجم فایل ارسالی باید کمتر از 10 مگابایت باشد!!!');
            //     // setStatus(0);
            //     // setShowPopup(true);
            // }
        }
    
        // alert('imageQuestion');
        // alert(imageQuestion);
        // alert('QuestionPic');
        // alert(QuestionPic);
        // SetselectedFileName('');
    };
    //////////////////////////////////////////
    const uploadFileQuestion = event => { //picQuestion
        var file = event.target.files[0];
        SetselectedFile(null);
        setQuestionImage(true);
        setTextImage(false);
        if(CheckFile(file)){
            SetselectedFile(file);
        }
    
        // var file = event.target.files[0];
        // var fileName = event.target.files[0].name;
        // var fileIdL = fileName.split('.');
        // const format = fileIdL[fileIdL.length - 1].toLowerCase();
        // if (file.size < 10485760) {
        //   if (format == 'png' || format == 'jpg' || format == 'jpeg') {
        //     SetselectedFile(file);
        //   } else {
        //     alert('فایل ارسالی باید با فرمت png , jpg  یا jpeg باشد!!!');
        //   }
        // } else {
        //     alert('حجم فایل ارسالی باید کمتر از 10 مگابایت باشد!!!');
        // }
    };
    ////////////////////////////////////
    const [innerColumns, setInnerColumns] = useState([
        // {title:'ردیف',field:'questionID' , editable: 'never'},
        // {
        //   title: 'ردیف', field: 'questionID', textAlign: 'center',
        //   //  render : rowData => rowData && (rowData.tableData.id),
        //   editable: 'never'
        // },
        // {
        //   title: "Custom Add",
        //   field: "internal_action",
        //   editable: false,
        //   render: (rowData) =>
        //     rowData && (
        //       <IconButton
        //         color="secondary"
        //         onClick={() =>
        //           //  setToggle(true),
        //           editActionRef.current.click()
        //           // editActionRef.current.click()
        //         }
        //       >
        //         <BackupIcon />
        //       </IconButton>
        //     )
        // },
        // {
        //   title: "Custom Add",
        //   field: "internal_action",
        //   editable: false,
        //   render: (rowData) =>
        //     rowData && (
        //       <IconButton
        //         color="secondary"
        //         onClick={() => addActionRef.current.click()}
        //       >
        //         <AddIcon />
        //       </IconButton>
        //     )
        // },
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
            <label htmlFor="upload-photo">
                <input
                    style={{ display: 'none' }}
                    // defaultValue=""
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={e => uploadFileQuestion(e)}
                />

                <ComparativeButton variant="contained" component="span">
                    <BackupIcon 
                    // style={{color:'#009688'}}
                     />
                </ComparativeButton>
            </label>
          ),
        },
        {
          title: 'گزینه 1',
          textAlign: 'center',
          field: 'question_optionOne',
          minWidth: 200,
          editComponent: props => (
            <TextField
              style={{ minWidth: '200px' }}
              value={props.value}
              fullWidth={true}
              multiline={true}
              // defaultValue=""
              onChange={e => props.onChange(e.target.value)}
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
                {data.question_optionOne}
              </pre>
            );
          },
        },
        {
          title: 'گزینه 2',
          textAlign: 'center',
          field: 'question_optionTwo',
          minWidth: 200,
          editComponent: props => (
            <TextField
              style={{ minWidth: '200px' }}
              value={props.value}
              // defaultValue=""
              fullWidth={true}
              multiline={true}
              onChange={e => props.onChange(e.target.value)}
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
                {data.question_optionTwo}
              </pre>
            );
          },
        },
        {
          title: 'گزینه صحیح',
          textAlign: 'center',
          field: 'question_correctOption',
          lookup: {
            1: '1',
            2: '2',
          },
          minWidth: 150,
        //   validate: rowData =>
        //     rowData.question_correctOption === '' ? 'Name cannot be empty' : '',
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
                {data.question_correctOption}
              </p>
            );
          },
          // <input type="file" onChange={e => uploadFile(e)} />
        },
        {
          title: 'زمان تقریبی',
          textAlign: 'center',
          field: 'question_timeToSolveProblem',
          minWidth: 150,
        //   validate: rowData =>
        //     rowData.question_timeToSolveProblem !== ''
        //       ? 'Name cannot be empty'
        //       : '',
          render: data => {
            // return moment(data.group_start_time).format('HH:mm:00');
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
        //   validate: rowData =>
        //     rowData.question_score !== '' ? 'Name cannot be empty' : '',
          editComponent: props => (
            <input
              style={{
                minWidth: '50px',
                // border: "2px solid red",
                borderRadius: "4px",
                textAlign: 'center'
              }}
              type="number"
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
            />
          ),
          render: data => {
            // return moment(data.group_start_time).format('HH:mm:00');
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
            // return moment(data.group_start_time).format('HH:mm:00');
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
              // defaultValue=""
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
            // <input type="file" defaultValue="" onChange={e => uploadFile(e)} />
            <label htmlFor="upload-photo">
                <input
                    style={{ display: 'none' }}
                    // defaultValue=""
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={e => uploadFile(e)}
                />

                <ComparativeButton variant="contained" component="span">
                    <BackupIcon 
                    // style={{color:'#009688'}}
                     />
                </ComparativeButton>
            </label>
          ),
        },
        // {
        //   title: "Custom Add",
        //   field: "internal_action",
        //   editable: false,
        //   render: (rowData) =>
        //     rowData && (
        //       <IconButton
        //         color="secondary"
        //         onClick={() => 
        //           editActionRef.current.click()
        //         }
        //       >
        //         <BackupIcon />
        //       </IconButton>
        //     )
        // }
        // {
        //   title: 'عکس',
        //   field: 'news_link',
        //   editComponent: props => (
        //     <input type="file" onChange={e => uploadFile(e)} />
        //   ),
        // },
    ]);
    //////////////////////////////////////////
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
    //////////////////////////////////////////
    const addActionRef = React.useRef();
    return (
      <>
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
            //   backgroundColor: '#eee',
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

        actions={[
          {
            icon: 'delete',
            tooltip: 'حذف',
            // onClick: (event, rowData) => {
              onClick: (event, rowData) => {
              // Do save operation
                const dataDelete = [...innerData];
                const index = rowData.tableData.id;
                dataDelete.splice(index, 1);
                ////////////////////////////////////
              // fetch(graphql_server_uri, {
              //   method: 'POST',
              //   headers: { 'Content-Type': 'application/json' },
              //   body: JSON.stringify({
              //     query: `
              //       mutation{
              //           deleteQuestion(
              //               axamQuestion_input: {
              //                   questionID: "${'1'}"
              //                   axamQuestions_id: "${'1'}"
              //                   question: "${convertText(rowData.question)}"
              //                   question_link: "${rowData.question_link ? rowData.question_link : ''}"
              //                   question_optionOne: "${convertText(rowData.question_optionOne)}"
              //                   question_optionTwo:"${convertText(rowData.question_optionTwo)}"
              //                   question_correctOption: "${rowData.question_correctOption}"
              //                   question_timeToSolveProblem: "${convertText(rowData.question_timeToSolveProblem)}"
              //                   question_score: "${rowData.question_score ? rowData.question_score : ''}"
              //                   question_explane: "${convertText(rowData.question_explane)}"
              //                   exam_link: "${rowData.exam_link ? rowData.exam_link : ''}"
              //             },
              //         ){
              //           axamQuestions_id
              //         }
              //       }                      
              //     `,
              //   }),
              // })
              //   .then(res => res.json())
              //   .then(res => {
              //     // setSumScore(prevState => (prevState - parseFloat(oldScore)));
              //     if (
              //       res.data &&
              //       res.data.deleteQuestion &&
              //       res.data.deleteQuestion.axamQuestions_id
              //     ) {
              //       /////
              //       alert('اطلاعاتی به درستی حذف نشد');
              //       // setStatus(1);
              //       // setShowPopup(true);
              //     } else {
              //       // setQuestionId(data.length)
              //       // setMessage('اطلاعاتی به درستی حذف شد');
              //       // setStatus(0);
              //       // setShowPopup(true);
              //       // refteshData();
              //       //   return res.data;
              //     }
              //     // return res.data;
              //   });
                //////////////////////////////////////////
                setInnerData([...dataDelete]);
                setToggle(false);
            }
          },
          // {
          //   icon: 'edit',
          //   tooltip: 'Edit',
          //   // onClick: (event, rowData) => {
          //     onClick: (event, rowData) => {
          //       setTimeout(() => {
          //         // const dataUpdate = [...innerData];
          //         // const index = rowData.tableData.id;
          //         /////////////myCode
          //         // if (
          //         //     // axamIdProps != '' &&
          //         //     rowData.newData.question_score !== undefined &&
          //         //     rowData.newData.question_correctOption !== undefined
          //         //   ) {
          //         //     if (
          //         //       selectedFile &&
          //         //       ((textImage == true && questionImage == true) ||
          //         //         (questionImage == true && textImage == false))
          //         //     ) {
          //         //       //////////////////////
          //         //       var file = new File(
          //         //         [selectedFile],
          //         //         uuidv4() + `.${format}`,
          //         //         {
          //         //           type: mimeTypeFile,
          //         //         },
          //         //       );
          //         //     //////////////////////////////////////////
          //         //       handleSendToserver();
          //         //       async function handleSendToserver() {
          //         //         var responseCode = await UploadfileToserver(file, format);
          //         //         if (file.name && responseCode) {
          //         //           fetch(graphql_server_uri, {
          //         //             method: 'POST',
          //         //             headers: { 'Content-Type': 'application/json' },
          //         //             body: JSON.stringify({
          //         //               query: `
          //         //                           mutation{
          //         //                               addNewQuestion(
          //         //                                 axamQuestion_input: {
          //         //                                     questionID: "${'1'}"
          //         //                                       axamQuestions_id: "${'1'}"
          //         //                                       question: "${''}"
          //         //                                       question_link: "${file.name
          //         //                 }"
          //         //                                       question_optionOne: "${convertText(rowData.newData.question_optionOne)}"
          //         //                                       question_optionTwo:"${convertText(rowData.newData.question_optionTwo)}"
          //         //                                       question_correctOption: "${rowData.newData.question_correctOption ? rowData.newData.question_correctOption: ''
          //         //                 }"
          //         //                                       question_timeToSolveProblem: "${convertText(rowData.newData.question_timeToSolveProblem)}"
          //         //                                       question_score: "${rowData.newData.question_score ? rowData.newData.question_score : ''
          //         //                 }"
          //         //                                       question_explane: "${convertText(rowData.newData.question_explane)}"
          //         //                                       exam_link: "${''}"
          //         //                               },
          //         //                               axamQuestion_input_old: {
          //         //                                 questionID: "${'1'}"
          //         //                                 axamQuestions_id: "${'1'}"
          //         //                                 question: "${convertText(rowData.oldData.question_optionOne)}"
          //         //                                 question_link: "${convertText(rowData.oldData.question_link)}"
          //         //                                 question_optionOne: "${convertText(rowData.oldData.question_optionOne)}"
          //         //                                 question_optionTwo:"${convertText(rowData.oldData.question_optionTwo)}"
          //         //                                 question_correctOption: "${rowData.oldData.question_correctOption ? rowData.oldData.question_correctOption : ''
          //         //                     }"
          //         //                                 question_timeToSolveProblem: "${convertText(rowData.oldData.question_timeToSolveProblem)}"
          //         //                                 question_score: "${ rowData.oldData.question_score ? rowData.oldData.question_score : ''
          //         //                     }"
          //         //                                 question_explane: "${convertText(rowData.oldData.question_explane)}"
          //         //                                 exam_link: "${rowData.oldData.exam_link}"
          //         //                           }
          //         //                             ){
          //         //                               axamQuestions_id
          //         //                             }
          //         //                           }                      
          //         //                         `,
          //         //             }),
          //         //           })
          //         //             .then(res => res.json())
          //         //             .then(res => {
          //         //               setQuestionImage(false);
          //         //               if (
          //         //                 res.data &&
          //         //                 res.data.addNewQuestion
          //         //                 // &&
          //         //                 // res.data.addNewQuestion.axamQuestions_id
          //         //               ) {
          //         //                 // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
          //         //                 // setQuestionId(data.length)
          //         //                 // setQuestionId(prevState => prevState + 1);
          //         //                 // setMessage('اطلاعاتی به درستی ثبت شد');
          //         //                 // setStatus(0);
          //         //                 // setShowPopup(true);
          //         //                 // refteshData();
          //         //                 // return res.data;
          //         //               } else {
          //         //                 alert('اطلاعاتی به درستی ثبت نشد');
          //         //                 // setStatus(1);
          //         //                 // setShowPopup(true);
          //         //                 // refteshData();
          //         //               }
          //         //             });
          //         //           // return { ...state, data };
          //         //         } else {
          //         //           // setLoading(false);
          //         //           alert('اطلاعاتی به درستی ثبت نشد');
          //         //           // setStatus(1);
          //         //           // setShowPopup(true);
          //         //           // refteshData();
          //         //         }
          //         //       }
          //         //       // });
          //         //     } else if (
          //         //       selectedFile &&
          //         //       questionImage == false &&
          //         //       textImage == true
          //         //     ) {
          //         //       // setState(async(prevState) => {
          //         //       //   const data = [...prevState.data];
          //         //       //   data.push(rowData.newData);
          //         //       // var fileIdL = selectedFile.name.split('.');
          //         //       // const format = fileIdL[fileIdL.length - 1].toLowerCase();
          //         //       // ///////////////
          //         //       // var mimetype = '';
          //         //       // ///////////////////////////////
          //         //       // switch (format) {
          //         //       //   case 'jpeg':
          //         //       //     // JPEG Image
          //         //       //     mimetype = 'image/jpeg';
          //         //       //     break;
          //         //       //   case 'jpg':
          //         //       //     // JPEG Image
          //         //       //     mimetype = 'image/jpg';
          //         //       //     break;
          //         //       //   case 'jpgv':
          //         //       //     // JPGVideo
          //         //       //     mimetype = 'video/jpeg';
          //         //       //     break;
          //         //       //   case 'png':
          //         //       //     // Portable Network Graphics (PNG)
          //         //       //     mimetype = 'image/png';
          //         //       //     break;
          //         //       //   default:
          //         //       //     break;
          //         //       // }
          //         //       //////////////////////
          //         //       var file = new File(
          //         //         [selectedFile],
          //         //         uuidv4() + `.${format}`,
          //         //         {
          //         //           type: mimeTypeFile,
          //         //         },
          //         //       );
    
          //         //       //////////////////////
          //         //       handleSendToserver();
          //         //       async function handleSendToserver() {
          //         //         var responseCode = await UploadfileToserver(file, format);
          //         //         // alert(selectedFileName);
          //         //         if (file.name && responseCode) {
          //         //           fetch(graphql_server_uri, {
          //         //             method: 'POST',
          //         //             headers: { 'Content-Type': 'application/json' },
          //         //             body: JSON.stringify({
          //         //               query: `
          //         //                           mutation{
          //         //                               addNewQuestion(
          //         //                                 axamQuestion_input: {
          //         //                                     questionID: "${'1'}"
          //         //                                       axamQuestions_id: "${'1'}"
          //         //                                       question: "${convertText(rowData.newData.question)}"
          //         //                                       question_link: "${''}"
          //         //                                       question_optionOne: "${convertText(rowData.newData.question_optionOne)}"
          //         //                                       question_optionTwo:"${convertText(rowData.newData.question_optionTwo)}"
          //         //                                       question_correctOption: "${rowData.newData.question_correctOption ? rowData.newData.question_correctOption : ''
          //         //                 }"
          //         //                                       question_timeToSolveProblem: "${convertText(rowData.newData.question_timeToSolveProblem)}"
          //         //                                       question_score: "${rowData.newData.question_score ? rowData.newData.question_score: ''
          //         //                 }"
          //         //                                       question_explane: "${convertText(rowData.newData.question_explane)}"
          //         //                                       exam_link: "${file.name}"
          //         //                               },    axamQuestion_input_old: {
          //         //                                 questionID: "${'1'}"
          //         //                                 axamQuestions_id: "${'1'}"
          //         //                                 question: "${convertText(rowData.oldData.question_optionOne)}"
          //         //                                 question_link: "${convertText(rowData.oldData.question_link)}"
          //         //                                 question_optionOne: "${convertText(rowData.oldData.question_optionOne)}"
          //         //                                 question_optionTwo:"${convertText(rowData.oldData.question_optionTwo)}"
          //         //                                 question_correctOption: "${rowData.oldData.question_correctOption ? rowData.oldData.question_correctOption : ''
          //         //                     }"
          //         //                                 question_timeToSolveProblem: "${convertText(rowData.oldData.question_timeToSolveProblem)}"
          //         //                                 question_score: "${ rowData.oldData.question_score ? rowData.oldData.question_score : ''
          //         //                     }"
          //         //                                 question_explane: "${convertText(rowData.oldData.question_explane)}"
          //         //                                 exam_link: "${rowData.oldData.exam_link}"
          //         //                           }
          //         //                             ){
          //         //                               axamQuestions_id
          //         //                             }
          //         //                           }                      
          //         //                         `,
          //         //             }),
          //         //           })
          //         //             .then(res => res.json())
          //         //             .then(res => {
          //         //               // SetselectedFileName('');
          //         //               // setSumScore(prevState => prevState + parseFloat(newScore));
          //         //               // tesetLoading(false);
          //         //               setTextImage(false);
          //         //               setQuestionImage(false);
          //         //               if (
          //         //                 res.data &&
          //         //                 res.data.addNewQuestion
          //         //                 //  &&
          //         //                 // res.data.addNewQuestion.axamQuestions_id
          //         //               ) {
          //         //                 // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
          //         //                 // setQuestionId(data.length)
          //         //                 // setQuestionId(prevState => prevState + 1);
          //         //                 // setMessage('اطلاعاتی به درستی ثبت شد');
          //         //                 // setStatus(0);
          //         //                 // setShowPopup(true);
          //         //                 // refteshData();
          //         //                 // return res.data;
          //         //               } else {
          //         //                 alert('اطلاعاتی به درستی ثبت نشد');
          //         //                 // setStatus(1);
          //         //                 // setShowPopup(true);
          //         //                 // refteshData();
          //         //               }
          //         //             });
          //         //           // return { ...prevState, data };
          //         //         } else {
          //         //           // setLoading(false);
          //         //           alert('اطلاعاتی به درستی ثبت نشد');
          //         //           // setStatus(1);
          //         //           // setShowPopup(true);
          //         //           // refteshData();
          //         //         }
          //         //         // else{
          //         //         //   alert('نیست!!!!!');
          //         //         // }
          //         //       }
          //         //       // });
          //         //     } else {
                        
          //         //       fetch(graphql_server_uri, {
          //         //         method: 'POST',
          //         //         headers: { 'Content-Type': 'application/json' },
          //         //         body: JSON.stringify({
          //         //           query: `
          //         //                           mutation{
          //         //                               addNewQuestion(
          //         //                                 axamQuestion_input: {
          //         //                                     questionID: "${'1'}"
          //         //                                       axamQuestions_id: "${'1'}"
          //         //                                       question: "${convertText(rowData.newData.question)}"
          //         //                                       question_link: "${''}"
          //         //                                       question_optionOne: "${convertText(rowData.newData.question_optionOne)}"
          //         //                                       question_optionTwo:"${convertText(rowData.newData.question_optionTwo)}"
          //         //                                       question_correctOption: "${rowData.newData.question_correctOption ? rowData.newData.question_correctOption : ''
          //         //             }"
          //         //                                       question_timeToSolveProblem: "${convertText(rowData.newData.question_timeToSolveProblem)}"
          //         //                                       question_score: "${rowData.newData.question_score ? rowData.newData.question_score : ''
          //         //             }"
          //         //                                       question_explane: "${convertText(rowData.newData.question_explane)}"
          //         //                                       exam_link: "${''}"
          //         //                               },    axamQuestion_input_old: {
          //         //                                 questionID: "${'1'}"
          //         //                                 axamQuestions_id: "${'1'}"
          //         //                                 question: "${convertText(rowData.oldData.question_optionOne)}"
          //         //                                 question_link: "${convertText(rowData.oldData.question_link)}"
          //         //                                 question_optionOne: "${convertText(rowData.oldData.question_optionOne)}"
          //         //                                 question_optionTwo:"${convertText(rowData.oldData.question_optionTwo)}"
          //         //                                 question_correctOption: "${rowData.oldData.question_correctOption ? rowData.oldData.question_correctOption : ''
          //         //                     }"
          //         //                                 question_timeToSolveProblem: "${convertText(rowData.oldData.question_timeToSolveProblem)}"
          //         //                                 question_score: "${ rowData.oldData.question_score ? rowData.oldData.question_score : ''
          //         //                     }"
          //         //                                 question_explane: "${convertText(rowData.oldData.question_explane)}"
          //         //                                 exam_link: "${rowData.oldData.exam_link}"
          //         //                           }
          //         //                             ){
          //         //                               axamQuestions_id
          //         //                             }
          //         //                           }                      
          //         //                         `,
          //         //         }),
          //         //       })
          //         //         .then(res => res.json())
          //         //         .then(res => {
          //         //           // SetselectedFileName('');
          //         //           // setLoading(false);
          //         //           setTextImage(false);
          //         //           setQuestionImage(false);
          //         //           // setSumScore(prevState => prevState + parseFloat(newScore));
          //         //           if (
          //         //             res.data &&
          //         //             res.data.addNewQuestion
          //         //             // &&
          //         //             // res.data.addNewQuestion.axamQuestions_id
          //         //           ) {
          //         //             // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
          //         //             // setQuestionId(data.length)
          //         //             // setQuestionId(prevState => prevState + 1);
          //         //             // setMessage('اطلاعاتی به درستی ثبت شد');
          //         //             // setStatus(0);
          //         //             // setShowPopup(true);
          //         //             // refteshData();
          //         //             // return res.data;
          //         //           } else {
          //         //             alert('اطلاعاتی به درستی ثبت نشد');
          //         //             // setStatus(1);
          //         //             // setShowPopup(true);
          //         //             // refteshData();
          //         //           }
          //         //           // return res.data;
          //         //         });
          //         //       // return { ...prevState, data };
          //         //       // });
          //         //     }
          //         //   } else {
          //         //     // setLoading(false);
          //         //     setTextImage(false);
          //         //     setQuestionImage(false);
          //         //     alert('ابتدا فیلد های موردنظر را پر کنید!!');
          //         //     // setStatus(1);
          //         //     // setShowPopup(true);
          //         //     // refteshData();
          //         //   }
          //         ////////////////////////////
          //         // dataUpdate[index] = rowData.newData;
          //         // setInnerData([...dataUpdate]);
          //         // setToggle(false)
    
          //         // resolve(setToggle(false));
          //         // reject(setToggle(true));
          //       }, 1000)
          //       setToggle(true);
                      
                      
          //   }
          // },
         
        ]}

        editable={{
         //////////////////////////////////////////
          onRowUpdateCancelled: rowData => {
          loadVariable.load = true;
          // setToggle(false);
          console.log('onRowUpdateCancelled',loadVariable.load);
          },
        //////////////////////////////////////////
           onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              if(props.rowData && props.rowData.length > 0 && props.rowData[0].qpId ){
                setTimeout(() => {
                  // const dataUpdate = [...innerData];
                  // const index = oldData.tableData.id;
                  /////////////myCode
                  if (
                      newData.question_correctOption !== undefined
                    ) {
                      if (
                        selectedFile &&
                        ((textImage == true && questionImage == true) ||
                          (questionImage == true && textImage == false))
                      ) {
                        //////////////////////
                        var file = new File(
                          [selectedFile],
                          uuidv4() + `.${format}`,
                          {
                            type: mimeTypeFile,
                          },
                        );
                      //////////////////////////////////////////
                        handleSendToserver();
                        async function handleSendToserver() {
                          var responseCode = await UploadfileToserver(file, format);
                          if (file.name && responseCode) {
                            setQuestionChild({ variables: { 
                              userName: "211", 
                              password: "211", 
                              qpId: props.rowData[0].qpId,
                              question: "", 
                              question_score: newData.question_score ? newData.question_score : '', 
                              question_explain: convertText(newData.question_explane),
                              question_timeToSolveProblem: convertText(newData.question_timeToSolveProblem), 
                              question_correctOption: newData.question_correctOption ? newData.question_correctOption: '', 
                              question_optionOne: convertText(newData.question_optionOne),
                              question_optionTwo: convertText(newData.question_optionTwo),
                              question_optionThree: convertText(newData.question_optionThree),
                              question_optionFour: convertText(newData.question_optionFour),
                              question_link: file.name,
                              exam_link: "", 
                              question_type: props.typeQuestion,
                              question_seqItems: [],
                              question_vancyItems: "", 
                              question_compItems: []
                              } 
                            }).then(res=>{
                              if(res.data && res.data.addQuestionChild){
                                setQuestionImage(false);
                                setMessage('ثبت شد');
                                setStatus('1');
                                setShowMessage(!showMessage);
                              }else{
                                setStatus('0')
                                setMessage('ثبت نشد')
                                setShowMessage(!showMessage);
                              }
                            })
                          } else {
                            // alert('اطلاعاتی به درستی ثبت نشد');
                            setStatus('0')
                            setMessage('اطلاعاتی به درستی ثبت نشد')
                            setShowMessage(!showMessage);
                          }
                        }
                      } else if (
                        selectedFile &&
                        questionImage == false &&
                        textImage == true
                      ) {
                        //////////////////////
                        var file = new File(
                          [selectedFile],
                          uuidv4() + `.${format}`,
                          {
                            type: mimeTypeFile,
                          },
                        );
    
                        //////////////////////
                        handleSendToserver();
                        async function handleSendToserver() {
                          var responseCode = await UploadfileToserver(file, format);
                          if (file.name && responseCode){
                            setQuestionChild({ variables: { 
                              userName: "211", 
                              password: "211", 
                              qpId: props.rowData[0].qpId,
                              question: convertText(newData.question), 
                              question_score: newData.question_score ? newData.question_score : '', 
                              question_explain: convertText(newData.question_explane),
                              question_timeToSolveProblem: convertText(newData.question_timeToSolveProblem), 
                              question_correctOption: newData.question_correctOption ? newData.question_correctOption: '', 
                              question_optionOne: convertText(newData.question_optionOne),
                              question_optionTwo: convertText(newData.question_optionTwo),
                              question_optionThree: convertText(newData.question_optionThree),
                              question_optionFour: convertText(newData.question_optionFour),
                              question_link: "",
                              exam_link: file.name, 
                              question_type: props.typeQuestion,
                              question_seqItems: [],
                              question_vancyItems: "", 
                              question_compItems: []
                              } 
                            }).then(res=>{
                              if(res.data && res.data.addQuestionChild){
                                setTextImage(false);
                                setQuestionImage(false);
                                setMessage('ثبت شد');
                                setStatus('1');
                                setShowMessage(!showMessage);
                              }else{
                                setStatus('0')
                                setMessage('ثبت نشد')
                                setShowMessage(!showMessage);
                              }
                            })
                          }else {
                            // alert('اطلاعاتی به درستی ثبت نشد');
                            setStatus('0')
                            setMessage('اطلاعاتی به درستی ثبت نشد')
                            setShowMessage(!showMessage);
                          }
                        }
                      } else {
                        setQuestionChild({ variables: { 
                          userName: "211", 
                          password: "211", 
                          qpId: props.rowData[0].qpId,
                          question: convertText(newData.question), 
                          question_score: newData.question_score ? newData.question_score : '', 
                          question_explain: convertText(newData.question_explane),
                          question_timeToSolveProblem: convertText(newData.question_timeToSolveProblem), 
                          question_correctOption: newData.question_correctOption ? newData.question_correctOption: '', 
                          question_optionOne: convertText(newData.question_optionOne),
                          question_optionTwo: convertText(newData.question_optionTwo),
                          question_optionThree: convertText(newData.question_optionThree),
                          question_optionFour: convertText(newData.question_optionFour),
                          question_link: "",
                          exam_link: "", 
                          question_type: props.typeQuestion,
                          question_seqItems: [],
                          question_vancyItems: "", 
                          question_compItems: []
                          } 
                        }).then(res=>{
                          if(res.data && res.data.addQuestionChild){
                            setMessage('ثبت شد');
                                setStatus('1');
                                setShowMessage(!showMessage);
                              }else{
                                setStatus('0')
                                setMessage('ثبت نشد')
                                setShowMessage(!showMessage);
                              }
                        })
                      }
                     
                    } else {
                      setTextImage(false);
                      setQuestionImage(false);
                      alert('ابتدا فیلد های موردنظر را پر کنید!!');
                    }
                  ////////////////////////////
                  // dataUpdate[index] = newData;
                  // setInnerData([...dataUpdate]);
                  props.handleFetchData();
                      // console.log('idEdit', newData);
                  resolve();
                  // reject(loadVariable.load = false);
                }, 1000)
              }else{
                setStatus('0')
                setMessage('خطایی رخ داده است!!!')
                setShowMessage(!showMessage);
                resolve();
              }
           }),



            //////////////////
          // onRowDelete: oldData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       const dataDelete = [...innerData];
          //       const index = oldData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setInnerData([...dataDelete]);
  
          //       resolve();
          //     }, 1000)
          //   }),
        }}
      /> : ''}
      {
            showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
          }
      </>
    )
};

// export default TrueAndFalse;
const mapDispatchToProps = dispatch =>({
  setToggle: toggle => dispatch(setToggle(toggle)),
});

const mapStateToProps = state =>({
  toggle : state.toggle.toggle,
})

export default connect(mapStateToProps,mapDispatchToProps)(TrueAndFalse);