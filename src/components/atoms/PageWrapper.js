import React from 'react'

export const PageWrapper = ({ children, fullScreen }) => (
    <div className="app-content content" style={{ height: fullScreen ? '100%' : '100vh', overflow: 'auto' }}>
        <div className="content-overlay"></div>
        <div className="content-wrapper">
            {children}
        </div>
    </div>
)