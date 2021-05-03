import React, { useState ,useEffect } from 'react';
import { QuestionPageContainer ,QuestionPageDiv,UploadSectionContainer,ComboDiv} from './questionPage.styles';
import Questions from '../component/questionComponent/questionComponent';
import UploadQuestions from '../component/questionComponent/uploadQuestions/uploadQiestions.component';
import FastAccessToQuestions from '../component/questionComponent/fastAccessToquestions/fastAccessToquestions.component';
//////////////////////////////
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//////////////////////////////
import QuestionsHeader from '../component/questionsInfo/questionsInfo.components';
const courses = [
    { course: 'ریاضی', examChildId: '608e3587e587310916173bdf' },
    { course: 'فیزیک', examChildId: '608e35e1e587310916173be1' },
    { course: 'علوم', examChildId: '608e35f7d0832209d2e4bf71' },
    { course: 'اجتماعی', examChildId: '608e375446851c0a1782b31f'},
  ]

const QuestionPage = ({questions}) =>{
    // const [numberOfQuestions,seNumberOfQuestions] = useState('');
    const [courseName,setCourseName] = useState('');

    useEffect(()=>{
        console.log('courseName',courseName);
        setCourseName(courses && courses.length > 0 ? courses[0].examChildId :'')
    },[]);

    return (
        <QuestionPageContainer>
            <div>
                <QuestionsHeader courses={courses} />
            </div>
             <ComboDiv >
                <Autocomplete
                    style={{ width: 300 }}
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
                        setCourseName(newValue.examChildId);
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
                <Questions selectedCourseName={courseName} questions={questions} />
            </QuestionPageDiv>
        </QuestionPageContainer>
    )
};

export default QuestionPage;