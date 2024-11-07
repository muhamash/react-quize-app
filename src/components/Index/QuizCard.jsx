// import React from 'react'

export default function QuizCard() {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative">
      <div
        className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className=" text-5xl" style={ {
          fontFamily: "Jaro"
        }}>JavaScript Basic Quiz</h1>
        <p className="mt-2 text-lg">Test your knowledge of JavaScript basics with quizzes that cover essential
          concepts,
          syntax, and
          foundational
          programming skills</p>
      </div>
      <img src="./assets/backgrounds/5.jpg" alt="JavaScript Hoisting"
        className="w-full h-full object-cover rounded mb-4 transition-all " />
    </div>
  );
}
