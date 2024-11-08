// import React from 'react';

export default function AddQuizCard() {
    return (
        <button  className="group">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
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
