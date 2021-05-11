import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//////////////////////////
import {finalIndex} from '../../../redux/questionIndex/questionIndex.selector';
///////////////////////////////
import {connect} from 'react-redux';
import { createStructuredSelector} from 'reselect';
/////////////////////////////////
var moment2 = require('moment-timezone');
moment2().tz("Asia/Tehran").format();
moment2.tz.setDefault('Asia/Tehran');
/////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // marginBottom: '30px',
    fontFamily: 'BNazanin',
    // boxShadow:'0 0 1px 1px rgba(0,0,0,.2)',
    // border:'1px solid #000',
    // borderRadius:'1rem',
    borderBottom:'1px solid #000',
    backgroundColor:'teal',
    // color:'#fff',
    marginBottom:'4rem',
    position:'relative',
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    backgroundColor:'teal',
    border:'1px solid #fff',
  },
  secondaryHeading: {
    // fontSize: theme.typography.pxToRem(15),
    fontFamily:'Bnazanin !important',
    // fontSize: '1.8rem !important',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '100%',
    color:'#fff',
    fontSize:'2rem',
    border:'1px solid #fff',
    borderRadius:'2rem',
    // color: theme.palette.text.secondary,
  },
}));

const ExamInfoHeader = ({ startDate, startTime, endTime, teacherName,questionCount }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ backgroundColor:'teal', color:'#fff'}}>
        <AccordionSummary
        //   expandIcon={<ExpandMoreIcon style={{color:'#fff',fontSize:'3rem' ,}} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading}>اطلاعات آزمون</Typography>
        </AccordionSummary>
        <AccordionDetails style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'BNazanin',
          fontSize:'1.6rem',
        //   direction: 'rtl'
        }}>
          <Typography style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'BNazanin',
            marginTop: '10px',
            fontSize:'1.6rem',
          }}>
            <span style={{ fontSize: '1.9rem', padding: '0 5px', }}>نام معلم : </span>{teacherName}
          </Typography>
          <Typography style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            fontFamily: 'BNazanin',
            fontSize:'1.6rem',
          }}>
              <span style={{ fontSize: '1.9rem', padding: '0 5px', }}>تاریخ شروع امتحان :  </span>{startDate}
            {/* تاریخ شروع امتحان : <span style={{ fontSize: '1.6rem', padding: '0 5px', }}>{startDate}</span> */}
          </Typography>
          <Typography style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            fontFamily: 'BNazanin',
            fontSize:'1.6rem',
          }}>
            {/* <span style={{ fontSize: '1.9rem', padding: '0 5px', }}>ساعت شروع امتحان :  </span>{startTime} */}
              <span style={{ fontSize: '1.9rem', padding: '0 5px', }}>ساعت شروع امتحان :  </span>{moment2(startTime).tz('Asia/Tehran').format('HH:mm:00')}
            {/* ساعت شروع امتحان : <span style={{ fontSize: '1.6rem', padding: '0 5px', }}>{startTime}</span> */}
          </Typography>

          <Typography style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            fontFamily: 'BNazanin',
            fontSize:'1.6rem',
          }}>
              <span style={{ fontSize: '1.9rem', padding: '0 5px', }}>ساعت پایان امتحان :</span>{moment2(endTime).tz('Asia/Tehran').format('HH:mm:00')}
             {/* <span style={{ fontSize: '1.6rem', padding: '0 5px', }}>{endTime}</span> */}
          </Typography>
          <Typography style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            fontFamily: 'BNazanin',
            fontSize:'1.6rem',
          }}>
              <span style={{ fontSize: '1.9rem', padding: '0 5px', }}>تعداد سوالات :</span>{questionCount}
             {/* <span style={{ fontSize: '1.6rem', padding: '0 5px', }}>{endTime}</span> */}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  questionCount : finalIndex,
});

export default connect(mapStateToProps)(ExamInfoHeader);