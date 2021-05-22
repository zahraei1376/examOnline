import './App.css';
import React, {useEffect} from 'react';
import QuestionPageContainer from './pages/questionPage.component';
import AddExamForTeacher from './component/addExamComponent/addExamComponent.component';
import ExamPageForStudent from './component/examPageForStudent/examPageForStudent.component';
///////////////////////////
import ArchiveForTeacher from './component/examPageForTeacher/archiveForTeacher/archiveForTeacher.component';
import EditeAxamPageForTeacher from './component/editeAxamForTeacher/editeaxamPage.component';
import ArchiveForStudent from './component/archiveForStudent/archiveForStudent.component';
import AddExamForTeacherContainer from './component/addExamComponent/addExamComponent.container';
import QuestionsComponentContainer from './component/questionComponent/questionComponent.container';
// import QuestionsPageContainer from './pages/questionPage.container';
import ExamsListPage from './pages/LoginToExamPage/LoginToExamPage.page';
/////////////////////////////////////////////////////////////////////
import MyParentTest from './mytestCoponent/myparenttest';
import {getTimeAtServer} from './generalComponent/Clock/getTime';
import {
  Switch,
  Route,
} from "react-router-dom";
////////////////////
const App = () => {
  useEffect(() => {
		getTimeAtServer();
		// getConfigAtServer();
	}, []);
  return (
    <div className="App">
      {/* <AddExamForTeacher/> */}
       {/* <QuestionsPageContainer/> */}
      {/* <QuestionsComponentContainer/> */}
{/* ////////////////////////////////////////////////// */}
      {/* <AddExamForTeacherContainer/> */}
      {/* <QuestionPageContainer /> */}
      {/* <ExamPageForStudent/> */}
      {/* <ArchiveForTeacher/> */}
      {/* <EditeAxamPageForTeacher/> */}
      {/* <ArchiveForStudent/> */}
{/* ////////////////////////////////////////////////////////// */}
{/* <MyParentTest/> */}
      <Switch>
        <Route exact path="/" >
          <AddExamForTeacherContainer/>
        </Route>
        <Route exact path="/questions">
          <QuestionPageContainer />
        </Route>
        <Route exact path="/examPageForStudent">
          <ExamPageForStudent />
        </Route>
        <Route exact path="/examsList">
          <ExamsListPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
