/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unused-vars */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginForm = () =>
{
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();

    const loginMutation = useMutation( {
        mutationFn: async ( formData ) =>
        {
            const response = await axios.post( `http://localhost:3000/api/auth/login`, formData );
            return response.data;
        },
        onSuccess: ( data ) =>
        {
            const { tokens, user } = data;
            if ( tokens )
            {
                const authToken = tokens.accessToken;
                const refreshToken = tokens.refreshToken;

                toast( 'Here is your toast.' );
                setAuth( { user, authToken, refreshToken } );
                console.log("Auth state after login:", { user, authToken, refreshToken });
                navigate( '/' );
            }
        },
        onError: ( error, variables, context ) =>
        {
            toast.error( "Login Failed!!" );
            console.error("Error response:", error.response?.data);
            setError( "root.random", {
                type: "random",
                message: `User ${variables.email} not found!` || error.response?.data?.message
            } );
            console.error( error );
        }
    } );

    // console.log( loginMutation );

    const submitForm = ( formData ) =>
    {
        console.log("Submitting form data:", formData);
        loginMutation.mutate( formData );
    };

    return (
        <form onSubmit={ handleSubmit( submitForm ) }>
            <div className="mb-4">
                <Toaster position="top-right"
                    reverseOrder={ false } />
                <label htmlFor="username" className="block mb-2">
                    Enter your username or email address
                </label>
                <input
                    type="text"
                    id="username"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Username or email address"
                    { ...register( 'username', { required: 'Username or email is required' } ) }
                />
                { errors.username && <p className="text-red-600">{ errors.username.message }</p> }
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                    Enter your Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Password"
                    autoComplete="Password"
                    { ...register( 'password', { required: 'Password is required' } ) }
                />
                { errors.password && <p className="text-red-600">{ errors.password.message }</p> }
            </div>

            <div className="mb-6 flex gap-2 items-center">
                <input
                    type="checkbox"
                    id="admin"
                    className="px-4 py-3 rounded-lg border border-gray-300"
                    { ...register( 'admin' ) }
                />
                <label htmlFor="admin" className="block">
                    Login as Admin
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg mb-4"
                disabled={ loginMutation.isLoading }
            >
                { loginMutation.isLoading ? 'Signing in...' : 'Sign in' }
            </button>
        </form>
    );
};

export default LoginForm;