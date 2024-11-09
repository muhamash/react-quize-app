// import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Quiz from "../components/quizPage/Quiz";
import QuizCounter from "../components/quizPage/QuizCounter";

export default function QuizePage() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Quiz page</title>
      </Helmet>
      <div className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
          <QuizCounter />
          <div className="lg:col-span-2 bg-white">
            <Quiz />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
