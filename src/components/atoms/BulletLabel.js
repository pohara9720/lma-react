import React from 'react'

export const BulletLabel = ({ label }) => {
    return (
        <>
            <span className="bullet bullet-warning bullet-sm"></span>
            <small className="text-muted" style={{ marginLeft: 8 }}>{label}</small>
        </>
    )
}