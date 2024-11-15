/* eslint-disable react/prop-types */
import { useMemo, useReducer } from 'react';
import { CreateQuizContext } from './index';

const initialState = {
    questions: [], 
    currentQuestion: null
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            return { ...state, questions: [...state.questions, action.payload] };
        case 'EDIT_QUESTION':
            return {
                ...state,
                questions: state.questions.map(q => q.id === action.payload.id ? action.payload : q),
                currentQuestion: null
            };
        case 'DELETE_QUESTION':
            return {
                ...state,
                questions: state.questions.filter(q => q.id !== action.payload)
            };
        case 'SET_CURRENT_QUESTION':
            return { ...state, currentQuestion: action.payload };
        case 'CLEAR_CURRENT_QUESTION':
            return { ...state, currentQuestion: null };
        default:
            return state;
    }
};

export const CreateQuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    const contextValue = useMemo( () => ( { state, dispatch } ), [ state ] );

    return (
        <CreateQuizContext.Provider value={contextValue}>
            {children}
        </CreateQuizContext.Provider>
    );
};

export default CreateQuizContext;