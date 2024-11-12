/* eslint-disable no-unused-vars */
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";
import { useFetchData } from '../hooks/useFetchData';
import { usePostData } from '../hooks/usePostData';
import useQuiz from '../hooks/useQuiz';


export default function ResultPage() {
    const { state, dispatch } = useQuiz();
    console.log( state.quizAnswers, state.quizzes[ 0 ]?.id, state.quizAnswerServer );
    
    const { data: singleQuiz, isLoading, error } = useFetchData(
        `singleQuiz_${state?.quizzes[ 0 ]?.id}`,
        `http://localhost:3000/api/quizzes/${state?.quizzes[ 0 ]?.id}`,
    );

    console.log( singleQuiz.data.questions );

    const onSuccess = ( response ) =>
    {
        console.log( response );
        dispatch( { type: "GET_QUIZ_ANSWERS_SERVER", payload: response.data } );
    };

    const onError = ( error ) =>
    {
        console.log( error );
    };

    const quizMutation = usePostData( {
        url: `http://localhost:3000/api/quizzes/${state.quizzes[ 0 ]?.id}/attempt`,
        onSuccess,
        onError,
    } );
    
    const firstQuestion = state.quizAnswers[ 0 ].questionId;
    const firstOption = state.quizAnswers[ 0 ].selectedOption[ 0 ];

    React.useEffect( () =>
    {
        if ( state.quizAnswers && state.quizAnswers.length > 0 )
        {
            quizMutation.mutate( {
                answers: {
                    firstQuestion : firstOption
                },
            } );
        }
    }, [ state.quizAnswers ] );

    if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
      </div>
    );
    };

  if (error || !singleQuiz) {
    return <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">Error! Maybe backend is not connected.</div>;
    };

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
                    <div className="flex items-center justify-center h-screen md:w-1/2 p-8">
                        <div className="h-full w-full max-h-full overflow-y-scroll py-10">
                            <AnimatePresence mode="wait">
                                <div className="px-4">
                                    { singleQuiz?.data?.questions.map( ( data ) => (
                                        <Answer key={ data.id } data={ data } />
                                    ) ) }
                                </div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}