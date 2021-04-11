// import React, { useContext } from 'react';
// import MaterialTable from 'material-table';
// // import PopUp from '@components/UI/popUp/popup';
// import { IconButton } from '@material-ui/core';
// import Icon from '@material-ui/core/Icon';
// import moment from 'moment';
// import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// // import './editeAxamTable.styles.jsx';
// // import { ConvertToString } from '@components/ConvertToString/ConvertToString';
// import { useSelector } from 'react-redux';
// // import AppContext from 'app/AppContext';

// const graphql_server_uri = '/graphql';
// const MaterialTableEditAxams = ({ selectedDate, getQuestionsId }) => {
//   //////////////////////////
//   // const appContext = useContext(AppContext);
//   // const user = useSelector(({ auth }) => auth.user);
//   const [data, setData] = React.useState([]);
//   // const [message, setMessage] = React.useState('');
//   // const [status, setStatus] = React.useState(0);
//   // const [ShowPopup, setShowPopup] = React.useState(false);
//   //////////////////////////
//   // {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_Start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
//   const [columns, setColumns] = React.useState([
//     {
//       title: 'تاریخ شروع',
//       field: 'exam_start_date',
//       render: data => {
//         return (
//           <p style={{
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//             width: '50px'
//           }}>
//             {data.exam_start_date}
//           </p>)
//       },
//     },
//     {
//       title: 'تاریخ پایان',
//       field: 'exam_end_date',
//       render: data => {
//         return (
//           <p style={{
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//             width: '50px'
//           }}>
//             {data.exam_end_date}
//           </p>)
//       },
//     },
//     {
//       title: ' شروع امتحان',
//       field: 'exam_Start',
//       type: 'datetime',
//       render: data => {
//         return (
//           <p style={{
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//             width: '50px'
//           }}>
//             {moment(data.exam_Start).format('HH:mm:00')}
//           </p>)
//       },
//       editComponent: ({ value, onChange }) => (
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//           <TimePicker
//             okLabel="تأیید"
//             cancelLabel="لغو"
//             clearLabel="پاک کردن"
//             ampm={false}
//             openTo="hours"
//             views={['hours', 'minutes', 'seconds']}
//             format="HH:mm:ss"
//             label="With seconds"
//             value={value}
//             onChange={onChange}
//           />
//         </MuiPickersUtilsProvider>
//       ),
//     },
//     {
//       title: ' پایان امتحان',
//       field: 'exam_end',
//       type: 'datetime',
//       render: data => {
//         return (
//           <p style={{
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//             width: '50px'
//           }}>
//             {moment(data.exam_end).format('HH:mm:00')}
//           </p>)
//       },
//       editComponent: ({ value, onChange }) => (
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//           <TimePicker
//             okLabel="تأیید"
//             cancelLabel="لغو"
//             clearLabel="پاک کردن"
//             ampm={false}
//             openTo="hours"
//             views={['hours', 'minutes', 'seconds']}
//             format="HH:mm:ss"
//             label="With seconds"
//             value={value}
//             onChange={onChange}
//           />
//         </MuiPickersUtilsProvider>
//       ),
//     },
//     {
//       title: 'پایه',
//       field: 'exam_level',
//       lookup: ['اول','دوم','سوم'],
//       // appContext.initConfig.newLevel,
//       render: data => {
//         return (
//           <p style={{
//             textAlign: 'center',
//             width: '50px',
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//           }}>
//             {parseInt(data.exam_level) === parseInt(data.exam_level, 10)
//               ? 
//               // appContext.initConfig.newLevel[data.exam_level]
//               data.exam_level
//               : data.exam_level}
//           </p>)
//       },
//     },
//     {
//       title: 'نام کلاس',
//       field: 'exam_className',
//       lookup: ['الف','ب','ج'],
//       // appContext.initConfig.newClassName,
//       render: data => {
//         return (
//           <p style={{
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//             width: '50px'
//           }}>
//             {parseInt(data.exam_className) ===
//               parseInt(data.exam_className, 10)
//               ? 
//               data.exam_className
//               // appContext.initConfig.newClassName[data.exam_className]
//               : data.exam_className}
//           </p>)
//       },
//     },
//     {
//       title: 'نام درس', field: 'exam_courseName',
//       lookup: ['ریاضی','فیزیک','علوم'],
//       // appContext.initConfig.newCourseName,
//       render: data => {
//         return (
//           <p style={{
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//             width: '50px'
//           }}>
//             {parseInt(data.exam_courseName) === parseInt(data.exam_courseName, 10)
//               ? 
//               data.exam_courseName
//               // appContext.initConfig.newCourseName[data.exam_courseName]
//               : data.exam_courseName}
//           </p>)
//       },
//     },
//     {
//       title: 'موضوع امتحان', field: 'exam_topic',
//       // lookup: appContext.initConfig.newCourseName,
//       render: data => {
//         return (
//           <p style={{
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//             width: '50px'
//           }}>
//             {data.exam_topic}
//           </p>)
//       },
//     },
//     {
//       title: 'نمره', field: 'exam_maxScore',
//       editComponent: props => (
//         <input
//           style={{
//             minWidth: '50px',
//             border: "2px solid red",
//             borderRadius: "4px",
//             textAlign: 'center'
//           }}
//           type="number"
//           value={props.value}
//           onChange={e => props.onChange(e.target.value)}
//         />
//       ),
//       render: data => {
//         return (
//           <p style={{
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//             width: '50px'
//           }}>
//             {data.exam_maxScore}
//           </p>)
//       },
//     },
//     {
//       title: 'گزارش',
//       field: 'internal_action',
//       editable: 'never',
//       render: rowData =>
//         rowData && (
//           <IconButton
//             onClick={e => {
//               // setMaxScore(rowData.exam_maxScore);
//               getQuestionsId(rowData.exam_id);

