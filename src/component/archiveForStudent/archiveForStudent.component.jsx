// import React, { useEffect, useState } from 'react';
// // import MaterialTableAxams from './axamTableForStudent';
// // import './archiveForStudent.styles.jsx';
// // import PopUpProgress from '../progressList/popupProgress';
// import PersianDatePicker from '../../generalComponent/MaterialDatePicker/MaterialDatePicker';
// import { fixNumbers } from '../../generalComponent/fixNumbers';
// // import { fixNumbers } from '@components/FixNumbers/fixNumbers';
// // import PersianDatePicker from '@components/MaterialDatePicker/MaterialDatePicker';
// import { Grid } from '@material-ui/core';
// import { useSelector } from 'react-redux';
// ////////////
// var moment = require('moment-jalaali');

// const ArchiveForStudent = () => {
//   // const user = useSelector(({ auth }) => auth.user);
//   const [selectedDate, handleDateChange] = useState(moment());
//   const [newSelectedDate, setNewSelectedDate] = useState('');
//   /////////////////////////
//   const [courseName, setCourseName] = useState('');
//   const [Nameclass, setClassName] = useState('');
//   const [level, setLevel] = useState('');
//   const [axamId, setExamID] = React.useState('');
//   const [ShowRank, setShowRank] = useState(false);

//   // const closePopUp = () => {
//   //   setShowRank(!ShowRank);
//   // }

//   useEffect(() => {
//     setNewSelectedDate(fixNumbers(moment(selectedDate,
//     ).format('jYYYY/jMM/jDD')));
//   }, [selectedDate]);

//   /////////////////////////
//   return (
//     <div>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Grid
//             container
//             direction="row"
//             justify="flex-start"
//             alignItems="center"
//             style={{
//               borderRadius: '15px',
//               border: '1px solid #b5b5b5',
//               backgroundColor: '#ffffff',
//             }}
//           >
//             <div style={{ paddingLeft: '30px', paddingRight: '10px' }}>
//               <label
//                 className="fontText locationLable"
//                 style={{
//                   textAlign: 'center',
//                 }}
//               >
//                 تاریخ موردنظر را انتخاب کنید:
//                 </label>
//             </div>
//             <PersianDatePicker
//               selectedDate={selectedDate}
//               handleDateChange={handleDateChange}
//             />
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sm={12} md={12}>
//           {/* <MaterialTableAxams
//             selectedDate={newSelectedDate}
//             setCourseName={setCourseName}
//             setLevel={setLevel}
//             setClassName={setClassName}
//             setExamID={setExamID}
//             axamId={axamId}
//             setShowRank={setShowRank}
//           /> */}
//         </Grid>
//         {/* {ShowRank ?
//           <Grid item xs={12} sm={12} md={12}>
//             <PopUpProgress close={closePopUp} courseName={courseName} level={level} Nameclass={Nameclass} studentId={user.user.person_id} />
//           </Grid>
//           : ''} */}
//       </Grid>
//     </div >
//   );
// };
// export default ArchiveForStudent;

///////////////////////////////
import React, { useEffect, useState } from 'react';
import MaterialTableAxamsForStudent from './examsTableForStudent.component';
// import MaterialTableAxams from './axamTableForStudent';
import {DateContainer,LableDiv , Lable ,ListOfStudentContainer,TableContainer} from './archiveForStudent.styles';
import PersianDatePicker from '../../generalComponent/MaterialDatePicker/MaterialDatePicker';
import { fixNumbers } from '../../generalComponent/fixNumbers';
// import { fixNumbers } from '@components/FixNumbers/fixNumbers';
// import PersianDatePicker from '@components/MaterialDatePicker/MaterialDatePicker';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
/////////////////////////////////////////////////query
import { useQuery} from 'react-apollo';
import { GET_EXAMS_FOR_STUDENT } from '../../graphql/resolver';
////////////////////////////////////////////////

var moment = require('moment-jalaali');
const graphql_server_uri = '/graphql';

