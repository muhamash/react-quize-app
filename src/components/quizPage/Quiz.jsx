 
/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useQuiz from '../../hooks/useQuiz';
import { QuizOption } from './QuizOption';

export default function Quiz({ question, onNext, onPrevious, currentIndex, totalQuestions, selectedOptions, resetQuiz, allAnswers }) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(selectedOptions);
  const [answers, setAnswers] = useState([]);
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
    const { dispatch } = useQuiz();
    
    const shuffleOptions = ( options ) =>
    {
        return [ ...options ].sort( () => Math.random() - 0.5 );
    };

    useEffect( () =>
    {
        setShuffledOptions( shuffleOptions( question.options ) );
        setCurrentSelection( selectedOptions );
    }, [ question, selectedOptions ] );
    
    const slideAnimation = {
        initial: { y: currentIndex % 5 === 0 ? 300 : -300, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: currentIndex % 3 === 0 ? -300 : 300, opacity: 0 },
        transition: { duration: 0.3 },
    };

    const handleOptionChange = ( option ) =>
    {
        setCurrentSelection( [ option ] );

        const updatedAnswers = answers.map( answer =>
            answer.questionId === question.id ? { ...answer, selectedOptions: [ option ] } : answer
        );

        if ( !updatedAnswers.find( answer => answer.questionId === question.id ) )
        {
            updatedAnswers.push( { questionId: question.id, selectedOptions: [ option ] } );
        }

        setAnswers( updatedAnswers );
    };

    const handleQuizSubmission = () =>
    {
        Swal.fire( {
            title: 'Are you sure you want to submit?',
            text: 'This will end the quiz, and you won’t be able to change your answers.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit it!',
            cancelButtonText: 'No, retry!',
            reverseButtons: true,
        } ).then( ( result ) =>
        {
            if ( result.isConfirmed )
            {
                dispatch( { type: 'GET_QUIZ_ANSWERS', payload: allAnswers } );
                Swal.fire( 'Submitted!', 'Your quiz has been submitted.', 'success' );
                setTimeout( () => navigate( '/result' ), 1000 );
            } else
            {
                toast( 'You are not allow review your answers at this time and try again from the beginning.', {
                    icon: '📰',
                    style: { border: '1px solid #007bff', padding: '16px', color: '#007bff' },
                } );
                resetQuiz();
            }
        } );
    };

    const onSubmit = () =>
    {
        if ( currentSelection.length === 0 )
        {
            toast.error( 'Please select at least one option to proceed.', {
                style: { border: '1px solid #713200', padding: '16px', color: '#713200' },
            } );
            return;
        }

        if ( currentIndex + 1 === totalQuestions )
        {
            handleQuizSubmission();
            
        } else
        {
            onNext( currentSelection );
            // setCurrentSelection( [] );
            setShuffledOptions( shuffleOptions( question.options ) );
        }
    };

    return (
        <motion.div className="bg-white p-6 rounded-md" { ...slideAnimation }>
            <h3 className="text-2xl font-semibold">
                { currentIndex + 1 }. { question.question }
            </h3>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <div className="grid grid-cols-2 gap-4">
                    { shuffledOptions.map( ( option, index ) => (
                        <QuizOption
                            key={ index }
                            option={ option }
                            isSelected={ currentSelection.includes( option ) }
                            onChange={ () => handleOptionChange( option ) }
                        />
                    ) ) }
                </div>
                <div className="flex justify-between items-center mt-6">
                    { currentIndex > 0 && (
                        <button type="button" onClick={ onPrevious } className="w-1/4 text-center bg-primary text-white py-2 px-4 rounded-md">
                            Previous
                        </button>
                    ) }
                    <button type="submit" className="w-1/4 text-center bg-primary text-white py-2 px-4 rounded-md">
                        { currentIndex + 1 === totalQuestions ? 'Submit Quiz' : 'Next Question' }
                    </button>
                </div>
            </form>
        </motion.div>
    );
}