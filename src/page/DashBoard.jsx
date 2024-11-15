 
// import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HashLoader } from 'react-spinners';
import AddQuizCard from "../components/admin/AddQuizCard";
import DashBoardCard from "../components/admin/DashBoardCard";
import SideBar from "../components/admin/SideBar";
import { useFetchData } from '../hooks/useFetchData';

export default function DashBoard ()
{
    // throw new Error( "ErrorComponent", "This is a test error" );
    const { data: quizList, isLoading, error } = useFetchData(
        `quizListAdmin`,
        `http://localhost:5000/api/admin/quizzes`
    );

    console.log( quizList )
    
    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
            </div>
        );
    }

    if (error) {
        return <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">Error!!!..Maybe backend not connected!!</div>;
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    Dashboard
                </title>
            </Helmet>
            <div className="bg-gray-100 min-h-screen flex">
                <SideBar />
                <div className="flex-grow p-10">
                    <header className="mb-8">
                        <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
                        <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AddQuizCard />
                        {
                            quizList.map( q => (
                                <DashBoardCard key={ q.id } data={ q } />
                            ))
                        }
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}
