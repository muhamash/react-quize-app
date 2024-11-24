/* eslint-disable no-constant-binary-expression */
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useAuth from '../../hooks/useAuth';
import { usePostData } from '../../hooks/usePostData';

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
    
    const token = import.meta.env.VITE_AUTH_TOKEN;

    const onSuccess = ( response ) =>
    {
        const { tokens, user } = response.data;
        let timerInterval;

        Swal.fire( {
            title: "You are logged in!!!",
            html: `Welcome Back ${user.full_name}`,
            timer: 2000,
            timerProgressBar: true,
            didOpen: () =>
            {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector( "b" );
                timerInterval = setInterval( () =>
                {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100 );
            },
            willClose: () =>
            {
                clearInterval( timerInterval );
            }
        } );

        if ( tokens )
        {
            const authToken = tokens.accessToken;
            const refreshToken = tokens.refreshToken;
            setAuth( { user, authToken, refreshToken } );
            // toast.success( `Hey ${user.full_name}, login access granted!!!` );
            
            if ( user.role === 'user' )
            {
                navigate( '/' );
            }

            if (user.role === 'admin'){
                navigate( '/dashboard' );
            }
        }
    };

    const onError = ( error, variables ) =>
    {
        // toast.error( "Login Failed!!" );
        // console.error( "Error response:", error.response?.data );
        setError( "root.random", {
            type: "random",
            message: `User ${variables.email} not found!` ?? `${error.response?.data?.message} this is happened because you have entered wrong user name or password!!`
        } );
    };

    const loginMutation = usePostData( {
        url: `${import.meta.env.VITE_BASE_URL}/auth/login`,
        onSuccess,
        onError
    } );

    const submitForm = ( formData ) =>
    {
        // console.log(formData)
        loginMutation.mutate( formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } );
    };

    return (
        <form onSubmit={ handleSubmit( submitForm ) }>
            <div className="mb-4">
                <Toaster position="top-right" reverseOrder={ false } />
                <label htmlFor="email" className="block mb-2">
                    Enter your username or email address
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                    placeholder="Email address"
                    { ...register( 'email', { required: 'Email is required' } ) }
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

            {/* <div className="mb-6 flex gap-2 items-center">
                <input
                    type="checkbox"
                    id="admin"
                    className="px-4 py-3 rounded-lg border border-gray-300"
                    { ...register( 'admin' ) }
                />
                <label htmlFor="admin" className="block">
                    Login as Admin
                </label>
            </div> */}
            { errors.random && <p className="text-red-600">{ errors.random.message }</p> }
            <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg mb-4"
                disabled={ loginMutation.isPending }
            >
                { loginMutation.isPending ? 'Signing in...' : 'Sign in' }
            </button>
            { loginMutation.isError && (
                <p className="text-red-600">
                    Error: { `${loginMutation.error?.response?.data?.message} happened because you have entered wrong email or password ` || `${loginMutation.error.message} because you have entered wrong email or password` }
                </p>
            ) }
        </form>
    );
};

export default LoginForm;