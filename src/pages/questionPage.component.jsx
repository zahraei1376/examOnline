import React, { useState ,useEffect } from 'react';
import { QuestionPageContainer ,QuestionPageDiv,UploadSectionContainer,ComboDiv} from './questionPage.styles';
import Questions from '../component/questionComponent/questionComponent';
import UploadQuestions from '../component/questionComponent/uploadQuestions/uploadQiestions.component';
import FastAccessToQuestions from '../component/questionComponent/fastAccessToquestions/fastAccessToquestions.component';
//////////////////////////////
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//////////////////////////////
const courses = [
    { course: 'ریاضی', groupId: 1994 },
    { course: 'فیزیک', groupId: 1972 },
    { course: 'علوم', groupId: 1974 },
    { course: 'اجتماعی', groupId: 2008 },
  ]

const QuestionPage = () =>{
    // const [numberOfQuestions,seNumberOfQuestions] = useState('');
    const [courseName,setCourseName] = useState('');

    useEffect(()=>{
        console.log('courseName',courseName);
    },[courseName]);

    return (
        <QuestionPageContainer>
             <ComboDiv >
                <Autocomplete
                    style={{ width: 300 }}
                    id="free-solo-demo"
                    freeSolo
                    options={courses.map((option) => option.course)}
                    renderInput={(params) => (
                    <TextField {...params} label="درس ها" margin="normal" 
                    // variant="outlined"
                     />
                    )}

                    onChange={(event, newValue) => {
                        setCourseName(newValue);
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
            <FastAccessToQuestions />
            <QuestionPageDiv>
                {/* <UploadSectionContainer>
                    <UploadQuestions seNumberOfQuestions={seNumberOfQuestions} numberOfQuestions={numberOfQuestions} />
                </UploadSectionContainer> */}
                <Questions selectedCourseName={courseName} />
            </QuestionPageDiv>
        </QuestionPageContainer>
    )
};

export default QuestionPage;