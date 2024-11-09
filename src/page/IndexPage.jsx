import { AnimatePresence } from "framer-motion";
import { Suspense, useState } from "react";
// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SquareLoader } from 'react-spinners';
import ErrorBoundary from "../components/common/ErrorBoundary";
import QuizCard from "../components/index/QuizCard";
import UserCard from "../components/index/UserCard";
import useAuth from "../hooks/useAuth";
import useIntersectionObserver from "../hooks/useIntersection";

export default function IndexPage() {
    const [quizzes, setQuizzes] = useState(Array(70).fill(null)); 
    const [ loading, setLoading ] = useState( false );
    const { auth } = useAuth();

    console.log( auth );

    const loadMoreQuizzes = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setQuizzes((prev) => [...prev, ...Array(8).fill(null)]);
            setLoading(false);
        }, 1000);
    };

    //     throw new Error( "ErrorComponent", "This is a test error" );
    const targetRef = useIntersectionObserver(loadMoreQuizzes);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Quizzess - Home</title>
                <meta name="description" content="Welcome to the home page!" />
            </Helmet>
            <div className="container mx-auto pt-20">
                <ErrorBoundary>
                    <UserCard  userName={auth.user.full_name}/>
                </ErrorBoundary>
                <div className="bg-white p-6 rounded-md h-full">
                    <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>
                    <ErrorBoundary>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Suspense fallback={ <SquareLoader
                                color="#0d4b28"
                                size={ 100 }
                            /> }>
                                <AnimatePresence>
                                    { quizzes.map( ( _, i ) => (
                                        <QuizCard key={ i } />
                                    ) ) }
                                </AnimatePresence>
                            </Suspense>
                        </div>
                    </ErrorBoundary>
                    { loading && <div>Loading more quizzes...</div> }
                    {/* This div will trigger the intersection observer when it comes into view */ }
                    <div ref={ targetRef } className="h-1" />
                </div>
            </div>
        </HelmetProvider>
    );
}