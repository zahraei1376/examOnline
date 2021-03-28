import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
////////////////
import {ExplainDiv , TimeDiv ,MyTypography , MyButton , MyMainButton} from './explainQuestionComponent.styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    fontFamily:'Bnazanin',
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
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    direction:'rtl',
    textAlign:'right',
    fontSize:'1.8rem',
    fontFamily:'Bnazanin',
  },
}))(MuiDialogActions);

function ExplainQuestion({number , explain , time}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MyMainButton variant="outlined" color="primary" onClick={handleClickOpen}>
      {number + 1}
      </MyMainButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          توضیحات سوال
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {explain != 'undefined' ? (
            <ExplainDiv>
                توضیحات : {explain.split('%0A').join('\r\n')}
            </ExplainDiv>
            ) : (
                ''
            )}
            {time != 'undefined' ? (
            <TimeDiv>
                زمان : {time}
            </TimeDiv>
            ) : (
                ''
            )}
          </Typography>
          {/* <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <MyButton autoFocus onClick={handleClose} color="primary">
            بستن
          </MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExplainQuestion;