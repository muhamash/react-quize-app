/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";
import { usePostData } from '../hooks/usePostData';
import useQuiz from '../hooks/useQuiz';

export default function ResultPage() {
    const { state, dispatch } = useQuiz();
    console.log(state.quizAnswers, state.quizzes[0]?.id, state.quizAnswerServer);

    const onSuccess = (response) => {
        console.log(response);
        dispatch({ type: "GET_QUIZ_ANSWERS_SERVER", payload: response.data });
    };

    const onError = (error) => {
        console.log(error);
    };

    const quizMutation = usePostData( {
        url: `http://localhost:3000/api/quizzes/${state.quizzes[ 0 ]?.id}/attempt`,
        onSuccess,
        onError,
    } );
    
    const firstQuestion = state.quizAnswers[ 0 ].questionId;
    const firstOption = state.quizAnswers[ 0 ].selectedOption[ 0 ];

    console.log( firstOption, firstQuestion );

    useEffect( () =>
    {
        quizMutation.mutate( {
            answers: {
                firstQuestion: firstOption
            }
        } );
    }, [ firstOption, firstQuestion ] );

    return (
        <HelmetProvider>
            <Helmet>
                <title>Your results</title>
            </Helmet>
            <div className="bg-background text-foreground min-h-screen">
                <div className="flex min-h-screen overflow-hidden">
                    <Link to="/">
                        <img src="./assets/logo-white.svg" className="max-h-11 fixed left-6 top-6 z-50" />
                    </Link>
                    <ResultBoard />
                    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
                        <div>
                            <div className="px-4">
                                <Answer />
                                <Answer />
                                <Answer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}