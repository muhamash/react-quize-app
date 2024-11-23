/* eslint-disable react/prop-types */
 
// import React from 'react';
// import { useNavigate } from "react-router-dom";

export default function AddQuizCard ({onClick})
{
    // const navigate = useNavigate();
    return (
        <button onClick={onClick} className="group">
            <div className="bg-slate-200 border-[0.8px] border-slate-300 p-6 rounded-lg shadow-green-800 shadow-md  w-[300px] h-[250px] hover:shadow duration-150 transition-all">
                <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">Create a new quiz</h3>
                <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">Build from the ground up</p>
            </div>
        </button>
    );
}
