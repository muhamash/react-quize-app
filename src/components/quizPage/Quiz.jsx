/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { QuizOption } from './QuizOption';

export default function Quiz({ question, onNext, currentIndex, totalQuestions, resetQuiz }) {
    const shuffleOptions = (options) => [...options].sort(() => Math.random() - 0.5);

    const [shuffledOptions, setShuffledOptions] = useState(shuffleOptions(question.options));
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const { handleSubmit } = useForm();

    const navigate = useNavigate();

    if (shuffledOptions[0] !== question.options[0]) {
        setShuffledOptions(shuffleOptions(question.options));
        setSelectedOptions([]);
    }

    const slideAnimation = {
        initial: { x: currentIndex % 2 === 0 ? 300 : -300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: currentIndex % 2 === 0 ? -300 : 300, opacity: 0 },
        transition: { duration: 0.5 },
    };

    const handleOptionChange = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((o) => o !== option)
                : [...prev, option]
        );
    };

    const onSubmit = () => {
        if (selectedOptions.length === 0) {
            toast.error("Please select at least one option to proceed.", {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                }
            });
            return;
        }

        setAllAnswers((prevAnswers) => [
            ...prevAnswers,
            { question: question.question, selectedOptions },
        ]);

        if (currentIndex + 1 === totalQuestions) {
            Swal.fire( {
                title: "Are you sure you want to submit?",
                text: "This will end the quiz, and you won't be able to change your answers.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, submit it!",
                cancelButtonText: "No, retry!",
                reverseButtons: true,
            } ).then( ( result ) =>
            {
                if ( result.isConfirmed )
                {
                    Swal.fire( "Submitted!", "Your quiz has been submitted.", "success", "See your result!!!" );
                    console.log( "All answers:", allAnswers );
                    navigate('/result')
                } else if ( result.dismiss === Swal.DismissReason.cancel )
                {
                    toast( "You can't review your answers and try again.", {
                        icon: "info",
                        style: {
                            border: '1px solid #007bff',
                            padding: '16px',
                            color: '#007bff',
                        },
                    } );
                    resetQuiz();
                }
            } );
        } else {
            onNext();
        }
    };

    return (
        <motion.div className="bg-white p-6 rounded-md" { ...slideAnimation }>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">
                    { currentIndex + 1 }. { question.question }
                </h3>
            </div>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <div className="grid grid-cols-2 gap-4">
                    { shuffledOptions.map( ( option, index ) => (
                        <QuizOption
                            key={ index }
                            option={ option }
                            isSelected={ selectedOptions.includes( option ) }
                            onChange={ () => handleOptionChange( option ) }
                        />
                    ) ) }
                </div>
                <button
                    type="submit"
                    className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                >
                    { currentIndex + 1 === totalQuestions ? "Finish" : "Next" }
                </button>
                <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                        style={ { width: `${( ( currentIndex + 1 ) / totalQuestions ) * 100}%` } }
                        className="bg-primary h-full rounded"
                    />
                </div>
            </form>
        </motion.div>
    );
}