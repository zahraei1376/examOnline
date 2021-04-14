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

var moment = require('moment-jalaali');
const graphql_server_uri = '/graphql';

const ArchiveForStudent = () => {

  const [selectedDate, handleDateChange] = useState(moment());
  const [newSelectedDate, setNewSelectedDate] = useState('');
  /////////////////////////
  const [courseName, setCourseName] = useState('');
  const [Nameclass, setClassName] = useState('');
  const [level, setLevel] = useState('');
  const [axamId, setExamID] = React.useState('');
  const [ShowRank, setShowRank] = useState(false);
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    setNewSelectedDate(
      fixNumbers(moment(selectedDate).format('jYYYY/jMM/jDD')),
    );
  }, [selectedDate]);

  // const togglePopup = () => {
  //   setShowPopup(!ShowPopup);
  // };


  // const closePopUp = () => {
  //   setShowDetails(!showDetails);
  // }
  /////////////////

  const handleSetExamID = (
    exam_id,
    exam_className,
    exam_level,
  ) => {
    setExamID(exam_id);
    setClassName(exam_className);
    setLevel(exam_level);
  };
  /////////////////////////
  return (
    <div>
      <Grid 
      // container spacing={3}
      style={{border:'1px solid #000',margin:'3rem'}}
      >
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
            selectedDate={newSelectedDate}
            // setShowRank={setShowRank}
            // setShowStudentList={setShowStudentList}
            // setShowDetails={setShowDetails}
            // handleSetExamID={handleSetExamID}
          />
        </Grid>
        </TableContainer>
        {/* {ShowPopup ? (
          <PopUp message={message} status={status} closePopup={togglePopup} />
        ) : null} */}
      </Grid>
    </div >
  );
};

export default ArchiveForStudent;

