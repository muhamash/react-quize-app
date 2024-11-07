// import React from 'react'

import Footer from "../components/common/Footer";
import Nav from "../components/common/Nav";
import QuizCard from "../components/Index/QuizCard";
import UserCard from "../components/Index/UserCard";

export default function IndexPage() {
    return (
        <div className="bg-[#F5F3FF] min-h-screen">
            <div className="container mx-auto py-3">
                <Nav/>
                <UserCard />
                <div className="bg-white p-6 rounded-md h-full">
                    <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <QuizCard />
                        <QuizCard />
                        <QuizCard />
                        <QuizCard />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
