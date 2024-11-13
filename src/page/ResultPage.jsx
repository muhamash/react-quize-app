 
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
 
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HashLoader } from 'react-spinners';
import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";
import { useFetchData } from '../hooks/useFetchData';
import { usePostData } from '../hooks/usePostData';
import useQuiz from '../hooks/useQuiz';


export default function ResultPage({onClose}) {
    const { state, dispatch } = useQuiz();

    console.log(  state.quizAnswerServer );
    
    const { data: singleQuiz, isLoading, error } = useFetchData(
        `singleQuiz_${state?.quizzes[ 0 ]?.id}`,
        `http://localhost:3000/api/quizzes/${state?.quizzes[ 0 ]?.id}`,
    );

    // console.log( singleQuiz.data.questions );

    const onSuccess = ( response ) =>
    {
        console.log( response );
        dispatch( { type: "GET_QUIZ_ANSWERS_SERVER", payload: response.data } );

        const quizId = state?.quizzes[ 0 ]?.id;
        const attemptId = response.data.attempt_id;
        dispatch( { type: "GET_ATTEMPT_ID", payload: { quizId, attemptId } } );
    };

    const onError = ( error ) =>
    {
        console.log( error );
        // toast.promise(" something wrong! ")
    };

    const quizMutation = usePostData( {
        url: `http://localhost:3000/api/quizzes/${state.quizzes[ 0 ]?.id}/attempt`,
        onSuccess,
        onError,
    } );

    React.useEffect( () =>
    {
        if ( state.quizAnswers && state.quizAnswers.length > 0 )
        {
            const questionId = state.quizAnswers[ 0 ].questionId;
            const selectedOption = state.quizAnswers[ 0 ].selectedOption[ 0 ];

            quizMutation.mutate( {
                answers: {
                    [ questionId ]: selectedOption
                }
            } );
        }
    }, [] );

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
            <div className="bg-background text-foreground w-fit h-fit py-1 ">
                <div className="flex flex-wrap overflow-hidden">
                    <ResultBoard onClose={ onClose } />
                    <div className="flex items-center justify-center h-[700px] md:w-1/2 ">
                        <div className="h-full w-full overflow-y-scroll">
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