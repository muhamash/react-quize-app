import { Fragment, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import './App.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import { CreateQuizProvider } from './context/CreateQuizProvider';
import QuizProvider from './context/QuizProvider';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './routes/PrivateRoute';

// const AddQuizCardPage = lazy(() => import('./page/AddQuizCardPage'));
const CreateQuiz = lazy(() => import('./page/CreateQuiz'));
const DashBoard = lazy(() => import('./page/DashBoard'));
const HomePage = lazy(() => import('./page/HomePage'));
const LeaderBoard = lazy(() => import('./page/LeaderBoard'));
const Login = lazy(() => import('./page/Login'));
const RegistrationPage = lazy(() => import('./page/RegistrationPage'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <PacmanLoader color="#067023" margin={2} size={99} speedMultiplier={1} />
          </div>
        }
      >
        <Fragment>
          <QuizProvider>
            <CreateQuizProvider>
              <Routes>
                {/* Public Routes accessible to all users */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={ <RegistrationPage /> } />

                {/* Private Routes for Logged-in Users */}
                <Route element={<PrivateRoute requiredRole="user" />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/leaderBoard" element={<LeaderBoard />} />
                  </Route>
                </Route>

                {/* Private Routes for Admins */}
                <Route element={<PrivateRoute requiredRole="admin" />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<DashBoard />} />
                    <Route path="/createQuiz" element={<CreateQuiz />} />
                  </Route>
                </Route>
              </Routes>
            </CreateQuizProvider>
          </QuizProvider>
        </Fragment>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;