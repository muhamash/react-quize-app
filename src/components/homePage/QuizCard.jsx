/* eslint-disable react/prop-types */
import { motion, useInView } from 'framer-motion';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { GridLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';
import { useFetchData } from '../../hooks/useFetchData';
import useQuiz from '../../hooks/useQuiz';
import QuizPage from '../../page/QuizePage';
import ResultPage from '../../page/ResultPage';


const Loader = () => (
  <div className="w-full flex items-center justify-center p-3">
    <GridLoader color="#4f197f" margin={20} size={30} width={10} />
  </div>
);

const QuizImage = ({ src, onLoad, isLoading }) => (
  <img
    onLoad={onLoad}
    src={src}
    alt="Quiz Background"
    className={`w-full h-full object-cover rounded mb-4 transition-all ${isLoading ? 'hidden' : 'block'}`}
  />
);

const QuizCard = ({ quiz }) => {
  const [loading, setLoading] = React.useState(true);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();
  const { state } = useQuiz();
  const [ modalStep, setModalStep ] = React.useState( -1 );
  const { auth } = useAuth();

  const { data: singleQuiz, isLoading, error } = useFetchData(
    `singleQuiz_${quiz.id}`,
    `http://localhost:5000/api/quizzes/${quiz.id}`,
  );

  const handleClick = () =>
  {
    if ( auth )
    {
      // const hasAttemptedQuiz = state?.quizzes?.find(quiz => quiz)
      const hasAttemptedQuiz = state?.quizAttempts?.some( ( attempt ) => attempt[ quiz.id ] );


      if ( hasAttemptedQuiz )
      {
        setModalStep( 1 );
      } else
      {
        setModalStep( 0 );
      }
    } else
    {
      navigate( '/login' );
    }

    // dispatch({ type: 'GET_SINGLE_QUIZ', payload: quiz });
  };

  const handleModalNext = () => {
    setModalStep(1);
  };

  const closeModal = () => {
    setModalStep( -1 );
    // dispatch({ type: 'GET_SINGLE_QUIZ', payload: null });
  };

  const modalComponents = [
    <QuizPage key="quiz" singleQuiz={singleQuiz} isLoading={isLoading} error={error} onModalNext={handleModalNext} />,
    <ResultPage singleQuiz={singleQuiz} isLoading={isLoading} error={error}  id={quiz.id} key="result" onClose={closeModal} />,
  ];

  return (
    <>
      <motion.div
        onClick={handleClick}
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        exit={{ x: -100 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative ${!modalStep ? 'hidden' : 'block'}`}
      >
        <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
          <h1 className="text-5xl" style={{ fontFamily: 'Jaro' }}>
            {quiz?.title}
          </h1>
          <p className="mt-2 text-lg">{quiz?.description}</p>
        </div>

        {loading && <Loader />}

        <QuizImage
          src={quiz?.thumbnail}
          onLoad={() => setLoading(false)}
          isLoading={loading}
        />
      </motion.div>

      {/* Modal */}
      {modalStep >= 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-[93%] h-[93%] bg-white p-3 rounded-lg shadow-lg">
            <button
              className="bg-red-700 text-white hover:bg-gray-800 p-3 rounded-md shadow-md"
              onClick={closeModal}
            >
              Close
            </button>
            {modalComponents[modalStep]}
          </div>
        </div>
      )}
    </>
  );
};

export default QuizCard;