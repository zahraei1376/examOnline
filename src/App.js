import './App.css';
import QuestionPageContainer from './pages/questionPage.component';
import AddExamForTeacher from './component/examComponent/addExamComponent.component';
///////////////////////////


const App = () => {
  return (
    <div className="App">
      <AddExamForTeacher/>
     {/* <QuestionPageContainer /> */}
    </div>
  );
}

export default App;
