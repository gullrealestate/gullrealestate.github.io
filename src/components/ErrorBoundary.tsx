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
                <div className="min-h-screen bg-ds-bg flex items-center justify-center px-4">
                    <div className="bg-ds-surface rounded-none p-10 max-w-lg text-center border border-ds-error/30 shadow-2xl">
                        <div className="bg-ds-error/20 w-16 h-16 rounded-none flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h1 className="text-2xl font-headline font-bold text-ds-on mb-4">Something went wrong</h1>
                        <p className="text-ds-on-faint mb-6 font-body">An unexpected error occurred. Please refresh the page to try again.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase tracking-widest text-[10px] py-4 px-8 rounded-none hover:opacity-90 transition-opacity active:scale-[0.99]"
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
