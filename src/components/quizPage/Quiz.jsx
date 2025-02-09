/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { usePostData } from '../../hooks/usePostData';
import useQuiz from '../../hooks/useQuiz';
import { QuizOption } from './QuizOption';

export default function Quiz({
  question,
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
  resetQuiz,
  allAnswers,
  setAllAnswers,
  onModalNext,
  data,
}) {
  const [currentSelection, setCurrentSelection] = useState(null);
  const { handleSubmit } = useForm();
  const { dispatch } = useQuiz();
  const { auth } = useAuth();

  const shuffleOptions = (options) => options?.sort(() => Math.random() - 0.5);

  // Memoize shuffled options
  const shuffledOptions = useMemo(() => shuffleOptions([...question.options]), [question.options]);

  // Memoize previous answer for the current question
  useMemo(() => {
    const prevAnswer = allAnswers.find((answer) => answer?.questionId === question?.id);
    setCurrentSelection(prevAnswer ? prevAnswer?.selectedOption : null);
  }, [question?.id, allAnswers]);

  const slideAnimation = {
    initial: { y: currentIndex % 2 === 0 ? 50 : -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: currentIndex % 2 === 0 ? -50 : 50, opacity: 0 },
    transition: { duration: 0.3 },
  };

  // Handle selection change
  const handleOptionChange = ( option ) =>
  {
    const newSelection = currentSelection === option ? null : option;
    setCurrentSelection( newSelection );

    setAllAnswers( ( prevAnswers ) =>
    {
      const updatedAnswers = prevAnswers?.map( ( answer ) =>
        answer?.questionId === question?.id
          ? { ...answer, selectedOption: newSelection }
          : answer
      );

      if ( !updatedAnswers?.some( ( answer ) => answer?.questionId === question?.id ) )
      {
        updatedAnswers?.push( { questionId: question?.id, selectedOption: newSelection } );
      }
      return updatedAnswers;
    } );
  };

  // const { refetch } = useFetchData( `quizzes`, `http://localhost:5000/api/quizzes` );

  // const handleRefetch = async( ) =>
  // {
  //   await refetch;
  // }

  const onSuccess = (response) => {
    dispatch( {
      type: 'GET_QUIZ_ANSWERS_SERVER', payload: {
        userId: auth?.user?.id,
        quizId: data?.data?.id,
        quizAnswerServerData: response.data.correct_answers,
      }
    } );
    
    dispatch( {
      type: 'GET_ATTEMPT_ID',
      payload: {  userId: auth?.user?.id, quizId: data?.data?.id, attemptId: response.data?.attempt_id }
    } );

    let result = {
      totalQuestions: response?.data?.submitted_answers?.length,
      correctCount: 0,
      wrongCount: 0,
      totalMarks: 0,
      percentage: Number(response.data.percentage),
      quizMarks: data?.data?.stats?.total_marks,
    };

    allAnswers?.forEach((answer) => {
      const correctAnswer = response?.data?.correct_answers?.find(
        (u) => u?.question_id === answer?.questionId
      );

      if (correctAnswer) {
        if (correctAnswer?.answer === answer.selectedOption) {
          result.correctCount++;
          result.totalMarks += correctAnswer?.marks;
        } else {
          result.wrongCount++;
        }
      }
    });

    dispatch( {
      type: 'GET_SUBMIT_INFO', payload: {
        userId: auth?.user?.id,
        quizId: data?.data?.id,
        submissionInformation: result
      }
    } );

    // await refetch();
    // console.log(handleRefetch, refetch)
  };

  const onError = ( error ) =>
  {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error}`,
      });
  }
  const quizMutation = usePostData({
    url: `${import.meta.env.VITE_BASE_URL}/quizzes/${data?.data?.id}/attempt`,
    onSuccess,
    onError
  });

  const onSubmit = () => {
    if (currentSelection === null || currentSelection === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select option to proceed!',
      });
      return;
    }

    if (currentIndex + 1 === totalQuestions) {
      handleQuizSubmission();
    } else {
      onNext(currentSelection);
    }
  };

  const handleQuizSubmission = () => {
    Swal.fire({
      title: 'Are you sure you want to submit?',
      text: 'This will end the quiz, and you won’t be able to change your answers.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, retry!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch( {
          type: 'GET_QUIZ_ANSWERS', payload: {
            userId: auth?.user?.id,
            quizId: data?.data?.id,
            quizAnswersData: allAnswers
          }
        } );

        const answersPayload = allAnswers.reduce( ( acc, answer ) =>
        {
          acc[ answer.questionId ] = answer.selectedOption;
          return acc;
        }, {} );

        quizMutation.mutate( { answers: answersPayload } );
        Swal.fire( 'Submitted!', 'Your quiz has been submitted.', 'success' );
        onModalNext();
      } else {
        Swal.fire( {
          position: 'top-end',
          icon: 'info',
          title: '🕹️🤗  This time do better!!',
          showConfirmButton: false,
          timer: 1500,
        } );
        resetQuiz();
      }
    });
  };

  return (
    <motion.div className="bg-white p-6 rounded-md" {...slideAnimation}>
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="text-2xl font-semibold mb-5">
        {currentIndex + 1}. {question?.question}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {shuffledOptions?.map((option, index) => (
            <QuizOption
              key={index}
              option={option}
              isSelected={currentSelection === option}
              onChange={() => handleOptionChange(option)}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={onPrevious}
              className="text-center bg-primary text-white py-2 px-4 rounded-md"
            >
              Previous
            </button>
          )}
          <button type="submit" className="text-center bg-primary text-white py-2 px-4 rounded-md">
            {currentIndex + 1 === totalQuestions ? 'Submit' : quizMutation.isPending ? "submitting..!!" : 'Next'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}