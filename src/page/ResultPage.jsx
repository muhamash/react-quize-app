// import React from 'react'

import Answer from "../components/result/Answer";
import ResultBoard from "../components/result/ResultBoard";

export default function ResultPage() {
    return (
        <div className="bg-background text-foreground min-h-screen">
            <div className="flex min-h-screen overflow-hidden">
            <img src="./assets/logo-white.svg" className="max-h-11 fixed left-6 top-6 z-50" />
            <ResultBoard/>
            <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
                <div className="">
                    <div className="px-4">
                        <Answer />
                        <Answer />
                        <Answer />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
