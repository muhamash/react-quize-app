// import React from 'react';

export default function ResultBoard() {
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
                                    <p className="font-semibold text-2xl my-0">10</p>
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

                            <a href="./leaderboard_page.html"
                                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white">
                                View Leaderboard
                            </a>
                        </div>

                        <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                            <div className="flex-1">
                                <p className="text-2xl font-bold">5/10</p>
                                <p>Your Mark</p>
                            </div>
                            <div>
                                <img src="./assets/icons/circular-progressbar.svg" className="h-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
