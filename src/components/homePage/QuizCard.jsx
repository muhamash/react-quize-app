/* eslint-disable react/prop-types */
import { motion, useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridLoader, SyncLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useFetchData } from '../../hooks/useFetchData';
import QuizPage from '../../page/QuizePage';
import ResultPage from '../../page/ResultPage';

const Loader = () => (
  <div className="w-full h-full flex items-center justify-center p-3">
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

const QuizCard = ( { quiz } ) =>
{
  const [ modalStep, setModalStep ] = useState( -1 );
  const [ attempt, setAttempt ] = useState( null );
  const [ hovered, setHovered ] = useState( false );
  const [ imageLoading, setImageLoading ] = useState( true );
  const [ fetchingAttempt, setFetchingAttempt ] = useState( false );

  const ref = useRef( null );
  const isInView = useInView( ref, { once: true } );
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { api } = useAxios();

  const { data: singleQuiz, isLoading, error } = useFetchData(
    modalStep >= 0 ? `singleQuiz_${quiz.id}` : null,
    modalStep >= 0 ? `http://localhost:5000/api/quizzes/${quiz.id}` : null
  );

  // const { refetch } = useFetchData( `quizzes`, `http://localhost:5000/api/quizzes` );

  const fetchAttemptData = async () =>
  {
    if ( auth )
    {
      setFetchingAttempt( true );
      try
      {
        const response = await api.get( `http://localhost:5000/api/quizzes/${quiz.id}` );
        setAttempt( response?.data?.data?.user_attempt?.attempted );
      } catch ( error )
      {
        console.error( 'Failed to fetch attempt data:', error );
        
      } finally
      {
        setFetchingAttempt( false );
      }
    }

    // await refetch();
  };

  const handleCardClick = () =>
  {
    if ( !fetchingAttempt )
    {
      if ( auth )
      {
        setModalStep( attempt ? 1 : 0 );
      } else
      {
        navigate( '/login' );
      }
    }
  };

  const closeModal = () => setModalStep( -1 );

  const modalComponents = useMemo(
    () => [
      <QuizPage
        key="quiz"
        singleQuiz={ singleQuiz }
        isLoading={ isLoading }
        error={ error }
        onModalNext={ () => setModalStep( 1 ) }
      />,
      <ResultPage
        key="result"
        singleQuiz={ singleQuiz }
        isLoading={ isLoading }
        error={ error }
        id={ quiz.id }
        onClose={ closeModal }
      />,
    ],
    [ singleQuiz, isLoading, error, quiz.id ]
  );

  return (
    <>
      <motion.div
        ref={ ref }
        onClick={ handleCardClick }
        initial={ { opacity: 0, y: 30 } }
        animate={ isInView ? { opacity: 1, y: 0 } : {} }
        exit={ {opacity: 0 , y: -30 } }
        transition={ { duration: 0.6, ease: 'easeOut' } }
        onMouseEnter={ () =>
        {
          setHovered( true );
          fetchAttemptData();
        } }
        onMouseLeave={ () => setHovered( false ) }
        className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer relative ${fetchingAttempt && "cursor-not-allowed"}`}
      >
        { hovered && (
          <motion.div
            initial={ { x: -200 } }
            animate={ { opacity: 1, x: 0 } }
            exit={ { opacity: 0, x: 200 } }
            transition={ { duration: 0.5, ease: 'easeInOut' } }
            className="absolute inset-0 z-10 bg-black/30 bg-opacity-50 backdrop-blur-md flex items-center  p-2 justify-center transition-opacity"
          >
            { fetchingAttempt ? (
              <SyncLoader color="#508d72" size={10}/>
            ) : (
              <motion.p
                initial={ { scale: 0.8 } }
                animate={ { scale: 1 } }
                transition={ { duration: 0.5, ease: 'easeInOut' } }
                className="text-white m-3 bg-yellow-600 text-sm p-3 font-semibold text-center font-mono rounded-md shadow-2xl shadow-amber-500"
              >
                { auth && attempt
                  ? `Great! You’ve already attempted this quiz. See results!`
                  : `Total questions: ${quiz.total_questions} ;  ${quiz.total_attempts} has participated; Ready to participate? ` }
              </motion.p>
            ) }
          </motion.div>
        ) }
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center group-hover:scale-105 transition-all">
          <h1 className="text-5xl" style={ { fontFamily: 'Jaro' } }>
            { quiz?.title }
          </h1>
          <p className="mt-2 text-lg">{ quiz?.description }</p>
        </div>

        { imageLoading && <Loader /> }

        <QuizImage
          src={ quiz?.thumbnail }
          onLoad={ () => setImageLoading( false ) }
          isLoading={ imageLoading }
        />
      </motion.div>

      { modalStep >= 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-[93%] h-[93%] bg-white p-3 rounded-lg shadow-lg">
            <button
              className="bg-red-700 text-white hover:bg-gray-800 p-3 rounded-md shadow-md"
              onClick={ closeModal }
            >
              Close
            </button>
            { modalComponents[ modalStep ] }
          </div>
        </div>
      ) }
    </>
  );
};

export default QuizCard;