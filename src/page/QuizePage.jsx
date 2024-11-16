/* eslint-disable react/prop-types */
import { AnimatePresence } from 'framer-motion';
import { Suspense, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Quiz from '../components/quizPage/Quiz';
import QuizCounter from '../components/quizPage/QuizCounter';
import useAuth from '../hooks/useAuth';
import { useFetchData } from '../hooks/useFetchData';
import useQuiz from '../hooks/useQuiz';

export default function QuizPage({onModalNext}) {
  const { state } = useQuiz();
  const { auth } = useAuth();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState([]);

  const { data: singleQuiz, isLoading, error } = useFetchData(
    `singleQuiz_${state?.quizzes[0]?.id}`,
    `http://localhost:5000/api/quizzes/${state?.quizzes[ 0 ]?.id}`,
  );

  const handleNext = ( selectedOptions ) =>
  {
    const currentQuestionId = singleQuiz.data.questions[ questionIndex ].id;

    setAllAnswers( ( prevAnswers ) =>
    {
      const existingAnswerIndex = prevAnswers.findIndex(
        ( answer ) => answer.questionId === currentQuestionId
      );

      const updatedAnswers = [ ...prevAnswers ];
      if ( existingAnswerIndex !== -1 )
      {
        updatedAnswers[ existingAnswerIndex ] = { questionId: currentQuestionId, selectedOption: selectedOptions };
      } else
      {
        updatedAnswers.push( { questionId: currentQuestionId, selectedOption: selectedOptions } );
      }
      return updatedAnswers;
    } );

    setQuestionIndex( ( prevIndex ) => prevIndex + 1 );
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setAllAnswers([]); 
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
      </div>
    );
  }

  if (error || !singleQuiz) {
    return <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">Error! Maybe backend is not connected.</div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Quiz Page</title>
      </Helmet>
      <ErrorBoundary>
        <Toaster />
        <div className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full overflow-y-scroll">
            <QuizCounter user={ auth?.user.full_name } quizData={ singleQuiz.data } />
            <div className="lg:col-span-2 bg-white ">
              <Suspense fallback={ <p>Loading...</p> }>
                <AnimatePresence mode="wait">
                  { singleQuiz?.data?.questions?.length == 0 ? (
                    <p>No questions in there!!!</p>
                  ):
                    (
                      <Quiz
                      key = { singleQuiz.data.questions[ questionIndex ].id }
                  question={ singleQuiz.data.questions[ questionIndex ] }
                  onNext={ handleNext }
                  onPrevious={ handlePrevious }
                  currentIndex={ questionIndex }
                  totalQuestions={ singleQuiz.data.questions.length }
                  resetQuiz={ resetQuiz }
                  allAnswers={ allAnswers }
                  setAllAnswers={ setAllAnswers }
                  data={ singleQuiz }
                  onModalNext={ onModalNext }
                    />
                  )
                  }
                </AnimatePresence>
              </Suspense>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}