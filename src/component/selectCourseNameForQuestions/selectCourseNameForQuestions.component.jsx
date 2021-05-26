import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DoneIcon from '@material-ui/icons/Done';
import {MyChip} from './selectCourseNameForQuestions.styles';
//////////////////////////////////
import {connect} from 'react-redux';
import {setCourseName ,setNameOfCourse}from '../../redux/questionsCourses/questionsCourses.action';
import { createStructuredSelector} from 'reselect';
import {selectedNameOfCourse} from '../../redux/questionsCourses/questionsCourses.selector';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    direction:'rtl',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const ShowCourseNameComponent = ({course ,courseName ,setNameOfCourse,setCourseName}) => {
    const [clicked,setClicked] = useState(false);
  const classes = useStyles();

//   const handleDelete = () => {
//     console.info('You clicked the delete icon.');
//   };

  const handleClick = () => {
    console.info('You clicked the Chip.');
    setNameOfCourse(course && course.course ? course.course : '')
    setCourseName(course && course.group ? course.group : '');
    setClicked(true);
  };

//   useEffect(()=>{
//     console.log('')
//   },[])

  return (
    <div className={classes.root}>
      {/* <Chip avatar={<Avatar>M</Avatar>} 
    //   label={course.course} 
      label="ریاضیات" 
      onClick={handleClick}
    //   clickable = {clicked}
      color={clicked ? "primary" : 'default'}
     /> */}
    <MyChip
        icon={<MenuBookIcon style={{fontSize:'2.5rem'}}/>}
        // label="ریاضیات" 
        label={course.course} 
        // clickable
        onClick={handleClick}
        // color="primary"
        // color={clicked && courseName == course.course ? "primary" : 'default'}
        color={courseName == course.course ? "primary" : 'default'}
        // onDelete={handleDelete}
        // deleteIcon={<DoneIcon />}
        variant="outlined"
      />
    </div>
  );
}

const mapDispatchToProps = dispatch =>({
    setCourseName: CN => dispatch(setCourseName(CN)),
    setNameOfCourse:CN => dispatch(setNameOfCourse(CN)),
});

const mapStateToProps = createStructuredSelector({
    courseName : selectedNameOfCourse,
});

export default connect(mapStateToProps , mapDispatchToProps )(ShowCourseNameComponent);