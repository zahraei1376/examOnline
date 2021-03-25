import React ,{useState , useEffect} from "react";
// import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import {UploadfileToserver} from '../uploadToserver/uploadToserver.component';
// import axios from 'axios';
import MaterialTable , { MTableAction, MTableBodyRow, MTableEditRow } from 'material-table';
import TextField from '@material-ui/core/TextField';
import {Input,Button, IconButton} from '@material-ui/core';
import {loadVariable} from '../questionComponent';
import { ComparativeButton } from "../Comparative/Comparative.styles";
import BackupIcon from '@material-ui/icons/Backup';
import {connect} from 'react-redux';
import setToggle from '../../../redux/toggleQuesion/toggleQuestion.action';
// import AddIcon from '@material-ui/icons/Add';
// import BackupIcon from '@material-ui/icons/Backup';
// import {CloudUploadIcon} from '@material-ui/icons';
// var load = false;
const graphql_server_uri ='/qraphql';

const TrueAndFalse = ({setToggle ,toggle, ...props}) => {
  // const editActionRef = React.useRef(null);
    const [innerData, setInnerData] = useState([]);
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
          field: 'question__optionOne',
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
                {data.question__optionOne}
              </pre>
            );
          },
        },
        {
          title: 'گزینه 2',
          textAlign: 'center',
          field: 'question__optionTwo',
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
                {data.question__optionTwo}
              </pre>
            );
          },
        },
        {
          title: 'گزینه صحیح',
          textAlign: 'center',
          field: 'question__currentOption',
          lookup: {
            1: '1',
            2: '2',
            3: '3',
            4: '4',
          },
          minWidth: 150,
        //   validate: rowData =>
        //     rowData.question__currentOption === '' ? 'Name cannot be empty' : '',
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
                {data.question__currentOption}
              </p>
            );
          },
          // <input type="file" onChange={e => uploadFile(e)} />
        },
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
                  fontSize: 16,
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
                  fontSize: 16,
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
                  fontSize: 16,
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
    return (
      <>
      {innerData.length > 0 ? <MaterialTable style={{boxShadow: '0 3px 3px rgba(0,0,0,.4'}}
      // localization={{ body: { editRow: { deleteText: 'Customized Delete Message' } } }}
        title=""
        columns={innerColumns}
        data={innerData}
        {...props}
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

          // onRowClick={(props) => {
          //   setToggle(true);
          //   props.actions[1]().onClick(null, props.data);
          // }}

          // components={{
          //   EditRow: props => {
          //     return (
          //       <MTableEditRow 
          //         {...props}
          //         data={this.state.newEntry}
          //         onEditingCanceled={(mode, rowData) => {
          //           this.cancelAdd();
          //           props.onEditingCanceled(mode);
          //         }}
          //         onEditingApproved={(mode, newData, oldData) => {
          //           console.log('ddddddddddddd');
          //           // const dataCopy = [...data];
          //           // const index = dataCopy.indexOf(oldData);
          //           // dataCopy[index] = newData;
          //           // setData(dataCopy);
          //         }}
          //       />
          //     );
          //   }
          // }}
  


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
                setInnerData([...dataDelete]);
                setToggle(false);
            }
          },
          {
            icon: 'edit',
            tooltip: 'ویرایش',
            // onClick: (event, rowData) => {
              onClick: (event, rowData) => {
                setTimeout(() => {
                  const dataUpdate = [...innerData];
                  const index = rowData.tableData.id;
                  /////////////myCode
                  // if (
                  //     // axamIdProps != '' &&
                  //     rowData.newData.question__score !== undefined &&
                  //     rowData.newData.question__currentOption !== undefined
                  //   ) {
                  //     if (
                  //       selectedFile &&
                  //       ((textImage == true && questionImage == true) ||
                  //         (questionImage == true && textImage == false))
                  //     ) {
                  //       //////////////////////
                  //       var file = new File(
                  //         [selectedFile],
                  //         uuidv4() + `.${format}`,
                  //         {
                  //           type: mimeTypeFile,
                  //         },
                  //       );
                  //     //////////////////////////////////////////
                  //       handleSendToserver();
                  //       async function handleSendToserver() {
                  //         var responseCode = await UploadfileToserver(file, format);
                  //         if (file.name && responseCode) {
                  //           fetch(graphql_server_uri, {
                  //             method: 'POST',
                  //             headers: { 'Content-Type': 'application/json' },
                  //             body: JSON.stringify({
                  //               query: `
                  //                           mutation{
                  //                               addNewQuestion(
                  //                                 axamQuestion_input: {
                  //                                     questionID: "${'1'}"
                  //                                       axamQuestions_id: "${'1'}"
                  //                                       question: "${''}"
                  //                                       question_link: "${file.name
                  //                 }"
                  //                                       question__optionOne: "${convertText(rowData.newData.question__optionOne)}"
                  //                                       question__optionTwo:"${convertText(rowData.newData.question__optionTwo)}"
                  //                                       question__currentOption: "${rowData.newData.question__currentOption ? rowData.newData.question__currentOption: ''
                  //                 }"
                  //                                       question__timeTosolveProblem: "${convertText(rowData.newData.question__timeTosolveProblem)}"
                  //                                       question__score: "${rowData.newData.question__score ? rowData.newData.question__score : ''
                  //                 }"
                  //                                       question__explane: "${convertText(rowData.newData.question__explane)}"
                  //                                       exam_link: "${''}"
                  //                               },
                  //                               axamQuestion_input_old: {
                  //                                 questionID: "${'1'}"
                  //                                 axamQuestions_id: "${'1'}"
                  //                                 question: "${convertText(rowData.oldData.question__optionOne)}"
                  //                                 question_link: "${convertText(rowData.oldData.question_link)}"
                  //                                 question__optionOne: "${convertText(rowData.oldData.question__optionOne)}"
                  //                                 question__optionTwo:"${convertText(rowData.oldData.question__optionTwo)}"
                  //                                 question__currentOption: "${rowData.oldData.question__currentOption ? rowData.oldData.question__currentOption : ''
                  //                     }"
                  //                                 question__timeTosolveProblem: "${convertText(rowData.oldData.question__timeTosolveProblem)}"
                  //                                 question__score: "${ rowData.oldData.question__score ? rowData.oldData.question__score : ''
                  //                     }"
                  //                                 question__explane: "${convertText(rowData.oldData.question__explane)}"
                  //                                 exam_link: "${rowData.oldData.exam_link}"
                  //                           }
                  //                             ){
                  //                               axamQuestions_id
                  //                             }
                  //                           }                      
                  //                         `,
                  //             }),
                  //           })
                  //             .then(res => res.json())
                  //             .then(res => {
                  //               setQuestionImage(false);
                  //               if (
                  //                 res.data &&
                  //                 res.data.addNewQuestion
                  //                 // &&
                  //                 // res.data.addNewQuestion.axamQuestions_id
                  //               ) {
                  //                 // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
                  //                 // setQuestionId(data.length)
                  //                 // setQuestionId(prevState => prevState + 1);
                  //                 // setMessage('اطلاعاتی به درستی ثبت شد');
                  //                 // setStatus(0);
                  //                 // setShowPopup(true);
                  //                 // refteshData();
                  //                 // return res.data;
                  //               } else {
                  //                 alert('اطلاعاتی به درستی ثبت نشد');
                  //                 // setStatus(1);
                  //                 // setShowPopup(true);
                  //                 // refteshData();
                  //               }
                  //             });
                  //           // return { ...state, data };
                  //         } else {
                  //           // setLoading(false);
                  //           alert('اطلاعاتی به درستی ثبت نشد');
                  //           // setStatus(1);
                  //           // setShowPopup(true);
                  //           // refteshData();
                  //         }
                  //       }
                  //       // });
                  //     } else if (
                  //       selectedFile &&
                  //       questionImage == false &&
                  //       textImage == true
                  //     ) {
                  //       // setState(async(prevState) => {
                  //       //   const data = [...prevState.data];
                  //       //   data.push(rowData.newData);
                  //       // var fileIdL = selectedFile.name.split('.');
                  //       // const format = fileIdL[fileIdL.length - 1].toLowerCase();
                  //       // ///////////////
                  //       // var mimetype = '';
                  //       // ///////////////////////////////
                  //       // switch (format) {
                  //       //   case 'jpeg':
                  //       //     // JPEG Image
                  //       //     mimetype = 'image/jpeg';
                  //       //     break;
                  //       //   case 'jpg':
                  //       //     // JPEG Image
                  //       //     mimetype = 'image/jpg';
                  //       //     break;
                  //       //   case 'jpgv':
                  //       //     // JPGVideo
                  //       //     mimetype = 'video/jpeg';
                  //       //     break;
                  //       //   case 'png':
                  //       //     // Portable Network Graphics (PNG)
                  //       //     mimetype = 'image/png';
                  //       //     break;
                  //       //   default:
                  //       //     break;
                  //       // }
                  //       //////////////////////
                  //       var file = new File(
                  //         [selectedFile],
                  //         uuidv4() + `.${format}`,
                  //         {
                  //           type: mimeTypeFile,
                  //         },
                  //       );
    
                  //       //////////////////////
                  //       handleSendToserver();
                  //       async function handleSendToserver() {
                  //         var responseCode = await UploadfileToserver(file, format);
                  //         // alert(selectedFileName);
                  //         if (file.name && responseCode) {
                  //           fetch(graphql_server_uri, {
                  //             method: 'POST',
                  //             headers: { 'Content-Type': 'application/json' },
                  //             body: JSON.stringify({
                  //               query: `
                  //                           mutation{
                  //                               addNewQuestion(
                  //                                 axamQuestion_input: {
                  //                                     questionID: "${'1'}"
                  //                                       axamQuestions_id: "${'1'}"
                  //                                       question: "${convertText(rowData.newData.question)}"
                  //                                       question_link: "${''}"
                  //                                       question__optionOne: "${convertText(rowData.newData.question__optionOne)}"
                  //                                       question__optionTwo:"${convertText(rowData.newData.question__optionTwo)}"
                  //                                       question__currentOption: "${rowData.newData.question__currentOption ? rowData.newData.question__currentOption : ''
                  //                 }"
                  //                                       question__timeTosolveProblem: "${convertText(rowData.newData.question__timeTosolveProblem)}"
                  //                                       question__score: "${rowData.newData.question__score ? rowData.newData.question__score: ''
                  //                 }"
                  //                                       question__explane: "${convertText(rowData.newData.question__explane)}"
                  //                                       exam_link: "${file.name}"
                  //                               },    axamQuestion_input_old: {
                  //                                 questionID: "${'1'}"
                  //                                 axamQuestions_id: "${'1'}"
                  //                                 question: "${convertText(rowData.oldData.question__optionOne)}"
                  //                                 question_link: "${convertText(rowData.oldData.question_link)}"
                  //                                 question__optionOne: "${convertText(rowData.oldData.question__optionOne)}"
                  //                                 question__optionTwo:"${convertText(rowData.oldData.question__optionTwo)}"
                  //                                 question__currentOption: "${rowData.oldData.question__currentOption ? rowData.oldData.question__currentOption : ''
                  //                     }"
                  //                                 question__timeTosolveProblem: "${convertText(rowData.oldData.question__timeTosolveProblem)}"
                  //                                 question__score: "${ rowData.oldData.question__score ? rowData.oldData.question__score : ''
                  //                     }"
                  //                                 question__explane: "${convertText(rowData.oldData.question__explane)}"
                  //                                 exam_link: "${rowData.oldData.exam_link}"
                  //                           }
                  //                             ){
                  //                               axamQuestions_id
                  //                             }
                  //                           }                      
                  //                         `,
                  //             }),
                  //           })
                  //             .then(res => res.json())
                  //             .then(res => {
                  //               // SetselectedFileName('');
                  //               // setSumScore(prevState => prevState + parseFloat(newScore));
                  //               // tesetLoading(false);
                  //               setTextImage(false);
                  //               setQuestionImage(false);
                  //               if (
                  //                 res.data &&
                  //                 res.data.addNewQuestion
                  //                 //  &&
                  //                 // res.data.addNewQuestion.axamQuestions_id
                  //               ) {
                  //                 // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
                  //                 // setQuestionId(data.length)
                  //                 // setQuestionId(prevState => prevState + 1);
                  //                 // setMessage('اطلاعاتی به درستی ثبت شد');
                  //                 // setStatus(0);
                  //                 // setShowPopup(true);
                  //                 // refteshData();
                  //                 // return res.data;
                  //               } else {
                  //                 alert('اطلاعاتی به درستی ثبت نشد');
                  //                 // setStatus(1);
                  //                 // setShowPopup(true);
                  //                 // refteshData();
                  //               }
                  //             });
                  //           // return { ...prevState, data };
                  //         } else {
                  //           // setLoading(false);
                  //           alert('اطلاعاتی به درستی ثبت نشد');
                  //           // setStatus(1);
                  //           // setShowPopup(true);
                  //           // refteshData();
                  //         }
                  //         // else{
                  //         //   alert('نیست!!!!!');
                  //         // }
                  //       }
                  //       // });
                  //     } else {
                        
                  //       fetch(graphql_server_uri, {
                  //         method: 'POST',
                  //         headers: { 'Content-Type': 'application/json' },
                  //         body: JSON.stringify({
                  //           query: `
                  //                           mutation{
                  //                               addNewQuestion(
                  //                                 axamQuestion_input: {
                  //                                     questionID: "${'1'}"
                  //                                       axamQuestions_id: "${'1'}"
                  //                                       question: "${convertText(rowData.newData.question)}"
                  //                                       question_link: "${''}"
                  //                                       question__optionOne: "${convertText(rowData.newData.question__optionOne)}"
                  //                                       question__optionTwo:"${convertText(rowData.newData.question__optionTwo)}"
                  //                                       question__currentOption: "${rowData.newData.question__currentOption ? rowData.newData.question__currentOption : ''
                  //             }"
                  //                                       question__timeTosolveProblem: "${convertText(rowData.newData.question__timeTosolveProblem)}"
                  //                                       question__score: "${rowData.newData.question__score ? rowData.newData.question__score : ''
                  //             }"
                  //                                       question__explane: "${convertText(rowData.newData.question__explane)}"
                  //                                       exam_link: "${''}"
                  //                               },    axamQuestion_input_old: {
                  //                                 questionID: "${'1'}"
                  //                                 axamQuestions_id: "${'1'}"
                  //                                 question: "${convertText(rowData.oldData.question__optionOne)}"
                  //                                 question_link: "${convertText(rowData.oldData.question_link)}"
                  //                                 question__optionOne: "${convertText(rowData.oldData.question__optionOne)}"
                  //                                 question__optionTwo:"${convertText(rowData.oldData.question__optionTwo)}"
                  //                                 question__currentOption: "${rowData.oldData.question__currentOption ? rowData.oldData.question__currentOption : ''
                  //                     }"
                  //                                 question__timeTosolveProblem: "${convertText(rowData.oldData.question__timeTosolveProblem)}"
                  //                                 question__score: "${ rowData.oldData.question__score ? rowData.oldData.question__score : ''
                  //                     }"
                  //                                 question__explane: "${convertText(rowData.oldData.question__explane)}"
                  //                                 exam_link: "${rowData.oldData.exam_link}"
                  //                           }
                  //                             ){
                  //                               axamQuestions_id
                  //                             }
                  //                           }                      
                  //                         `,
                  //         }),
                  //       })
                  //         .then(res => res.json())
                  //         .then(res => {
                  //           // SetselectedFileName('');
                  //           // setLoading(false);
                  //           setTextImage(false);
                  //           setQuestionImage(false);
                  //           // setSumScore(prevState => prevState + parseFloat(newScore));
                  //           if (
                  //             res.data &&
                  //             res.data.addNewQuestion
                  //             // &&
                  //             // res.data.addNewQuestion.axamQuestions_id
                  //           ) {
                  //             // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
                  //             // setQuestionId(data.length)
                  //             // setQuestionId(prevState => prevState + 1);
                  //             // setMessage('اطلاعاتی به درستی ثبت شد');
                  //             // setStatus(0);
                  //             // setShowPopup(true);
                  //             // refteshData();
                  //             // return res.data;
                  //           } else {
                  //             alert('اطلاعاتی به درستی ثبت نشد');
                  //             // setStatus(1);
                  //             // setShowPopup(true);
                  //             // refteshData();
                  //           }
                  //           // return res.data;
                  //         });
                  //       // return { ...prevState, data };
                  //       // });
                  //     }
                  //   } else {
                  //     // setLoading(false);
                  //     setTextImage(false);
                  //     setQuestionImage(false);
                  //     alert('ابتدا فیلد های موردنظر را پر کنید!!');
                  //     // setStatus(1);
                  //     // setShowPopup(true);
                  //     // refteshData();
                  //   }
                  ////////////////////////////
                  dataUpdate[index] = rowData.newData;
                  setInnerData([...dataUpdate]);
                  setToggle(false)
    
                  // resolve(setToggle(false));
                  // reject(setToggle(true));
                }, 1000)
                setToggle(true);
                      
                      
            }
          },
         
        ]}

        // components={{
        //   Action: props => {
        //       //If isn't the add action
        //       if (typeof props.action === typeof Function || props.action.tooltip !== 'ویرایش') {
        //               return <MTableAction {...props} />
        //       } else {
                    
        //               return (
        //                 <MTableEditRow
        //                   {...props}
        //                   onClick={e => {
        //                     setToggle(true);
        //                     console.log(props.actions);
        //                     props.actions[1]().onClick(e, props.data);
        //                     // setToggle(true);
        //                   }}
        //                 />
        //                 // <MTableAction {...props} />
        //                 // <MTableEditRow 
        //                 //   {...props}
        //                 //   onEditingCanceled={(mode, rowData) => {
        //                 //     rowData.tableData.editing = undefined;
        //                 //     // forceUpdate();
        //                 //   }}

        //                 //   onEditingApproved={(mode, newData, oldData) => {
        //                 //     console.log('aaaaaaaa');
        //                 //     // const dataCopy = [...data];
        //                 //     // const index = dataCopy.indexOf(oldData);
        //                 //     // dataCopy[index] = newData;
        //                 //     // setData(dataCopy);
        //                 //   }}
        //                 // />
        //               )
                      
        //       }}
        //   }}

    //     components={{
    //       Actions: 
    //           props => {
    //                   if(typeof props.action === typeof Function || props.action.icon !== 'edit'){
    //                       return(
    //                       <Button
    //                       onClick={(event) => {
    //                         setToggle(true);
    //                         props.actions[1].onClick(event, props.data)}}
    //                       color="primary"
    //                       variant="contained"
    //                       style={{textTransform: 'none'}}
    //                       size="small"
    //                       // disabled
    //                       >
    //                      edit
    //                       </Button>
    //                       )
    //                   }
    //                   else{
    //                       return(
    //                           <Button
    //                           onClick={(event) => props.actions[0].onClick(event, props.data)}
    //                           color="primary"
    //                           variant="contained"
    //                           style={{textTransform: 'none'}}
    //                           size="small"
    //                           >
    //                           My Button 
    //                           </Button>
    //                       )
    //                   }
    //               }
  
    //     }}

    //     components={{
    //       Action: props => {
    //           //If isn't the add action
    //           if (typeof props.action === typeof Function || props.action.tooltip !== 'ویرایش') {
    //                   // return <MTableAction {...props} />
    // props.action.onClick
    //           } 
    //           // else {
    //           //         return <div 
    //           //         ref={editActionRef} 
    //           //         onClick={
    //           //           console.log('props.action',props.action),
    //           //           // props.action.onClick
    //           //            props.action.onClick
    //           //           // setToggle(true),
    //           //           // console.log('props.action',props.action),
    //           //           // // props.action.onClick
    //           //           // props.action.onClick
    //           //         }
    //           //         />;
    //           // }
    //         }
    //       }}


        //  components={{
        //   Action: props => {
        //     console.log('props.actions',props);
        //       //If isn't the add action
        //   //     for (let index = 0; index < props.actions.length; index++) {
        //   //       if (typeof props.actions[index] === typeof Function || props.actions[index].tooltip === 'ویرایش') {
        //   //         props.actions[1]().onClick(null, props.data);
        //   //         // return( <MTableAction {...props} />)
        //   //         // return  
        //   //         // <MTableEditRow
        //   //         //   // {...props}
        //   //         //   onDoubleClick={e => {
        //   //         //     console.log(props.actions);
        //   //         //     props.actions[1]().onClick(e, props.data);
        //   //         //     setToggle(true);
        //   //         //   }}
        //   //         // />
                  
        //   // } 
                
        //       // }
        //       /////////////////////////////
        //       // if (typeof props.action === typeof Function || props.action.tooltip === 'ویرایش') {
        //       //         return( <MTableAction {...props} />)
        //       //         // return  
        //       //         // <MTableEditRow
        //       //         //   // {...props}
        //       //         //   onDoubleClick={e => {
        //       //         //     console.log(props.actions);
        //       //         //     props.actions[1]().onClick(e, props.data);
        //       //         //     setToggle(true);
        //       //         //   }}
        //       //         // />
                      
        //       // } 
        //       // else {
        //       //     return  
        //       //         (<MTableEditRow
        //       //           {...props}
        //       //           // onDoubleClick={e => {
        //       //           //   console.log(props.actions);
        //       //           //   props.actions[1]().onClick(e, props.data);
        //       //           //   setToggle(true);
        //       //           // }}
        //       //         />
        //       //         )
        //       // }
        //     }
        //   }}

      // editable={{
      //   onRowUpdateCancelled: rowData => {
      //     loadVariable.load = true;
      //     setToggle(false);
      //     // console.log('onRowUpdateCancelled',loadVariable.load);
      //   },
      //   onRowUpdate: (newData, oldData) => Promise.resolve() //your callback here
      // }}

      // components={{
      //   Row: props => (
      //     <MTableBodyRow
      //       {...props}
      //       onDoubleClick={e => {
      //         console.log(props.actions);
      //         props.actions[1]().onClick(e, props.data);
      //         setToggle(true);
      //       }}
      //     />
      //   )
      // }}

      // components={{
      //   Row: props => (
      //     <MTableEditRow
      //       {...props}
      //       onDoubleClick={e => {
      //         console.log(props.actions);
      //         props.actions[1]().onClick(e, props.data);
      //         setToggle(true);
      //       }}
      //     />
      //   )
      // }}

      // components={{
      //   Row: props => (
      //     <MTableBodyRow
      //       {...props}
      //       onDoubleClick={e => {
      //         console.log(props.actions);
      //         props.actions[1]().onClick(e, props.data);
      //         setToggle(true);
      //       }}
      //     />
      //   )
      // }}


      // components={{
      //   Row: props => (
      //     <MTableBodyRow
      //       {...props}
      //       onDoubleClick={e => {
      //         console.log(props.actions);
      //         props.actions[1]().onClick(e, props.data);
      //         setToggle(true);
      //       }}
      //     />
      //   )
      // }}

      

        editable={{
          // alert('lllllllllllll');
          // onRowEditClic
          // onBulkUpdate: changes => 
          // new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //         /* setData([...data, newData]); */

          //         resolve();
          //     }, 1000);
          // }),
          // onEditClick: ()=>{
          //     setToggle(true);
          // },


          onRowUpdateCancelled: rowData => {
            loadVariable.load = true;
            setToggle(false);
            // console.log('onRowUpdateCancelled',loadVariable.load);
          },

          // onRowUpdate: (newData, oldData) =>
          // new Promise((resolve, reject) => {
          //   resolve();
          // }),


          // onRowUpdate: (newData, oldData) =>
          //   new Promise((resolve, reject) => {
          //     // setToggle(true);
          //     setTimeout(() => {
          //       const dataUpdate = [...innerData];
          //       const index = oldData.tableData.id;
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
          //       // reject(setToggle(true));
          //     }, 1000)
          //   }),



            ////////////////////
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