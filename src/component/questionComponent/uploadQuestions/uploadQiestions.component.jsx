import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {MyAccordionDetails ,MyTypography , UploadSection,MyCloudUploadIcon,UploadLabel ,NumOfQuestionSection,NumOfQuestionInput,BtnOk} from './uploadQuestions.styles';
//////////////////////////////
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { IconButton, Tooltip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    direction:'rtl',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const uploadFileQuestions = () =>{
    
}

export default function UploadQuestions({seNumberOfQuestions ,numberOfQuestions}) {
  const classes = useStyles();
  const [nQuestions,setNQuestions] = useState(numberOfQuestions);

  useEffect(()=>{
    setNQuestions(numberOfQuestions);
  },[numberOfQuestions]);

  const sendNumber = () => {
    seNumberOfQuestions(nQuestions);
  }

  return (
    <div className={classes.root}>
      <Accordion disabled={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}> برای طرح سوالات سریع کایک کنید </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MyTypography>
            <UploadSection>
                <UploadLabel> برای آپلود سوالات کلیک کنید </UploadLabel>
                <label htmlFor="upload_Questions">
                    <input
                        style={{ display: 'none' }}
                        // defaultValue=""
                        id="upload_Questions"
                        name="upload_Questions"
                        type="file"
                        onChange={e => uploadFileQuestions(e)}
                    />

                    <Tooltip title="آپلود فایل">
                        {/* <IconButton aria-label="آپلود فایل"> */}
                            <MyCloudUploadIcon />
                        {/* </IconButton> */}
                    </Tooltip>
                </label>
                {/* <NumOfQuestionInput type="text" placeholder="تعداد سوالات را وارد کنید" /> */}
            </UploadSection>
            <NumOfQuestionSection>
                <UploadLabel> تعداد سوالات را وارد کنید </UploadLabel>
                <NumOfQuestionInput value={nQuestions} type="text" placeholder="تعداد سوالات را وارد کنید" onChange={e => setNQuestions(e.target.value)}/>
                <Tooltip title="تایید" aria-label="تایید"  style={{ fontSize:'3rem'}} >
                    <BtnOk 
                        onClick={sendNumber}
                    >
                        <DoneIcon style={{ fontSize:'3rem'}} />
                    </BtnOk>
                </Tooltip>
            </NumOfQuestionSection>
          </MyTypography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
