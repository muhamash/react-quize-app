/* eslint-disable react/prop-types */
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HashLoader } from 'react-spinners';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";

export default function ResultPage ( { onClose, id, singleQuiz, isLoading, error } )
{
    const [ openAnswer, setOpenAnswer ] = useState(false);

    const handleAnswer = () =>
    {
        setOpenAnswer( !openAnswer )
    };

    if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
      </div>
    );
  }

  if (error || !singleQuiz) {
    return <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">Error! Maybe backend is not connected.</div>;
  }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Your result - Result page</title>
            </Helmet>
            <ErrorBoundary>
                <div className="bg-background text-foreground mx-auto w-fit h-fit py-1">
                    <div className="flex flex-col md:flex-row overflow-hidden items-center justify-center">
                        <ResultBoard openAnswer={ openAnswer } id={ id } onClose={ onClose } handleAnswer={ handleAnswer } />
                        <div className="flex items-center justify-center h-fit overflow-hidden mt-3">
                            <div className={ `w-fit ${openAnswer === true ? "block md:hidden" : "hidden md:block"} md:h-[700px] flex flex-col items-center justify-center gap-3` }>
                                <button onClick={ () => setOpenAnswer( !openAnswer ) } className={ `${openAnswer === true ? "block" : "hidden"} bg-violet-900 text-white shadow-md shadow-black/30 px-3 py-2 rounded-md` }>Back to the Result board</button>
                                
                                <AnimatePresence mode="wait">
                                    <div className="px-4 overflow-y-scroll h-[700px]">
                                        { singleQuiz?.data?.questions?.map( ( data ) => (
                                            <Answer quizId={ id } key={ data.id } data={ data } />
                                        ) ) }
                                    </div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </HelmetProvider>
    );
}