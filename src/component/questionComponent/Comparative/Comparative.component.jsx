
//تطبیقی

import React ,{useState , useEffect} from "react";
// import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import {UploadfileToserver} from '../uploadToserver/uploadToserver.component';
// import axios from 'axios';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import {ComparativeButton} from './Comparative.styles';
// import {Input,Button} from '@material-ui/core';
import {loadVariable} from '../questionComponent';
import ComparativeModal from './ComparativeModal.component';
// import DeleteIcon from '../../../assets/img/iconDelete.png';
import BackupIcon from '@material-ui/icons/Backup';
import {connect} from 'react-redux';
import setToggle from '../../../redux/toggleQuesion/toggleQuestion.action';
/////////////////edit
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _objectSpread2 = _interopRequireDefault(
  require("@babel/runtime/helpers/objectSpread")
);
// import {ToggleQuestion} from '../../../redux/toggleQuesion/toggleQuestion.selector';
// import { createStructuredSelector} from 'reselect';
//////////////////////
// import AddIcon from '@material-ui/icons/Add';
// import BackupIcon from '@material-ui/icons/Backup';
// import {CloudUploadIcon} from '@material-ui/icons';
// var load = false;
const graphql_server_uri ='/qraphql';

const Comparative = ({setToggle , ...props}) => {
    const [innerData, setInnerData] = useState([]);
    /////////////////////////////////////////
    // const [imageQuestion, setImageQuestion] = useState(false);
    // const [QuestionPic, setQuestionPic] = useState(false);
    const tableRef = React.useRef(null);
    const [textImage, setTextImage] = useState(false); //pic with text
    const [questionImage, setQuestionImage] = useState(false); //pic instanse text
    const [selectedFile, SetselectedFile] = useState(null);
    const [mimeTypeFile, SetMimeTypeFile] = useState('');
    const [clieckedButton, setClieckedButton] = useState(false);
    const [Temp, setTemp] = useState(false);
    
    useEffect(()=>{
      console.log('Temp', Temp);
      setToggle(Temp);
    },[Temp])
    var format = '';

    useEffect(()=>{

      // loadVariable.disable = true;
      

      if(!loadVariable.load){
        loadVariable.load = true;
        // setToggle(true);
        setInnerData(props.rowData);
      }

      return ()=>{
        loadVariable.load = false;
        // setToggle(false);
        // loadVariable.disable = false;
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
                  fontSize: '16px',
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
          editComponent: props => (
            <label htmlFor="upload-photo" style={{textAlign:'center'}}>
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
        //   field: 'question__optionOne',
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
        //         {data.question__optionOne}
        //       </pre>
        //     );
        //   },
        // },
        // {
        //   title: 'گزینه 2',
        //   textAlign: 'center',
        //   field: 'question__optionTwo',
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
        //         {data.question__optionTwo}
        //       </pre>
        //     );
        //   },
        // },
        // {
        //   title: 'گزینه 3',
        //   textAlign: 'center',
        //   field: 'question__optionTree',
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
        //         {data.question__optionTree}
        //       </pre>
        //     );
        //   },
        // },
        // {
        //   title: 'گزینه 4',
        //   textAlign: 'center',
        //   field: 'question__optionFour',
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
        //         {data.question__optionFour}
        //       </pre>
        //     );
        //   },
        // },
        // {
        //   title: 'گزینه صحیح',
        //   textAlign: 'center',
        //   field: 'question__currentOption',
        //   lookup: {
        //     1: '1',
        //     2: '2',
        //     3: '3',
        //     4: '4',
        //   },
        //   minWidth: 150,
        // //   validate: rowData =>
        // //     rowData.question__currentOption === '' ? 'Name cannot be empty' : '',
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
        //         {data.question__currentOption}
        //       </p>
        //     );
        //   },
        //   // <input type="file" onChange={e => uploadFile(e)} />
        // },
        {
          title: 'زمان تقریبی',
          textAlign: 'center',
          field: 'question__timeTosolveProblem',
          minWidth: 150,
        //   validate: rowData =>
        //     rowData.question__timeTosolveProblem !== ''
        //       ? 'Name cannot be empty'
        //       : '',
          render: data => {
            // return moment(data.group_start_time).format('HH:mm:00');
            return (
              <p
                style={{
                  fontFamily: 'BNazanin',
                  fontSize: '16px',
                  textAlign: 'center',
                  width: '50px',
                }}
              >
                {data.question__timeTosolveProblem}
              </p>
            );
          },
        },
        {
          title: 'نمره',
          type: 'numeric',
          textAlign: 'center',
          field: 'question__score',
        //   validate: rowData =>
        //     rowData.question__score !== '' ? 'Name cannot be empty' : '',
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
                  fontSize: '16px',
                  textAlign: 'center',
                  width: '50px',
                }}
              >
                {data.question__score}
              </p>
            );
          },
        },
        {
          title: 'توضیحات',
          textAlign: 'center',
          field: 'question__explane',
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
                  fontSize: '16px',
                }}
              >
                {data.question__explane}
              </pre>
            );
          },
          editComponent: props => (
            <TextField
              style={{ minWidth: '200px' }}
              value={props.value}
              fullWidth={true}
              multiline={true}
              defaultValue=""
              onChange={e => props.onChange(e.target.value)}
            />
          ),
        },
        {
          title: 'عکس',
          field: 'exam_link',
          textAlign: 'center',
          defaultFilter: '',
          editComponent: props => (
            // <input type="file" defaultValue="" onChange={e => uploadFile(e)} />
            <label htmlFor="upload-photo"  style={{textAlign:'center'}}>
                <input
                    style={{ display: 'none' }}
                    defaultValue=""
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
        //     rowData.question__score !== '' ? 'Name cannot be empty' : '',
          editComponent: props => (
            <ComparativeModal/>
            
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
                  fontSize: '16px',
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
        tableRef={tableRef}
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
              //                   question__optionOne: "${convertText(rowData.question__optionOne)}"
              //                   question__optionTwo:"${convertText(rowData.question__optionTwo)}"
              //                   question__optionTree: "${convertText(rowData.question__optionTree)}"
              //                   question__optionFour: "${convertText(rowData.question__optionFour)}"
              //                   question__currentOption: "${rowData.question__currentOption}"
              //                   question__timeTosolveProblem: "${convertText(rowData.question__timeTosolveProblem)}"
              //                   question__score: "${rowData.question__score ? rowData.question__score : ''}"
              //                   question__explane: "${convertText(rowData.question__explane)}"
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
          {
            icon: "edit",
            tooltip: "ویرایش",
            onClick: (event, rowData) => {
              console.log("RRRRRRRRR", rowData);
              setTemp(true);
              // setTemp1(true);
              tableRef.current.dataManager.changeRowEditing(rowData, "update");
  
              tableRef.current.setState(
                (0, _objectSpread2["default"])(
                  {},
                  tableRef.current.dataManager.getRenderState(),
                  {
                    showAddRow: false,
                  }
                )
              );
            },
          },
        ]}
        editable={{

          onRowUpdateCancelled: rowData => {
            loadVariable.load = true;
            setToggle(false);
            // loadVariable.disable = false;
            console.log('onRowUpdateCancelled',loadVariable.load);
            // console.log('loadVariable.disable',loadVariable.disable);
          },

          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve, reject) => {
              
          //     // loadVariable.disable = false;
          //     setTimeout(() => {
          //       const dataUpdate = [...innerData];
          //       const index = oldData.tableData.id;
          //       // setToggle(false);
          //       /////////////myCode
          //       if (
          //           // axamIdProps != '' &&
          //           newData.question__score !== undefined &&
          //           newData.question__currentOption !== undefined
          //         ) {
          //           if (
          //             selectedFile &&
          //             ((textImage == true && questionImage == true) ||
          //               (questionImage == true && textImage == false))
          //           ) {
          //             //////////////////////
          //             var file = new File(
          //               [selectedFile],
          //               uuidv4() + `.${format}`,
          //               {
          //                 type: mimeTypeFile,
          //               },
          //             );
          //           //////////////////////////////////////////
          //             handleSendToserver();
          //             async function handleSendToserver() {
          //               var responseCode = await UploadfileToserver(file, format);
          //               if (file.name && responseCode) {
          //                 fetch(graphql_server_uri, {
          //                   method: 'POST',
          //                   headers: { 'Content-Type': 'application/json' },
          //                   body: JSON.stringify({
          //                     query: `
          //                                 mutation{
          //                                     addNewQuestion(
          //                                       axamQuestion_input: {
          //                                           questionID: "${'1'}"
          //                                             axamQuestions_id: "${'1'}"
          //                                             question: "${''}"
          //                                             question_link: "${file.name
          //                       }"
          //                                             question__optionOne: "${convertText(newData.question__optionOne)}"
          //                                             question__optionTwo:"${convertText(newData.question__optionTwo)}"
          //                                             question__currentOption: "${newData.question__currentOption ? newData.question__currentOption: ''
          //                       }"
          //                                           question__optionTree: "${convertText(newData.question__optionTree)}"
          //                                           question__optionFour: "${convertText(newData.question__optionFour)}"
          //                                             question__timeTosolveProblem: "${convertText(newData.question__timeTosolveProblem)}"
          //                                             question__score: "${newData.question__score ? newData.question__score : ''
          //                       }"
          //                                             question__explane: "${convertText(newData.question__explane)}"
          //                                             exam_link: "${''}"
          //                                     },
          //                                     axamQuestion_input_old: {
          //                                       questionID: "${'1'}"
          //                                       axamQuestions_id: "${'1'}"
          //                                       question: "${convertText(oldData.question__optionOne)}"
          //                                       question_link: "${convertText(oldData.question_link)}"
          //                                       question__optionOne: "${convertText(oldData.question__optionOne)}"
          //                                       question__optionTwo:"${convertText(oldData.question__optionTwo)}"
          //                                       question__optionTree: "${convertText(oldData.question__optionTree)}"
          //                                       question__optionFour: "${convertText(oldData.question__optionFour)}"
          //                                       question__currentOption: "${oldData.question__currentOption ? oldData.question__currentOption : ''
          //                           }"
          //                                       question__timeTosolveProblem: "${convertText(oldData.question__timeTosolveProblem)}"
          //                                       question__score: "${ oldData.question__score ? oldData.question__score : ''
          //                           }"
          //                                       question__explane: "${convertText(oldData.question__explane)}"
          //                                       exam_link: "${oldData.exam_link}"
          //                                 }
          //                                   ){
          //                                     axamQuestions_id
          //                                   }
          //                                 }                      
          //                               `,
          //                   }),
          //                 })
          //                   .then(res => res.json())
          //                   .then(res => {
          //                     setQuestionImage(false);
          //                     if (
          //                       res.data &&
          //                       res.data.addNewQuestion
          //                       // &&
          //                       // res.data.addNewQuestion.axamQuestions_id
          //                     ) {
          //                       // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
          //                       // setQuestionId(data.length)
          //                       // setQuestionId(prevState => prevState + 1);
          //                       // setMessage('اطلاعاتی به درستی ثبت شد');
          //                       // setStatus(0);
          //                       // setShowPopup(true);
          //                       // refteshData();
          //                       // return res.data;
          //                     } else {
          //                       alert('اطلاعاتی به درستی ثبت نشد');
          //                       // setStatus(1);
          //                       // setShowPopup(true);
          //                       // refteshData();
          //                     }
          //                   });
          //                 // return { ...state, data };
          //               } else {
          //                 // setLoading(false);
          //                 alert('اطلاعاتی به درستی ثبت نشد');
          //                 // setStatus(1);
          //                 // setShowPopup(true);
          //                 // refteshData();
          //               }
          //             }
          //             // });
          //           } else if (
          //             selectedFile &&
          //             questionImage == false &&
          //             textImage == true
          //           ) {
          //             // setState(async(prevState) => {
          //             //   const data = [...prevState.data];
          //             //   data.push(newData);
          //             // var fileIdL = selectedFile.name.split('.');
          //             // const format = fileIdL[fileIdL.length - 1].toLowerCase();
          //             // ///////////////
          //             // var mimetype = '';
          //             // ///////////////////////////////
          //             // switch (format) {
          //             //   case 'jpeg':
          //             //     // JPEG Image
          //             //     mimetype = 'image/jpeg';
          //             //     break;
          //             //   case 'jpg':
          //             //     // JPEG Image
          //             //     mimetype = 'image/jpg';
          //             //     break;
          //             //   case 'jpgv':
          //             //     // JPGVideo
          //             //     mimetype = 'video/jpeg';
          //             //     break;
          //             //   case 'png':
          //             //     // Portable Network Graphics (PNG)
          //             //     mimetype = 'image/png';
          //             //     break;
          //             //   default:
          //             //     break;
          //             // }
          //             //////////////////////
          //             var file = new File(
          //               [selectedFile],
          //               uuidv4() + `.${format}`,
          //               {
          //                 type: mimeTypeFile,
          //               },
          //             );
  
          //             //////////////////////
          //             handleSendToserver();
          //             async function handleSendToserver() {
          //               var responseCode = await UploadfileToserver(file, format);
          //               // alert(selectedFileName);
          //               if (file.name && responseCode) {
          //                 fetch(graphql_server_uri, {
          //                   method: 'POST',
          //                   headers: { 'Content-Type': 'application/json' },
          //                   body: JSON.stringify({
          //                     query: `
          //                                 mutation{
          //                                     addNewQuestion(
          //                                       axamQuestion_input: {
          //                                           questionID: "${'1'}"
          //                                             axamQuestions_id: "${'1'}"
          //                                             question: "${convertText(newData.question)}"
          //                                             question_link: "${''}"
          //                                             question__optionOne: "${convertText(newData.question__optionOne)}"
          //                                             question__optionTwo:"${convertText(newData.question__optionTwo)}"
          //                                             question__optionTree: "${convertText(newData.question__optionTree)}"
          //                                             question__optionFour: "${convertText(newData.question__optionFour)}"
          //                                             question__currentOption: "${newData.question__currentOption ? newData.question__currentOption : ''
          //                       }"
          //                                             question__timeTosolveProblem: "${convertText(newData.question__timeTosolveProblem)}"
          //                                             question__score: "${newData.question__score ? newData.question__score: ''
          //                       }"
          //                                             question__explane: "${convertText(newData.question__explane)}"
          //                                             exam_link: "${file.name}"
          //                                     },    axamQuestion_input_old: {
          //                                       questionID: "${'1'}"
          //                                       axamQuestions_id: "${'1'}"
          //                                       question: "${convertText(oldData.question__optionOne)}"
          //                                       question_link: "${convertText(oldData.question_link)}"
          //                                       question__optionOne: "${convertText(oldData.question__optionOne)}"
          //                                       question__optionTwo:"${convertText(oldData.question__optionTwo)}"
          //                                       question__optionTree: "${convertText(oldData.question__optionTree)}"
          //                                       question__optionFour: "${convertText(oldData.question__optionFour)}"
          //                                       question__currentOption: "${oldData.question__currentOption ? oldData.question__currentOption : ''
          //                           }"
          //                                       question__timeTosolveProblem: "${convertText(oldData.question__timeTosolveProblem)}"
          //                                       question__score: "${ oldData.question__score ? oldData.question__score : ''
          //                           }"
          //                                       question__explane: "${convertText(oldData.question__explane)}"
          //                                       exam_link: "${oldData.exam_link}"
          //                                 }
          //                                   ){
          //                                     axamQuestions_id
          //                                   }
          //                                 }                      
          //                               `,
          //                   }),
          //                 })
          //                   .then(res => res.json())
          //                   .then(res => {
          //                     // SetselectedFileName('');
          //                     // setSumScore(prevState => prevState + parseFloat(newScore));
          //                     // tesetLoading(false);
          //                     setTextImage(false);
          //                     setQuestionImage(false);
          //                     if (
          //                       res.data &&
          //                       res.data.addNewQuestion
          //                       //  &&
          //                       // res.data.addNewQuestion.axamQuestions_id
          //                     ) {
          //                       // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
          //                       // setQuestionId(data.length)
          //                       // setQuestionId(prevState => prevState + 1);
          //                       // setMessage('اطلاعاتی به درستی ثبت شد');
          //                       // setStatus(0);
          //                       // setShowPopup(true);
          //                       // refteshData();
          //                       // return res.data;
          //                     } else {
          //                       alert('اطلاعاتی به درستی ثبت نشد');
          //                       // setStatus(1);
          //                       // setShowPopup(true);
          //                       // refteshData();
          //                     }
          //                   });
          //                 // return { ...prevState, data };
          //               } else {
          //                 // setLoading(false);
          //                 alert('اطلاعاتی به درستی ثبت نشد');
          //                 // setStatus(1);
          //                 // setShowPopup(true);
          //                 // refteshData();
          //               }
          //               // else{
          //               //   alert('نیست!!!!!');
          //               // }
          //             }
          //             // });
          //           } else {
                      
          //             fetch(graphql_server_uri, {
          //               method: 'POST',
          //               headers: { 'Content-Type': 'application/json' },
          //               body: JSON.stringify({
          //                 query: `
          //                                 mutation{
          //                                     addNewQuestion(
          //                                       axamQuestion_input: {
          //                                           questionID: "${'1'}"
          //                                             axamQuestions_id: "${'1'}"
          //                                             question: "${convertText(newData.question)}"
          //                                             question_link: "${''}"
          //                                             question__optionOne: "${convertText(newData.question__optionOne)}"
          //                                             question__optionTwo:"${convertText(newData.question__optionTwo)}"
          //                                             question__currentOption: "${newData.question__currentOption ? newData.question__currentOption : ''
          //                   }"
          //                                             question__timeTosolveProblem: "${convertText(newData.question__timeTosolveProblem)}"
          //                                             question__score: "${newData.question__score ? newData.question__score : ''
          //                   }"
          //                                             question__explane: "${convertText(newData.question__explane)}"
          //                                             exam_link: "${''}"
          //                                     },    axamQuestion_input_old: {
          //                                       questionID: "${'1'}"
          //                                       axamQuestions_id: "${'1'}"
          //                                       question: "${convertText(oldData.question__optionOne)}"
          //                                       question_link: "${convertText(oldData.question_link)}"
          //                                       question__optionOne: "${convertText(oldData.question__optionOne)}"
          //                                       question__optionTwo:"${convertText(oldData.question__optionTwo)}"
          //                                       question__currentOption: "${oldData.question__currentOption ? oldData.question__currentOption : ''
          //                           }"
          //                                       question__timeTosolveProblem: "${convertText(oldData.question__timeTosolveProblem)}"
          //                                       question__score: "${ oldData.question__score ? oldData.question__score : ''
          //                           }"
          //                                       question__explane: "${convertText(oldData.question__explane)}"
          //                                       exam_link: "${oldData.exam_link}"
          //                                 }
          //                                   ){
          //                                     axamQuestions_id
          //                                   }
          //                                 }                      
          //                               `,
          //               }),
          //             })
          //               .then(res => res.json())
          //               .then(res => {
          //                 // SetselectedFileName('');
          //                 // setLoading(false);
          //                 setTextImage(false);
          //                 setQuestionImage(false);
          //                 // setSumScore(prevState => prevState + parseFloat(newScore));
          //                 if (
          //                   res.data &&
          //                   res.data.addNewQuestion
          //                   // &&
          //                   // res.data.addNewQuestion.axamQuestions_id
          //                 ) {
          //                   // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
          //                   // setQuestionId(data.length)
          //                   // setQuestionId(prevState => prevState + 1);
          //                   // setMessage('اطلاعاتی به درستی ثبت شد');
          //                   // setStatus(0);
          //                   // setShowPopup(true);
          //                   // refteshData();
          //                   // return res.data;
          //                 } else {
          //                   alert('اطلاعاتی به درستی ثبت نشد');
          //                   // setStatus(1);
          //                   // setShowPopup(true);
          //                   // refteshData();
          //                 }
          //                 // return res.data;
          //               });
          //             // return { ...prevState, data };
          //             // });
          //           }
          //         } else {
          //           // setLoading(false);
          //           setTextImage(false);
          //           setQuestionImage(false);
          //           alert('ابتدا فیلد های موردنظر را پر کنید!!');
          //           // setStatus(1);
          //           // setShowPopup(true);
          //           // refteshData();
          //         }
          //       ////////////////////////////
          //       dataUpdate[index] = newData;
          //       setInnerData([...dataUpdate]);
  
          //       resolve(setToggle(false));
          //       // reject(loadVariable.load = false);
          //       // resolve();
          //       // reject();
          //     }, 1000)
          //   }),
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
      {clieckedButton ? <ComparativeModal/> : ''}
      </div>
    )
};

const mapDispatchToProps = dispatch =>({
  setToggle: toggle => dispatch(setToggle(toggle)),
});

export default connect(null , mapDispatchToProps)(Comparative);