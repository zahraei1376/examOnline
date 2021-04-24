import React, {useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PostAddIcon from '@material-ui/icons/PostAdd';
////////////////
import {FastAccessDivContainer,FastAccessDiv,MyTypography , MyButton ,
   MyMainButton,UploadLabel, UploadSection,MyCloudUploadIcon,BtnOk
  ,NumOfQuestionInput,NumOfQuestionSection} from './fastAccessToquestions.styles';
import { Tooltip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Uploader from '../../uploader';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    fontFamily:'Bnazanin',
    // fontSize:'2rem !important' ,
    // background: 'linear-gradient(to left, #3f87a6, #ebf8e1)'
    backgroundColor:'#3f87a6',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
     {/* {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null} */}
      <MyTypography variant="h6">{children}</MyTypography>
      
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    direction:'rtl',
    textAlign:'right',
    fontFamily:'Bnazanin',
    zIndex:'10',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    direction:'rtl',
    textAlign:'right',
    fontSize:'2rem',
    fontFamily:'Bnazanin',
    zIndex:'10',
  },
}))(MuiDialogActions);

function FastAccessToQuestions() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const [nQuestions,setNQuestions] = useState(numberOfQuestions);

  // useEffect(()=>{
  //   setNQuestions(numberOfQuestions);
  // },[numberOfQuestions]);

  // const sendNumber = () => {
  //   seNumberOfQuestions(nQuestions);
  //   handleClose();
  // }

  const uploadFileQuestions = () =>{
    
  }

  return (
    <FastAccessDivContainer>
      <MyMainButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <PostAddIcon  style={{fontSize:'3rem'}} />
      {/* {number + 1} */}
      </MyMainButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} >
          درج سوال سریع
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <FastAccessDiv>
                  <UploadSection>
                      <UploadLabel> برای آپلود سوالات کلیک کنید </UploadLabel>
                      <Uploader/>
                      {/* <label htmlFor="upload_Questions">
                          <input
                              style={{ display: 'none' }}
                              // defaultValue=""
                              id="upload_Questions"
                              name="upload_Questions"
                              type="file"
                              onChange={e => uploadFileQuestions(e)}
                          />

                          <Tooltip title="آپلود فایل">
                                  <MyCloudUploadIcon />
                          </Tooltip>
                      </label> */}
                      {/* <NumOfQuestionInput type="text" placeholder="تعداد سوالات را وارد کنید" /> */}
                  </UploadSection>
                  {/* <NumOfQuestionSection>
                      <UploadLabel> تعداد سوالات را وارد کنید </UploadLabel>
                      <NumOfQuestionInput value={nQuestions} type="text" 
                      // placeholder="تعداد سوالات را وارد کنید" 
                      onChange={e => setNQuestions(e.target.value)}/>
                      <Tooltip title="تایید" aria-label="تایید"  style={{ fontSize:'3rem'}} >
                          <BtnOk 
                              onClick={sendNumber}
                          >
                              <DoneIcon style={{ fontSize:'3rem'}} />
                          </BtnOk>
                      </Tooltip>
                  </NumOfQuestionSection> */}
            </FastAccessDiv>
          </Typography>
        </DialogContent>
        <DialogActions>
          <MyButton autoFocus onClick={handleClose} color="primary">
            بستن
          </MyButton>
        </DialogActions>
      </Dialog>
    </FastAccessDivContainer>
  );
}

export default FastAccessToQuestions;
