import './App.css';
import QuestionPageContainer from './pages/questionPage.component';
import AddExamForTeacher from './component/addExamComponent/addExamComponent.component';
import ExamPageForStudent from './component/examPageForStudent/examPageForStudent.component';
///////////////////////////


const App = () => {
  return (
    <div className="App">
      {/* <AddExamForTeacher/> */}
     <QuestionPageContainer />
     {/* <ExamPageForStudent/> */}
    </div>
  );
}

export default App;
