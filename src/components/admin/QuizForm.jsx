/* eslint-disable react/prop-types */
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useCreateQuiz from '../../hooks/useCreateQuiz';
import { usePatchData } from '../../hooks/usePatchData';
import { usePostData } from '../../hooks/usePostData';

export default function QuizForm({editQuestionData, setEditQuestionData}) {
    const { state, dispatch } = useCreateQuiz();
    
    const totalQuestions = state?.addQuestions[ state?.quizEditResponse?.id ] ?? state?.addQuestions[ state?.quizList?.id ];

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm( {
        defaultValues: {
            quizTitle: '',
            options: Array( 4 ).fill( { text: '', isCorrect: false } ),
        },
    } );

    const { fields } = useFieldArray( { control, name: 'options' } );
    
    useEffect( () =>
    {
        if ( editQuestionData )
        {
            reset( {
                quizTitle: editQuestionData?.question || '',
                options:
                    editQuestionData?.options?.map( ( option ) => ( {
                        text: option || '',
                        isCorrect: editQuestionData?.correctAnswer === option || false,
                    } ) ) || Array( 4 ).fill( { text: '', isCorrect: false } ),
            } );
        }
    }, [ editQuestionData, reset ] );

    const selectedCorrectOptions = useMemo(() => 
        watch('options').filter((option) => option?.isCorrect), 
        [watch]
    );

    const onSuccess = ( response ) =>
    {
        // console.log( response );
        dispatch( {
            type: 'ADD_QUESTION', payload: {
                id: state?.quizEditResponse?.id,
                question: response.data
            }
        } );

        Swal.fire( {
            position: 'top-end',
            icon: 'success',
            title: `Question ${editQuestionData ? "edited" : "saved"} successfully!`,
            showConfirmButton: false,
            timer: 1500,
        } );

        reset( {
            quizTitle: '',
            options: Array( 4 ).fill( { text: '', isCorrect: false } ),
        } );
        setEditQuestionData( "" );
    };

    const onError = ( error ) =>
    {
        Swal.fire( {
            position: 'top-end',
            icon: 'error',
            title: `Error: ${error.message}`,
            showConfirmButton: false,
            timer: 1500,
        } );
    };

    const addQuizMutation = usePostData( {
        queryKey: [`quizListAdmin`],
        url: `http://localhost:5000/api/admin/quizzes/${state?.quizEditResponse?.id}/questions`,
        onSuccess,
        onError,
    } );

    const editQuestionPatch = usePatchData( {
        queryKey: [ `quizListAdmin` ],
        url: `http://localhost:5000/api/admin/questions/${editQuestionData?.id}`,
        onSuccess,
        onError,
    } );

    const uniqueOptionsValidation = ( options, currentIndex ) =>
    {
        if ( !Array.isArray( options ) )
        {
            return "Options must be unique.";
        }

        const optionTexts = options.map( ( opt ) => opt.text.trim() );
        const currentText = optionTexts[ currentIndex ];

        const duplicateIndexes = optionTexts.reduce( ( acc, text, idx ) =>
        {
            if ( text === currentText && idx !== currentIndex )
            {
                acc.push( idx );
            }
            return acc;
        }, [] );

        if ( duplicateIndexes.length > 0 )
        {
            return `Duplicated with Option ${duplicateIndexes[ 0 ] + 1}`;
        }

        return true;
    };

    const onSubmit = (data) => {
        if (selectedCorrectOptions?.length !== 1) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `Select exactly ${editQuestionData ? "re-select" : ""} one  correct answer.`,
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        };

        const correctAnswerText = data?.options?.find( ( opt ) => opt?.isCorrect )?.text;
        
        editQuestionData ? (
            editQuestionPatch.mutate( {
                question: data?.quizTitle,
                options: data?.options?.map( ( opt ) => opt?.text ),
                correctAnswer: correctAnswerText,
            } )
        ) : (
                addQuizMutation.mutate( {
                    question: data?.quizTitle,
                    options: data?.options?.map( ( opt ) => opt?.text ),
                    correctAnswer: correctAnswerText,
                } )
        )
    };

    const isPending = addQuizMutation.isPending || editQuestionPatch.isPending;

    return (
        <form onSubmit={ handleSubmit( onSubmit ) } className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">{ state?.quizEditResponse?.title ?? state?.quizList?.title }</h2>
            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions: { totalQuestions?.length }
            </div>
            <p className="text-violet-700 mb-4">
                { state?.quizEditResponse?.description ?? state?.quizList?.description }
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
                            validate: ( value ) => value.trim().length > 0 || "Quiz title cannot be empty",
                        } ) }
                        className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                        placeholder="Enter quiz title"
                    />
                    <p className="text-red-500 text-sm mt-1">{ errors.quizTitle?.message }</p>
                </div>

                <p className="text-sm text-gray-600 mt-4">Add Options</p>

                <div id="optionsContainer" className="space-y-2 mt-4">
                    { fields.map( ( option, index ) => (
                        <div
                            key={ option.id }
                            className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
                        >
                            <input
                                type="checkbox"
                                { ...register( `options.${index}.isCorrect`, ) }
                                className="text-primary focus:ring-0 w-4 h-4"
                                checked={ watch( `options.${index}.isCorrect` ) || false }
                            />

                            <input
                                type="text"
                                { ...register( `options.${index}.text`, {
                                    required: 'Option text is required',
                                    validate: ( value, formValues ) => uniqueOptionsValidation( formValues.options, index ),
                                } ) }
                                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                placeholder={ `Option ${index + 1}` }
                                defaultValue={ option.text }
                            />
                            <p className="text-red-500 text-sm mt-1">{ errors.options?.[ index ]?.text?.message }</p>
                        </div>
                    ) ) }
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                    { isPending ? "Processing..." : editQuestionData ? "Update Question" : "Add Question" }
                </button>

            </div>
        </form>
    );
}