/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import { QuizContext } from '../context/index';
import { initialState, quizReducer } from '../reducer/quizReducer';

export default function QuizProvider ({children})
{
    const [ state, dispatch ] = useReducer( quizReducer, initialState );

    // console.log(state)
    return <QuizContext.Provider value={ {state, dispatch} }>{ children }</QuizContext.Provider>;
};
