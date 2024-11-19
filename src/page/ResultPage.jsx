 
/* eslint-disable react/prop-types */
import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HashLoader } from 'react-spinners';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";

export default function ResultPage({ onClose, id, singleQuiz, isLoading, error }) {

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
                <title>Your results</title>
            </Helmet>
            <ErrorBoundary>
                <div className="bg-background text-foreground mx-auto w-fit h-fit py-1">
                    <div className="flex flex-col md:flex-row overflow-hidden">
                        <Suspense fallback={<p>Loading!!!!</p>}>
                            <ResultBoard id={id} onClose={onClose} />
                        </Suspense>
                        <div className="flex items-center justify-center h-full mt-3">
                            <div className="w-fit overflow-y-scroll h-[390px] md:h-[700px]">
                                <AnimatePresence mode="wait">
                                    <Suspense fallback={<p>Loading</p>}>
                                        <div className="px-4">
                                            {singleQuiz?.data?.questions?.map((data) => (
                                                <Answer quizId={id} key={data.id} data={data} />
                                            ))}
                                        </div>
                                    </Suspense>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </HelmetProvider>
    );
}