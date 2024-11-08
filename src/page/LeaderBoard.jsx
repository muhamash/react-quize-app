// import React from 'react'

import Nav from "../components/common/Nav";
import LeftCard from "../components/leaderBoard/LeftCard";
import RightCard from "../components/leaderBoard/RightCard";

export default function LeaderBoard() {
    return (
        <div className="bg-[#F5F3FF]  p-4">
            <Nav />
            <div className="min-h-[calc(100vh-50px)] flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* <!-- Left Column --> */ }
                        <LeftCard/>

                        {/* <!-- Right Column --> */ }
                        <div>
                            <h1 className="text-2xl font-bold">Leaderboard</h1>
                            <p className="mb-6">React Hooks Quiz</p>
                            <ul className="space-y-4">
                                <RightCard />
                                <RightCard />
                                <RightCard />
                                <RightCard />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
