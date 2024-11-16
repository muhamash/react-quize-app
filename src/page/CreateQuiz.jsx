// import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Question from "../components/admin/Question";
import QuizForm from "../components/admin/QuizForm";
import SideBar from "../components/admin/SideBar";
import useCreateQuiz from '../hooks/useCreateQuiz';

export default function CreateQuiz ()
{
    const { state } = useCreateQuiz();

    console.log( state );

    // 
    const quizQuestions = state?.addQuestions[ state?.quizEditResponse?.id ];
    console.log( quizQuestions, state.addQuestions);

    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    Create your quiz
                </title>
            </Helmet>
            <div className="bg-[#F5F3FF] min-h-screen flex">
                <SideBar />
                <div className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
                    <div>
                        <nav className="text-sm mb-4" aria-label="Breadcrumb">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <Link to="/dashboard" className="text-gray-600 hover:text-buzzr-purple">Home</Link>
                                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                        <path
                                            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                                    </svg>
                                </li>
                                <li>
                                    <p className="text-gray-600 hover:text-buzzr-purple" aria-current="page">Quiz details</p>
                                </li>
                            </ol>
                        </nav>
                        <div className='py-5'>
                            <button className='bg-violet-600 text-white px-4 py-2 rounded-md shadow-md'>
                                Publish quiz
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
                            <QuizForm />
           
                            <div className="px-4 lg:h-[700px] h-[500px] my-5 overflow-y-scroll">
                                {
                                    quizQuestions?.length > 0 ? (
                                        quizQuestions?.map( ( question ) => (
                                            <Question key={ question.id } question={ question } />
                                        ) )
                                    ) : (
                                        <p className="text-violet-600 font-mono text-md">No questions in there!</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}
