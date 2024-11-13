/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import localforage from 'localforage';
import React from 'react';
import { api } from '../components/api/localhost.js';
import useAuth from '../hooks/useAuth.jsx';

const useAxios = () =>
{
    const { auth, setAuth } = useAuth();

    React.useEffect( () =>
    {
        // request interceptor
        const requestIntercept = api.interceptors.request.use(
            ( config ) =>
            {
                const authToken = auth?.authToken;
                if ( authToken )
                {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                // console.log( config );
                return config;
            },

            ( error ) => Promise.reject( error )
        );


        // response interceptor
        const responseInterceptor = api.interceptors.response.use(
            ( response ) => response,
            async ( error ) =>
            {
                const mainRequest = error.config;
                if ( error.response.status === 401 && !mainRequest._retry )
                {
                    mainRequest._retry = true;
                    try
                    {
                        const refreshToken = auth?.refreshToken;
                        const response = await axios.post( `http://localhost:3000/api/auth/refresh-token`, { refreshToken } );

                        const { accessToken } = response.data.data
                        console.log( 'new token', response );
                        setAuth( { ...auth, authToken: accessToken } );
                        // mainRequest.headers.Authorization = `Bearer ${accessToken}`;

                        await localforage.setItem( 'auth', { ...auth, authToken: accessToken } );
                        
                        mainRequest.headers.Authorization = `Bearer ${accessToken}`;

                        return axios( mainRequest )
                    }
                    catch ( error )
                    {
                        console.log( error );
                        throw error;
                    }
                }

                return Promise.reject( error );
            }
        );

        return () =>
        {
            api.interceptors.request.eject( requestIntercept );
            api.interceptors.response.eject( responseInterceptor );
        }
    }, [auth.authToken] );

    return (
        {api}
    );
};

export default useAxios;