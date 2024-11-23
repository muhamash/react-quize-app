import { AnimatePresence } from "framer-motion";
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HashLoader } from 'react-spinners';
import ErrorBoundary from "../components/common/ErrorBoundary";
import Pagination from "../components/common/Pagination";
import QuizCard from '../components/homePage/QuizCard';
import UserCard from "../components/homePage/UserCard";
import useAuth from "../hooks/useAuth";
import { useFetchData } from '../hooks/useFetchData';
import useQuiz from "../hooks/useQuiz";

export default function HomePage() {
    const { auth } = useAuth();
    const { state, dispatch } = useQuiz();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    const {data ,isLoading, error } = useFetchData(
        ['quizzes'],
        'http://localhost:5000/api/quizzes',
        {},
    );

    if ( data && state?.quizzes?.length === 0 )
    {
        dispatch({ type: "SET_QUIZZES", payload: data?.data });
    };

    const totalPages = Math.ceil((state?.quizzes?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentQuizzes = state?.quizzes?.slice( startIndex, startIndex + itemsPerPage );
    
    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
            </div>
        );
    }

    if (error) {
        return <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">Error!!!..Maybe backend not connected!!</div>;
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Quizzes - Home</title>
                <meta name="description" content="Welcome to the home page!" />
            </Helmet>
            <div className="container mx-auto pt-20">
                { auth?.user && (
                    <ErrorBoundary>
                        <UserCard userName={ auth?.user?.full_name } />
                    </ErrorBoundary>
                ) }
                <div className="bg-white p-6 rounded-md h-full mx-2">
                    <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>
                    <ErrorBoundary>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            { currentQuizzes?.length === 0 ? (
                                <p className="text-violet-800 font-mono">No quizzes found on the server! or there is no quizzes left!!!</p>
                            ) : (
                                currentQuizzes?.map( ( quiz ) => (
                                    <AnimatePresence mode="wait" key={ quiz.id }>
                                        <ErrorBoundary>
                                            <QuizCard quiz={ quiz } />
                                        </ErrorBoundary>
                                    </AnimatePresence>
                                ) )
                            ) }
                        </div>
                    </ErrorBoundary>
                </div>
                {/* pagination */}
                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </HelmetProvider>
    );
}
