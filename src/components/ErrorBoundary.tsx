import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    ErrorBoundaryState
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gruvbox-bg0 flex items-center justify-center px-4">
                    <div className="bg-gruvbox-bg1 rounded-[2rem] p-10 max-w-lg text-center border border-gruvbox-red/30 shadow-2xl">
                        <div className="bg-gruvbox-red/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gruvbox-fg mb-4">Something went wrong</h1>
                        <p className="text-gruvbox-fg/70 mb-6">An unexpected error occurred. Please refresh the page to try again.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-gruvbox-blue text-gruvbox-bg0 font-bold py-3 px-8 rounded-xl hover:bg-gruvbox-aqua transition-all"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
