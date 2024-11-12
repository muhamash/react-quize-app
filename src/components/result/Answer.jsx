/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
// import React from 'react';
import useQuiz from '../../hooks/useQuiz';
import Radio from './Radio';

export default function Answer ( { data } )
{

    const { state } = useQuiz();
    console.log( data );
    console.log(state.quizAnswers)

    const slideAnimation = {
        initial: { y: -300, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 300, opacity: 0 },
        transition: { duration: 0.3 },
    };

    return (
        <motion.div className="rounded-lg overflow-hidden shadow-sm mb-4" { ...slideAnimation }>
            <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{ data.question }</h3>
                </div>
                {/* radio */ }
                <div className="space-y-2">
                    {
                        data.options.map( ( o, i ) => (
                            <Radio key={ i }label={o}/>
                        ))
                    }
                </div>
            </div>
            {/* <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                <button className="text-primary hover:text-primary/80 font-medium">Edit Question</button>
            </div> */}
        </motion.div>
    );
}
