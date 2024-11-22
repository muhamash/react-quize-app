/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { HashLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';
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
    const { auth } = useAuth();
    const userId = auth?.user?.id;

    const userSelections = state.quizAnswers?.[ userId ]?.[ quizId ]?.find(
        ans => ans.questionId === data.id
    );

    const correctAnswers = state.quizAnswerServer?.[ userId ]?.[ quizId ]?.find(
        quiz => quiz.question_id === data.id
    );
    const isCorrect = correctAnswers?.answer === userSelections?.selectedOption && correctAnswers?.answer?.length === userSelections?.selectedOption?.length;

    if (!state.quizAnswers?.[userId]?.[quizId] || !state.quizAnswerServer?.[userId]?.[quizId]) {
        return (
            <div className="flex items-center justify-center">
                <HashLoader color="#4e1f9b" size={ 100 } speedMultiplier={ 2 } />
            </div>
        );
    };

    return (
        <motion.div
            className="rounded-lg overflow-hidden shadow-md shadow-black/30 mb-4"
            {...slideAnimation}
        >
            <div className={`${
                        isCorrect ? 'bg-green-700' : 'bg-rose-700'
                    } p-3 !pb-2`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{data.question}</h3>
                </div>
                <div
                    className={`space-y-2 p-3 rounded-md bg-gradient-to-r from-slate-400 via-sky-700  bg-opacity-90 backdrop-blur-sm shadow-lg shadow-white/20 border-[1px] border-slate-400 `}
                >
                    {data?.options?.map((option, index) => (
                        <SelectionTracker
                            key={index}
                            label={option}
                            name={option}
                            value={option}
                            checked={userSelections?.selectedOption === option}
                            isUserSelection={userSelections?.selectedOption === option}
                            isCorrectAnswer={correctAnswers?.answer === option}
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