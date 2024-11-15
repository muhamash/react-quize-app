import { useFieldArray, useForm } from 'react-hook-form';
import useCreateQuiz from '../../hooks/useCreateQuiz';

export default function QuizForm ()
{
    const { state, dispatch } = useCreateQuiz();
    const { currentQuestion } = state;

    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            quizTitle: '',
            options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ]
        }
    });

    const { fields } = useFieldArray({
        control,
        name: 'options'
    });

    const onSubmit = (data) => {
        if (currentQuestion) {
            dispatch({ type: 'EDIT_QUESTION', payload: { ...currentQuestion, ...data } });
        } else {
            dispatch({ type: 'ADD_QUESTION', payload: { id: Date.now(), ...data } });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Binary Tree Quiz</h2>
            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions : 1
            </div>
            <p className="text-gray-600 mb-4">
                Test understanding of binary tree traversal methods, tree properties, and algorithms.
            </p>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

                <div>
                    <label htmlFor="quizTitle" className="block text-sm font-medium text-foreground mb-1">Quiz Title</label>
                    <input
                        type="text"
                        id="quizTitle"
                        {...register('quizTitle')}
                        className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                        placeholder="Enter quiz title"
                    />
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
                            />
                            <label htmlFor={`optionText${index}`} className="sr-only">Option {index + 1}</label>
                            <input
                                type="text"
                                {...register(`options.${index}.text`)}
                                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                placeholder={`Option ${index + 1}`}
                            />
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