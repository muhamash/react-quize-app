/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import { QuizContext } from '../context/index';
import { useFetchData } from '../hooks/useFetchData';
import { initialState, quizReducer } from '../reducer/quizReducer';

export default function QuizProvider ({children})
{
    const [ state, dispatch ] = useReducer( quizReducer, initialState );

    const {data ,isLoading, error } = useFetchData(
        ['quizzes'],
        'http://localhost:3000/api/quizzes',
        {},
    );

    if ( data && state.quizzes.length === 0 )
    {
        dispatch({ type: "SET_QUIZZES", payload: data.data });
    };

    return <QuizContext.Provider
        value={
            {
                state,
                isLoading,
                error,
            }
        }>
        { children }</QuizContext.Provider>;
};