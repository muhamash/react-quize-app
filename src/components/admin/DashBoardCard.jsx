/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";
import { ClockLoader } from 'react-spinners';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useDelete } from "../../hooks/useDelete";
import { useFetchData } from "../../hooks/useFetchData";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import QuizIconAdmin from "./QuizIconAdmin";
import ShowIcon from "./ShowIcon";

export default function DashBoardCard({ data, onEdit }) {
    const [ hovered, setHovered ] = useState( false );

    const onSuccess = async (response) => {
        if (response.data === 1) {
            Swal.fire({
                title: "Deleted!",
                text: "Quiz has been deleted!",
                icon: "success",
            });
        }
    };

    const onError = ( error ) =>
        Swal.fire( {
            title: "Error",
            text: `Error: ${error.message}`,
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

    const { refetch } = useFetchData( `quizListAdmin`, `http://localhost:5000/api/admin/quizzes` );

    return (
        <>
            {
                quizDelete.isPending ? ( <ClockLoader size={100} color="#f3026e" /> ) :
                    (
                        <motion.div
                            initial={ { opacity: 0, scale: 0.95 } }
                            animate={ { opacity: 1, scale: 1 } }
                            exit={ { opacity: 0, scale: 0.95 } }
                            transition={ { duration: 0.3 } }
                            className="relative p-6 rounded-lg border-[0.8px] border-slate-300 shadow-md shadow-slate-300  w-[300px] h-[250px] overflow-hidden hover:bg-slate-300 bg-white hover:shadow duration-150 transition-all"
                            onMouseEnter={ () => setHovered( true ) }
                            onMouseLeave={ () => setHovered( false ) }
                        >
                            {/* card icon */ }
                            <div className="text-buzzr-purple mb-4">
                                <QuizIconAdmin />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{ data.title }</h3>
                            <p className="text-gray-600 text-sm">{ data.description }</p>

                            {/* Hover overlay */ }
                            { hovered && (
                                <motion.div
                                    initial={ { opacity: 0, y: 40 } }
                                    animate={ { opacity: 1, y: 0 } }
                                    exit={ { opacity: 0, y: 40 } }
                                    transition={ { duration: 0.3 } }
                                    className="absolute inset-0 flex flex-col gap-3 items-center justify-center bg-black/50 backdrop-blur-sm"
                                >
                                    <div className="flex gap-4">
                                        {
                                            data?.status === 'draft' ? (
                                                <EditIcon onEdit={ onEdit } />
                                            ) :
                                                (
                                    
                                                    <ShowIcon onEdit={ onEdit } />
                                                )
                                        }

                                        {
                                            data?.status === "draft" && (
                                                <DeleteIcon onDelete={()=> onDelete(data?.id) } />
                                            )
                                        }
                                    </div>
                                    {
                                        data.status === "published" && (
                                            <p className="text-slate-300 w-fit text-center text-sm p-2">You are not allowed to edit or delete a <span className="text-rose-800 font-semibold">published </span> quiz. <span>If you preferred to delete or edit a quiz <span className="font-semibold text-rose-800">unpublished</span> the quiz on quiz view modal</span></p>
                                        )
                                    }
                                    <p className="text-white font-thin text-base">Current Status: <span className="text-violet-900 font-semibold">{ data.status }</span></p>
                                </motion.div>
                            ) }
                        </motion.div>
                    )
            }
        </>
    );
}