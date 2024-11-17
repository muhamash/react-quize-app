/* eslint-disable react/prop-types */
import { useMemo, useReducer } from 'react';
import { initialState, quizReducer } from '../reducer/createQuizReducer';
import { CreateQuizContext } from './index';

export const CreateQuizProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer( quizReducer, initialState );
    // console.log( state );

    const contextValue = useMemo( () => ( { state, dispatch } ), [ state ] );

    return (
        <CreateQuizContext.Provider value={contextValue}>
            {children}
        </CreateQuizContext.Provider>
    );
};

export default CreateQuizContext;