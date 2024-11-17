import { useState } from "react"; // import useEffect
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
import { useDelete } from "../hooks/useDelete";
import { useFetchData } from "../hooks/useFetchData";

export default function DashBoard() {
    const [open, setOpen] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const { dispatch, state } = useCreateQuiz();

    const { data: quizList, isLoading, error } = useFetchData(
        `quizListAdmin`,
        `http://localhost:5000/api/admin/quizzes`
    );

    if (quizList && state?.quizzes !== quizList) {
        dispatch({ type: "SET_ALL_QUIZ", payload: quizList });
    };

    const handleEditCardClick = (id) => {
        const quiz = quizList?.find((q) => q?.id === id);
        if (quiz) {
            if ( quiz?.status === "published" )
            {
                dispatch( { type: "SET_QUIZ_LIST", payload: quiz } );
                setOpenQuestion(true);
            } else
            {
                // console.log(quiz?.Questions)
                dispatch( { type: "SET_QUIZ_LIST", payload: quiz } );

                quiz?.Questions?.forEach( ( question ) =>
                {
                    dispatch( {
                        type: "ADD_QUESTION",
                        payload: {
                            id: quiz?.id,
                            question: question,
                        },
                    } );
                } );

                setOpen(true);
            }
        }
    };

    const onSuccess = () =>
        Swal.fire( {
            title: "Deleted!",
            text: "Quiz has been deleted!!",
            icon: "success",
        } );

    const onError = () =>
        Swal.fire( {
            title: "Error",
            text: "Can't delete!!!",
            icon: "error",
        } );

    const quizDelete = useDelete({
        queryKey: [`quizListAdmin`],
        url: ``,
        onSuccess,
        onError,
    });

    const onDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5f149d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                quizDelete.mutate({
                    url: `http://localhost:5000/api/admin/quizzes/${id}`,
                });
            }
        });
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        dispatch({ type: "SET_QUIZ_LIST", payload: null });
    
        if ( openQuestion === true && open === false )
        {
            setOpenQuestion( false );

        }
        else
        {
            setOpen( false );
        }
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
                            { quizList?.length > 0 ? (
                                quizList.map( ( q ) => (
                                    <DashBoardCard
                                        key={ q.id }
                                        onEdit={ () => handleEditCardClick( q.id ) }
                                        data={ q }
                                        onDelete={ () => onDelete( q.id ) }
                                    />
                                ) )
                            ) : (
                                <p>No quizzes found. Click &#34;Add Quiz&#34; to create one!</p>
                            ) }
                        </div>
                    </div>
                </div>
            </HelmetProvider>
            { open && <QuizCardForm onClose={ handleClose } /> }
            { openQuestion && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col  gap-5 items-center justify-center backdrop-blur-sm p-3">
                    <button className="bg-red-700 text-white rounded-md shadow-md px-3 py-2 m-5 self-end" onClick={ handleClose }>
                            close
                        </button>
                    <div className="bg-slate-400 p-5 overflow-y-scroll h-[700px] rounded-md">
                        { state?.quizList?.Questions?.length === 0 ? (
                            <p>No questions in this quiz!</p>
                        ) : (
                            state?.quizList?.Questions?.map( ( q ) => (
                                <Question key={ q.id } question={ q } status={ state?.quizList?.status } onClose={ handleClose } />
                            ) )
                        ) }
                    </div>
                </div>
            ) }
        </>
    );
}
