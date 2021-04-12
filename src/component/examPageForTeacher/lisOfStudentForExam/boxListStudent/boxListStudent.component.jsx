import React, { useState, useEffect } from 'react';
// import '../listOfStudentForExam.styles.jsx';
import {Card ,CardHeader,CardImage,CardName,LikeContainer,LikeBtn,DislikeBtn,Span,
  SpanIcon,CardBody,CardBodyInput,CardBodyIconConatiner,CardBodyIcon} from  './boxListStudent.styles.jsx';
// import { Grid } from '@material-ui/core';
import user from '../../../../assets/img/user.png';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {totalScore ,getStudentId} from '../../../../redux/scoresStudents/scoresStudents.selector';
// import {getStudentId} from '../../../../redux/scoresStudents/scoresStudents.selector';
// import { TotalScoreUtil } from '../../../../redux/scoresStudents/scoresStudents.utils.js';


const BoxListStudent = ({student , studentId , total ,getScore}) => {
  // const [currentNumber, setCurrentNumber] = useState(0);
  // const [wrongNumber, setWrongNumber] = useState(0);
  const [score, setScore] = useState('');
  // useEffect(() => {
  //   if (props.studentsCurrentWroung) {
  //     setCurrentNumber(props.studentsCurrentWroung.split(',')[0]);
  //     setWrongNumber(props.studentsCurrentWroung.split(',')[1]);
  //     if (props.studentsCurrentWroung.split(',')[2]) {
  //       setScore(props.studentsCurrentWroung.split(',')[2]);
  //     }

  //   }
  // }, []);
  useEffect(()=>{
    console.log('total',total);
    // setScore(total);
  },[total])

  return (
    // <Grid key={props.key} item xs={12} sm={5} md={5}>
    <Card onClick={() => getScore(student)}>
      
      <CardHeader >
        <CardImage src={user} alt="" />
        <CardName className="card_header-name">{student.person_name + ' ' + student.person_surname}</CardName>
        {/* <LikeContainer>
          <LikeBtn href="#" type="button" className="card_btn-green">
            <Span>{currentNumber !== 'undefined' ? currentNumber : '-'}</Span>
            <SpanIcon className="fa fa-thumbs-up" aria-hidden="true"></SpanIcon>
          </LikeBtn>
          <DislikeBtn href="#" type="button" className="card_btn-red">
            <Span>{wrongNumber !== 'undefined' ? wrongNumber : '-'}</Span>
            <SpanIcon className="fa fa-thumbs-down" aria-hidden="true"></SpanIcon>
          </DislikeBtn>
        </LikeContainer> */}
      </CardHeader>
      <CardBody>
        {/* <CardBodyIconConatiner
        // <CheckCircleIcon/></CardBody>
          // id={props.student.person_id}
          // className="fa fa-check"
          // onClick={() => props.setOneScore(props.student)}
        >
          <CardBodyIcon />
        </CardBodyIconConatiner> */}
        <CardBodyInput
          type="number"
          readOnly
          value={studentId ?  total : ''}
          // defaultValue={score ? score : ''}
          // value={score ? score : null}
        />
      </CardBody>
    </Card>
    // </Grid>
  );
};

// const mapStateToProps = (state, MYPROPS) => {
//   return createStructuredSelector({
//     // foo: selectFoo(state, props),   // === createSelector(inputSelectors...)
//     studentId : getStudentId,
//     total : (MYPROPS) => totalScore(MYPROPS),
//   });
// };

const mapStateToProps = createStructuredSelector({
  studentId : getStudentId,
  total : (state, ownProps) => totalScore(ownProps.student.person_id)(state, ownProps),
});

// const mapStateToProps = createStructuredSelector({
//   something: (state, ownProps) => selectSomethingById(ownProps.id)(state, ownProps)
// });

// const mapStateToProps = (state, ownProps) =>({
//   // collection:selectCollection(ownProps.match.params.collectionId)(state),
//   studentId : getStudentId,
//   total : (studentId) => totalScore(studentId)(state),
// });


export default connect(mapStateToProps)(BoxListStudent);
