import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {MyTableContainer ,DontAllowBtn ,AllowBtn } from './LoginExamListTable.styles';
import { fixNumbers } from '../../generalComponent/fixNumbers';
import { realeTime } from '../../generalComponent/Clock/getTime';
import MySnackbar from '../../messageBox/messageBox.component';
///////////////////////////////////////////////////
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Close';
/////////////////////////////////////////////////query
import { useQuery} from 'react-apollo';
import { GET_EXAMS_FOR_STUDENT } from '../../graphql/resolver';
var moment = require('moment-jalaali');

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontFamily:'Bnazanin',
    fontSize:'1.8rem',
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const ExamsListTable = ({newSelectedDate}) => {
    let history = useHistory();
    //////////////////////////////////
    const { loading, error, data ,refetch  } = useQuery(GET_EXAMS_FOR_STUDENT , {
        variables: {  userName: "210",
        password: "210",
        level: "1",
        class: "1",
        date: newSelectedDate },
        notifyOnNetworkStatusChange: true
    });
    ///////////////////////////////////
    const [getData,setDate] = useState('');
    const [rows,setRows] =  useState([]);
    const [getDate, setGetDate] = useState('');
    const [time, setTime] = useState('');
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    ////////////////////////////////////
    useEffect(()=>{
        if(data && data.groupsListByStudent){
          console.log('datadata', data);
            setDate(data.groupsListByStudent);
            createRows(data.groupsListByStudent);
        }
    },[data]);

    useEffect(() => {
        var timerGetDateClear = setInterval(() => {
          setGetDate(fixNumbers(realeTime));
          setTime(
            realeTime.toLocaleTimeString([], {
              timeZone: "Asia/Tehran",
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }),
          );
        }, 1000);
        return () => {
          clearInterval(timerGetDateClear);
        };
    },[]);

    useEffect(()=>{
        refetch();
    },[newSelectedDate])
    ////////////////////////////////////
    function createData(
        id,
        course_name ,
        teacher_name,
        examParent_topic ,
        examParent_start_date,
        examParent_stop_date,
        examParent_start,
        examParent_end,
        examParent_duration,
        ) {
        return {
            id : id,
            course_name : course_name ,
            teacher_name : teacher_name ,
            examParent_topic : examParent_topic ,
            examParent_start_date : examParent_start_date ,
            examParent_stop_date : examParent_stop_date ,
            examParent_start : examParent_start ,
            examParent_end : examParent_end ,
            examParent_duration : examParent_duration,
        }
    }
    ////////////////////////////////////
    function createRows(exams){
        console.log('exams',exams);
        var MyRows = [];
        for (let index = 0; index < exams.length; index++) {
            var EPD = exams[index].examParentsListByDate;
            if(EPD && EPD.length > 0 ){
                var cn = exams[index].course;
                for (let index2 = 0; index2 < EPD.length; index2++) {
                    MyRows.push(createData(
                        EPD[index2].id,
                        cn,
                        exams[index].people[0].name + ' ' + exams[index].people[0].surname ,
                        EPD[index2].examParent_topic,
                        EPD[index2].examParent_start_date,
                        EPD[index2].examParent_stop_date,
                        EPD[index2].examParent_start,
                        EPD[index2].examParent_end,
                        EPD[index2].examParent_duration,
                        )
                    )
                    
                }
                
            }else{
    
            }
        }
        setRows(MyRows);
    }
    ////////////////////////////////////
    const buttonInput = (loginInfo, index) => {
        // let startClock = fixNumbers(
        //   moment(loginInfo.examParent_start)
        //     .tz('Asia/Tehran')
        //     .format('HH:mm:00')
        //     .split(':').join(''))
        // let endClock = fixNumbers(
        //   moment(loginInfo.examParent_end)
        //     .tz('Asia/Tehran')
        //     .format('HH:mm:00')
        //     .split(':').join(''));
        let startClock = loginInfo.examParent_start.split(':').join('')
        let endClock = loginInfo.examParent_end.split(':').join('');
        let temp = fixNumbers(time);
        var nowClock = temp.split(":").join('');
        var newDate = fixNumbers(moment(getDate).format('jYYYY/jMM/jDD'));
        var newSplitedDate = newDate.split('/').join('');
        var newstartDate = loginInfo.examParent_start_date.split('/').join('');
        var newEndDate = loginInfo.examParent_stop_date.split('/').join('');
        if(loginInfo.examParent_start_date === loginInfo.examParent_stop_date){//finish
            if (
                true
                // user.role.indexOf('student') !== -1
            ) {
              if (
                nowClock >= startClock &&
                nowClock < endClock
              ) {
                return (
                    <AllowBtn
                      size="large"
                      variant="outlined"
                      block
                      onClick={() => {
                        history.push({
                            pathname: '/examPageForStudent',
                            // search: '?query=abc',
                            state: { examPId: loginInfo.id ? loginInfo.id: ''}
                          })
                        //   console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmm');
                      }}
                    >
                      <DoneOutlineIcon style={{fontSize:'3rem'}} />
                  </AllowBtn>
                );
              } else {
                return (
                    <DontAllowBtn
                      size="large"
                      variant="outlined"
                      onClick={() => {
                        setMessage('زمان امتحان نرسیده است');
                        setStatus('0');
                        setShowMessage(!showMessage);
                      }}
                      block
                    >
                      <CloseIcon style={{fontSize:'3rem'}} />
                  </DontAllowBtn>
                );
              }
            }
        }else{
            if (
                true
                // user.role.indexOf('student') !== -1
            ) {
              if (
                newSplitedDate >= newstartDate &&
                newSplitedDate <= newEndDate
              ) {
                return (
                    <AllowBtn
                      size="large"
                      variant="outlined"
                      block
                      onClick={() => {
                        //   console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmm');
                        history.push({
                            pathname: '/examPageForStudent',
                            // search: '?query=abc',
                            state: { examPId: loginInfo.id ? loginInfo.id: ''}
                          })
                      }}
                    >
                      <DoneOutlineIcon style={{fontSize:'3rem'}}/>
                  </AllowBtn>
                );
              } else {
                return (
                    <DontAllowBtn
                      style={{ fontFamily: 'BNazaninBold', fontSize: '18px' }}
                      color="primary"
                      size="large"
                      variant="outlined"
                      onClick={() => {
                        setMessage('زمان امتحان نرسیده است');
                        setStatus('0');
                        setShowMessage(!showMessage);
                      }}
                      block
                    >
                      <CloseIcon style={{fontSize:'3rem'}} />
                  </DontAllowBtn>
                );
              }
            }
        }
       
      };
      //////////////////////////////////////////////////////////
    const classes = useStyles();

    return (
        <MyTableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">نام درس</StyledTableCell>
                        <StyledTableCell align="right">نام معلم</StyledTableCell>
                        <StyledTableCell align="right">موضوع امتحان</StyledTableCell>
                        <StyledTableCell align="right">تاریخ شروع</StyledTableCell>
                        <StyledTableCell align="right">تاریخ پایان</StyledTableCell>
                        <StyledTableCell align="right">ساعت شروع</StyledTableCell>
                        <StyledTableCell align="right">ساعت پایان</StyledTableCell>
                        <StyledTableCell align="right">مدت زمان امتحان</StyledTableCell>
                        <StyledTableCell align="right">ورود</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row , index) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="right" 
                            >
                                {row.course_name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.teacher_name}</StyledTableCell>
                            <StyledTableCell align="right">{row.examParent_topic}</StyledTableCell>
                            <StyledTableCell align="right">{row.examParent_start_date}</StyledTableCell>
                            <StyledTableCell align="right">{row.examParent_stop_date}</StyledTableCell>
                            <StyledTableCell align="right">{row.examParent_start_date == row.examParent_stop_date ? row.examParent_start : '-' }</StyledTableCell>
                            <StyledTableCell align="right">{row.examParent_start_date == row.examParent_stop_date ? row.examParent_end : '-'}</StyledTableCell>
                            <StyledTableCell align="right">{row.examParent_start_date != row.examParent_stop_date ? row.examParent_duration : '-'}</StyledTableCell>
                            {/* <StyledTableCell align="right">{row.examParent_start ? fixNumbers(moment(row.examParent_start).tz('Asia/Tehran').format('HH:mm:00')) : ''}</StyledTableCell>
                            <StyledTableCell align="right">{row.examParent_end ? fixNumbers(moment(row.examParent_end).tz('Asia/Tehran').format('HH:mm:00')) : ''}</StyledTableCell> */}
                            <StyledTableCell align="right">{buttonInput(row, index)}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            {
                showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
            }
        </MyTableContainer>
    );
};

export default ExamsListTable;