//             }}
//             style={{ border: 'none', outline: 'none' }}
//           >
//             <Icon style={{ fontSize: 40, color: '#1f4971' }}>assignment</Icon>
//           </IconButton>
//         ),
//     },
//   ]);

//   const [state, setState] = React.useState({
//     columns: [
//       // { title: 'id', field: 'exam_id', editable: 'never' },
//       { title: 'تاریخ شروع', field: 'exam_start_date' },
//       { title: 'تاریخ پایان', field: 'exam_end_date' },
//       { title: ' شروع امتحان', field: 'exam_Start' },
//       { title: ' پایان امتحان', field: 'exam_end' },
//       // { title: 'سوالات', field: 'exam_pdf' },
//       { title: 'پایه', field: 'exam_level' },
//       { title: 'نام کلاس', field: 'exam_className' },
//       { title: 'نام درس', field: 'exam_courseName' },
//       { title: 'موضوع امتحان', field: 'exam_topic' },
//       { title: 'نمره', field: 'exam_maxScore' },
//       {
//         title: 'گزارش',
//         field: 'internal_action',
//         editable: false,
//       },
//     ],
//     data: [],
//   });
//   ////////////////////////
//   // const togglePopup = () => {
//   //   setShowPopup(!ShowPopup);
//   // };

//   const refteshData = () => {
//     // async function fetchData() {
//     //   /////////////////////
//     //   const result = await fetch(graphql_server_uri, {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({
//     //       query: `
//     //                 mutation{
//     //                     getExamsWithDate(
//     //                         axam_input: {
//     //                             exam_teacherId: "${user.user.person_id}"
//     //                             exam_data: "${selectedDate}"
//     //                       }
//     //                     ){
//     //                         exam_id
//     //                         exam_data
//     //                         exam_Start
//     //                         exam_end
//     //                         exam_teacherId
//     //                         exam_teacherName
//     //                         exam_level
//     //                         exam_className
//     //                         exam_courseName
//     //                         exam_maxScore
//     //                         exam_topic
//     //                     }
//     //                 }                      
//     //             `,
//     //     }),
//     //   })
//     //     .then(res => res.json())
//     //     .then(res => {
//     //       return res.data;
//     //     });
//     //   if (result.getExamsWithDate.length > 0) {
//     //     setData(result.getExamsWithDate);
//     //   }
//     // }

