/* eslint-disable react/prop-types */
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import useQuiz from '../../hooks/useQuiz';

export default function ResultBoard({ onClose }) {
    const { state } = useQuiz();
    const { submissionInfo, singleQuiz } = state;

    const isLoading = !submissionInfo || !singleQuiz;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full bg-primary">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden hidden lg:flex lg:w-1/2 bg-primary h-fit flex-col justify-center p-12 relative">
            <div className="text-white">
                <div>
                    <h2 className="text-4xl font-bold mb-2">{singleQuiz.title}</h2>
                    <p>{singleQuiz.description}</p>
                </div>
                <div className="my-6 items-center flex flex-wrap">
                    <div>
                        <div className="flex gap-6 my-6">
                            <div>
                                <p className="font-semibold text-2xl my-0">{6}</p>
                                <p className="text-gray-300">Questions</p>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl my-0">{submissionInfo.correctCount}</p>
                                <p className="text-gray-300">Correct</p>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl my-0">{submissionInfo.wrongCount}</p>
                                <p className="text-gray-300">Wrong</p>
                            </div>
                        </div>
                        <Link
                            onClick={() => onClose()}
                            to="/leaderBoard"
                            className="bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                        >
                            View Leaderboard
                        </Link>
                    </div>
                    <div className="bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                        <div className="flex-1">
                            <p className="text-2xl font-bold">
                                {submissionInfo.totalMarks}/ <span>{submissionInfo?.quizMarks}</span>
                            </p>
                            <p>Your Mark</p>
                        </div>
                        <div style={{ width: 150, height: 150 }}>
                            <CircularProgressbarWithChildren
                                strokeWidth={20}
                                value={submissionInfo.percentage}
                            >
                                <img
                                    style={{ width: 40, marginTop: -5 }}
                                    src="https://i.imgur.com/b9NyUGm.png"
                                    alt="doge"
                                />
                                <div style={{ fontSize: 12, marginTop: -5 }}>
                                    <strong>{submissionInfo.percentage}%</strong>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
