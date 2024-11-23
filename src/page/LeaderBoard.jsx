/* eslint-disable no-unused-vars */
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import LeftCard from "../components/leaderBoard/LeftCard";
import RightCard from "../components/leaderBoard/RightCard";
import useAuth from '../hooks/useAuth';
import { useFetchData } from '../hooks/useFetchData';
import useQuiz from '../hooks/useQuiz';

export default function LeaderBoard() {
  const { state, dispatch } = useQuiz();
  const { auth } = useAuth();
  const userId = auth?.user?.id;

  const { data: leaderBoard, isLoading, error } = useFetchData(
    [ 'leaderBoard', state?.singleQuiz ],
    `http://localhost:5000/api/quizzes/${state?.singleQuiz[userId]}/attempts`
  );

  // console.log(state)
  const navigate = useNavigate();

  const goToHomePage = () =>
  {
    navigate( '/' );
  };

  const calculateScores = ( attempts ) =>
  {
    return attempts.map( ( leader ) =>
    {
      const correctAnswers = leader?.correct_answers;
      const submittedAnswers = leader?.submitted_answers;
      
      let totalMarks = 0;

      correctAnswers.forEach( ( correctAnswer ) =>
      {
        const userAnswer = submittedAnswers?.find(
          ( answer ) => answer?.question_id === correctAnswer?.question_id
        );

        if ( userAnswer && userAnswer?.answer === correctAnswer?.answer )
        {
          totalMarks += correctAnswer?.marks;
        }
      } );

      return { ...leader, totalMarks };
    } ).sort( ( a, b ) => b?.totalMarks - a?.totalMarks );
  };

  const sortedLeaderboard = leaderBoard?.data?.attempts ? calculateScores( leaderBoard.data.attempts ) : [];

  const userRank = sortedLeaderboard?.findIndex( leader => leader?.user?.id === auth?.user?.id ) + 1;
  

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
      </div>
    );
    };

  if (error) {
    return (
      <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">
        Error! Maybe backend is not connected.
      </div>
    );
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>LeaderBoard</title>
            </Helmet>
            <div className="min-h-[calc(100vh-50px)] flex items-center justify-center p-2 pt-20">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */ }
                        <LeftCard rank={  userRank} />

                        {/* Right Column */ }
                        <div>
                            <h1 className="text-2xl font-bold">LeaderBoard</h1>
                            <p className="mb-6 text-violet-800">{ leaderBoard?.data?.quiz?.title }</p>
                            <ul className="space-y-4 max-h-[400px] overflow-y-scroll">
                                { sortedLeaderboard?.map( ( leader, index ) => (
                                    <RightCard
                                        user={ leader?.user }
                                        key={ leader?.user?.id }
                                        totalMarks={ leader?.totalMarks }
                                        isTopFive={ index < 5 } 
                                    />
                                ) ) }
                            </ul>

                            {/* Back to Home button */ }
                            <button
                                onClick={ goToHomePage }
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