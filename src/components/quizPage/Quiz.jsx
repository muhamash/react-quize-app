/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
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
  resetQuiz,
  allAnswers,
  setAllAnswers,
  onModalNext,
  data,
}) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const { handleSubmit } = useForm();
  const { dispatch } = useQuiz();

  // Helper to shuffle options
  const shuffleOptions = (options) => options.sort(() => Math.random() - 0.5);

  useEffect(() => {
    // Shuffle options every time the question changes
    setShuffledOptions(shuffleOptions(question.options));

    // Get the previously selected option for the current question
    const prevAnswer = allAnswers.find((answer) => answer.questionId === question.id);
    setCurrentSelection(prevAnswer ? prevAnswer.selectedOption : null);
  }, [question, allAnswers]);

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

    // Update the answer for the current question
    setAllAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer) =>
        answer.questionId === question.id
          ? { ...answer, selectedOption: newSelection }
          : answer
      );

      // If no previous answer exists for this question, add it to the array
      if (!updatedAnswers.some((answer) => answer.questionId === question.id)) {
        updatedAnswers.push({ questionId: question.id, selectedOption: newSelection });
      }
      return updatedAnswers;
    });
  };

  const onSuccess = (response) => {
    dispatch({ type: 'GET_QUIZ_ANSWERS_SERVER', payload: response.data });
    dispatch({
      type: 'GET_ATTEMPT_ID',
      payload: { quizId: data?.data?.id, attemptId: response.data.attempt_id },
    });

    let result = {
      correctCount: 0,
      wrongCount: 0,
      totalMarks: 0,
      percentage: Number(response.data.percentage),
      quizMarks: data.data.stats.total_marks,
    };

    allAnswers.forEach((answer) => {
      const correctAnswer = response.data.correct_answers.find(
        (u) => u.question_id === answer.questionId
      );

      if (correctAnswer) {
        if (correctAnswer.answer === answer.selectedOption) {
          result.correctCount++;
          result.totalMarks += correctAnswer.marks;
        } else {
          result.wrongCount++;
        }
      }
    });

    dispatch({ type: 'GET_SUBMIT_INFO', payload: result });
  };

  const quizMutation = usePostData({
    url: `http://localhost:5000/api/quizzes/${data?.data?.id}/attempt`,
    onSuccess,
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
      const answersPayload = allAnswers.reduce((acc, answer) => {
        acc[answer.questionId] = answer.selectedOption;
        return acc;
      }, {});

      quizMutation.mutate({ answers: answersPayload });
    } else {
      onNext(currentSelection);
      setShuffledOptions(shuffleOptions(question.options));
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
        dispatch({ type: 'GET_QUIZ_ANSWERS', payload: allAnswers });
        dispatch({ type: 'GET_SINGLE_QUIZ', payload: data.data });

        onModalNext();
        Swal.fire('Submitted!', 'Your quiz has been submitted.', 'success');
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: '🕹️🤗  This time do better!!',
          showConfirmButton: false,
          timer: 1500,
        });
        resetQuiz();
      }
    });
  };

  return (
    <motion.div className="bg-white p-6 rounded-md" {...slideAnimation}>
      <Toaster position="top-center" reverseOrder={false} />
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
