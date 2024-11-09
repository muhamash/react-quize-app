import { AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SquareLoader } from 'react-spinners';
import ErrorBoundary from "../components/common/ErrorBoundary";
import UserCard from "../components/index/UserCard";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

export default function IndexPage() {
    const [loading, setLoading] = useState(false);
    // const [quizzes, setQuizzes] = useState([]);
    const { auth } = useAuth();
    const { api } = useAxios();

    const fetchQuiz = async () => {
        try {
            const response = await api.get(`http://localhost:3000/api/quizzes`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, []);

    // const loadMoreQuizzes = () => {
    //     if (loading) return;
    //     setLoading(true);
    //     setTimeout(() => {
    //         setQuizzes((prev) => [...prev, ...Array(8).fill(null)]);
    //         setLoading(false);
    //     }, 1000);
    // };

    // const targetRef = useIntersectionObserver(loadMoreQuizzes);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Quizzes - Home</title>
                <meta name="description" content="Welcome to the home page!" />
            </Helmet>
            <div className="container mx-auto pt-20">
                <ErrorBoundary>
                    <UserCard userName={auth.user.full_name} />
                </ErrorBoundary>
                <div className="bg-white p-6 rounded-md h-full">
                    <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>
                    <ErrorBoundary>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Suspense fallback={<SquareLoader color="#0d4b28" size={100} />}>
                                <AnimatePresence>
                                    {/* {quizzes.map((quiz, i) => (
                                        <QuizCard key={i} quiz={quiz} />
                                    ))} */}
                                </AnimatePresence>
                            </Suspense>
                        </div>
                    </ErrorBoundary>
                    {loading && <div>Loading more quizzes...</div>}
                    {/* <div ref={ targetRef } className="h-1" /> */}
                    {/* Intersection observer trigger */ }
                </div>
            </div>
        </HelmetProvider>
    );
}