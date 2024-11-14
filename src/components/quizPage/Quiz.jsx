/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useQuiz from '../../hooks/useQuiz';
import { QuizOption } from './QuizOption';

export default function Quiz({ question, onNext, onPrevious, currentIndex, totalQuestions, selectedOptions, resetQuiz, allAnswers, setAllAnswers, onModalNext }) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(selectedOptions || []);
  const { handleSubmit } = useForm();
  // const navigate = useNavigate();
  const { dispatch } = useQuiz();

  const shuffleOptions = (options) => {
    return [...options].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setShuffledOptions(shuffleOptions(question.options));
    if (question && question.id) {
      // Initialize only if question changes
      setCurrentSelection(selectedOptions || []);
    }
  }, [question]);

  const slideAnimation = {
    initial: { y: currentIndex % 5 === 0 ? 50 : -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: currentIndex % 3 === 0 ? -50 : 50, opacity: 0 },
    transition: { duration: 0.3 },
  };

  const handleOptionChange = (option) => {
    setCurrentSelection((prevSelection) => {
      const isSelected = prevSelection.includes(option);
      const updatedSelection = isSelected
        ? prevSelection.filter((item) => item !== option)
        : [...prevSelection, option];

      setAllAnswers((prevAnswers) => {
        const currentQuestionId = question.id;
        const updatedAnswers = prevAnswers.map((answer) =>
          answer.questionId === currentQuestionId
            ? { ...answer, selectedOption: updatedSelection }
            : answer
        );

        if (!updatedAnswers.find((answer) => answer.questionId === currentQuestionId)) {
          updatedAnswers.push({ questionId: currentQuestionId, selectedOptions: updatedSelection });
        }

        return updatedAnswers;
      });

      return updatedSelection;
    });
  };

  const onSubmit = () => {
    if (currentSelection.length === 0) {
      toast.error('Please select at least one option to proceed.', {
        style: { border: '1px solid #713200', padding: '16px', color: '#713200' },
      });
      return;
    }

    if (currentIndex + 1 === totalQuestions) {
      handleQuizSubmission();
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
      if ( result.isConfirmed )
      {
        dispatch( { type: 'GET_QUIZ_ANSWERS', payload: allAnswers } );
        Swal.fire( 'Submitted!', 'Your quiz has been submitted.', 'success' );
        onModalNext();
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
    <motion.div className="bg-white p-6 rounded-md" {...slideAnimation}>
      <h3 className="text-2xl font-semibold mb-5">
        {currentIndex + 1}. {question.question}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {shuffledOptions.map((option, index) => (
            <QuizOption
              key={index}
              option={option}
              isSelected={currentSelection.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          {currentIndex > 0 && (
            <button type="button" onClick={onPrevious} className="text-center bg-primary text-white py-2 px-4 rounded-md">
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