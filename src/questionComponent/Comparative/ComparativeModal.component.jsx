import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {ComparativeButton , ComparativeButtonSave} from './ComparativeModal.styles';
import {Button} from '@material-ui/core';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import ComparativeModalItems from './ComparativeModalItems.component';

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
    height:'90vh',
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

export default function ComparativeModal({PropsItems}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [count,setCount] = React.useState(1)
  // const [items,setItems] = React.useState([Array.from({length: n})]);
  const [items,setItems] = React.useState(Array(count).fill(0).map(row => new Array(2).fill('')));
  const [indexDelete,setIndexDelete] = React.useState(-1);
  // const [items,setItems] = React.useState(Array.from({length: n},()=> Array.from({length: n}, () => null)));

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



  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <ComparativeButton variant="contained" component="span" style={{float:'right',}}
          onClick={()=>{
            setCount(prev => prev + 1);
          }}
        >
          اضافه کردن
        </ComparativeButton>
      </div>
      {items ? items.map((item , index) =>(
        <ComparativeModalItems key={index} myIndex={index} handleIndexDelete={handleIndexDelete} handleIndexSet={handleIndexSet} />
      )) : ''}
      {items.length > 0 ? <ComparativeButtonSave variant="contained" component="span"
        >
        ثبت
      </ComparativeButtonSave> : ''}
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        افزودن گزینه
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