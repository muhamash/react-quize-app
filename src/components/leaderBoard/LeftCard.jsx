// import React from 'react'

export default function LeftCard() {
    return (
        <div className="bg-cyan-600 rounded-lg p-6 text-white">
            <div className="flex flex-col items-center mb-6">
                <img src="./assets/avater.webp" alt="Profile Pic"
                    className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover" />
                <h2 className="text-2xl font-bold">Saad Hasan</h2>
                <p className="text-xl">20 Position</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <p className="text-sm opacity-75">Mark</p>
                    <p className="text-2xl font-bold">1200</p>
                </div>
                <div className="text-center">
                    <p className="text-sm opacity-75">Correct</p>
                    <p className="text-2xl font-bold">08</p>
                </div>
                <div className="text-center">
                    <p className="text-sm opacity-75">Wrong</p>
                    <p className="text-2xl font-bold">16</p>
                </div>
            </div>
        </div>
    );
}
