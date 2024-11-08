// import React from 'react'

import LeftReg from "../components/Registration/LeftReg";
import RegisterForm from "../components/Registration/RegForm";


export default function RegistrationPage() {
    return (
        <div className="bg-white text-gray-800 ">
            <div className="flex min-h-screen max-h-screen">
                <LeftReg />

                <div className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
                    <div className="w-full max-w-lg ">
                        <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
                            <span>Welcome to</span>
                            <img src="./assets/logo.svg" className="h-7" />
                        </h2>
                        <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
                        <RegisterForm />
                        <div className="mt-2 text-gray-400">
                            <p className="text-center">Already have account ? <a href="#" className="text-primary">Sign In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
