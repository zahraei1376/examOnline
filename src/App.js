import './App.css';
import QuestionPageContainer from './pages/questionPage.component';
import AddExamForTeacher from './component/addExamComponent/addExamComponent.component';
import ExamPageForStudent from './component/examPageForStudent/examPageForStudent.component';
///////////////////////////
import ArchiveForTeacher from './component/examPageForTeacher/archiveForTeacher/archiveForTeacher.component';
import EditeAxamPageForTeacher from './component/editeAxamForTeacher/editeaxamPage.component';
import ArchiveForStudent from './component/archiveForStudent/archiveForStudent.component';
const App = () => {
  return (
    <div className="App">
      {/* <AddExamForTeacher/> */}
     <QuestionPageContainer />
     {/* <ExamPageForStudent/> */}
     {/* <ArchiveForTeacher/> */}
     {/* <EditeAxamPageForTeacher/> */}
     {/* <ArchiveForStudent/> */}
    </div>
  );
}

export default App;