//     // fetchData();
//   };

//   React.useEffect(() => {
//     refteshData();
//   }, [selectedDate]);

//   return (
//     <div dir="rtl">
//       <MaterialTable
//         // title="ویرایش امتحان"
//         columns={columns}
//         data={data}
//         options={{
//           toolbar: false,
//           showTitle: false,
//           search: false,
//           headerStyle: {
//             backgroundColor: '#6c95BD',
//             fontFamily: 'BTitrBold',
//             textAlign: 'center',
//             color: '#FFF',
//             zIndex: 0,
//             fontSize: '12px'
//           },
//           rowStyle: rowData => ({
//             backgroundColor: rowData.tableData.id % 2 === 0 ? '#EEE' : '#FFF',
//             fontFamily: 'BNazaninBold',
//             fontSize: 24,
//             marginTop: '2px',
//             borderStyle: 'double',
//           }),
//           cellStyle: {
//             fontFamily: 'BNazaninBold',
//             fontSize: 16,
//             textAlign: 'center',
//           },
//         }}
//         editable={{
//           onRowUpdate: (newData, oldData) =>
//             new Promise(resolve => {
//               setTimeout(() => {
//                 resolve();
//                 if (oldData) {
//                   setState(prevState => {
//                     const data = [...prevState.data];
//                     data[data.indexOf(oldData)] = newData;
//                     // var teacherName =
//                     //   user.user.person_name +
//                     //   ' ' +
//                     //   user.user.person_surname;
//                     // // console.log('oldData:');
//                     // // console.log(oldData);
//                     // // console.log('newData:');
//                     // // console.log(newData);
//                     // fetch(graphql_server_uri, {
//                     //   method: 'POST',
//                     //   headers: { 'Content-Type': 'application/json' },
//                     //   body: JSON.stringify({
//                     //     query: `
//                     //         mutation{
//                     //             editeAxam(
//                     //                 axam_input_old: {
//                     //                 exam_id: "${oldData.exam_id}"
//                     //                 exam_start_date: "${oldData.exam_start_date}"
//                     //                 exam_end_date: "${oldData.exam_end_date}"
//                     //                 exam_Start: "${oldData.exam_Start}"
//                     //                 exam_end: "${oldData.exam_end}"
//                     //                 // exam_teacherId: "${user.user.person_id}"
//                     //                 // exam_teacherName: "${teacherName}"
//                     //                 exam_level: "${oldData.exam_level}"
//                     //                 exam_className: "${oldData.exam_className}"
//                     //                 exam_courseName:"${oldData.exam_courseName}"
//                     //                 exam_maxScore: "${oldData.exam_maxScore}"
//                     //                 exam_topic: "${oldData.exam_topic}"
//                     //             },
//                     //             axam_input_new: {
//                     //                 exam_id: "${newData.exam_id}"
//                     //                 exam_start_date: "${newData.exam_start_date}"
//                     //                 exam_end_date: "${newData.exam_end_date}"
//                     //                 exam_Start: "${newData.exam_Start}"
//                     //                 exam_end: "${newData.exam_end}"
//                     //                 exam_teacherId: "${user.user.person_id}"
//                     //                 exam_teacherName: "${teacherName}"
//                     //                 exam_level: "${newData.exam_level}"
//                     //                 exam_className: "${newData.exam_className}"
//                     //                 exam_courseName:"${newData.exam_courseName}"
//                     //                 exam_maxScore: "${newData.exam_maxScore}"
//                     //                 exam_topic: "${newData.exam_topic}"
//                     //             }
//                     //           ){
//                     //             exam_id
//                     //           }
//                     //         }
//                     //       `,
//                     //   }),
//                     // })
//                     //   .then(res => res.json())
//                     //   .then(res => {
//                     //     // return res.data;
//                     //     if (res.data.editeAxam.exam_id) {
//                     //       // setMessage('اطلاعاتی به درستی آپدیت نشد');
//                     //       // setStatus(1);
//                     //       // setShowPopup(true);
//                     //     } else {
//                     //       // setMessage('اطلاعاتی به درستی آپدیت شد');
//                     //       // setStatus(0);
//                     //       // setShowPopup(true);
//                     //       refteshData();
//                     //     }
//                     //   });
//                     return { ...prevState, data };
//                   });
//                 }
//               }, 600);
//             }),
//           onRowDelete: oldData =>
//             new Promise(resolve => {
//               setTimeout(() => {
//                 resolve();
//                 setState(prevState => {
//                   const data = [...prevState.data];
//                   data.splice(data.indexOf(oldData), 1);
//                   // var teacherName =
//                   //   user.user.person_name +
//                   //   ' ' +
//                   //   user.user.person_surname;
//                   // fetch(graphql_server_uri, {
//                   //   method: 'POST',
//                   //   headers: { 'Content-Type': 'application/json' },
//                   //   body: JSON.stringify({
//                   //     query: `
//                   //       mutation{
//                   //           deleteAxam(
//                   //               axam_input: {
//                   //                   exam_id: "${oldData.exam_id}"
//                   //                   exam_start_date: "${oldData.exam_start_date}"
//                   //                   exam_end_date: "${oldData.exam_end_date}"
//                   //                   exam_Start: "${oldData.exam_Start}"
//                   //                   exam_end: "${oldData.exam_end}"
//                   //                   exam_teacherId: "${user.user.person_id}"
//                   //                   exam_teacherName: "${teacherName}"
//                   //                   exam_level: "${oldData.exam_level}"
//                   //                   exam_className: "${oldData.exam_className}"
//                   //                   exam_courseName:"${oldData.exam_courseName}"
//                   //                   exam_maxScore: "${oldData.exam_maxScore}"
//                   //                   exam_topic: "${oldData.exam_topic}"
//                   //             },
//                   //         ){
//                   //           exam_id
//                   //         }
//                   //       }                      
//                   //     `,
//                   //   }),
//                   // })
//                   //   .then(res => res.json())
//                   //   .then(res => {
//                   //     if (res.data.deleteAxam && res.data.deleteAxam.exam_id) {
//                   //       /////
//                   //       // setMessage('اطلاعاتی به درستی حذف نشد');
//                   //       // setStatus(1);
//                   //       // setShowPopup(true);
//                   //     } else {
//                   //       // setMessage('اطلاعاتی به درستی حذف شد');
//                   //       // setStatus(0);
//                   //       // setShowPopup(true);
//                   //       refteshData();
//                   //     }
//                   //   });
//                   return { ...prevState, data };
//                 });
//               }, 600);
//             }),
//         }}
//       />
//       {/* {ShowPopup ? (
//         <PopUp message={message} status={status} closePopup={togglePopup} />
//       ) : null} */}
//     </div>
//   );
// };
// export default React.memo(MaterialTableEditAxams);
///////////////////////////////////////////////////////////
import React, { useContext } from 'react';
import MaterialTable from 'material-table';
// import PopUp from '@components/UI/popUp/popup';
import { IconButton } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
// import './editeAxamTable.styles.jsx';
// import { ConvertToString } from '@components/ConvertToString/ConvertToString';
import { useSelector } from 'react-redux';
// import AppContext from 'app/AppContext';

