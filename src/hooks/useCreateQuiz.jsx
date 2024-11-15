 
import React from 'react';
import { CreateQuizContext } from '../context/index.js';

export default function useCreateQuiz ()
{
    return React.useContext( CreateQuizContext );
}