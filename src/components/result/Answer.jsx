/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import useQuiz from '../../hooks/useQuiz';
import Radio from './Radio';

export default function Answer({ data }) {
    const { state } = useQuiz();
    const { control, setValue } = useForm();

    // Find the selected option for this question
    const userSelectedOption = state.quizAnswers.find((u) => u.questionId === data.id)?.selectedOption;

    // Set the initial value for this question’s answer if it exists
    if (userSelectedOption) {
        setValue(`question_${data.id}`, userSelectedOption);
    }

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
                <div className="space-y-2">
                    {data.options.map((option, index) => (
                        <Controller
                            key={index}
                            name={`question_${data.id}`}
                            control={control}
                            defaultValue={userSelectedOption}
                            render={({ field }) => (
                                <Radio
                                    {...field}
                                    label={option}
                                    value={userSelectedOption}
                                    checked={true}
                                    selected={userSelectedOption}
                                />
                            )}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}