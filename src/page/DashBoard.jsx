import { AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import AddQuizCard from "../components/admin/AddQuizCard";
import DashBoardCard from "../components/admin/DashBoardCard";
import Question from "../components/admin/Question";
import QuizCardForm from "../components/admin/QuizCardForm";
import SideBar from "../components/admin/SideBar";
import useCreateQuiz from "../hooks/useCreateQuiz";
import { useFetchData } from "../hooks/useFetchData";
import { usePatchData } from '../hooks/usePatchData';

export default function DashBoard() {
    const [open, setOpen] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    const { dispatch, state } = useCreateQuiz();
    const { data: quizList, isLoading, error } = useFetchData(
        `quizListAdmin`,
        `http://localhost:5000/api/admin/quizzes`
    );

    if (quizList && state?.quizzes !== quizList) {
        dispatch({ type: "SET_ALL_QUIZ", payload: quizList });
    }

    const totalPages = Math.ceil((quizList?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentQuizzes = quizList?.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEditCardClick = (id) => {
        const quiz = quizList?.find((q) => q?.id === id);
        if (quiz) {
            if (quiz?.status === "published") {
                dispatch({ type: "SET_QUIZ_LIST", payload: quiz });
                setOpenQuestion(true);
            } else {
                dispatch( { type: "SET_QUIZ_LIST", payload: quiz } );
                
                quiz?.Questions?.forEach((question) => {
                    dispatch({
                        type: "ADD_QUESTION",
                        payload: {
                            id: quiz?.id,
                            question: question,
                        },
                    });
                });
                setOpen(true);
            }
        }
    };

    const { refetch } = useFetchData(`quizListAdmin`, `http://localhost:5000/api/admin/quizzes`);

    const onSuccess = async (response) => {
        if (response?.data?.status === "draft") {
            dispatch({ type: "SET_QUIZ_LIST", payload: response.data });
            Swal.fire({
                title: "Oka!",
                text: "Quiz has been drafted!",
                icon: "success",
            } );
            handleClose();
            await refetch();
        }

        if (response.data === 1) {
            Swal.fire({
                title: "Deleted!",
                text: "Quiz has been deleted!",
                icon: "success",
            });
        }
    };

    const onError = (error) =>
        Swal.fire({
            title: "Error",
            text: `Error: ${error.message}`,
            icon: "error",
        });

    const handleOpen = () => setOpen(true);

    const handleClose = () =>
    {
        dispatch( { type: "SET_QUIZ_LIST", payload: null } );
        // dispatch( { type: "SET_QUIZ_INFO", payload: null } );
        if (openQuestion === true && open === false) {
            setOpenQuestion(false);
        } else {
            setOpen(false);
        }
    };

    const publishQuiz = usePatchData({
        queryKey: [`quizListAdmin`],
        url: `http://localhost:5000/api/admin/quizzes/${state?.quizList?.id}`,
        onSuccess,
        onError,
    });

    const handleDraft = () => {
        publishQuiz.mutate({
            title: state?.quizList?.title,
            description: state?.quizList?.description,
            status: "draft",
        } );
    };

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <HashLoader color="#4e1f9b" size={100} speedMultiplier={2} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-screen text-red-700 flex justify-center items-center text-xl">
                Error: Unable to load quizzes. Please try again later.
            </div>
        );
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                <div className="bg-gray-100 min-h-screen w-full flex">
                    <SideBar />
                    <div className="flex-grow p-3 md:p-10">
                        <header className="mb-8">
                            <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
                            <h1 className="text-4xl font-bold">
                                Welcome Back To Your Quiz Hub!
                            </h1>
                        </header>
                        <div className="flex flex-wrap justify-center items-center gap-6 w-full mx-auto overflow-y-scroll h-[750px]">
                            <AddQuizCard onClick={ handleOpen } />
                            { currentQuizzes?.length > 0 ? (
                                currentQuizzes.map( ( q ) => (
                                    <AnimatePresence key={ q.id } mode="wait">
                                        <DashBoardCard
                                            onEdit={ () => handleEditCardClick( q.id ) }
                                            data={ q }
                                        />
                                    </AnimatePresence>
                                ) )
                            ) : (
                                <p>No quizzes found. Click &#34;Add Quiz&#34; to create one!</p>
                            ) }
                        </div>
                        {/* pagination */ }
                        <div className="flex absolute left-[50%] right-[50%] justify-center items-center gap-4 pt-2">
                            <button
                                onClick={ handlePrevPage }
                                disabled={ currentPage === 1 }
                                className="px-3 py-1 text-sm bg-green-700 rounded disabled:opacity-50 text-white cursor-pointer">
                                Previous
                            </button>
                            
                            <button
                                onClick={ handleNextPage }
                                disabled={ currentPage === totalPages }
                                className="px-3 py-1 text-sm bg-cyan-700 rounded disabled:opacity-50 text-white cursor-pointer">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </HelmetProvider>
            { open && <QuizCardForm onClose={ handleClose } /> }
            
            { openQuestion && (
                <div className="fixed  top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col gap-5 items-center justify-center backdrop-blur-sm p-3">
                    <div className='bg-slate-700 p-5 shadow-lg rounded-md shadow-black hover:shadow-sm duration-200 transition-all'>
                        <button
                            className="bg-red-700 text-white rounded-md shadow-md px-3 py-2 m-5 hover:shadow-lg hover:shadow-black/50 self-end"
                            onClick={ handleClose }>
                            Close
                        </button>
                        <button
                            onClick={ handleDraft }
                            className="bg-violet-700 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg hover:shadow-black/50 self-end">
                            { publishQuiz.isPending ? "working on.." : "Draft quiz" }
                        </button>
                    </div>
                    <div className="bg-slate-400 p-5 overflow-y-scroll h-[700px] rounded-md">
                        { state?.quizList?.Questions?.length === 0 ? (
                            <p>No questions in this quiz!</p>
                        ) : (
                            state?.quizList?.Questions?.map( ( q ) => (
                                <Question
                                    key={ q.id }
                                    question={ q }
                                    status={ state?.quizList?.status }
                                    onClose={ handleClose }
                                />
                            ) )
                        ) }
                    </div>
                </div>
            ) }
        </>
    );
}