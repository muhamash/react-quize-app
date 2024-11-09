import { Suspense, lazy } from 'react';
import { BookLoader } from "react-awesome-loaders";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';
import QuizLayout from './layouts/QuizLayout';

const AddQuizCardPage = lazy(() => import('./page/AddQuizCardPage'));
const CreateQuiz = lazy(() => import('./page/CreateQuiz'));
const DashBoard = lazy(() => import('./page/DashBoard'));
const IndexPage = lazy(() => import('./page/IndexPage'));
const LeaderBoard = lazy(() => import('./page/LeaderBoard'));
const Login = lazy(() => import('./page/Login'));
const QuizePage = lazy(() => import('./page/QuizePage'));
const RegistrationPage = lazy(() => import('./page/RegistrationPage'));
const ResultPage = lazy(() => import('./page/ResultPage'));

function App ()
{
  return (
    <ErrorBoundary>
      <Suspense fallback={ <div className="flex items-center justify-center pt-10">
        <BookLoader
          background={ "linear-gradient(135deg, #2d0c6e, #306d91)" }
          desktopSize={ "300px" }
          mobileSize={ "150px" }
          textColor={ "#6e31d0" }
          text="Be patient!"
        />
      </div> }>
        <Routes>
          <Route element={ <MainLayout /> }>
            <Route path="/" element={ <IndexPage /> } />
            <Route path="/leaderBoard" element={ <LeaderBoard /> } />
          </Route>

          <Route element={ <QuizLayout /> }>
            <Route path="/quizess" element={ <QuizePage /> } />
            <Route path="/result" element={ <ResultPage /> } />
            <Route path="/registration" element={ <RegistrationPage /> } />
            <Route path="/login" element={ <Login /> } />
          </Route>

          <Route element={ <AdminLayout /> }>
            <Route path="/dashBoard" element={ <DashBoard /> } />
            <Route path="/addQuiz" element={ <AddQuizCardPage /> } />
            <Route path="/createQuiz" element={ <CreateQuiz /> } />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;