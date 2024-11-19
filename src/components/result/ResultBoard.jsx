/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import useQuiz from '../../hooks/useQuiz';

export default function ResultBoard({ onClose, id
 }) {
    const { state, dispatch } = useQuiz();
    const { submissionInfo, singleQuiz } = state;

    const findSubmitResult = state?.submissionInfo?.find( ( info ) => info[ id ] );

    // console.log( submissionInfo );
    const isLoading = !findSubmitResult || !singleQuiz;
    // console.log(findSubmitResult[id])
    
    const handleClose = () =>
    {
        dispatch( { type: "GET_SINGLE_QUIZ", payload: id } );
        onClose();
    }

    if (isLoading) {
        return (
             <div className="w-screen h-screen flex items-center justify-center">
                <HashLoader color="#4e1f9b" size={ 100 } speedMultiplier={ 2 } />
            </div>
        );
    }

    return (
        <div className="overflow-hidden hidden lg:flex lg:w-1/2 bg-primary h-fit flex-col justify-center p-12 relative">
            <div className="text-white">
                <div>
                    <h2 className="text-4xl font-bold mb-2">{singleQuiz?.data?.title}</h2>
                    <p>{singleQuiz?.data?.description}</p>
                </div>
                <div className="my-6 items-center flex flex-wrap">
                    <div>
                        <div className="flex gap-6 my-6">
                            <div>
                                <p className="font-semibold text-2xl my-0">{findSubmitResult[id].totalQuestions}</p>
                                <p className="text-gray-300">Questions</p>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl my-0">{findSubmitResult[id]?.correctCount}</p>
                                <p className="text-gray-300">Correct</p>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl my-0">{findSubmitResult[id]?.wrongCount}</p>
                                <p className="text-gray-300">Wrong</p>
                            </div>
                        </div>
                        <Link
                            onClick={handleClose}
                            to="/leaderBoard"
                            className="bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                        >
                            View Leaderboard
                        </Link>
                    </div>
                    <div className="bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                        <div className="flex-1">
                            <p className="text-2xl font-bold">
                                {findSubmitResult[id]?.totalMarks}/ <span>{findSubmitResult[id]?.quizMarks}</span>
                            </p>
                            <p>Your Mark</p>
                        </div>
                        <div style={{ width: 150, height: 150 }}>
                            <CircularProgressbarWithChildren
                                strokeWidth={20}
                                value={findSubmitResult[id]?.percentage}
                            >
                                <img
                                    style={{ width: 40, marginTop: -5 }}
                                    src="https://i.imgur.com/b9NyUGm.png"
                                    alt="doge"
                                />
                                <div style={{ fontSize: 12, marginTop: -5 }}>
                                    <strong>{findSubmitResult[id]?.percentage}%</strong>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
