// import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = () =>
{
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = ( data ) =>
    {
        console.log( data );
    };

    return (
        <form onSubmit={ handleSubmit( onSubmit ) }>
            <div className="mb-4">
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

            <button type="submit" className="w-full bg-yellow-600 text-white py-3 rounded-lg mb-4">
                Sign in
            </button>
        </form>
    );
};

export default LoginForm;