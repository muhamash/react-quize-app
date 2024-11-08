/* eslint-disable react/no-unescaped-entities */
// import React from 'react';

export default function LeftSide() {
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-indigo-800 flex-col justify-between p-12 relative">
            <div className="text-white">

                <img src="./assets/Saly-1.png" alt="Illustration" className="mx-auto" />

                <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
                <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
                <p className="mb-8">
                    Logging in unlocks your personal progress tracker, letting you evaluate your performance and see how you
                    stack up against others. Whether you're preparing for exams, improving your knowledge, or simply having fun,
                    there's no better way to sharpen your mind.
                </p>
            </div>
        </div>
    );
}
