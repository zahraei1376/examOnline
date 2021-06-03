import React, { useState ,useEffect } from 'react';
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
import {ExplainDivContainer,ExplainDiv , TimeDiv , ExplainTeacherDiv , ExplainTeacherInput , ExplainTeacherPre, SpanExplain ,MyTypography , MyButton ,MyButtonOk,MyButtonTeacher, MyMainButton} from './explainQuestionComponentForArchive.styles';
//////////////////
import MySpinner from '../MySpinner/MySpinner.component';
import MySnackbar from '../../messageBox/messageBox.component';
/////////////////
import { useQuery ,useMutation} from 'react-apollo';
import {ADD_NEW_EXPLAIN , GET_RESPONSE_WITH_ID} from '../../graphql/resolver';
//////////////////
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
    zIndex:'10',
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
    zIndex:'10',
  },
}))(MuiDialogActions);

function ExplainQuestion({number , id , myType , explain , time , explainTeacher ,responseID }) {
  const [addNewExplain] = useMutation(ADD_NEW_EXPLAIN);
  const { data ,refetch  } = useQuery(GET_RESPONSE_WITH_ID , {
    variables: {  
        userName: "211",
        password: "211",
        qcId: id,
    },
    notifyOnNetworkStatusChange: true
  });

  useEffect(()=>{
    console.log('data.GET_RESPONSE_WITH_ID[0].response_teacherResponse',data);
  },[data])

  
 ///////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const [loading ,setLoading] = useState(false);
  const [explainTeacherText ,setExplainTeacherText] = useState('');
  //////////////////////////////////////////////////
  const [showMessage,setShowMessage] = useState(false);
  const [message,setMessage] =useState('');
  const [status,setStatus] =useState(0);
  /////////////////////////////////////////////////

  const handleClickOpen = () => {
    refetch();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExplain = (value) =>{
    setExplainTeacherText(value)
  }

  useEffect(()=>{
      if(data && data.responses && data.responses.length > 0 && data.responses[0] && data.responses[0].response_teacherResponse){
        var Exp = data.responses[0].response_teacherResponse;
        var newExp = Exp.split('%0A').join('\r\n');
        setExplainTeacherText(newExp);
      }
  },[data])

  ////////////////////////////////////////////////
  function convertText(text){
    var new1Text = text
    ? text.split('\r\n').join('%0A')
    : text;
    var new2Text = new1Text
    ? new1Text.split('\n').join('%0A')
    : new1Text;
    var new3Text = new2Text
    ? new2Text.split('"').join("'")
    : '';

    return new3Text;
  }
  ////////////////////////////////////////////////
  const handleSendExplain = async() =>{
    setLoading(!loading);
    var converterText = await convertText(explainTeacherText);
    console.log('converterText',converterText);
    console.log('id',id);
    await addNewExplain({ variables: { 
        userName: "211", 
        password: "211", 
        id:responseID,
        response_teacherResponse: converterText,
    }
      }).then(res=>{
        if(res.data && res.data.updateResponse){
          setMessage('ثبت شد');
          setStatus('1');
          setShowMessage(!showMessage);
          setLoading(false);
        }else{
          setStatus('0')
          setMessage('ثبت نشد')
          setShowMessage(!showMessage);
          setLoading(false);
        }
      })
  };

  

  return (
    <ExplainDivContainer>
      <MyMainButton explain={explain} variant="outlined" color="primary" onClick={handleClickOpen}>
      {number + 1}
      </MyMainButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          توضیحات سوال
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {explain ? (
            <ExplainDiv>
                توضیحات : {explain.split('%0A').join('\r\n')}
            </ExplainDiv>
            ) : (
                ''
            )}
            {time ? (
            <TimeDiv>
                زمان : {time}
            </TimeDiv>
            ) : (
                ''
            )}

            {
                myType == '0' ? 
                explainTeacherText ? (
                        <ExplainTeacherPre>
                            <SpanExplain>توضیحات معلم : </SpanExplain>{explainTeacherText}
                        </ExplainTeacherPre>
                        ) : (
                            ''
                        ) 
                    
                    :
                    myType == '1' && responseID ? <ExplainTeacherDiv>
                      <SpanExplain>اضافه کردن توضیحات : </SpanExplain>
                      <ExplainTeacherInput  value={explainTeacherText} onChange={e => handleExplain(e.target.value)} />
                    </ExplainTeacherDiv> : ''

                    // explainTeacher ? (
                    //     <ExplainTeacherDiv>
                    //         <SpanExplain>اضافه کردن توضیحات : </SpanExplain>
                    //         <ExplainTeacherInput  value={explainTeacher} />
                    //     </ExplainTeacherDiv>
                    //     ) : (
                    //         <ExplainTeacherDiv>
                    //             <SpanExplain>اضافه کردن توضیحات : </SpanExplain>
                    //             <ExplainTeacherInput  value={explainTeacher} onChange={e => handleExplain(e.target.value)} />
                    //         </ExplainTeacherDiv>
                    //     )
            }
          </Typography>
        </DialogContent>
        <DialogActions>
            {
                 myType == '0' ?
                    <MyButton autoFocus onClick={handleClose} color="primary">
                    بستن
                    </MyButton> 
                 :
                 <>
                 <MyButtonTeacher autoFocus onClick={handleClose} color="primary">
                    بستن
                </MyButtonTeacher>
               {myType == '1' && responseID ?  <MyButtonOk autoFocus onClick={handleSendExplain} color="primary">
                    تایید
                </MyButtonOk> : ''}
                 </>
            }

            {loading ? <MySpinner/> : ''}

            {
                showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
            }
          
        </DialogActions>
      </Dialog>
    </ExplainDivContainer>
  );
}

export default ExplainQuestion;