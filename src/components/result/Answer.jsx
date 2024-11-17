/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import useQuiz from '../../hooks/useQuiz';
import { SelectionTracker } from './Radio';

export default function Answer({ data }) {
    const { state } = useQuiz();

    if (!data && !state?.quizAnswerServer?.correct_answers) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-500">
                </div>
            </div>
        );
    }

    const userSelectedOption = state?.quizAnswers?.find((u) => u?.questionId === data.id)?.selectedOption;
    const correctAnswer = state?.quizAnswerServer?.correct_answers?.find((u) => u?.question_id === data?.id)?.answer;
    const userSelection = userSelectedOption;

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
                <div
                    className={`space-y-2 ${
                        correctAnswer === userSelection && correctAnswer.length === userSelection.length
                            ? 'bg-slate-400'
                            : 'bg-rose-400'
                    } p-3 rounded-md`}
                >
                    {data?.options?.map((option, index) => (
                        <SelectionTracker
                            key={index}
                            label={option}
                            name={option}
                            value={option}
                            checked={userSelection === option}
                            isUserSelection={userSelection === option}
                            isCorrectAnswer={correctAnswer === option}
                        />
                    ))}
                    <div className="bg-violet-500 p-2 my-2">
                        {correctAnswer === userSelection && correctAnswer.length === userSelection.length ? (
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