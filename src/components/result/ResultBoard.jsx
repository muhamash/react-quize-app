// import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import useQuiz from '../../hooks/useQuiz';

export default function ResultBoard ({onClose})
{
    const { state } = useQuiz();

    const { quizAnswerServer } = state;

    // const totalQuizMarks = quizAnswerServer.submittedAnswers.total_marks;

    return (
        <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
            <div>
                <div className="text-white">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">React Hooks Quiz
                        </h2>
                        <p>A quiz on React hooks like useState, useEffect, and useContext. </p>
                    </div>

                    <div className="my-6 flex items-center  ">
                        <div className="w-1/2">
                            <div className="flex gap-6 my-6">
                                <div>
                                    <p className="font-semibold text-2xl my-0">{ 6 }</p>
                                    <p className="text-gray-300">Questions</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-2xl my-0">8</p>
                                    <p className="text-gray-300">Correct</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-2xl my-0">2</p>
                                    <p className="text-gray-300">Wrong</p>
                                </div>
                            </div>

                            <Link onClick={()=> onClose()} to="/leaderBoard"
                                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white">
                                View Leaderboard
                            </Link>
                        </div>

                        <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                            <div className="flex-1">
                                <p className="text-2xl font-bold">5/ <span>{ 30 }</span> </p>
                                <p>Your Mark</p>
                            </div>
                            <div style={{ width: 150, height: 150 }}>
                                <CircularProgressbarWithChildren strokeWidth={20}   value={ 66 }>
                                {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */ }
                                <img style={ { width: 40, marginTop: -5 } } src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
                                <div style={ { fontSize: 12, marginTop: -5 } }>
                                    <strong>66%</strong>
                                </div>
                            </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
