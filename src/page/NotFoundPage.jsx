// import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners';

export default function NotFoundPage() {
    return (
        <div className="w-screen h-screen flex gap-5 flex-wrap p-2 items-center justify-center">
            <ClimbingBoxLoader size={ 40 } />
            <p className="text-lg font-mono">Not Found any content!!</p>
        </div>
    );
}
