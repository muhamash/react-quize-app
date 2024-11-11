/* eslint-disable no-constant-binary-expression */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4NmExMWM4LWQxMTctNDdmYS05YmQ2LTE1NTFkNDI1YTYzNiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMxMTEyMzYxLCJleHAiOjE3MzExMTI0MjF9";

    const loginMutation = useMutation({
        mutationFn: async (formData) => {
            const response = await axios.post(`http://localhost:3000/api/auth/login`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        },
        onSuccess: ( response ) =>
        {
            toast.success("Login success!!");
            // console.log("Login success response:", response.data);
            const { tokens, user } = response.data;
            if (tokens) {
                const authToken = tokens.accessToken;
                const refreshToken = tokens.refreshToken;
                setAuth( { user, authToken, refreshToken } );

                // console.log("Auth state after login:", { user, authToken, refreshToken });
                navigate('/');
            }
        },
        onError: (error, variables) => {
            toast.error("Login Failed!!");
            console.error("Error response:", error.response?.data);
            setError("root.random", {
                type: "random",
                message: `User ${variables.email} not found!` || error.response?.data?.message
            });
        }
    });

    const submitForm = (formData) => {
        
        loginMutation.mutate( formData );
        // console.log( "Submitting form data:", formData, loginMutation );
    };
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="mb-4">
                <Toaster position="top-right" reverseOrder={false} />
                <label htmlFor="email" className="block mb-2">
                    Enter your username or email address
                </label>
                <input
                    type="text"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Username or email address"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors.username && <p className="text-red-600">{errors.username.message}</p>}
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
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>

            <div className="mb-6 flex gap-2 items-center">
                <input
                    type="checkbox"
                    id="admin"
                    className="px-4 py-3 rounded-lg border border-gray-300"
                    {...register('admin')}
                />
                <label htmlFor="admin" className="block">
                    Login as Admin
                </label>
            </div>
             {errors.random && <p className="text-red-600">{errors.random.message}</p>}
            <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg mb-4"
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>
            { loginMutation.isError && (
                <p className="text-red-600">
                    Error: { mutation.error?.response?.data?.message || mutation.error.message }
                </p>
            ) }
        </form>
    );
};

export default LoginForm;