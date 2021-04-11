import React, { useState, useEffect } from 'react';
// import '../listOfStudentForExam.styles.jsx';
import {Card ,CardHeader,CardImage,CardName,LikeContainer,LikeBtn,DislikeBtn,Span,
  SpanIcon,CardBody,CardBodyInput,CardBodyIconConatiner,CardBodyIcon} from  './boxListStudent.styles.jsx';
// import { Grid } from '@material-ui/core';
import user from '../../../../assets/img/user.png';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import {TotalScore ,getStudentId} from '../../../../redux/scoresStudents/scoresStudents.selector';
// import {getStudentId} from '../../../../redux/scoresStudents/scoresStudents.selector';
// import { TotalScoreUtil } from '../../../../redux/scoresStudents/scoresStudents.utils.js';


const BoxListStudent = props => {
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

  return (
    // <Grid key={props.key} item xs={12} sm={5} md={5}>
    <Card key={props.key}>
      
      <CardHeader  onClick={() => props.getScore(props.student)} >
        <CardImage src={user} alt="" />
        <CardName className="card_header-name">{props.student.person_name + ' ' + props.student.person_surname}</CardName>
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
          // value={props.TotalScore(props.studentId)}
          defaultValue={score ? score : ''}
          // value={score ? score : null}
        />
      </CardBody>
    </Card>
    // </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  // TotalScore:TotalScore,
  // studentId : getStudentId
});


export default connect(mapStateToProps)(BoxListStudent);
