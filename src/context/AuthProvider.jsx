/* eslint-disable react/prop-types */
import localforage from 'localforage';
import { useEffect, useState } from 'react';
import { AuthContext } from '../context/index';

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);  

    useEffect( () =>
    {
        const loadAuth = async () =>
        {
            const storedAuth = await localforage.getItem( 'auth' );
            if ( storedAuth )
            {
                setAuth( storedAuth );
            }
            setLoading( false );
        };

        loadAuth();
    }, [] );

    useEffect(() => {
        if (auth) {
            localforage.setItem('auth', auth);
        } else {
            localforage.removeItem('auth');
        }
    }, [auth]);

    const logout = async () => {
        setAuth(null);
        await localforage.removeItem('auth');
    };

    if (loading) {
        return null;  
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}