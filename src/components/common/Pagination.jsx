/* eslint-disable react/prop-types */
// import { useState } from 'react';

export default function Pagination ({totalPages, currentPage, setCurrentPage} )
{
    // const [ currentPage, setCurrentPage ] = useState( 1 );
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 pt-5">
            <button
                onClick={ handlePrevPage }
                disabled={ currentPage === 1 }
                className="px-3 py-1 text-sm bg-green-700 rounded disabled:opacity-50 text-white cursor-pointer">
                Previous
            </button>
                            
            <button
                onClick={ handleNextPage }
                disabled={ currentPage === totalPages }
                className="px-3 py-1 text-sm bg-cyan-700 rounded disabled:opacity-50 text-white cursor-pointer">
                Next
            </button>
        </div>
    );
}
