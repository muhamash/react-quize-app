import React from 'react';
import { QuizContext } from '../context/index';

export default function useQuiz() {
    return React.useContext( QuizContext );
}