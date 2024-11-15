import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useCreateQuiz from '../../hooks/useCreateQuiz';

export default function QuizForm() {
    const { state, dispatch } = useCreateQuiz();
    const { currentQuestion } = state;

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            quizTitle: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ],
        },
    });

    useEffect(() => {
        if (currentQuestion) {
            reset({
                quizTitle: currentQuestion.quizTitle,
                options: currentQuestion.options,
            });
        }
    }, [currentQuestion, reset]); // Dependency array includes `currentQuestion` and `reset`

    const { fields } = useFieldArray({
        control,
        name: 'options',
    });

    const selectedCorrectOptions = watch('options').filter((option) => option.isCorrect);

    const handleReset = () => {
        dispatch({ type: 'SET_CURRENT_QUESTION', payload: null });
        reset({
            quizTitle: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
            ],
        });
    };

    const onSubmit = (data) => {
        if (selectedCorrectOptions.length !== 1) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Select One checkbox as the answer',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        if (currentQuestion) {
            dispatch({ type: 'EDIT_QUESTION', payload: { id: currentQuestion.id, ...data } });
        } else {
            dispatch({ type: 'ADD_QUESTION', payload: { id: Date.now(), ...data } });
        }

        handleReset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Binary Tree Quiz</h2>
            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions: {state.questions.length}
            </div>
            <p className="text-gray-600 mb-4">
                Test understanding of binary tree traversal methods, tree properties, and algorithms.
            </p>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

                <div>
                    <label htmlFor="quizTitle" className="block text-sm font-medium text-foreground mb-1">
                        Quiz Title <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="quizTitle"
                        {...register('quizTitle', { required: 'Quiz title is required' })}
                        className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                        placeholder="Enter quiz title"
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.quizTitle?.message}</p>
                </div>

                <p className="text-sm text-gray-600 mt-4">Add Options</p>

                <div id="optionsContainer" className="space-y-2 mt-4">
                    {fields.map((option, index) => (
                        <div
                            key={option.id}
                            className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
                        >
                            <input
                                type="checkbox"
                                {...register(`options.${index}.isCorrect`)}
                                className="text-primary focus:ring-0 w-4 h-4"
                                checked={watch(`options.${index}.isCorrect`)}
                            />
                            <input
                                type="text"
                                {...register(`options.${index}.text`, { required: 'Option text is required' })}
                                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                placeholder={`Option ${index + 1}`}
                                defaultValue={option.text}
                            />
                            <p className="text-red-500 text-sm mt-1">{errors.options?.[index]?.text?.message}</p>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                    {currentQuestion ? 'Update Question' : 'Add Question'}
                </button>
            </div>
        </form>
    );
}