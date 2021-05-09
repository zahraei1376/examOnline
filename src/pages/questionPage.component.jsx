import React, { useState ,useEffect } from 'react';
import {connect} from 'react-redux';
import {setCourseName ,setExamParentId}from '../redux/questionsCourses/questionsCourses.action';
import { QuestionPageContainer ,QuestionPageDiv,UploadSectionContainer,QuestionsContainer,ComboDiv} from './questionPage.styles';
import Questions from '../component/questionComponent/questionComponent';
import UploadQuestions from '../component/questionComponent/uploadQuestions/uploadQiestions.component';
import FastAccessToQuestions from '../component/questionComponent/fastAccessToquestions/fastAccessToquestions.component';
//////////////////////////////
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//////////////////////////////
import {useLocation } from "react-router-dom";
import QuestionsHeader from '../component/questionsInfo/questionsInfo.components';
// const courses = [
//     { course: 'ریاضی', examChildId: '608fe01c91f240049edbcefc' },
//     { course: 'فیزیک', examChildId: '608fe01c91f240049edbcefd' },
//     { course: 'علوم', examChildId: '608fe01c91f240049edbcefe' },
//     { course: 'اجتماعی', examChildId: '608fe01c91f240049edbceff'},
//   ]

const QuestionPage = ({questions , setCourseName,setExamParentId, ...props}) =>{
    let location = useLocation();
    // const [numberOfQuestions,seNumberOfQuestions] = useState('');
    const [courses,setCourses] = useState(location && location.state.courses ? location.state.courses : [] );
    // const [courseName,setCourseName] = useState('');

    useEffect(()=>{
        // console.log('courseName',courseName);
        setCourseName(courses && courses.length > 0 && courses[0].group && courses[0].group.length > 0 ?
            courses[0].group :'');
        setExamParentId(location && location.state.examParentId ? location.state.examParentId : '');
    },[]);

    useEffect(()=>{
        console.log('props.location.state.examParentId',location.state.examParentId);
        console.log('props.location.state.courses',location.state.courses);
        // setCourseName(courses && courses.length > 0 ? courses[0].examChildId :'')
    },[]);

    return (
        <QuestionPageContainer>
            <div>
                <QuestionsHeader courses={courses} />
            </div>
            <QuestionsContainer>
             <ComboDiv >
                <Autocomplete
                    style={{ width: 300,textAlign:'center' }}
                    id="free-solo-demo"
                    freeSolo
                    options={courses.map((option) => option)}
                    getOptionLabel={(option) => option.course}
                    defaultValue={courses && courses.length > 0 ? courses[0] : ''}
                    renderInput={(params) => (
                    <TextField {...params} label="درس ها" margin="normal" 
                    // variant="outlined"
                     />
                    )}

                    onChange={(event, newValue) => {
                        setCourseName(newValue && newValue.group ? newValue.group : '');
                        // console.log(JSON.stringify(newValue, null, ' '));
                    }}
                />
                {/* <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                    )}
                /> */}
            </ComboDiv>
            {/* <FastAccessToQuestions /> */}
            <QuestionPageDiv>
                {/* <UploadSectionContainer>
                    <UploadQuestions seNumberOfQuestions={seNumberOfQuestions} numberOfQuestions={numberOfQuestions} />
                </UploadSectionContainer> */}
                <Questions 
                //   selectedCourseName={courseName}
                //   examParentId ={props.location && props.location.state.examParentId ? props.location.state.examParentId : ''}
                  questions={questions} />
            </QuestionPageDiv>
            </QuestionsContainer>
        </QuestionPageContainer>
    )
};

const mapDispatchToProps = dispatch =>({
    setCourseName: CN => dispatch(setCourseName(CN)),
    setExamParentId: epid => dispatch(setExamParentId(epid)),
  });

export default connect(null , mapDispatchToProps )(QuestionPage);