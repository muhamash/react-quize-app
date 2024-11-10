import { AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { Toaster toast } from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import ErrorBoundary from "../components/common/ErrorBoundary";
import QuizCard from '../components/homePage/QuizCard';
import UserCard from "../components/homePage/UserCard";
import useAuth from "../hooks/useAuth";
import useQuiz from "../hooks/useQuiz";

export default function IndexPage() {
    const { auth } = useAuth();
    const { state, isLoading, error } = useQuiz();
    
    // const toastShown = useRef(false);
    // if (state?.quizzes && !toastShown.current) {
    //     setTimeout(() => {
    //         toast.success('Look at my styles.', {
    //             style: {
    //                 border: '1px solid #713200',
    //                 padding: '16px',
    //                 color: '#713200',
    //             },
    //             iconTheme: {
    //                 primary: '#713200',
    //                 secondary: '#FFFAEE',
    //             },
    //         } );
    //         toastShown.current = true;
    //     }, 100);   
    // }

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
            {/* <Toaster position="top-right" reverseOrder={false} /> */ }
            <div className="container mx-auto pt-20">
                { auth?.user && (
                    <ErrorBoundary>
                        <UserCard userName={ auth?.user.full_name } />
                    </ErrorBoundary>
                ) }
                <div className="bg-white p-6 rounded-md h-full">
                    <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>
                    {/* <ErrorBoundary> */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            { state?.quizzes?.length === 0 ? (
                                <p className="text-violet-800 font-mono">No quizzes found on the server!</p>
                            ) : (
                                state?.quizzes?.map( ( quiz ) => (
                                    <AnimatePresence key={ quiz.id }>
                                        <ErrorBoundary>
                                             <QuizCard  quiz={ quiz } />
                                       </ErrorBoundary>
                                    </AnimatePresence>
                                ) )
                            ) }
                        </div>
                    {/* </ErrorBoundary> */}
                </div>
            </div>
        </HelmetProvider>
    );
}
