// import React from 'react';
import QuizOption from './QuizOption';

export default function Quiz() {
    return (
        <div className="bg-white p-6 !pb-2 rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">3. What is the height of an empty binary tree?</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <QuizOption />
                <QuizOption />
                <QuizOption />
                <QuizOption />          
            </div>
            <button
                className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8">
                Next
            </button>
        </div>
    );
}
