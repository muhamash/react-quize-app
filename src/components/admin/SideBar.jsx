import { useState } from 'react';

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Drawer Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-primary fixed top-5 right-6 z-50 bg-white shadow-md rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-[250px] bg-primary p-6 flex flex-col transform transition-transform duration-300 z-40 lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:block lg:static w-[300px]`}>
                <div className="mb-10">
                    <img src="../assets/logo-white.svg" className="h-7" alt="Logo" />
                </div>
                <nav className="flex-grow">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold">Quizzes</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Manage Roles</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary">Logout</a>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto flex items-center py-10">
                    <img src="../assets/avater.webp" alt="Mr Hasan" className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <span className="text-white font-semibold">Saad Hasan</span>
                </div>
            </aside>

            {/* Overlay for Mobile Drawer */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                ></div>
            )}
        </>
    );
}