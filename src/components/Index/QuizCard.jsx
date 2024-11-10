/* eslint-disable react/prop-types */
import { motion, useInView } from 'framer-motion';
import React from 'react';
import { GridLoader } from 'react-spinners';

export default function QuizCard ({quiz})
{
    const [ loading, setLoading ] = React.useState( true );
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    // throw new Error( "ErrorComponent", "This is a test error" );

    return (
        <div>
            <motion.div
                onClick={ () =>
                {
                    console.log( "card" )
                } }
                ref={ ref }
                initial={ { opacity: 0, y: 30 } }
                animate={ isInView ? { opacity: 1, y: 0 } : {} }
                exit={ { x: -300 } }
                transition={ { duration: 0.6, ease: "easeOut" } }
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
            >
                <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
                    <h1 className="text-5xl" style={ { fontFamily: "Jaro" } }>{ quiz.title }</h1>
                    <p className="mt-2 text-lg">{ quiz.description }</p>
                </div>
                {
                    loading && (
                        <div className="w-full flex items-center justify-center p-3">
                            <GridLoader
                                color="#4f197f"
                                margin={ 20 }
                                size={ 30 }
                                width={ 10 }
                            />
                        </div>
                    )
                }
                <img onLoad={ () => setLoading( false ) } src="./assets/backgrounds/5.jpg" alt="JavaScript Hoisting" className={ `w-full h-full object-cover rounded mb-4 transition-all ${loading ? 'hidden' : 'block'}` } />
            </motion.div>
        </div>
    );
}