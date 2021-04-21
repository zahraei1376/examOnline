import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {VacancyButton , VacancyButtonSave , VacancyInputContainer ,VacancyInput ,VacancyShowText} from './VacancyModal.styles';
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

export default function VacancyModal({vancyValue ,setVancyValue , existVancyValue}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
//   const [count,setCount] = React.useState(1)
  // const [items,setItems] = React.useState(existVancyValue ? existVancyValue : '');
  const [indexDelete,setIndexDelete] = React.useState(-1);

  useEffect(()=>{
    // console.log('vancyValue',vancyValue);
    setVancyValue(existVancyValue ? existVancyValue : '')
  },[]);


  // useEffect(()=>{
  //   console.log('existVancyValue',existVancyValue);
  // },[]);

//   useEffect(()=>{
//     setVancyValue(Array(count).fill(0).map(row => new Array(2).fill('')))
//   },[count]);

  const handleChange = (event) => {
    setVancyValue(event.target.value);
  };

  const addVancy = () =>{
    setVancyValue(vancyValue + '$%A');
    document.getElementById("Text1").focus();
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const handleIndexDelete =(index)=>{
//      var temp = [...vancyValue];
//      temp.splice(index,1);
//      setVancyValue(temp);
//      setCount(prev => prev - 1);
//   }


  const handleIndexSet =(index,num , value)=>{
    var temp = [...vancyValue];
    temp[index][num] = value;
    setVancyValue(temp);
 }

 const SeveData = () =>{
  setOpen(false);
 }



  const body = (
    <div style={modalStyle} className={classes.paper}>
      
        {/* <VacancyButton variant="contained" component="span" style={{float:'right',}}
          onClick={addVancy}
        >
        اضافه کردن جای خالی
        </VacancyButton> */}
         <AddCircleIcon style={{fontSize:'40px', color:'#009688',cursor:'pointer'}} onClick={addVancy} />
      
      <VacancyInputContainer>
      <VacancyInput id="Text1" cols="60" rows="5"  value={vancyValue.split('$%A').join('..............')} onChange={(e) =>handleChange(e)}></VacancyInput>
      </VacancyInputContainer>
      {/* <VacancyShowText>{vancyValue.split('$%A').join('..............')}</VacancyShowText> */}
      {vancyValue.length > 0 ? <VacancyButtonSave variant="contained" component="span"
        onClick={SeveData}
        >
        ثبت
      </VacancyButtonSave> : ''}
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        ایجاد سوال جای خالی
      </button>
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