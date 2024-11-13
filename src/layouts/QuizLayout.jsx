import { Outlet } from 'react-router-dom';
export default function QuizLayout() {
    return (
        <div className="bg-[#F5F3FF] fixed z-50">
            <Outlet />
        </div>
    );
}