const ArchiveForStudent = () => {
  //////////////////////////////////////////
  const [selectedDate, handleDateChange] = useState(moment());
  const [newSelectedDate, setNewSelectedDate] = useState('');
  const [dataTable, setDataTable] = useState([]);
  //////////////////////////////////////////
  const { loading, error, data ,refetch  } = useQuery(GET_EXAMS_FOR_STUDENT , {
    variables: {  userName: "210",
    password: "210",
    level: "1",
    class: "1",
    date: newSelectedDate },
    notifyOnNetworkStatusChange: true
  });
  ////////////////////////////////////////////////////////////
  function createRows(exams){
    // console.log('exams',exams);
    var MyRows = [];
    for (let index = 0; index < exams.length; index++) {
        var EPD = exams[index].examParentsListByDate;
        // console.log('EPDEPD',EPD);
        if(EPD && EPD.length > 0 ){
            var cn = exams[index].course;
            for (let index2 = 0; index2 < EPD.length; index2++) {
              var examChild =  EPD[index2].examChild;
              for (let index3 = 0; index3 < examChild.length; index3++) {
                // const element = examChild[index3];
                MyRows.push({
                  id : examChild[index3].id,
                  // id : EPD[index2].id,
                  exam_courseName : cn,
                  teacher_name : exams[index].people[0].name + ' ' + exams[index].people[0].surname ,
                  examParent_topic : EPD[index2].examParent_topic,
                  examParent_start_date : EPD[index2].examParent_start_date,
                  examParent_stop_date : EPD[index2].examParent_stop_date,
                  examParent_start : EPD[index2].examParent_start ,
                  examParent_end : EPD[index2].examParent_end ,
                  examParent_duration: EPD[index2].examParent_duration,
                  // examParent_start : EPD[index2].examParent_start ? fixNumbers(moment(EPD[index2].examParent_start).tz('Asia/Tehran').format('HH:mm:00')) : '',
                  // examParent_end : EPD[index2].examParent_end ? fixNumbers(moment(EPD[index2].examParent_end).tz('Asia/Tehran').format('HH:mm:00')) : '',
                  }
              )
                
              }
              //   MyRows.push({
              //     id : EPD[index2].id,
              //     exam_courseName : cn,
              //     teacher_name : exams[index].people[0].name + ' ' + exams[index].people[0].surname ,
              //     examParent_topic : EPD[index2].examParent_topic,
              //     examParent_start_date : EPD[index2].examParent_start_date,
              //     examParent_stop_date : EPD[index2].examParent_stop_date,
              //     examParent_start : EPD[index2].examParent_start ,
              //     examParent_end : EPD[index2].examParent_end ,
              //     examParent_duration: EPD[index2].examParent_duration,
              //     // examParent_start : EPD[index2].examParent_start ? fixNumbers(moment(EPD[index2].examParent_start).tz('Asia/Tehran').format('HH:mm:00')) : '',
              //     // examParent_end : EPD[index2].examParent_end ? fixNumbers(moment(EPD[index2].examParent_end).tz('Asia/Tehran').format('HH:mm:00')) : '',
              //     }
              // )
              
            }
            
        }else{

        }
    }
    setDataTable(MyRows);
  }
  ////////////////////////////////////
  // useEffect(()=>{
  //   var getReq = setInterval(() => {
  //     refetch();
  //   }, 60000);

  //   return () => {
  //     clearInterval(getReq);
  //   };
  // },[])

  useEffect(()=>{
    if(data && data.groupsListByStudent){
      console.log('data.groupsListByStudent',data.groupsListByStudent);
        createRows(data.groupsListByStudent);
    }
  },[data]);

  useEffect(() => {
    setNewSelectedDate(
      fixNumbers(moment(selectedDate).format('jYYYY/jMM/jDD')),
    );
  }, [selectedDate]);

  useEffect(()=>{
    refetch();
  },[newSelectedDate]);
  ////////////////////////////////////
  useEffect(()=>{
    console.log('createeeeeeeTable');
  },[]);
  return (
    <div>
      <Grid style={{border:'1px solid #000',margin:'3rem'}} >
        <TableContainer >
        <DateContainer>
          <LableDiv>
            <Lable>
              تاریخ موردنظر را انتخاب کنید:
            </Lable>
          </LableDiv>
          <PersianDatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </DateContainer>
        <Grid item xs={12} sm={12} md={12}>
          <MaterialTableAxamsForStudent
            dataTable={dataTable}
          />
        </Grid>
        </TableContainer>
      </Grid>
    </div >
  );
};

export default ArchiveForStudent;

