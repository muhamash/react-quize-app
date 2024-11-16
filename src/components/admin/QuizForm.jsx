import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useCreateQuiz from '../../hooks/useCreateQuiz';
import { usePostData } from '../../hooks/usePostData';

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
            quizTitle: currentQuestion?.question || '',
            options: currentQuestion?.options || Array(4).fill({ text: '', isCorrect: false }),
        },
    });

    const { fields } = useFieldArray({ control, name: 'options' });

    const selectedCorrectOptions = useMemo(() => 
        watch('options').filter((option) => option.isCorrect), 
        [watch]
    );

    const onSuccess = (response) => {
        dispatch( {
            type: 'ADD_QUESTION', payload: {
                id: state?.quizEditResponse?.id,
                question: response.data
        } });
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Question saved successfully!',
            showConfirmButton: false,
            timer: 1500,
        });
        reset();
    };

    const onError = (error) => {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `Error: ${error.message}`,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    const addQuizMutation = usePostData( {
        queryKey: [`quizListAdmin`],
        url: `http://localhost:5000/api/admin/quizzes/${state?.quizEditResponse?.id}/questions`,
        onSuccess,
        onError,
    } );

    const onSubmit = (data) => {
        if (selectedCorrectOptions.length !== 1) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Select exactly one correct answer.',
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        const correctAnswerText = data.options.find( ( opt ) => opt.isCorrect )?.text;
        
        addQuizMutation.mutate({
            question: data?.quizTitle,
            options: data?.options?.map((opt) => opt?.text),
            correctAnswer: correctAnswerText,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Binary Tree Quiz</h2>
            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions: {state?.quizList?.Questions?.length}
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
                        { ...register( 'quizTitle', {
                            required: 'Quiz title is required',
                            validate: (value) => value.trim().length > 0 || "Quiz title cannot be empty",
                         })}
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