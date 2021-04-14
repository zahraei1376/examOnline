import React, { useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
// import PopUp from '@components/UI/popUp/popup';
import moment from 'moment';
// import { ConvertToString } from '@components/ConvertToString/ConvertToString';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
// import AppContext from 'app/AppContext';

const graphql_server_uri = '/graphql';
const MaterialTableAxams = ({
  selectedDate,
  handleSetExamID,
  setShowStudentList,
  setShowRank,
  setShowDetails
}) => {
  //////////////////////////
  // const appContext = useContext(AppContext);
  // const user = useSelector(({ auth }) => auth.user);
  const [data, setData] = React.useState([
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
    {exam_start_date:'14/1/1400',exam_end_date:'14/1/1400',exam_start:'10:30',exam_end:'12:30',exam_level:'اول',exam_className:'ب',exam_courseName:'ریاضی',exam_topic:'ریاضی' ,exam_maxScore:'20'},
  ]);
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState(0);
  const [ShowPopup, setShowPopup] = React.useState(false);
  //////////////////////////
  const [columns, setColumns] = React.useState([
    {
      title: 'تاریخ شروع امتحان',
      field: 'exam_start_date',
      editable: 'never',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.exam_data}
          </p>)
      },
    },
    {
      title: 'تاریخ پایان امتحان',
      field: 'exam_end_date',
      editable: 'never',
      render: data => {
        return (
          <p style={{
            fontFamily: 'BNazaninBold',
            fontSize: 16,
            textAlign: 'center',
            width: '50px'
          }}>
            {data.exam_data}
          </p>)
      },
    },
    {
      title: ' شروع امتحان',
      field: 'exam_start',
      editable: 'never',
      type: 'datetime',
      render: data => {
        return (
          <p style={{
            textAlign: 'center',
            width: '50px',
            fontFamily: 'BNazaninBold',
            fontSize: 16,
          }}>
            {data.exam_start}
            {/* {moment(data.exam_start).format('HH:mm:00')} */}
          </p>)
      },
    },
    {
      title: ' پایان امتحان',
      field: 'exam_end',
      editable: 'never',
      type: 'datetime',
      render: data => {
        return (
          <p style={{
            textAlign: 'center',
            width: '50px',
            fontFamily: 'BNazaninBold',
            fontSize: 16,
          }}>
            {data.exam_end}
            {/* {moment(data.exam_end).format('HH:mm:00')} */}
          </p>)
      },
    },
    // {
    //   title: 'سوالات',
    //   field: 'exam_pdf',
    //   editable: 'never',
    //   render: data => {
    //     return (
    //       <a href={data.exam_pdf} target="_blank" style={{
    //         textAlign: 'center',
    //         width: '50px',
    //         fontFamily: 'BNazaninBold',
    //         fontSize: 16,
    //         color:'#000',
    //         textDecoration:'none',
    //         backgroundColor:'transparent'
    //       }}>
    //         لینک
    //       </a>)
    //   },
    // },
    {
      title: 'پایه',
      field: 'exam_level',
      editable: 'never',
      lookup:['اول', 'دوم'],
      // lookup: appContext.initConfig.newLevel,
      render: data => {
        return (<p style={{
          fontFamily: 'BNazaninBold',
          fontSize: 16,
          textAlign: 'center',
          width: '50px'
        }}>
          {parseInt(data.exam_level) === parseInt(data.exam_level, 10)
            ? 
            data.exam_level
            // appContext.initConfig.newLevel[data.exam_level]
            : data.exam_level}
        </p>)
      },
    },
    {
      title: 'نام کلاس',
      field: 'exam_className',
      editable: 'never',
      lookup:['ب', 'الف'],
      // appContext.initConfig.newClassName,
      render: data => {
        return (
          <p
            style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
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
      title: 'نام درس', field: 'exam_courseName', editable: 'never',
      render: data => {
        return (
          <p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
            {parseInt(data.exam_courseName) ===
              parseInt(data.exam_courseName, 10)
              ? 
              data.exam_courseName
              // appContext.initConfig.newCourseName[data.exam_courseName]
              : data.exam_courseName
            }
          </p>)
      },
    },
    {
      title: 'موضوع امتحان', field: 'exam_topic', editable: 'never',
      render: data => {
        return (
          <p style={{ fontFamily: 'BNazaninBold', textAlign: 'center', width: '50px' }}>
           {data.exam_topic}
          </p>)
      },
    },
    {
      title: 'حداکثر نمره', field: 'exam_maxScore', editable: 'never',
      render: data => {
        return (<p style={{
          fontFamily: 'BNazaninBold',
          fontSize: 16,
          textAlign: 'center',
          width: '50px'
        }}>{data.exam_maxScore}</p>)
      },
    },
  ]);

  const [state, setState] = React.useState({
    columns: [
      { title: 'تاریخ شروع', field: 'exam_start_date', editable: 'never' },
      { title: 'تاریخ پایان', field: 'exam_end_date', editable: 'never' },
      { title: ' شروع امتحان', field: 'exam_start', editable: 'never' },
      { title: ' پایان امتحان', field: 'exam_end', editable: 'never' },
      // { title: 'سوالات', field: 'exam_pdf', editable: 'never' },
      { title: 'پایه', field: 'exam_level', editable: 'never' },
      { title: 'نام کلاس', field: 'exam_className', editable: 'never' },
      { title: 'نام درس', field: 'exam_courseName', editable: 'never' },
      { title: 'موضوع امتحان', field: 'exam_topic', editable: 'never' },
      { title: 'حداکثر نمره', field: 'exam_maxScore', editable: 'never' },
    ],
    data: [],
  });
  ///////////////////////////////////////////////////
  const getStudentList = async (rowData) => {
    handleSetExamID(
      rowData.exam_id,
      rowData.exam_className,
      rowData.exam_level,
    );
    setShowRank(false);
    setShowDetails(false);
    setShowStudentList(true);

  };

  const handleRankStudent = async (rowData) => {
    /////////////////////////////////////
    handleSetExamID(
      rowData.exam_id,
      rowData.exam_className,
      rowData.exam_level,
    );
    setShowStudentList(false);
    setShowDetails(false);
    setShowRank(true);
  }
  /////////////////////////
  // ////////////////////////
  // const togglePopup = () => {
  //   setShowPopup(!ShowPopup);
  // };

  // const refteshData = () => {
  //   async function fetchData() {
  //     /////////////////////
  //     const result = await fetch(graphql_server_uri, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         query: `
  //                   mutation{
  //                       getExamsWithDate(
  //                           axam_input: {
  //                               exam_teacherId: "${user.user.person_id}"
  //                               exam_data: "${selectedDate}"
  //                         }
  //                       ){
  //                         exam_id
  //                         exam_data
  //                         exam_start
  //                         exam_end
  //                         exam_teacherId
  //                         exam_teacherName
  //                         exam_level
  //                         exam_className
  //                         exam_courseName
  //                         exam_groupId
  //                         exam_maxScore
  //                         exam_method
  //                         exam_topic
  //                       }
  //                   }                      
  //               `,
  //       }),
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         return res.data;
  //       });
  //     if (result.getExamsWithDate.length > 0) {
  //       setData(result.getExamsWithDate);
  //     } else {
  //       setData([]);
  //     }
  //     //////////////////////////
  //   }
  //   fetchData();
  // };

  // React.useEffect(() => {
  //   refteshData();
  // }, [selectedDate]);


  const handleDetailsQuestions = (data) => {
    handleSetExamID(
      data.exam_id,
      data.exam_start,
      data.exam_end,
      data.exam_courseName,
      data.exam_teacherName,
      data.exam_className,
      data.exam_level,
      /////8/9/99
      data.exam_groupId,
      data.exam_data
    );
    setShowRank(false);
    setShowStudentList(false);
    setShowDetails(true);
  }

  return (
    <Grid dir="rtl" xs={12} sm={12} md={11} style={{margin:'0 auto'}}>
      <MaterialTable
        title="امتحانات"
        columns={columns}
        data={data}
        actions={[
          {
            icon: 'list',
            tooltip: 'لیست دانش آموزان',
            onClick: (event, rowData) => getStudentList(rowData),
          },
          // {
          //   icon: 'trending_up',
          //   tooltip: 'رنکینگ',
          //   onClick: (event, rowData) => handleRankStudent(rowData),
          // },
          // {
          //   icon: 'equalizer',
          //   tooltip: 'گزارش جزییات امتحان',
          //   onClick: (event, rowData) => handleDetailsQuestions(rowData),
          // },
        ]}
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
        editable={{}}
      />
      {/* {ShowPopup ? (
        <PopUp message={message} status={status} closePopup={togglePopup} />
      ) : null} */}
    </Grid>
  );
};
export default React.memo(MaterialTableAxams);
