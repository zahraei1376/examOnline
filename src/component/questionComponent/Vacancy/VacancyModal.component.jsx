import React , {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {VacancyButton , VacancyButtonSave , VacancyInputContainer ,VacancyInput ,VacancyShowText ,RecordButton} from './VacancyModal.styles';
import {Button} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import ComparativeModalItems from './ComparativeModalItems.component';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display:'flex',
    flexDirection:'column',
    overflow: 'scroll',
    position:'relative',
    height:'50vh',
    marginBottom:'50px',
    width:'55vw',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    direction:'rtl',
  },
}));

export default function VacancyModal({handleSetVancyItems , existVancyValue}) {
  const classes = useStyles();
  //////////////////////////////////////
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [vancyValue , setVancyValue] = useState('');
  const [OrginalVancyValue , setOrginalVancyValue] = useState('');
  /////////////////////////////////////
  useEffect(()=>{
    setVancyValue(existVancyValue ? existVancyValue : '');
    // setOrginalVancyValue(existVancyValue ? existVancyValue : '');
  },[]);
  ////////////////////////////////////
  useEffect(()=>{
    console.log('vancyValue',vancyValue);
    // setOrginalVancyValue()
  },[vancyValue]);
  ////////////////////////////////////
  const handleChange = (event) => {
    console.log('event.target.value',event.target.value);
    setVancyValue(event.target.value);
  };
  ////////////////////////////////////
  const addVancy = () =>{
    // var myItemV = vancyValue;
    // myItemV += '$%A';
    // setVancyValue(myItemV);
    setVancyValue(vancyValue + '..............');
    // setOrginalVancyValue(OrginalVancyValue + '$%A')
    document.getElementById("Text1").focus();
  }
  ////////////////////////////////////
  const handleOpen = () => {
    setOpen(true);
  };
  ////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };
  ////////////////////////////////////
  const handleIndexSet =(index,num , value)=>{
    var temp = [...vancyValue];
    temp[index][num] = value;
    setVancyValue(temp);
 }
 ////////////////////////////////////
 const SeveData = () =>{
   console.log('vancyValue',vancyValue.split('..............').join('$%A'));
    handleSetVancyItems(vancyValue.split('..............').join('$%A'));
    setOpen(false);
 }
 ////////////////////////////////////


  const body = (
    <div style={modalStyle} className={classes.paper}>

      <AddCircleIcon style={{fontSize:'40px', color:'#009688',cursor:'pointer'}} onClick={addVancy} />
      
      <VacancyInputContainer>
      <VacancyInput id="Text1" cols="60" rows="5"  placeholder="?????? ?????? ???? ???????? ????????!!"
      value={vancyValue}
        // value={vancyValue.split('$%A').join('..............')}
        onChange={(e) => handleChange(e)} 
      />
      </VacancyInputContainer>
      <VacancyButtonSave variant="contained" component="span"
        onClick={SeveData}
        >
        ??????
      </VacancyButtonSave>
    </div>
  );

  return (
    <div>
        <RecordButton type="button" onClick={handleOpen}>
           ???????? ?????? ???????? 
        </RecordButton>
       
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}