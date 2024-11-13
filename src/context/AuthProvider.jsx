/* eslint-disable react/prop-types */
import localforage from 'localforage';
import React, { useEffect } from 'react';
import { AuthContext } from '../context/index';

export default function AuthProvider({ children }) {
    const [ auth, setAuth ] = React.useState( {} );

    useEffect( () =>
    {
        const loadAuth = async () =>
        {
            const storedAuth = await localforage.getItem( 'auth' );
            
            console.log( storedAuth );
            if ( storedAuth )
            {
                setAuth( storedAuth );
            }
        };
        loadAuth();
    }, [] );

    useEffect( () =>
    {
        if ( auth?.authToken )
        {
            localforage.setItem( 'auth', auth );
        } else
        {
            localforage.removeItem( 'auth' );
        }
    }, [ auth ] );

    const logout = async () =>
    {
        setAuth( {} );
        await localforage.removeItem( 'auth' );
    };

    // console.log( auth );

    return (
        <AuthContext.Provider value={ { auth, setAuth, logout } }>
            { children }
        </AuthContext.Provider>
    );
}