const graphql_server_uri = '/graphql';
const MaterialTableEditAxams = ({ selectedDate, getQuestionsId }) => {
  //////////////////////////
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  const [data, setData] = React.useState([
    {exam_id:'1' , exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_Start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_id:'2' , exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_Start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_id:'3' , exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_Start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_id:'4' , exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_Start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_id:'5' ,exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_Start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
  ]);
  //////////////////////////
  const [columns, setColumns] = React.useState([
    {
      title: 'تاریخ شروع',
      field: 'exam_start_date',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.exam_start_date}
          </p>)
      },
    },
    {
      title: 'تاریخ پایان',
      field: 'exam_end_date',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.exam_end_date}
          </p>)
      },
    },
    {
      title: ' شروع امتحان',
      field: 'exam_Start',
      type: 'datetime',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {moment(data.exam_Start).format('HH:mm:00')}
          </p>)
      },
      editComponent: ({ value, onChange }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            ampm={false}
            openTo="hours"
            views={['hours', 'minutes', 'seconds']}
            format="HH:mm:ss"
            label="With seconds"
            value={value}
            onChange={onChange}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: ' پایان امتحان',
      field: 'exam_end',
      type: 'datetime',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {moment(data.exam_end).format('HH:mm:00')}
          </p>)
      },
      editComponent: ({ value, onChange }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TimePicker
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            ampm={false}
            openTo="hours"
            views={['hours', 'minutes', 'seconds']}
            format="HH:mm:ss"
            label="With seconds"
            value={value}
            onChange={onChange}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    {
      title: 'پایه',
      field: 'exam_level',
      lookup: ['اول','دوم','سوم'],
      // appContext.initConfig.newLevel,
      render: data => {
        return (
          <p style={{
            textAlign: 'center',
            width: '50px',
            fontFamily: 'BNazaninBold',
            fontSize: 16,
          }}>
            {parseInt(data.exam_level) === parseInt(data.exam_level, 10)
              ? 
              // appContext.initConfig.newLevel[data.exam_level]
              data.exam_level
              : data.exam_level}
          </p>)
      },
    },
    {
      title: 'نام کلاس',
      field: 'exam_className',
      lookup: ['الف','ب','ج'],
      // appContext.initConfig.newClassName,
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {parseInt(data.exam_className) ===
              parseInt(data.exam_className, 10)
              ? 
              data.exam_className
              // appContext.initConfig.newClassName[data.exam_className]
              : data.exam_className}
          </p>)
      },
    },
    {
      title: 'نام درس', field: 'exam_courseName',
      lookup: ['ریاضی','فیزیک','علوم'],
      // appContext.initConfig.newCourseName,
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {parseInt(data.exam_courseName) === parseInt(data.exam_courseName, 10)
              ? 
              data.exam_courseName
              // appContext.initConfig.newCourseName[data.exam_courseName]
              : data.exam_courseName}
          </p>)
      },
    },
    {
      title: 'موضوع امتحان', field: 'exam_topic',
      // lookup: appContext.initConfig.newCourseName,
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.exam_topic}
          </p>)
      },
    },
    {
      title: 'نمره', field: 'exam_maxScore',
      editComponent: props => (
        <input
          style={{
            minWidth: '50px',
            border: "2px solid red",
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
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.exam_maxScore}
          </p>)
      },
    },
    {
      title: 'سوالات',
      field: 'internal_action',
      editable: 'never',
      render: rowData =>
        rowData && (
          <IconButton
            onClick={e => {
              // setMaxScore(rowData.exam_maxScore);
              getQuestionsId(rowData.exam_id);

            }}
            style={{ border: 'none', outline: 'none' }}
          >
            {/* import RateReviewIcon from '@material-ui/icons/RateReview'; */}
            {/* color: '#1f4971' */}
            <Icon style={{ fontSize: 40, color:'#263238' }}>rate_review</Icon>
          </IconButton>
        ),
    },
  ]);

  const [state, setState] = React.useState({
    columns: [
      // { title: 'id', field: 'exam_id', editable: 'never' },
      { title: 'تاریخ شروع', field: 'exam_start_date' },
      { title: 'تاریخ پایان', field: 'exam_end_date' },
      { title: ' شروع امتحان', field: 'exam_Start' },
      { title: ' پایان امتحان', field: 'exam_end' },
      // { title: 'سوالات', field: 'exam_pdf' },
      { title: 'پایه', field: 'exam_level' },
      { title: 'نام کلاس', field: 'exam_className' },
      { title: 'نام درس', field: 'exam_courseName' },
      { title: 'موضوع امتحان', field: 'exam_topic' },
      { title: 'نمره', field: 'exam_maxScore' },
      {
        title: 'گزارش',
        field: 'internal_action',
        editable: false,
      },
    ],
    data: [],
  });
  ///////////////////////////////////////////////////
  const refteshData = () => {
    // async function fetchData() {
    //   /////////////////////
    //   const result = await fetch(graphql_server_uri, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       query: `
    //                 mutation{
    //                     getExamsWithDate(
    //                         axam_input: {
    //                             exam_teacherId: "${user.user.person_id}"
    //                             exam_data: "${selectedDate}"
    //                       }
    //                     ){
    //                         exam_id
    //                         exam_data
    //                         exam_Start
    //                         exam_end
    //                         exam_teacherId
    //                         exam_teacherName
    //                         exam_level
    //                         exam_className
    //                         exam_courseName
    //                         exam_maxScore
    //                         exam_topic
    //                     }
    //                 }                      
    //             `,
    //     }),
    //   })
    //     .then(res => res.json())
    //     .then(res => {
    //       return res.data;
    //     });
    //   if (result.getExamsWithDate.length > 0) {
    //     setData(result.getExamsWithDate);
    //   }
    // }

    // fetchData();
  };

  React.useEffect(() => {
    refteshData();
  }, [selectedDate]);
  /////////////////////////

  return (
    <Grid dir="rtl" xs={12} sm={12} md={11} style={{margin:'0 auto'}}>
      <MaterialTable
        title="امتحانات"
        columns={columns}
        data={data}
        // actions={[
        //   {
        //     icon: 'list',
        //     tooltip: 'لیست دانش آموزان',
        //     onClick: (event, rowData) => getStudentList(rowData),
        //   },
        //   // {
        //   //   icon: 'trending_up',
        //   //   tooltip: 'رنکینگ',
        //   //   onClick: (event, rowData) => handleRankStudent(rowData),
        //   // },
        //   // {
        //   //   icon: 'equalizer',
        //   //   tooltip: 'گزارش جزییات امتحان',
        //   //   onClick: (event, rowData) => handleDetailsQuestions(rowData),
        //   // },
        // ]}
        options={{
          toolbar: false,
          showTitle: false,
          search: false,
          headerStyle: {
            // backgroundColor:'linear-gradient(#3f87a6, #ebf8e1, #f69d3c)' ,
            // '#3f87a6',
            background:'linear-gradient(#3f87a6, #ebf8e1)' ,
            // backgroundRepeat:'no-repeat',
            // backgroundSize:'cover',
            fontFamily: 'BTitrBold',
            textAlign: 'center',
            color: '#000',
            lineHeight:'20px',
            zIndex: 0,
            fontSize: '12px',
            // :last-child 
            // {
            //   borderTopLeftRadius:'1rem',
            // }
            // borderRadius:'1rem',
          },
          rowStyle: rowData => ({
            backgroundColor: rowData.tableData.id % 2 === 0 ? '#EEE' : '#FFF',
            fontFamily: 'BNazaninBold',
            fontSize: 24,
            marginTop: '2px',
            // borderStyle: 'solid',
            // borderStyle: 'double',
            marginTop: '2px',
            // borderStyle: 'double',
          }),
          cellStyle: {
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
          },
        }}

        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    // var teacherName =
                    //   user.user.person_name +
                    //   ' ' +
                    //   user.user.person_surname;
                    // // console.log('oldData:');
                    // // console.log(oldData);
                    // // console.log('newData:');
                    // // console.log(newData);
                    // fetch(graphql_server_uri, {
                    //   method: 'POST',
                    //   headers: { 'Content-Type': 'application/json' },
                    //   body: JSON.stringify({
                    //     query: `
                    //         mutation{
                    //             editeAxam(
                    //                 axam_input_old: {
                    //                 exam_id: "${oldData.exam_id}"
                    //                 exam_start_date: "${oldData.exam_start_date}"
                    //                 exam_end_date: "${oldData.exam_end_date}"
                    //                 exam_Start: "${oldData.exam_Start}"
                    //                 exam_end: "${oldData.exam_end}"
                    //                 // exam_teacherId: "${user.user.person_id}"
                    //                 // exam_teacherName: "${teacherName}"
                    //                 exam_level: "${oldData.exam_level}"
                    //                 exam_className: "${oldData.exam_className}"
                    //                 exam_courseName:"${oldData.exam_courseName}"
                    //                 exam_maxScore: "${oldData.exam_maxScore}"
                    //                 exam_topic: "${oldData.exam_topic}"
                    //             },
                    //             axam_input_new: {
                    //                 exam_id: "${newData.exam_id}"
                    //                 exam_start_date: "${newData.exam_start_date}"
                    //                 exam_end_date: "${newData.exam_end_date}"
                    //                 exam_Start: "${newData.exam_Start}"
                    //                 exam_end: "${newData.exam_end}"
                    //                 exam_teacherId: "${user.user.person_id}"
                    //                 exam_teacherName: "${teacherName}"
                    //                 exam_level: "${newData.exam_level}"
                    //                 exam_className: "${newData.exam_className}"
                    //                 exam_courseName:"${newData.exam_courseName}"
                    //                 exam_maxScore: "${newData.exam_maxScore}"
                    //                 exam_topic: "${newData.exam_topic}"
                    //             }
                    //           ){
                    //             exam_id
                    //           }
                    //         }
                    //       `,
                    //   }),
                    // })
                    //   .then(res => res.json())
                    //   .then(res => {
                    //     // return res.data;
                    //     if (res.data.editeAxam.exam_id) {
                    //       // setMessage('اطلاعاتی به درستی آپدیت نشد');
                    //       // setStatus(1);
                    //       // setShowPopup(true);
                    //     } else {
                    //       // setMessage('اطلاعاتی به درستی آپدیت شد');
                    //       // setStatus(0);
                    //       // setShowPopup(true);
                    //       refteshData();
                    //     }
                    //   });
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  // var teacherName =
                  //   user.user.person_name +
                  //   ' ' +
                  //   user.user.person_surname;
                  // fetch(graphql_server_uri, {
                  //   method: 'POST',
                  //   headers: { 'Content-Type': 'application/json' },
                  //   body: JSON.stringify({
                  //     query: `
                  //       mutation{
                  //           deleteAxam(
                  //               axam_input: {
                  //                   exam_id: "${oldData.exam_id}"
                  //                   exam_start_date: "${oldData.exam_start_date}"
                  //                   exam_end_date: "${oldData.exam_end_date}"
                  //                   exam_Start: "${oldData.exam_Start}"
                  //                   exam_end: "${oldData.exam_end}"
                  //                   exam_teacherId: "${user.user.person_id}"
                  //                   exam_teacherName: "${teacherName}"
                  //                   exam_level: "${oldData.exam_level}"
                  //                   exam_className: "${oldData.exam_className}"
                  //                   exam_courseName:"${oldData.exam_courseName}"
                  //                   exam_maxScore: "${oldData.exam_maxScore}"
                  //                   exam_topic: "${oldData.exam_topic}"
                  //             },
                  //         ){
                  //           exam_id
                  //         }
                  //       }                      
                  //     `,
                  //   }),
                  // })
                  //   .then(res => res.json())
                  //   .then(res => {
                  //     if (res.data.deleteAxam && res.data.deleteAxam.exam_id) {
                  //       /////
                  //       // setMessage('اطلاعاتی به درستی حذف نشد');
                  //       // setStatus(1);
                  //       // setShowPopup(true);
                  //     } else {
                  //       // setMessage('اطلاعاتی به درستی حذف شد');
                  //       // setStatus(0);
                  //       // setShowPopup(true);
                  //       refteshData();
                  //     }
                  //   });
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
      {/* {ShowPopup ? (
        <PopUp message={message} status={status} closePopup={togglePopup} />
      ) : null} */}
    </Grid>
  );
};
export default React.memo(MaterialTableEditAxams);
