import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import {ComparativeButton , ComparativeButtonSave} from './VacancyModal.styles';
import {Button} from '@material-ui/core';
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
  },
}));

const useStylesTextBox = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

export default function VacancyModal({PropsItems}) {
  const classes = useStyles();
  const classesTextBox = useStylesTextBox();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [count,setCount] = React.useState(1)
  const [items,setItems] = React.useState('');
  const [indexDelete,setIndexDelete] = React.useState(-1);

  useEffect(()=>{
    console.log('items',items);
  },[items]);

  useEffect(()=>{
    setItems(Array(count).fill(0).map(row => new Array(2).fill('')))
  },[count]);

  const handleChange = (row, column, event) => {
    let copy = [...items];
    copy[row][column] = +event.target.value;
    setItems(copy);

    console.log(items);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIndexDelete =(index)=>{
     var temp = [...items];
     temp.splice(index,1);
     setItems(temp);
     setCount(prev => prev - 1);
  }


  const handleIndexSet =(index,num , value)=>{
    var temp = [...items];
    temp[index][num] = value;
    setItems(temp);
 }

 const SeveData = () =>{
  setOpen(false);
 }



  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <ComparativeButton variant="contained" component="span" style={{float:'right',}}
          onClick={()=>{
            setCount(prev => prev + 1);
          }}
        >
        اضافه کردن جای خالی
        </ComparativeButton>
      </div>
      {/* {items ? items.map((item , index) =>(
        <ComparativeModalItems key={index} myIndex={index} item={item} handleIndexDelete={handleIndexDelete} handleIndexSet={handleIndexSet} />
      )) : ''} */}
      {items.length > 0 ? <ComparativeButtonSave variant="contained" component="span"
        onClick={SeveData}
        >
        ثبت
      </ComparativeButtonSave> : ''}
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