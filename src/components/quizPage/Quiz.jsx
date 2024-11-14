/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { usePostData } from '../../hooks/usePostData';
import useQuiz from '../../hooks/useQuiz';
import { QuizOption } from './QuizOption';

export default function Quiz({
  question,
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
  selectedOptions,
  resetQuiz,
  allAnswers,
  setAllAnswers,
  onModalNext,
  data,
}) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(selectedOptions);
  const { handleSubmit } = useForm();
  const { dispatch } = useQuiz();

  // Helper to shuffle options
  const shuffleOptions = (options) => options.sort(() => Math.random() - 0.5);

  useEffect(() => {
    setShuffledOptions(shuffleOptions(question.options));
    setCurrentSelection(selectedOptions || null);
  }, [question]);

  const slideAnimation = {
    initial: { y: currentIndex % 2 === 0 ? 50 : -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: currentIndex % 2 === 0 ? -50 : 50, opacity: 0 },
    transition: { duration: 0.3 },
  };

  // Handle selection change
  const handleOptionChange = (option) => {
    const newSelection = currentSelection === option ? null : option;
    setCurrentSelection(newSelection);

    setAllAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer) =>
        answer.questionId === question.id
          ? { ...answer, selectedOption: newSelection }
          : answer
      );

      if (!updatedAnswers.some((answer) => answer.questionId === question.id)) {
        updatedAnswers.push({ questionId: question.id, selectedOption: newSelection });
      }
      return updatedAnswers;
    });
  };

  const  onSuccess = ( response ) =>
  {
    dispatch( { type: 'GET_QUIZ_ANSWERS_SERVER', payload: response.data } );
    dispatch( {
      type: 'GET_ATTEMPT_ID',
      payload: { quizId: data?.data?.id, attemptId: response.data.attempt_id },
    } );

    // let percentageAsNumber = Number();
    let result = {
      correctCount: 0,
      wrongCount: 0,
      totalMarks: 0,
      percentage: Number(response.data.percentage),
    };

    allAnswers.forEach( answer =>
    {
      const correctAnswer = response.data.correct_answers.find( u => u.question_id === answer.questionId );
  
      if ( correctAnswer )
      {
        if ( correctAnswer.answer === answer.selectedOption )
        {
          result.correctCount++;
          result.totalMarks += correctAnswer.marks;
        } else
        {
          result.wrongCount++;
        }
      }
    } );
    // console.log( result );
    dispatch( { type: "GET_SUBMIT_INFO", payload: result } );

  };
  const onError = ( error ) =>
  {
    console.error( error );
    toast.error( 'Something went wrong. Please try again.');
  };

  const quizMutation = usePostData({
    url: `http://localhost:5000/api/quizzes/${data?.data?.id}/attempt`,
    onSuccess,
    onError
    
  });

  const onSubmit = () => {
    if (!currentSelection) {
      toast.error( 'Please select an option to proceed.' );
      console.log('error')
      return;
    }

    if (currentIndex + 1 === totalQuestions) {
      handleQuizSubmission();
      const answersPayload = allAnswers.reduce( ( acc, answer ) =>
      {
        acc[ answer.questionId ] = answer.selectedOption;
        return acc;
      }, {} );

      quizMutation.mutate( { answers: answersPayload } );

    } else {
      onNext(currentSelection);
      setShuffledOptions(shuffleOptions(question.options));
    }
  };

  // Confirm and submit quiz
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
        dispatch({ type: 'GET_QUIZ_ANSWERS', payload: allAnswers });
        dispatch({ type: 'GET_SINGLE_QUIZ', payload: data.data });
        
        onModalNext();
        Swal.fire('Submitted!', 'Your quiz has been submitted.', 'success');
      } else {
        toast('Please review your answers or start again.', {
          icon: '📰',
          style: { border: '1px solid #007bff', padding: '16px', color: '#007bff' },
        });
        resetQuiz();
      }
    });
  };

  return (
    <motion.div className="bg-white p-6 rounded-md" { ...slideAnimation }>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h3 className="text-2xl font-semibold mb-5">
        {currentIndex + 1}. {question.question}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {shuffledOptions.map((option, index) => (
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
            {currentIndex + 1 === totalQuestions ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}