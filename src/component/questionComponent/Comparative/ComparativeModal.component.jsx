import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {ComparativeButton , ComparativeButtonSave ,ComparativeItemContainer} from './ComparativeModal.styles';
import {Button} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
    position:'relative',
    height:'90vh',
    marginBottom:'50px',
    width:'55vw',
    direction:'rtl',
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

export default function ComparativeModal({compItems}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [count,setCount] = React.useState(4)
  // const [items,setItems] = React.useState([Array.from({length: n})]);
  // const [items,setItems] = React.useState(Array(4).fill(0).map(row => new Array(2).fill('')));
  // const [items,setItems] = React.useState([]);
  const [items,setItems] = React.useState(compItems ? compItems : []);
  // const [items,setItems] = React.useState(Array.from({length: n},()=> Array.from({length: n}, () => null)));
//  var cn =1;
  // useEffect(()=>{
  //   setItems(Array(cn).fill(0).map(row => new Array(2).fill('')))
  // },[]);


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
     console.log('index',index);
     var temp = [...items];
     temp.splice(index,1);
     console.log('temp2',temp);
     setItems([...temp]);
    //  setCount(prev => prev - 1);
  }

  const handleAddRow =()=>{
      var temp =[...items];
      var tt = ['', ''];
      temp.push(tt);
      setItems(temp);
  };

  const handleIndexSet =(index,num , value)=>{
    var temp = [...items];
    temp[index][num] = value;
    console.log('temp' , temp);
    setItems(temp);
 }

 const SeveData = () =>{
  setOpen(false);
 }



  const body = (
    <div style={modalStyle} className={classes.paper}>
      
        {/* <ComparativeButton variant="contained" component="span" 
          onClick={()=>{
              handleAddRow()
          }}
        > */}
          <AddCircleIcon style={{fontSize:'40px', color:'#009688',cursor:'pointer'}} onClick={()=>{
              handleAddRow()
          }} />
          {/* اضافه کردن */}
        {/* </ComparativeButton> */}
        <ComparativeItemContainer>
      {items.map((item , index) =>(
        <ComparativeModalItems key={index} myIndex={index} item={item} handleIndexDelete={handleIndexDelete} handleIndexSet={handleIndexSet} />
      ))}
      </ComparativeItemContainer>
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