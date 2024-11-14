import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import LeftCard from "../components/leaderBoard/LeftCard";
import RightCard from "../components/leaderBoard/RightCard";
import { useFetchData } from '../hooks/useFetchData';
import useQuiz from '../hooks/useQuiz';

export default function LeaderBoard ()
{
    const { state } = useQuiz();

    const { data: leaderBoard, isLoading, error } = useFetchData(
        ['leaderBoard', state?.quizzes[ 0 ]?.id ],
        `http://localhost:5000/api/quizzes/${state?.quizzes[ 0 ]?.id}/attempts` );
    
    const navigate = useNavigate();

    const goToHomePage = () =>
    {   
        navigate( '/' );
    };

    // const quizId = state?.quizzes[ 0 ]?.id;
    // const leaderData = leaderBoard;
    // dispatch( { type: "GET_LEADER_DATA", payload: { quizId, leaderData } } );
    console.log( leaderBoard?.data?.attempts );

    
    if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
      </div>
    );
    };

    if (error) {
    return <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">Error! Maybe backend is not connected.</div>;
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Leaders Board</title>
            </Helmet>
            <div className="min-h-[calc(100vh-50px)] flex items-center justify-center p-2">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <LeftCard />

                        {/* Right Column */}
                        <div>
                            <h1 className="text-2xl font-bold">LeaderBoard</h1>
                            <p className="mb-6 text-violet-800">{ leaderBoard.data.quiz.title }</p>
                            <ul className="space-y-4 max-h-[400px] overflow-y-scroll">
                                {
                                    leaderBoard?.data?.attempts.map( ( leader ) => (
                                        <RightCard user={leader.user} key={ leader.id } />
                                    ))
                                }
                            </ul>

                            {/* Back to Home button */}
                            <button
                                onClick={goToHomePage}
                                className="mt-6 text-blue-500 hover:underline"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}