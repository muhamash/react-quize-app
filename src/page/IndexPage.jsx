import { AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SquareLoader } from 'react-spinners';
import ErrorBoundary from "../components/common/ErrorBoundary";
import QuizCard from '../components/index/QuizCard';
import UserCard from "../components/index/UserCard";
import useAuth from "../hooks/useAuth";
import { useFetchData } from "../hooks/useFetchData";
import useQuiz from "../hooks/useQuiz";

export default function IndexPage() {
    const { auth } = useAuth();
    const { state, dispatch } = useQuiz();

    const { isLoading, error } = useFetchData(
        ['quizzes'],
        'http://localhost:3000/api/quizzes',
        {},
        ( data ) =>
        {
            // not working
            console.log('Data received in callback:', data); 
            // dispatch({ type: 'SET_QUIZZES', payload: data });
        }
    );

    console.log(state);

    if (isLoading) {
        return <SquareLoader color="#0d4b28" size={100} />;
    }

    if (error) {
        return <div className="w-screen h-screen text-red-700 flex justify-center items-center">Error loading quizzes.</div>;
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Quizzes - Home</title>
                <meta name="description" content="Welcome to the home page!" />
            </Helmet>
            <div className="container mx-auto pt-20">
                {auth?.user && (
                    <ErrorBoundary>
                        <UserCard userName={auth?.user.full_name} />
                    </ErrorBoundary>
                )}
                <div className="bg-white p-6 rounded-md h-full">
                    <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>
                    <ErrorBoundary>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <AnimatePresence>
                                {state.quizzes.length === 0 ? (
                                    <p className="text-violet-800 font-mono">No quizzes found at the server!</p>
                                ) : (
                                    state.quizzes.map((quiz) => (
                                        <QuizCard key={quiz.id} />
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </ErrorBoundary>
                </div>
            </div>
        </HelmetProvider>
    );
}
