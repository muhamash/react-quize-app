// import React from 'react'
import { Link } from 'react-router-dom';
import LoginForm from "./LoginForm";

export default function RightSide() {
    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
                    <span>Welcome to</span>
                    <img src="./assets/logo.svg" className="h-7" />
                </h2>
                <h1 className="text-5xl font-bold mb-8">Sign in</h1>
                <LoginForm />
                <div className="text-center">
                    <a href="#" className="text-primary">Forgot Password</a>
                </div>
                <div className="mt-8">
                    <p className="text-center">No Account? 
                        <span>
                            <Link to="/registration" className="text-indigo-900 px-2">
                             Sign up</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
