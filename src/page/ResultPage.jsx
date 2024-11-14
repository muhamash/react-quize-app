/* eslint-disable react/prop-types */

import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";
import useQuiz from '../hooks/useQuiz';

export default function ResultPage({ onClose }) {
    const { state } = useQuiz();
    
    return (
        <HelmetProvider>
            <Helmet>
                <title>Your results</title>
            </Helmet>
            <Suspense fallback={ <p>loading</p> }>
                <div className="bg-background text-foreground w-fit h-fit py-1">
                    <div className="flex flex-wrap overflow-hidden">
                        <ResultBoard onClose={ onClose } />
                        <div className="flex items-center justify-center h-[700px] md:w-1/2">
                            <div className="h-full w-full overflow-y-scroll">
                                <AnimatePresence mode="wait">
                                    <Suspense fallback={ <p>loading</p> }>
                                        <div className="px-4">
                                            { state?.singleQuiz?.questions.map( ( data ) => (
                                                <Answer key={ data.id } data={ data } />
                                            ) ) }
                                        </div>
                                    </Suspense>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </HelmetProvider>
    );
}