import React, { useState ,useEffect } from 'react';
import {connect} from 'react-redux';
import {setCourseName,setNameOfCourse ,setExamParentId}from '../redux/questionsCourses/questionsCourses.action';
import { QuestionPageContainer ,QuestionPageDiv,UploadSectionContainer,QuestionsContainer,ComboDiv} from './questionPage.styles';
import Questions from '../component/questionComponent/questionComponent';
import UploadQuestions from '../component/questionComponent/uploadQuestions/uploadQiestions.component';
import FastAccessToQuestions from '../component/questionComponent/fastAccessToquestions/fastAccessToquestions.component';
// import MySpinner from '../component/MySpinner/MySpinner.component';
/////////////////////////////query
import { useQuery } from 'react-apollo';
import { GET_EXAMCHILD_QUESTIONS } from '../graphql/resolver';
/////////////////////////////
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShowCourseNameComponent from '../component/selectCourseNameForQuestions/selectCourseNameForQuestions.component';
//////////////////////////////
import { useLocation } from "react-router-dom";
import QuestionsHeader from '../component/questionsInfo/questionsInfo.components';
// const courses = [
//     { course: 'ریاضی', examChildId: '608fe01c91f240049edbcefc' },
//     { course: 'فیزیک', examChildId: '608fe01c91f240049edbcefd' },
//     { course: 'علوم', examChildId: '608fe01c91f240049edbcefe' },
//     { course: 'اجتماعی', examChildId: '608fe01c91f240049edbceff'},
//   ]

const QuestionPage = ({questions , setCourseName,setNameOfCourse,setExamParentId, ...props}) =>{
    // const { loading, error, data ,refetch  } = useQuery(GET_EXAMCHILD_QUESTIONS , {
    //     variables: {  
    //         userName: "211",
    //         password: "211",
    //         id: "607fd8fb3fb30a08d7ce1e53" ,
    //     },
    //     notifyOnNetworkStatusChange: true
    // });
    let location = useLocation();
    // const [numberOfQuestions,seNumberOfQuestions] = useState('');
    const [courses,setCourses] = useState(location && location.state.courses ? location.state.courses : [] );
    // const [courseName,setCourseName] = useState('');

    useEffect(()=>{
        // console.log('courseName',courseName);
        setCourseName(courses && courses.length > 0 && courses[0].group && courses[0].group.length > 0 ?
            courses[0].group :'');
        setNameOfCourse(courses && courses.length > 0 && courses[0].course ?
            courses[0].course :'');
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
                 {
                     courses && courses.length > 0 ?
                     courses.map((course ,index) => (
                        <ShowCourseNameComponent course={course} />
                     ))
                     : ''
                 }
                
                {/* <Autocomplete
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
                /> */}
            </ComboDiv>
            <QuestionPageDiv>
                <Questions 
                  questions={questions} />
            </QuestionPageDiv>
            </QuestionsContainer>
        </QuestionPageContainer>
    )
};

const mapDispatchToProps = dispatch =>({
    setCourseName: CN => dispatch(setCourseName(CN)),
    setNameOfCourse:CN => dispatch(setNameOfCourse(CN)),
    setExamParentId: epid => dispatch(setExamParentId(epid)),
  });

export default connect(null , mapDispatchToProps )(QuestionPage);