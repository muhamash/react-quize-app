import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';
import QuizLayout from './layouts/QuizLayout';
import PrivateRoute from './routes/PrivateRoute';

const AddQuizCardPage = lazy(() => import('./page/AddQuizCardPage'));
const CreateQuiz = lazy(() => import('./page/CreateQuiz'));
const DashBoard = lazy(() => import('./page/DashBoard'));
const IndexPage = lazy(() => import('./page/IndexPage'));
const LeaderBoard = lazy(() => import('./page/LeaderBoard'));
const Login = lazy(() => import('./page/Login'));
const QuizPage = lazy(() => import('./page/QuizePage')); 
const RegistrationPage = lazy(() => import('./page/RegistrationPage'));
const ResultPage = lazy(() => import('./page/ResultPage'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <PacmanLoader color="#067023" margin={2} size={99} speedMultiplier={1} />
        </div>
      }>
        <Routes>
          {/* Public Routes accessible to all users */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<IndexPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<RegistrationPage />} />

          {/* Private Routes for Logged-in Users */}
          <Route element={<PrivateRoute requiredRole="user" />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<IndexPage />} /> 
              <Route path="/leaderBoard" element={<LeaderBoard />} />
            </Route>
            <Route element={<QuizLayout />}>
              <Route path="/quizzes" element={<QuizPage />} />
              <Route path="/result" element={<ResultPage />} />
            </Route>
          </Route>

          {/* Private Routes for Admins */}
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashBoard" element={<DashBoard />} />
              <Route path="/addQuiz" element={<AddQuizCardPage />} />
              <Route path="/createQuiz" element={<CreateQuiz />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;