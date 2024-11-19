/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { HashLoader } from 'react-spinners';
import useQuiz from '../../hooks/useQuiz';
import { SelectionTracker } from './Radio';

const slideAnimation = {
    initial: { y: -300, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 300, opacity: 0 },
    transition: { duration: 0.3 },
};

export default function Answer({ data, quizId }) {
    const { state } = useQuiz();


    const userSelections = useMemo(
        () => state?.quizAnswers?.find((ans) => ans[quizId]),
        [state.quizAnswers, quizId]
    );

    const correctAnswers = useMemo(
        () => state?.quizAnswerServer?.find((quiz) => quiz[quizId]),
        [state.quizAnswerServer, quizId]
    );

    const userSelectedOption = userSelections?.[quizId]?.find(
        (u) => u?.questionId === data.id
    )?.selectedOption;

    const correctAnswer = correctAnswers?.[quizId]?.find(
        (u) => u?.question_id === data?.id
    )?.answer;

    const isCorrect =
        correctAnswer === userSelectedOption &&
        correctAnswer?.length === userSelectedOption?.length;
    
    
    if (!data && !state?.quizAnswerServer) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <HashLoader color="#4e1f9b" size={ 100 } speedMultiplier={ 2 } />
            </div>
        );
    }

    return (
        <motion.div
            className="rounded-lg overflow-hidden shadow-sm mb-4"
            {...slideAnimation}
        >
            <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{data.question}</h3>
                </div>
                <div
                    className={`space-y-2 ${
                        isCorrect ? 'bg-green-500' : 'bg-rose-400'
                    } p-3 rounded-md`}
                >
                    {data?.options?.map((option, index) => (
                        <SelectionTracker
                            key={index}
                            label={option}
                            name={option}
                            value={option}
                            checked={userSelectedOption === option}
                            isUserSelection={userSelectedOption === option}
                            isCorrectAnswer={correctAnswer === option}
                        />
                    ))}
                    <div className="bg-violet-500 p-2 my-2">
                        {isCorrect ? (
                            <p className="text-sm font-mono">Correct Answer</p>
                        ) : (
                            <p className="text-sm font-mono">Wrong Answer</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}