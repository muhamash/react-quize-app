// import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = () =>
{
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const password = watch( "password" );
    const onSubmit = ( data ) =>
    {
        console.log( data );
    };

    return (
        <form onSubmit={ handleSubmit( onSubmit ) } className="">
            <div className="">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        placeholder="John Doe"
                        { ...register( 'name', { required: 'Full name is required' } ) }
                    />
                    { errors.name && <p className="text-red-600">{ errors.name.message }</p> }
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        placeholder="Email address"
                  
                        { ...register( 'email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Enter a valid email address',
                            },
                        } ) }
                    />
                    { errors.email && <p className="text-red-600">{ errors.email.message }</p> }
                </div>
            </div>

            <div className="flex gap-4">
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2">Enter your Password</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        placeholder="Password"
                        { ...register( 'password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        } ) }
                    />
                    { errors.password && <p className="text-red-600">{ errors.password.message }</p> }
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                    <input
                        type="password"
                        autoComplete="new-password"
                        id="confirmPassword"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300"
                        placeholder="Confirm Password"
                        { ...register( 'confirmPassword', {
                            required: 'Please confirm your password',
                            validate: ( value ) => value === password || 'Passwords do not match',
                        } ) }
                    />
                    { errors.confirmPassword && <p className="text-red-600">{ errors.confirmPassword.message }</p> }
                </div>
            </div>

            <div className="mb-6 flex gap-2 items-center">
                <input
                    type="checkbox"
                    id="admin"
                    className="px-4 py-3 rounded-lg border border-gray-300"
                    { ...register( 'admin' ) }
                />
                <label htmlFor="admin" className="block">Register as Admin</label>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg mb-2">
                Create Account
            </button>
        </form>
    );
};

export default RegisterForm;