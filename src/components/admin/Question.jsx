/* eslint-disable react/prop-types */
import React from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useCreateQuiz from '../../hooks/useCreateQuiz';
import { useDelete } from '../../hooks/useDelete';

export default function Question ( { question, status, setEditQuestionData } )
{
    const { dispatch, state } = useCreateQuiz();

    // console.log(state.quizEditResponse, question.id)

    const onSuccess = ( response ) =>
    {
        console.log( response );
        Swal.fire( {
            title: "Deleted!",
            text: "Question has been deleted!!",
            icon: "success",
        } );

        dispatch( {
            type: 'DELETE_QUESTION',
            payload: {
                quizId: state?.quizEditResponse?.id,
                questionId: question?.id,
            },
        } );
    };

    const onError = ( error ) =>
    {
        console.error( error );
        Swal.fire( {
            title: "Error",
            text: "Can't delete!!!",
            icon: "error",
        } );
    };
    
    const deleteQuestion = useDelete( {
        queryKey: [ `quizListAdmin` ],
        url: ``,
        onSuccess,
        onError,
    } );

    const handleDelete = React.useCallback( () =>
    {
        Swal.fire( {
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f149d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        } ).then( ( result ) =>
        {
            if ( result.isConfirmed )
            {
                deleteQuestion.mutate( {
                    url: `http://localhost:5000/api/admin/questions/${question.id}`,
                } );
            }
        } );
    }, [ deleteQuestion, question.id ] );

    const handleEdit = React.useCallback( () =>
    {
        // console.log( question );
        setEditQuestionData( question );
    }, [ question , setEditQuestionData] );


    return (
        <form className="rounded-lg overflow-hidden shadow-sm mb-4">
            <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        { question.question }
                    </h3>
                </div>
                <div className="space-y-2">
                    {
                        question?.options?.map( ( op, index ) => (
                            <label key={ index } className="flex items-center space-x-3">
                                <input
                                    disabled
                                    type="radio"
                                    value={ op }
                                    checked={ question.correctAnswer === op }
                                    className="form-radio text-buzzr-purple"
                                    readOnly
                                />
                                <span>{ op }</span>
                            </label>
                        ) )
                    }
                    
                </div>
            </div>
            {
                !status  && (
                    <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                        <button
                            type="button"
                            onClick={handleDelete }
                            className="text-red-600 hover:text-red-800 font-medium"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={ handleEdit }
                            className="text-primary hover:text-primary/80 font-medium"
                        >
                            Edit Question
                        </button>
                    </div>
                )
            }
        </form>
    );
}