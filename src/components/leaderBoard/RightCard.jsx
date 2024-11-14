/* eslint-disable react/prop-types */
// import React from 'react';

export default function RightCard ( { user } ) {
    return (
        <li className="flex items-center justify-between">
            <div className="flex items-center">
                <img src="./assets/avater.webp" alt="SPD Smith" className="object-cover w-10 h-10 rounded-full mr-4" />
                <div>
                    <h3 className="font-semibold">{ user.full_name }</h3>
                    <p className="text-sm text-gray-500">{ user.email }</p>
                </div>
            </div>
            <div className="flex items-center">
                <span className="mr-2">2,340</span>
            </div>
        </li>
    );
}
