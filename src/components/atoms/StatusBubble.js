import React from 'react'

export const StatusBubble = ({ status }) => {
    return (
        <span className="badge badge-light-success badge-pill">{status}</span>
    )
}