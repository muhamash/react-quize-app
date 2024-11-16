// import necessary modules
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import AddQuizCard from "../components/admin/AddQuizCard";
import DashBoardCard from "../components/admin/DashBoardCard";
import QuizCardForm from "../components/admin/QuizCardForm";
import SideBar from "../components/admin/SideBar";
import useCreateQuiz from "../hooks/useCreateQuiz";
import { useDelete } from "../hooks/useDelete";
import { useFetchData } from "../hooks/useFetchData";

export default function DashBoard() {
    const [ open, setOpen ] = useState( false );
    const { dispatch } = useCreateQuiz();
    const { data: quizList, isLoading, error } = useFetchData(
        `quizListAdmin`,
        `http://localhost:5000/api/admin/quizzes`
    );
    // const navigate = useNavigate();

    const handleEditCardClick = ( id ) =>
    {
        const quiz = quizList?.find( ( q ) => q?.id === id );
        if ( quiz )
        {
            dispatch( { type: "SET_QUIZ_LIST", payload: quiz } );
            dispatch( { type: "SET_ALL_QUIZ", payload: quizList } );
            // navigate("/createQuiz");
        }
        setOpen( true );
    };

    const onSuccess = () =>
    {
        Swal.fire( {
            title: "Deleted!",
            text: "Quiz has been deleted!!",
            icon: "success"
        } );
    }

    const onError = () =>
    {
        Swal.fire( {
            title: "Error",
            text: "Can't deleted!!!",
            icon: "error"
        } );
    }

    const quizDelete = useDelete( {
        queryKey: [`quizListAdmin`],
        url: ``,
        onSuccess,
        onError
    })

    const onDelete = (id) =>
    {
        Swal.fire( {
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f149d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        } ).then( ( result ) =>
        {
            if ( result.isConfirmed )
            {
                quizDelete.mutate( { url: `http://localhost:5000/api/admin/quizzes/${id}` } );

            }
        } );
    }

    const handleOpen = () => setOpen( true );
    
    const handleClose = () =>
    {
        dispatch({ type: "SET_QUIZ_LIST", payload: null });
        setOpen( false );
    }

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
                Error!!!..Maybe backend not connected!!
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
                    {/* Sidebar */}
                    <div className="relative">
                        <SideBar />
                    </div>
                    {/* Main Content */}
                    <div className="flex-grow p-3 md:p-10">
                        <header className="mb-8">
                            <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
                            <h1 className="text-4xl font-bold">
                                Welcome Back To Your Quiz Hub!
                            </h1>
                        </header>
                        <div className="flex flex-wrap gap-6 w-full">
                            <AddQuizCard onClick={handleOpen} />
                            {quizList?.length > 0 ? (
                                quizList?.map((q) => (
                                    <DashBoardCard
                                        key={q.id}
                                        onEdit={() => handleEditCardClick(q.id)}
                                        data={ q }
                                        onDelete={()=>onDelete(q.id)}
                                    />
                                ))
                            ) : (
                                <p>No quizzes found!!!</p>
                            )}
                        </div>
                    </div>
                </div>
            </HelmetProvider>
            {open && <QuizCardForm onClose={handleClose} />}
        </>
    );
}