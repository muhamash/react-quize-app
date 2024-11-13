/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import useQuiz from '../../hooks/useQuiz';
import { SelectionTracker } from './Radio';

const correctAnswerResponse = [
    {
        id: "4fc4f709-13e9-4555-9d03-f487c8a01aa4",
        correctAnswer: "A web server"
    },
    {
        id: "15eb9586-97b3-4ca0-b48e-0702f133d6c1",
        correctAnswer: "useReducer"
    },
    {
        id: "42c1ff89-afc8-47e5-92cc-277f562135e2",
        correctAnswer: "Creative Style System"
    },
    {
        id: "0841efeb-39c3-476e-99e9-342c033c56a6",
        correctAnswer: "string"
    },
    {
        id: "1a99732e-acd6-4b6e-adf9-2c3e71841d85",
        correctAnswer: "var variableName"
    },
    {
        id: "1eecba79-a790-498a-8519-1292dcc4dc3d",
        correctAnswer: "<href>"
    }
]

export default function Answer({ data }) {
    const { state } = useQuiz();

    // Find the selected option for this question
    const userSelectedOption = state.quizAnswers.find( ( u ) => u.questionId === data.id )?.selectedOption;
    const correctAnswer = correctAnswerResponse.find( ( u ) => u.id === data.id )?.correctAnswer;
    const userSelection = userSelectedOption[ 0 ];
    
    console.log(correctAnswer, userSelection)

    const slideAnimation = {
        initial: { y: -300, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 300, opacity: 0 },
        transition: { duration: 0.3 },
    };

    return (
        <motion.div className="rounded-lg overflow-hidden shadow-sm mb-4" {...slideAnimation}>
            <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{data.question}</h3>
                </div>
                {/* Render Radio options with Controller */}
                <div className={`space-y-2 ${correctAnswer === userSelection && correctAnswer.length === userSelection.length ? 'bg-slate-400' : 'bg-rose-400'} p-3 rounded-md`}>
                    {data.options.map((option, index) => (
                        <SelectionTracker key={ index } label={ option } name={option} value={option} checked={userSelection === option} isUserSelection={userSelection === option} isCorrectAnswer={correctAnswer === option}/>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

