import React, { Component } from 'react';
import { ErrorPage } from '../../pages/ErrorPage';



class ErrorBoundary extends Component {
    state = { hasError: false, };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('CAUGHT ERROR', error, errorInfo)
    }

    render() {
        const { hasError } = this.state;
        const { children, fallback, isPage } = this.props;

        // You can render any custom fallback UI
        if (hasError) {
            if (isPage) {
                return <ErrorPage />;
            }
            if (fallback) {
                return fallback;
            }
            return <div style={{ color: 'red' }}>Error!</div>;
        }

        return children;
    }
}

export { ErrorBoundary };
