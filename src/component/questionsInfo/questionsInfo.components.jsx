import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/////////////////////////////
import {QuestionsInfoContainer} from './questionsInfo.styles';
import QuestionInfo from './questionInfo/questionInfo.component';
/////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // marginBottom: '30px',
    fontFamily: 'Bnazanin',
    // boxShadow:'0 0 1px 1px rgba(0,0,0,.2)',
    // border:'1px solid #000',
    // borderRadius:'1rem',
    // borderBottom:'1px solid #000',
    border:'2px solid #000',
    color:'#000',
    marginBottom:'4rem',
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    // fontSize: theme.typography.pxToRem(15),
    fontFamily:'Bnazanin',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '100%',
    color:'#000',
    fontSize:'2rem',
    // color: theme.palette.text.secondary,
  },
}));

function QuestionsHeader({ courses }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading}>اطلاعات سوالات</Typography>
        </AccordionSummary>
        <AccordionDetails style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'BNazanin',
          fontSize:'1.3rem',
          direction: 'rtl'
        }}>
            {
                courses && courses.length > 0 ? 
                courses.map((course , index) =>(
                    <QuestionsInfoContainer key={index}>
                        <QuestionInfo course={course}/>
                    </QuestionsInfoContainer>
                ))
                : ''
            }
{/* 
          <Typography style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'BNazanin',
            marginTop: '10px',
            fontSize:'1.3rem',
          }}>
            تعداد افراد شرکت کننده در امتحان <span style={{ color: 'green', padding: '0 5px', }}>{numberTakeAnExam}</span> نفراست.
          </Typography>
          <Typography style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            fontFamily: 'BNazanin',
            fontSize:'1.3rem',
          }}>
            بالا ترین نمره برای دانش آموز <span style={{ color: 'green', padding: '0 5px', }}>{topStudent ? topStudent.split('/')[0] : '-'} </span> با نمره <span style={{ color: 'green', padding: '0 5px', }}>{topStudent ? topStudent.split('/')[1] : '-'} </span> است.
          </Typography>
          <Typography style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            fontFamily: 'BNazanin',
            fontSize:'1.3rem',
          }}>
            میانگین امتحان <span style={{ color: 'green', padding: '0 5px', }}>{averageScore}</span> نمره است.
          </Typography>
         */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default QuestionsHeader;