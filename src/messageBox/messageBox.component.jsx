import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {MySnackbarDiv} from './messageBox.styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function MySnackbar({message ,status,showMessage,setShowMessage}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      console.log('showMessage',showMessage);
      setShowMessage(!showMessage);
      return;
    }
    console.log('showMessage2',showMessage);
    setShowMessage(!showMessage);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <MySnackbarDiv open={open} style={{width:'100%'}}
      autoHideDuration={2000}
       onClose={handleClose}>
        <Alert style={{width:'70%',textAlign:'center',}} onClose={handleClose} severity={status === '1' ? "success" : "error" }>
          {message}
        </Alert>
      </MySnackbarDiv>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
};

export default MySnackbar;