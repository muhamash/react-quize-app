/* eslint-disable react/prop-types */
import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";
import useQuiz from '../hooks/useQuiz';

export default function ResultPage({ onClose }) {
    const { state } = useQuiz();
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     try {
    //         if (!state) {
    //             throw new Error("Quiz data not found!");
    //         }
    //         if (state?.singleQuiz?.questions) {
    //             setIsLoading(false);
    //         }
    //     } catch (err) {
    //         setError(err.message);
    //         setIsLoading(false);
    //     }
    // }, [state]);

    // if (isLoading) {
    //     return (
    //         <div className="w-screen h-screen flex items-center justify-center">
    //             <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">
    //             Error: {error} - Backend might not be connected!
    //         </div>
    //     );
    // }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Your results</title>
            </Helmet>
            <ErrorBoundary>
                <div className="bg-background text-foreground w-fit h-fit py-1">
                    <div className="flex flex-wrap overflow-hidden">
                        <Suspense fallback={<p>Loading!!!!</p>}>
                            <ResultBoard onClose={onClose} />
                        </Suspense>
                        <div className="flex items-center justify-center h-[700px] md:w-1/2">
                            <div className="h-full w-full overflow-y-scroll">
                                <AnimatePresence mode="wait">
                                    <Suspense fallback={<p>Loading</p>}>
                                        <div className="px-4">
                                            {state?.singleQuiz?.questions.map((data) => (
                                                <Answer key={data.id} data={data} />
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