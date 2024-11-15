import axios from 'axios';
import localforage from 'localforage';
import React from 'react';
import { api } from '../components/api/localhost.js';
import useAuth from '../hooks/useAuth.jsx';

const useAxios = () => {
    const { auth, setAuth } = useAuth();

    React.useEffect(() => {
        if (!auth) return; // Ensure `auth` exists before setting interceptors

        // request interceptor
        const requestIntercept = api.interceptors.request.use(
            (config) => {
                const authToken = auth?.authToken;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // response interceptor
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const mainRequest = error.config;

                if (error.response?.status === 401 && !mainRequest._retry && auth?.refreshToken) {
                    mainRequest._retry = true;

                    try {
                        const refreshToken = auth.refreshToken;
                        const response = await axios.post(`http://localhost:5000/api/auth/refresh-token`, { refreshToken });
                        const { accessToken } = response.data.data;

                        setAuth({ ...auth, authToken: accessToken });
                        await localforage.setItem('auth', { ...auth, authToken: accessToken });
                        mainRequest.headers.Authorization = `Bearer ${accessToken}`;

                        return axios(mainRequest);
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [auth, setAuth]);

    return { api };
};

export default useAxios;