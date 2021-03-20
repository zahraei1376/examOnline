//ترتیبی 
////////////////////////////////////////
import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {SequentialButton , SequentialButtonSave , SequentialInputContainer ,SequentialInput ,SequentialShowText ,SequentialItemContainer} from './SequentialModal.styles';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import SequentialModalItems from './SequentialModalItem.component';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    // overflow: 'scroll',
    position:'relative',
    height:'50vh',
    marginBottom:'50px',
    width:'70vw',
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
    // padding: '0',
    direction:'rtl',
  },
}));

export default function SequentialModal({PropsItems}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [items,setItems] = React.useState([]);

  const handleChange = (event) => {
    setItems(event.target.value);
  };

  useEffect(()=>{
    console.log('items',items);
  },[items])

  const addItem = () =>{
      var temp = [...items];
      temp.push(" ");
      setItems(temp);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const handleIndexDelete =(index)=>{
//      var temp = [...items];
//      temp.splice(index,1);
//      setItems(temp);
//      setCount(prev => prev - 1);
//   }


  const handleIndexSet =(index, value)=>{
    var temp = [...items];
    temp[index] = value;
    setItems(temp);
 }

 const SeveData = () =>{
  setOpen(false);
 }

 const handleIndexDelete =(index)=>{
    console.log('index',index);
    var temp = [...items];
    temp.splice(index,1);
    console.log('temp2',temp);
    setItems([...temp]);
   //  setCount(prev => prev - 1);
 }



  const body = (
    <div style={modalStyle} className={classes.paper}>
      
        {/* <SequentialButton variant="contained" component="span" style={{float:'right',}}
          onClick={addItem}
        > */}
          <AddCircleIcon onClick={addItem} style={{ cursor:'pointer',fontSize:'35px',color:'#009688'}}/>
        {/* اضافه کردن گزینه */}
        {/* </SequentialButton> */}
    <SequentialItemContainer>
        {items.map((item , index) =>(
            // <SequentialItemContainer>
                <SequentialModalItems key={index} myIndex={index} item={item} handleIndexDelete={handleIndexDelete} handleIndexSet={handleIndexSet} />
            // </SequentialItemContainer>
      ))}
    </SequentialItemContainer>
      {items.length > 0 ? <SequentialButtonSave variant="contained" component="span"
        onClick={SeveData}
        >
        ثبت
      </SequentialButtonSave> : ''}
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        سوال ترتیبی
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