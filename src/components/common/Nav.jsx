import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Nav() {
    const [isHovered, setIsHovered] = useState(false);
    const [ isVisible, setIsVisible ] = useState( true );
    const { auth, setAuth } = useAuth();
    const lastScrollY = useRef(0);
    const hideTimeout = useRef(null);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
            setIsVisible(false); 
        } else {
            setIsVisible(true); 

            if (hideTimeout.current) clearTimeout(hideTimeout.current);
            hideTimeout.current = setTimeout(() => setIsVisible(false), 5000);
        }

        lastScrollY.current = currentScrollY;
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        const handleWindowClick = () =>
        {
            setIsVisible( true );
            if ( hideTimeout.current ) clearTimeout( hideTimeout.current );
            hideTimeout.current = setTimeout( () => setIsVisible( false ), 5000 );
        };
        
        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleWindowClick);
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
        };
    }, [handleScroll]);

    const handleMouseEnter = () => {
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => setIsVisible(false), 5000);
    };

    const navigate = useNavigate();

    return (
        <motion.header
            className="flex justify-between items-center mb-12 fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-gray-400 via-gray-700 to-black/20 backdrop-blur-sm py-3 md:px-[30px] px-3"
            animate={ { y: isVisible ? 0 : -100 } }
            transition={ { type: 'spring', stiffness: 80, damping: 22 } }
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseLeave }
        >
            <Link to="/">
                <img src="./assets/logo.svg" className="h-7" alt="Logo" />
            </Link>
            <div className="relative flex items-center gap-5"
                onMouseEnter={ () => setIsHovered( true ) }
                onMouseLeave={ () => setIsHovered( false ) }
            >
                {
                    auth?.user ? (
                        <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer">
                            <img src="./assets/avater.webp" alt="Profile Picture"
                                className="w-[50px] h-[50px] rounded-full border-blue-900 border-1" />
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors" style={ { fontFamily: "Jaro" } }>
                                Login
                            </button>
                        </Link>
                    )
                }

                {/* Hover Card */ }
                { isHovered && auth?.user && (
                    <motion.div
                        className="absolute top-10 right-2  p-4 rounded-lg bg-gradient-to-r from-violet-800 via-blue-900 to-cyan-700 backdrop-blur-sm z-20 border border-white/10 shadow-lg"
                        initial={ { opacity: 0, y: -10 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -10 } }
                        whileHover={ { scale: 1.05 } }
                    >
                        <ul className="text-sm text-white space-y-2">
                            <li className="bg-green-800 p-1 rounded-md shadow-md">{ auth.user.full_name }</li>
                            <li className="bg-green-800 p-1 rounded-md shadow-md">{ auth.user.email }</li>
                            <li>
                                <Link to="/result" className="hover:text-slate-300">Result</Link>
                            </li>
                            <li>
                                <Link to="/leaderBoard" className="hover:text-slate-300">LeaderBoard</Link>
                            </li>
                            <li>
                                <button
                                    className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors bg-cyan-700"
                                    style={ { fontFamily: "Jaro" } }>
                                    { "Logout" }
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                ) }

                {
                    !auth?.user && (
                        <Link to={ `/registration` }>
                            <button
                                className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                                style={ { fontFamily: "Jaro" } }>
                                { "Register" }
                            </button>
                        </Link>
                    )
                }
            </div>
        </motion.header>
    );
};