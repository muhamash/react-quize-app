/* eslint-disable react/prop-types */
import React from 'react';
import { AuthContext } from '../context/index';

export default function AuthProvider ( { children } )
{
    const [ auth, setAuth ] = React.useState( {} );
    return (
        <AuthContext.Provider value={ { auth, setAuth } }>
            { children }
        </AuthContext.Provider>
    );
}