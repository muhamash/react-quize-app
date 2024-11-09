// import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LeftSide from "../components/login/LeftSide";
import RightSide from "../components/login/RightSide";

export default function Login() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>
                    Login!!!
                </title>
            </Helmet>
            <div className="bg-white text-gray-800 overflow-hidden">
            <div className="flex min-h-screen">
                <LeftSide />
                <RightSide/>
            </div>
        </div>
        </HelmetProvider>
    );
}
