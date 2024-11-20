/* eslint-disable react/prop-types */
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';
import { useFetchData } from '../../hooks/useFetchData';
import useQuiz from '../../hooks/useQuiz';
import QuizPage from '../../page/QuizePage';
import ResultPage from '../../page/ResultPage';

const Loader = () => (
  <div className="w-full flex items-center justify-center p-3">
    <GridLoader color="#4f197f" size={30} />
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
  const [loading, setLoading] = useState(true);
  const [modalStep, setModalStep] = useState(-1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();
  const { state } = useQuiz();
  const { auth } = useAuth();
  const [hovered, setHovered] = useState(false);

  const { data: singleQuiz, isLoading, error } = useFetchData(
    modalStep >= 0 ? `singleQuiz_${quiz.id}` : null,
    modalStep >= 0 ? `http://localhost:5000/api/quizzes/${quiz.id}` : null
  );

  const handleClick = () => {
    if (auth) {
      const hasAttemptedQuiz = state?.quizAttempts?.[auth.user?.id]?.[quiz?.id] !== undefined;
      setModalStep(hasAttemptedQuiz ? 1 : 0);
    } else {
      navigate('/login');
    }
  };

  const closeModal = () => setModalStep(-1);

  const modalComponents = [
    <QuizPage key="quiz" singleQuiz={singleQuiz} isLoading={isLoading} error={error} onModalNext={() => setModalStep(1)} />,
    <ResultPage key="result" singleQuiz={singleQuiz} isLoading={isLoading} error={error} id={quiz.id} onClose={closeModal} />,
  ];

  return (
    <>
      <motion.div
        ref={ref}
        onClick={handleClick}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        exit={{ x: -100 }}
        transition={ { duration: 0.6, ease: 'easeOut' } }
        onMouseEnter={ () => setHovered( true ) }
        onMouseLeave={ () => setHovered( false ) }
        className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer relative"
      >
        {hovered && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black/30 bg-opacity-50 backdrop-blur-md flex items-center z-20 p-2 justify-center  transition-opacity"
          >
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-white bg-yellow-600 text-md p-1  font-semibold text-center font-serif rounded-md shadow-2xl shadow-amber-500"
            >
              {auth && state?.quizAttempts?.[auth.user?.id]?.[quiz?.id] !== undefined ? "You have done the quiz see result!" : "Participate the quiz?"}
            </motion.p>
          </motion.div>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center group-hover:scale-105 transition-all">
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