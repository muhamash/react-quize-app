/* eslint-disable react/prop-types */
import { Component } from 'react';
import { FadeLoader } from 'react-spinners';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorInfo: error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleRetry = () => {
        this.setState({ hasError: false, errorInfo: null });
        window.location.reload();
    };

    render() {
        const { hasError, errorInfo } = this.state;

        if (hasError) {
            return (
                <div className="flex flex-col justify-center items-center h-screen text-center mx-auto relative">
                    <div className="p-5 mx-auto bottom-20 relative">
                        <FadeLoader
                            color="#bb1313"
                            height={100}
                            loading
                            margin={10}
                            radius={10}
                            speedMultiplier={2}
                            width={30}
                        />
                    </div>
                    <h2 className="text-red-600 text-lg font-bold mt-6">
                        Error in Application
                    </h2>
                    <p className="text-gray-700 mt-2">
                        {errorInfo?.error?.message || "An unexpected error occurred."}
                    </p>
                    {errorInfo?.componentStack && (
                        <pre className="text-sm text-gray-500 mt-4">
                            {errorInfo.componentStack}
                        </pre>
                    )}
                    <button
                        onClick={this.handleRetry}
                        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Refresh
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;