/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth';
import useQuiz from '../../hooks/useQuiz';

export default function ResultBoard({ onClose, id, handleAnswer, openAnswer }) {
  const { state, dispatch } = useQuiz();
  const { submissionInfo, singleQuiz } = state;
  const { auth } = useAuth();
  const navigate = useNavigate();

  const userId = auth?.user?.id;
  const findSubmitResult = state?.submissionInfo[userId];
  const findData = state?.quizzes?.find((quiz) => quiz?.id === id);
  const isLoading = !findSubmitResult || !singleQuiz;

  const handleClose = () => {
    dispatch({
      type: 'GET_SINGLE_QUIZ',
      payload: {
        userId: auth?.user?.id,
        singleQuizId: id,
      },
    });

    navigate('/leaderBoard');
    onClose();
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <GridLoader color="#4e1f9b" size={100} speedMultiplier={2} />
      </div>
    );
  }

    return (
        <div className={`overflow-hidden mx-auto flex flex-col gap-5 lg:w-1/2 bg-primary h-max-[700px] md:h-[700px] h-fit justify-center items-center p-6 relative rounded-md ${openAnswer && "hidden"}`}>
            <div className="text-white mx-auto">
                <div className="w-fit mx-auto font-sans bg-violet-900 px-4 py-2 rounded-md shadow-lg shadow-black">
                    <h2 className="text-2xl font-bold mb-2">{ findData.title }</h2>
                    <p className="text-md">{ findData.description }</p>
                </div>
                <div className="my-6 justify-center items-center flex gap-3 flex-wrap">
                    <div className="bg-slate-700 p-3 rounded-md shadow-sm shadow-violet-600 border-[0.7px] border-slate-500">
                        <div className="flex gap-6 my-6">
                            <div>
                                <p className="font-semibold text-2xl my-0">
                                    { findSubmitResult[ id ]?.totalQuestions }
                                </p>
                                <p className="text-gray-300">Questions</p>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl my-0">
                                    { findSubmitResult[ id ]?.correctCount }
                                </p>
                                <p className="text-gray-300">Correct</p>
                            </div>
                            <div>
                                <p className="font-semibold text-2xl my-0">
                                    { findSubmitResult[ id ]?.wrongCount }
                                </p>
                                <p className="text-gray-300">Wrong</p>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <motion.button
                                onClick={ handleClose }
                                className="bg-secondary w-full py-3 rounded-md hover:bg-secondary/90 transition-colors bg-cyan-700  text-sm font-medium underline text-white"
                                whileHover={ {
                                    scale: 1.1,
                                    transition: { type: 'spring', stiffness: 300 },
                                } }
                            >
                                View Leaderboard
                            </motion.button>
                            <motion.button
                                onClick={()=> handleAnswer()}
                                className="bg-secondary w-full py-3 rounded-md hover:bg-secondary/90 transition-colors bg-amber-700 text-sm font-medium text-white md:hidden block"
                                whileHover={ {
                                    scale: 1.1,
                                    transition: { type: 'spring', stiffness: 300 },
                                } }
                            >
                                See answers?
                            </motion.button>
                        </div>
                    </div>
                    <div className="bg-primary/80 rounded-md border border-white/20 flex gap-8 items-center p-3 shadow-sm shadow-violet-600">
                        <div className="flex-1">
                            <p className="text-2xl font-bold">
                                { findSubmitResult[ id ]?.totalMarks }/{ ' ' }
                                <span>{ findSubmitResult[ id ]?.quizMarks }</span>
                            </p>
                            <p>Your Mark</p>
                        </div>
                        <div style={ { width: 120, height: 120 } }>
                            <CircularProgressbarWithChildren
                                strokeWidth={ 20 }
                                value={ findSubmitResult[ id ]?.percentage }
                            >
                                <img
                                    style={ { width: 40, marginTop: -5 } }
                                    src="https://i.imgur.com/b9NyUGm.png"
                                    alt="doge"
                                />
                                <div style={ { fontSize: 12, marginTop: -5 } }>
                                    <strong>{ findSubmitResult[ id ]?.percentage }%</strong>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}