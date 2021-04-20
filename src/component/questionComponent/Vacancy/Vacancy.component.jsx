//جای خالی

import React ,{useState , useEffect} from "react";
// import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import {UploadfileToserver} from '../uploadToserver/uploadToserver.component';
// import axios from 'axios';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
// import {Input,Button} from '@material-ui/core';
import {loadVariable} from '../questionComponent';
import VacancyModal from './VacancyModal.component';
import {ComparativeButton} from '../Comparative/Comparative.styles';
// import AddIcon from '@material-ui/icons/Add';
import BackupIcon from '@material-ui/icons/Backup';
import {connect} from 'react-redux';
import setToggle from '../../../redux/toggleQuesion/toggleQuestion.action';
import MySnackbar from '../../../messageBox/messageBox.component';
// import {ToggleQuestion} from '../../../redux/toggleQuesion/toggleQuestion.selector';
// import { createStructuredSelector} from 'reselect';
// import {CloudUploadIcon} from '@material-ui/icons';
// var load = false;
/////////////////////////query
import { useQuery ,gql } from 'apollo-boost';
import { useMutation} from 'react-apollo';
import {SET_QUESTION_CHILD} from '../../../graphql/resolver';
/////////////////////////query
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
const graphql_server_uri ='/qraphql';

const Vacancy = ({setToggle , ...props}) => {
    const [innerData, setInnerData] = useState([]);
    const [setQuestionChild ,{ QuestionChildData }] = useMutation(SET_QUESTION_CHILD);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    /////////////////////////////////////////
    // const [imageQuestion, setImageQuestion] = useState(false);
    // const [QuestionPic, setQuestionPic] = useState(false);
    const [textImage, setTextImage] = useState(false); //pic with text
    const [questionImage, setQuestionImage] = useState(false); //pic instanse text
    const [selectedFile, SetselectedFile] = useState(null);
    const [mimeTypeFile, SetMimeTypeFile] = useState('');
    const [clieckedButton, setClieckedButton] = useState(false);
    
    var format = '';

    useEffect(()=>{

      if(!loadVariable.load){
        loadVariable.load = true;
        // setToggle(true);
        setInnerData(props.rowData);
      }

      return ()=>{
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

    //////////////////////////////////////////
    const [innerColumns, setInnerColumns] = useState([
        // {title:'ردیف',field:'questionID' , editable: 'never'},
        // {
        //   title: 'ردیف', field: 'questionID', textAlign: 'center',
        //   //  render : rowData => rowData && (rowData.tableData.id),
        //   editable: 'never'
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
        // {
        //   title: 'گزینه 1',
        //   textAlign: 'center',
        //   field: 'question_optionOne',
        //   minWidth: 200,
        //   editComponent: props => (
        //     <TextField
        //       style={{ minWidth: '200px' }}
        //       value={props.value}
        //       fullWidth={true}
        //       multiline={true}
        //       defaultValue=""
        //       onChange={e => props.onChange(e.target.value)}
        //     />
        //   ),
        //   render: data => {
        //     return (
        //       <pre
        //         style={{
        //           fontSize: '20px',
        //           wordBreak: 'break-word',
        //           overflowWrap: 'break-word',
        //           whiteSpace: 'pre-wrap',
        //           textAlign: 'center',
        //           width: '200px',
        //           fontFamily: 'BNazanin',
        //           fontSize: 16,
        //         }}
        //       >
        //         {data.question_optionOne}
        //       </pre>
        //     );
        //   },
        // },
        // {
        //   title: 'گزینه 2',
        //   textAlign: 'center',
        //   field: 'question_optionTwo',
        //   minWidth: 200,
        //   editComponent: props => (
        //     <TextField
        //       style={{ minWidth: '200px' }}
        //       value={props.value}
        //       defaultValue=""
        //       fullWidth={true}
        //       multiline={true}
        //       onChange={e => props.onChange(e.target.value)}
        //     />
        //   ),
        //   render: data => {
        //     return (
        //       <pre
        //         style={{
        //           fontSize: '20px',
        //           wordBreak: 'break-word',
        //           overflowWrap: 'break-word',
        //           whiteSpace: 'pre-wrap',
        //           textAlign: 'center',
        //           width: '200px',
        //           fontFamily: 'BNazanin',
        //           fontSize: 16,
        //         }}
        //       >
        //         {data.question_optionTwo}
        //       </pre>
        //     );
        //   },
        // },
        // {
        //   title: 'گزینه 3',
        //   textAlign: 'center',
        //   field: 'question_optionThree',
        //   minWidth: 200,
        //   editComponent: props => (
        //     <TextField
        //       style={{ minWidth: '200px' }}
        //       value={props.value}
        //       fullWidth={true}
        //       multiline={true}
        //       defaultValue=""
        //       onChange={e => props.onChange(e.target.value)}
        //     />
        //   ),
        //   render: data => {
        //     // fontFamily: 'BNazanin',
        //     // return moment(data.group_start_time).format('HH:mm:00');
        //     return (
        //       <pre
        //         style={{
        //           fontSize: '20px',
        //           wordBreak: 'break-word',
        //           overflowWrap: 'break-word',
        //           whiteSpace: 'pre-wrap',
        //           textAlign: 'center',
        //           width: '200px',
        //           fontFamily: 'BNazanin',
        //           fontSize: 16,
        //         }}
        //       >
        //         {data.question_optionThree}
        //       </pre>
        //     );
        //   },
        // },
        // {
        //   title: 'گزینه 4',
        //   textAlign: 'center',
        //   field: 'question_optionFour',
        //   minWidth: 200,
        //   editComponent: props => (
        //     <TextField
        //       style={{ minWidth: '200px' }}
        //       value={props.value}
        //       fullWidth={true}
        //       multiline={true}
        //       defaultValue=""
        //       onChange={e => props.onChange(e.target.value)}
        //     />
        //   ),
        //   render: data => {
        //     // return moment(data.group_start_time).format('HH:mm:00');
        //     return (
        //       <pre
        //         style={{
        //           fontSize: '20px',
        //           wordBreak: 'break-word',
        //           overflowWrap: 'break-word',
        //           whiteSpace: 'pre-wrap',
        //           textAlign: 'center',
        //           width: '200px',
        //           fontFamily: 'BNazanin',
        //           fontSize: 16,
        //         }}
        //       >
        //         {data.question_optionFour}
        //       </pre>
        //     );
        //   },
        // },
        // {
        //   title: 'گزینه صحیح',
        //   textAlign: 'center',
        //   field: 'question_correctOption',
        //   lookup: {
        //     1: '1',
        //     2: '2',
        //     3: '3',
        //     4: '4',
        //   },
        //   minWidth: 150,
        // //   validate: rowData =>
        // //     rowData.question_correctOption === '' ? 'Name cannot be empty' : '',
        //   render: data => {
        //     return (
        //       <p
        //         style={{
        //           fontFamily: 'BNazanin',
        //           fontSize: 16,
        //           textAlign: 'center',
        //           width: '50px',
        //         }}
        //       >
        //         {data.question_correctOption}
        //       </p>
        //     );
        //   },
        //   // <input type="file" onChange={e => uploadFile(e)} />
        // },
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
        {
          title: 'آیتم ها',
          type: 'numeric',
          textAlign: 'center',
          field: 'question__items',
          minWidth: 150,
        //   validate: rowData =>
        //     rowData.question_score !== '' ? 'Name cannot be empty' : '',
          editComponent: props => (
            <VacancyModal vancyValue={props.rowData.question_vancyItems} />
            
          ),
          render: data => {
            // return moment(data.group_start_time).format('HH:mm:00');
            return (
            //   <input
            //   style={{
            //     minWidth: '50px',
            //     // border: "2px solid red",
            //     borderRadius: "4px",
            //     textAlign: 'center'
            //   }}
            //   type="number"
            //   value={props.value}
            //   onChange={e => props.onChange(e.target.value)}
            // />
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
        // {
        //   title: 'عکس',
        //   field: 'news_link',
        //   editComponent: props => (
        //     <input type="file" onChange={e => uploadFile(e)} />
        //   ),
        // },
      ]);
    //   const [data, setData] = useState([]);
      ////////////////////////////////////////////////

  
    // const [innerColumns, setInnerColumns] = useState([
    //   {
    //     title: 'questionID', field: 'questionID',
    //     // editComponent: props => (
    //     //   <input
    //     //     type="text"
    //     //     value={props.value}
    //     //     onChange={e => props.onChange(e.target.value)}
    //     //   />
    //     // )
    //   },
    //   { title: 'axamQuestions_id', field: 'axamQuestions_id' },
    //   { title: 'question', field: 'question' },
    //   ///////////////////////////////////////
    //   // { title: 'Surname', field: 'surname' },
    //   // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //   // {
    //   //   title: 'Birth Place',
    //   //   field: 'birthCity',
    //   //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //   // },
    // ]);

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
              //                   question_optionThree: "${convertText(rowData.question_optionThree)}"
              //                   question_optionFour: "${convertText(rowData.question_optionFour)}"
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
                setToggle(false);
                setInnerData([...dataDelete]);
            }
          },
          // {
          //   icon: 'edit',
          //   tooltip: 'ویرایش',
          //   onClick: (event, rowData) => {
          //     // Do save operation
          //       const dataDelete = [...innerData];
          //       const index = rowData.tableData.id;
          //       dataDelete.splice(index, 1);
          //       setInnerData([...dataDelete]);
          //   }
          // }
        ]}
        
        editable={{
         //////////////////////////////////////////
         onRowUpdateCancelled: rowData => {
          loadVariable.load = true;
          console.log('onRowUpdateCancelled',loadVariable.load);
        },
        //////////////////////////////////////////
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...innerData];
                const index = oldData.tableData.id;
                /////////////myCode
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
                        qpId: "607d2f582cf63c244015d278",
                        question: "", 
                        question_score: newData.question_score ? newData.question_score : '', 
                        question_explain: convertText(newData.question_explane),
                        question_timeToSolveProblem: convertText(newData.question_timeToSolveProblem), 
                        question_correctOption: "", 
                        question_optionOne: "",
                        question_optionTwo: "",
                        question_optionThree: "",
                        question_optionFour: "",
                        question_link: file.name,
                        exam_link: "", 
                        question_type: "5",
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
                    if (file.name && responseCode) {
                      setQuestionChild({ variables: { 
                        userName: "211", 
                        password: "211", 
                        qpId: "607d2f582cf63c244015d278",
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
                        exam_link: file.name, 
                        question_type: "5",
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
                    } else {
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
                    qpId: "607d2f582cf63c244015d278",
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
                    question_type: "5",
                    question_seqItems: [],
                    question_vancyItems: "", 
                    question_compItems: [],
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
                ////////////////////////////
                dataUpdate[index] = newData;
                setInnerData([...dataUpdate]);
  
                resolve(setToggle(false));
              }, 1000)
            }),
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
      {clieckedButton ? <VacancyModal/> : ''}
      {
            showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
          }
      </div>
    )
};

// export default Vacancy;
const mapDispatchToProps = dispatch =>({
  setToggle: toggle => dispatch(setToggle(toggle)),
});

export default connect(null,mapDispatchToProps)(Vacancy);