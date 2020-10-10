import React from 'react'

export const StatusBubble = ({ status, color = 'success' }) => {
    return (
        <span className={`badge badge-light-${color} badge-pill`}>{status}</span>
    )
}