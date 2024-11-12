// import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";
import useQuiz from '../hooks/useQuiz';

export default function ResultPage ()
{
    const { state } = useQuiz();
    console.log( state.quizAnswers, state.quizzes[ 0 ].id );

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
                        <div className="">
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
