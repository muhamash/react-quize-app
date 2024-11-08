import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddQuizCardPage from './page/AddQuizCardPage';
import CreateQuiz from './page/CreateQuiz';
import DashBoard from './page/DashBoard';
import IndexPage from './page/IndexPage';
import LeaderBoard from './page/LeaderBoard';
import Login from './page/Login';
import QuizePage from './page/QuizePage';
import RegistrationPage from './page/RegistrationPage';
import ResultPage from './page/ResultPage';

function App() {
  return (
    <Routes>
      <Route element={ <IndexPage /> } path="/" exact />
      <Route element={ <QuizePage /> } path="/quizess" />
      <Route element={ <ResultPage /> } path="/result" />
      <Route element={ <LeaderBoard /> } path="/leaderBoard" />
      <Route element={ <DashBoard /> } path="/dashBoard" />
      <Route element={ <AddQuizCardPage/> } path="/addQuiz" />
      <Route element={ <CreateQuiz /> } path="createQuiz" />
      <Route element={ <RegistrationPage /> } path="/registration" />
      <Route element={ <Login /> } path="/login" />
    </Routes>
  );
}

export default App
