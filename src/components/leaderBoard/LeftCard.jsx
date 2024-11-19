/* eslint-disable react/prop-types */
// import React from 'react'

import useAuth from "../../hooks/useAuth";
import useQuiz from "../../hooks/useQuiz";

export default function LeftCard ({rank})
{
    const { auth } = useAuth();
    const { state } = useQuiz();

    const findSubmitResult = state?.submissionInfo?.find( ( info ) => info[ state?.singleQuiz ] );

    return (
        <div className="bg-cyan-600 rounded-lg p-6 text-white">
            <div className="flex flex-col items-center mb-6">
                <img src="./assets/avater.webp" alt="Profile Pic"
                    className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover" />
                <h2 className="text-2xl font-bold">{auth.user.full_name}</h2>
                <p className="text-xl">No. { rank } in position</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <p className="text-sm opacity-75">Mark</p>
                    <p className="text-2xl font-bold">{ findSubmitResult[state?.singleQuiz]?.totalMarks }</p>
                </div>
                <div className="text-center">
                    <p className="text-sm opacity-75">Correct</p>
                    <p className="text-2xl font-bold">{findSubmitResult[state?.singleQuiz]?.correctCount}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm opacity-75">Wrong</p>
                    <p className="text-2xl font-bold">{ findSubmitResult[state?.singleQuiz]?.wrongCount }</p>
                </div>
            </div>
        </div>
    );
}
