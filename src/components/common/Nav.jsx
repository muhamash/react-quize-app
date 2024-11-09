import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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

        const handleWindowClick = () => {
            setIsVisible(true);
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
            hideTimeout.current = setTimeout(() => setIsVisible(false), 5000);
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

    return (
        <motion.header
            className="flex justify-between items-center mb-12 fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-gray-400 via-gray-700 to-black/20 backdrop-blur-sm py-3 md:px-[30px] px-3"
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ type: 'spring', stiffness: 80, damping: 22 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link to="/">
                <img src="./assets/logo.svg" className="h-7" alt="Logo" />
            </Link>
            <div className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors" style={{ fontFamily: "Jaro" }}>
                    Login
                </button>

                {/* Hover Card */}
                {isHovered && (
                    <motion.div
                        className="absolute top-10 left-0 w-[150px] p-4 rounded-lg bg-gradient-to-r from-violet-800 via-blue-900 to-cyan-700 backdrop-blur-sm z-20 border border-white/10 shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <ul className="text-sm text-white space-y-2">
                            <li>
                                <Link to="/result" className="hover:text-slate-300">Result</Link>
                            </li>
                            <li>
                                <Link to="/leaderBoard" className="hover:text-slate-300">LeaderBoard</Link>
                            </li>
                        </ul>
                    </motion.div>
                )}

                <button className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors" style={{ fontFamily: "Jaro" }}>
                    Logout
                </button>
            </div>
        </motion.header>
    );
};