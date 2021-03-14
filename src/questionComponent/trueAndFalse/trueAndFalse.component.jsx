import React ,{useState , useEffect} from "react";
import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import {Input,Button} from '@material-ui/core';
import {loadVariable} from '../questionComponent';
// import AddIcon from '@material-ui/icons/Add';
// import BackupIcon from '@material-ui/icons/Backup';
// import {CloudUploadIcon} from '@material-ui/icons';
// var load = false;
const graphql_server_uri ='/qraphql';

const TrueAndFalse = (props) => {
    const [innerData, setInnerData] = useState([]);
    /////////////////////////////////////////
    // const [imageQuestion, setImageQuestion] = useState(false);
    // const [QuestionPic, setQuestionPic] = useState(false);
    const [textImage, setTextImage] = useState(false); //pic with text
    const [questionImage, setQuestionImage] = useState(false); //pic instanse text
    const [selectedFile, SetselectedFile] = useState(null);
    const [mimeTypeFile, SetMimeTypeFile] = useState('');
    var format = '';

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
    function hashFile(file, chunkSize, blobSlice) {
      return new Promise((resolve, reject) => {
        const chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        function loadNext() {
          const start = currentChunk * chunkSize;
          const end =
            start + chunkSize >= file.size ? file.size : start + chunkSize;
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }
        fileReader.onload = e => {
          spark.append(e.target.result); // Append array buffer
          currentChunk += 1;
          if (currentChunk < chunks) {
            loadNext();
          } else {
            console.log('finished loading');
            const result = spark.end();
            // If result s are used as hash values only, if the contents of the file are the same and the names are different
            // You cannot keep two files if you want to.So add the file name.
            const sparkMd5 = new SparkMD5();
            sparkMd5.append(result);
            sparkMd5.append(file.name);
            const hexHash = sparkMd5.end();
            resolve(hexHash);
          }
        };
        fileReader.onerror = () => {
          console.warn('File reading failed!');
        };
        loadNext();
      }).catch(err => {
        console.log(err);
      });
    }
    ///////////////////////////////////////////
  
    const uploadfileToserver = async (file, format) => {
      const chunkSize = 8 * 1024 * 1024; // The size of each chunk, set to 1 Megabyte
      var blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      ///////////////
      ////////////////////////////////////////////////

      if (!file) {
        alert('فایلی وجود ندارد!!!');
        return;
      }
      ///////////////////////////////
      var maxUploadTries = 5;
      var count = 0;
      const sendToServerFilePart = async (
        data,
        axiosOptions,
        maxUploadTries,
      ) => {
        var tryNum = 0;
        try {
          await axios.post(
            '/fileQuestion/uploadQuestion',
            data,
            axiosOptions,
          );
        } catch {
          if (tryNum < maxUploadTries) {
            tryNum++;
            sendToServerFilePart(data, axiosOptions, maxUploadTries);
          } else {
            alert('پس از مدتی مجددا امتحان نمایید!!!');
          }
        }
      };

      const blockCount = Math.ceil(file.size / chunkSize); // Total number of slices
      const hash = await hashFile(file, chunkSize, blobSlice); //File hash
      for (let i = 0; i < blockCount; i++) {
        count++;
        const start = i * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        var fileSlice = blobSlice.call(file, start, end);
        const axiosOptions = {
          timeout: 1800000,
          onUploadProgress: ProgressEvent => {
            // setCompleted(
            //   (ProgressEvent.loaded /
            //     ProgressEvent.total /
            //     blockCount) *
            //   100,
            // );
            console.log(blockCount, i, ProgressEvent, file);
          },
        };
        const form = new FormData();
        form.append('file', fileSlice);
        form.append('name', file.name);
        form.append('total', blockCount);
        form.append('index', i);
        form.append('size', file.size);
        form.append('hash', hash);
        await sendToServerFilePart(form, axiosOptions, maxUploadTries);
      }
      if (count == blockCount) {
        const data = {
          size: file.size,
          name: file.name,
          total: blockCount,
          hash,
        };
        return await axios
          .post('/fileQuestion/merge_chunks', data, { timeout: 180000 })
          .then(res => {
            console.log('Upload Successful');
            // alert(res.data);
            // alert(res.data.seccess);
            // alert(res.status);
            // alert(typeof res.status);
            // alert(res.statusCode);
            // alert(res.statusText);
            if (res.status == 200) {
              return true;
            } else {
              return false;
            }
            // alert(file.name);
            // SetselectedFileName(file.name);
            // return file.name;
          })
          .catch(err => {
            alert('مجددا تلاش کنید');
            // alert(err);
          });
      }
          ////////////////////////////////////////////
    };
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
              defaultValue=""
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
                    defaultValue=""
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={e => uploadFileQuestion(e)}
                />

                <Button color="promary" variant="contained" component="span">
                    {/* <BackupIcon/> */}
                </Button>
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
              defaultValue=""
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
              defaultValue=""
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
            <label htmlFor="upload-photo">
                <input
                    style={{ display: 'none' }}
                    defaultValue=""
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={e => uploadFile(e)}
                />

                <Button color="promary" variant="contained" component="span">
                    {/* <BackupIcon/> */}
                </Button>
            </label>
          ),
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
            //   backgroundColor: '#eee',
              color: '#000'
            },
            headerStyle: {
              backgroundColor: '#009688',
              color:'#fff',
              textAlign:'center',
            }
            
          }}
        actions={[
          {
            icon: 'delete',
            tooltip: 'حذف',
            onClick: (event, rowData) => {
              // Do save operation
                const dataDelete = [...innerData];
                const index = rowData.tableData.id;
                dataDelete.splice(index, 1);
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

          onRowUpdateCancelled: rowData => {
            loadVariable.load = true;
            console.log('onRowUpdateCancelled',loadVariable.load);
          },

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...innerData];
                const index = oldData.tableData.id;
                /////////////myCode
                if (
                    // axamIdProps != '' &&
                    newData.question__score !== undefined &&
                    newData.question__currentOption !== undefined
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
  
                      var newQuestion = newData.question
                        ? newData.question.split('\r\n').join('%0A')
                        : '';
                      var newQuestion2 = newQuestion
                        ? newQuestion.split('\n').join('%0A')
                        : '';
                      /////////////
                      var newOption1 = newData.question__optionOne
                        ? newData.question__optionOne.split('\r\n').join('%0A')
                        : '';
                      var newOption11 = newOption1
                        ? newOption1.split('\n').join('%0A')
                        : '';
                      var newOption111 = newOption11
                        ? newOption11.split('"').join("'")
                        : '';
                      ////////////////////////////////
                      var newOption2 = newData.question__optionTwo
                        ? newData.question__optionTwo.split('\r\n').join('%0A')
                        : '';
                      var newOption22 = newOption2
                        ? newOption2.split('\n').join('%0A')
                        : '';
                      var newOption222 = newOption22
                        ? newOption22.split('"').join("'")
                        : '';
                      ///////////////////////////
                      var newOption3 = newData.question__optionTree
                        ? newData.question__optionTree.split('\r\n').join('%0A')
                        : '';
                      var newOption33 = newOption3
                        ? newOption3.split('\n').join('%0A')
                        : '';
                      var newOption333 = newOption33
                        ? newOption33.split('"').join("'")
                        : '';
                      /////////////////////
                      var newOption4 = newData.question__optionFour
                        ? newData.question__optionFour.split('\r\n').join('%0A')
                        : '';
                      var newOption44 = newOption4
                        ? newOption4.split('\n').join('%0A')
                        : '';
                      var newOption444 = newOption44
                        ? newOption44.split('"').join("'")
                        : '';
                      //////////////////////
                      var newExplane = newData.question__explane
                        ? newData.question__explane.split('\r\n').join('%0A')
                        : '';
                      var newExplane2 = newExplane
                        ? newExplane.split('\n').join('%0A')
                        : '';
                      var newExplane22 = newExplane2
                        ? newExplane2.split('"').join("'")
                        : '';
                      var newTime = newData.question__timeTosolveProblem
                        ? newData.question__timeTosolveProblem
                          .split('\r\n')
                          .join('%0A')
                        : '';
                      var newTime2 = newTime
                        ? newTime.split('\n').join('%0A')
                        : '';

                      var newScore = newData.question__score
                        ? newData.question__score
                        : '';

                    //////////////////////////////////////////
                      handleSendToserver();
                      async function handleSendToserver() {
                        var responseCode = await uploadfileToserver(file, format);
                        if (file.name && responseCode) {
                          fetch(graphql_server_uri, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              query: `
                                          mutation{
                                              addNewQuestion(
                                                axamQuestion_input: {
                                                    questionID: "${'1'}"
                                                      axamQuestions_id: "${'1'}"
                                                      question: "${''}"
                                                      question_link: "${file.name
                                }"
                                                      question__optionOne: "${newOption111}"
                                                      question__optionTwo:"${newOption222}"
                                                      question__optionTree: "${newOption333}"
                                                      question__optionFour: "${newOption444}"
                                                      question__currentOption: "${newData.question__currentOption
                                }"
                                                      question__timeTosolveProblem: "${newTime2}"
                                                      question__score: "${newData.question__score
                                }"
                                                      question__explane: "${newExplane22}"
                                                      exam_link: "${''}"
                                              }
                                            ){
                                              axamQuestions_id
                                            }
                                          }                      
                                        `,
                            }),
                          })
                            .then(res => res.json())
                            .then(res => {
                              setQuestionImage(false);
                              if (
                                res.data &&
                                res.data.addNewQuestion
                                // &&
                                // res.data.addNewQuestion.axamQuestions_id
                              ) {
                                // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
                                // setQuestionId(data.length)
                                // setQuestionId(prevState => prevState + 1);
                                // setMessage('اطلاعاتی به درستی ثبت شد');
                                // setStatus(0);
                                // setShowPopup(true);
                                // refteshData();
                                // return res.data;
                              } else {
                                alert('اطلاعاتی به درستی ثبت نشد');
                                // setStatus(1);
                                // setShowPopup(true);
                                // refteshData();
                              }
                            });
                          // return { ...state, data };
                        } else {
                          // setLoading(false);
                          alert('اطلاعاتی به درستی ثبت نشد');
                          // setStatus(1);
                          // setShowPopup(true);
                          // refteshData();
                        }
                      }
                      // });
                    } else if (
                      selectedFile &&
                      questionImage == false &&
                      textImage == true
                    ) {
                      // setState(async(prevState) => {
                      //   const data = [...prevState.data];
                      //   data.push(newData);
                      // var fileIdL = selectedFile.name.split('.');
                      // const format = fileIdL[fileIdL.length - 1].toLowerCase();
                      // ///////////////
                      // var mimetype = '';
                      // ///////////////////////////////
                      // switch (format) {
                      //   case 'jpeg':
                      //     // JPEG Image
                      //     mimetype = 'image/jpeg';
                      //     break;
                      //   case 'jpg':
                      //     // JPEG Image
                      //     mimetype = 'image/jpg';
                      //     break;
                      //   case 'jpgv':
                      //     // JPGVideo
                      //     mimetype = 'video/jpeg';
                      //     break;
                      //   case 'png':
                      //     // Portable Network Graphics (PNG)
                      //     mimetype = 'image/png';
                      //     break;
                      //   default:
                      //     break;
                      // }
                      //////////////////////
                      var file = new File(
                        [selectedFile],
                        uuidv4() + `.${format}`,
                        {
                          type: mimeTypeFile,
                        },
                      );
  
                      var newQuestion = newData.question
                        ? newData.question.split('\r\n').join('%0A')
                        : '';
                      var newQuestion2 = newQuestion
                        ? newQuestion.split('\n').join('%0A')
                        : '';
                      var newQuestion22 = newQuestion2
                        ? newQuestion2.split('"').join("'")
                        : '';
                      /////////////
                      var newOption1 = newData.question__optionOne
                        ? newData.question__optionOne.split('\r\n').join('%0A')
                        : '';
                      var newOption11 = newOption1
                        ? newOption1.split('\n').join('%0A')
                        : '';
                      var newOption111 = newOption11
                        ? newOption11.split('"').join("'")
                        : '';
                      ////////////////////////////////
                      var newOption2 = newData.question__optionTwo
                        ? newData.question__optionTwo.split('\r\n').join('%0A')
                        : '';
                      var newOption22 = newOption2
                        ? newOption2.split('\n').join('%0A')
                        : '';
                      var newOption222 = newOption22
                        ? newOption22.split('"').join("'")
                        : '';
                      ///////////////////////////
                      var newOption3 = newData.question__optionTree
                        ? newData.question__optionTree.split('\r\n').join('%0A')
                        : '';
                      var newOption33 = newOption3
                        ? newOption3.split('\n').join('%0A')
                        : '';
                      var newOption333 = newOption33
                        ? newOption33.split('"').join("'")
                        : '';
                      /////////////////////
                      var newOption4 = newData.question__optionFour
                        ? newData.question__optionFour.split('\r\n').join('%0A')
                        : '';
                      var newOption44 = newOption4
                        ? newOption4.split('\n').join('%0A')
                        : '';
                      var newOption444 = newOption44
                        ? newOption44.split('"').join("'")
                        : '';
                      //////////////////////
                      var newExplane = newData.question__explane
                        ? newData.question__explane.split('\r\n').join('%0A')
                        : '';
                      var newExplane2 = newExplane
                        ? newExplane.split('\n').join('%0A')
                        : '';
                      var newExplane22 = newExplane2
                        ? newExplane2.split('"').join("'")
                        : '';
                      var newTime = newData.question__timeTosolveProblem
                        ? newData.question__timeTosolveProblem
                          .split('\r\n')
                          .join('%0A')
                        : '';
                      var newTime2 = newTime
                        ? newTime.split('\n').join('%0A')
                        : '';
                      var newScore = newData.question__score
                        ? newData.question__score
                        : '';
                      handleSendToserver();
                      async function handleSendToserver() {
                        var responseCode = await uploadfileToserver(file, format);
                        // alert(selectedFileName);
                        if (file.name && responseCode) {
                          fetch(graphql_server_uri, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              query: `
                                          mutation{
                                              addNewQuestion(
                                                axamQuestion_input: {
                                                    questionID: "${'1'}"
                                                      axamQuestions_id: "${'1'}"
                                                      question: "${newQuestion22}"
                                                      question_link: "${''}"
                                                      question__optionOne: "${newOption111}"
                                                      question__optionTwo:"${newOption222}"
                                                      question__optionTree: "${newOption333}"
                                                      question__optionFour: "${newOption444}"
                                                      question__currentOption: "${newData.question__currentOption
                                }"
                                                      question__timeTosolveProblem: "${newTime2}"
                                                      question__score: "${newData.question__score
                                }"
                                                      question__explane: "${newExplane22}"
                                                      exam_link: "${file.name}"
                                              }
                                            ){
                                              axamQuestions_id
                                            }
                                          }                      
                                        `,
                            }),
                          })
                            .then(res => res.json())
                            .then(res => {
                              // SetselectedFileName('');
                              // setSumScore(prevState => prevState + parseFloat(newScore));
                              // tesetLoading(false);
                              setTextImage(false);
                              setQuestionImage(false);
                              if (
                                res.data &&
                                res.data.addNewQuestion
                                //  &&
                                // res.data.addNewQuestion.axamQuestions_id
                              ) {
                                // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
                                // setQuestionId(data.length)
                                // setQuestionId(prevState => prevState + 1);
                                // setMessage('اطلاعاتی به درستی ثبت شد');
                                // setStatus(0);
                                // setShowPopup(true);
                                // refteshData();
                                // return res.data;
                              } else {
                                alert('اطلاعاتی به درستی ثبت نشد');
                                // setStatus(1);
                                // setShowPopup(true);
                                // refteshData();
                              }
                            });
                          // return { ...prevState, data };
                        } else {
                          // setLoading(false);
                          alert('اطلاعاتی به درستی ثبت نشد');
                          // setStatus(1);
                          // setShowPopup(true);
                          // refteshData();
                        }
                        // else{
                        //   alert('نیست!!!!!');
                        // }
                      }
                      // });
                    } else {
                      
                      
                      ////////////////////////////////////
                      var newQuestion = newData.question
                        ? newData.question.split('\r\n').join('%0A')
                        : '';
                      var newQuestion2 = newQuestion
                        ? newQuestion.split('\n').join('%0A')
                        : '';
                      var newQuestion22 = newQuestion2
                        ? newQuestion2.split('"').join("'")
                        : '';
                      /////////////
                      var newOption1 = newData.question__optionOne
                        ? newData.question__optionOne.split('\r\n').join('%0A')
                        : '';
                      var newOption11 = newOption1
                        ? newOption1.split('\n').join('%0A')
                        : '';
                      var newOption111 = newOption11
                        ? newOption11.split('"').join("'")
                        : '';
                      ////////////////////////////////
                      var newOption2 = newData.question__optionTwo
                        ? newData.question__optionTwo.split('\r\n').join('%0A')
                        : '';
                      var newOption22 = newOption2
                        ? newOption2.split('\n').join('%0A')
                        : '';
                      var newOption222 = newOption22
                        ? newOption22.split('"').join("'")
                        : '';
                      ///////////////////////////
                      var newOption3 = newData.question__optionTree
                        ? newData.question__optionTree.split('\r\n').join('%0A')
                        : '';
                      var newOption33 = newOption3
                        ? newOption3.split('\n').join('%0A')
                        : '';
                      var newOption333 = newOption33
                        ? newOption33.split('"').join("'")
                        : '';
                      /////////////////////
                      var newOption4 = newData.question__optionFour
                        ? newData.question__optionFour.split('\r\n').join('%0A')
                        : '';
                      var newOption44 = newOption4
                        ? newOption4.split('\n').join('%0A')
                        : '';
                      var newOption444 = newOption44
                        ? newOption44.split('"').join("'")
                        : '';
                      //////////////////////
                      var newExplane = newData.question__explane
                        ? newData.question__explane.split('\r\n').join('%0A')
                        : '';
                      var newExplane2 = newExplane
                        ? newExplane.split('\n').join('%0A')
                        : '';
                      var newExplane22 = newExplane2
                        ? newExplane2.split('"').join("'")
                        : '';
                      var newTime = newData.question__timeTosolveProblem
                        ? newData.question__timeTosolveProblem
                          .split('\r\n')
                          .join('%0A')
                        : '';
                      var newTime2 = newTime
                        ? newTime.split('\n').join('%0A')
                        : '';
                      // var newOption1 = newData.question__optionOne ? newData.question__optionOne.split('\n').join('%0A') : '';
                      // var newOption2 = newData.question__optionTwo ? newData.question__optionTwo.split('\n').join('%0A') : '';
                      // var newOption3 = newData.question__optionTree ? newData.question__optionTree.split('\n').join('%0A') : '';
                      // var newOption4 = newData.question__optionFour ? newData.question__optionFour.split('\n').join('%0A') : '';
                      // var newExplane = newData.question__explane ? newData.question__explane.split('\n').join('%0A') : '';
                      // var newTime = newData.question__timeTosolveProblem ? newData.question__timeTosolveProblem.split('\n').join('%0A') : '';
                      var newScore = newData.question__score
                        ? newData.question__score
                        : '';
                      fetch(graphql_server_uri, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          query: `
                                          mutation{
                                              addNewQuestion(
                                                axamQuestion_input: {
                                                    questionID: "${'1'}"
                                                      axamQuestions_id: "${'1'}"
                                                      question: "${newQuestion22}"
                                                      question_link: "${''}"
                                                      question__optionOne: "${newOption111}"
                                                      question__optionTwo:"${newOption222}"
                                                      question__optionTree: "${newOption333}"
                                                      question__optionFour: "${newOption444}"
                                                      question__currentOption: "${newData.question__currentOption
                            }"
                                                      question__timeTosolveProblem: "${newTime2}"
                                                      question__score: "${newData.question__score
                            }"
                                                      question__explane: "${newExplane22}"
                                                      exam_link: "${''}"
                                              }
                                            ){
                                              axamQuestions_id
                                            }
                                          }                      
                                        `,
                        }),
                      })
                        .then(res => res.json())
                        .then(res => {
                          // SetselectedFileName('');
                          // setLoading(false);
                          setTextImage(false);
                          setQuestionImage(false);
                          // setSumScore(prevState => prevState + parseFloat(newScore));
                          if (
                            res.data &&
                            res.data.addNewQuestion
                            // &&
                            // res.data.addNewQuestion.axamQuestions_id
                          ) {
                            // if (res.data.addNewQuestion && res.data.addNewQuestion.axamQuestions_id) {
                            // setQuestionId(data.length)
                            // setQuestionId(prevState => prevState + 1);
                            // setMessage('اطلاعاتی به درستی ثبت شد');
                            // setStatus(0);
                            // setShowPopup(true);
                            // refteshData();
                            // return res.data;
                          } else {
                            alert('اطلاعاتی به درستی ثبت نشد');
                            // setStatus(1);
                            // setShowPopup(true);
                            // refteshData();
                          }
                          // return res.data;
                        });
                      // return { ...prevState, data };
                      // });
                    }
                  } else {
                    // setLoading(false);
                    setTextImage(false);
                    setQuestionImage(false);
                    alert('ابتدا فیلد های موردنظر را پر کنید!!');
                    // setStatus(1);
                    // setShowPopup(true);
                    // refteshData();
                  }
                ////////////////////////////
                dataUpdate[index] = newData;
                setInnerData([...dataUpdate]);
  
                resolve();
                reject(loadVariable.load = false);
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
      </div>
    )
};

export default TrueAndFalse;