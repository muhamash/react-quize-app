/* eslint-disable react/prop-types */
import React from 'react';
import useCreateQuiz from '../../hooks/useCreateQuiz';

export default function Question({ question }) {
    const { dispatch } = useCreateQuiz();

    // console.log( question);
    // Handle Delete action
    const handleDelete = React.useCallback(() => {
        dispatch({ type: 'DELETE_QUESTION', payload: question.id });
    }, [dispatch, question.id]);

    // Handle Edit action
    const handleEdit = React.useCallback(() => {
        dispatch({ type: 'SET_CURRENT_QUESTION', payload: question });
    }, [dispatch, question]);


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
                            <label key={index} className="flex items-center space-x-3">
                                <input
                                    disabled
                                    type="radio"
                                    value={op}
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
            <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button
                    type="button"
                    onClick={ handleDelete }
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
        </form>
    );
}