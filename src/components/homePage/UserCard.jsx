/* eslint-disable react/prop-types */
// import React from 'react'

export default function UserCard ({userName})
{
  // throw new Error( "ErrorComponent", "This is a test error" );
  return (
    <div className="text-center mb-12">
      <img src="./assets/avater.webp" alt="Profile Picture"
        className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover" />
      <p className="text-xl text-gray-600">Welcome</p>
      <h2 className="text-4xl font-bold text-gray-700" style={ {
        fontFamily: "Jaro"
      } }>{ userName }</h2>
    </div>
  );
}
