// MainLayout.js
// import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Nav from '../components/common/Nav';

export default function MainLayout() {
    return (
        <div className="bg-[#F5F3FF] min-h-screen pb-5">
            < Nav />
            <Outlet />
            <Footer />
        </div>
    );
}