/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const ErrorBoundary = ( { children } ) =>
{
    const [ hasError, setHasError ] = useState( false );

    const handleRetry = () =>
    {
        setHasError( false );
        window.location.reload();
    };

    const ErrorWrapper = ( { children } ) =>
    {
        try
        {
            return children;
        } catch ( error )
        {
            console.error( "Error Boundary caught an error", error );
            setHasError( true );
            return null;
        }
    };

    if ( hasError )
    {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center">
                {/* <FadeLoader /> */}
                <button
                    onClick={ handleRetry }
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Refresh
                </button>
            </div>
        );
    }

    return <ErrorWrapper>{ children }</ErrorWrapper>;
};

export default ErrorBoundary;