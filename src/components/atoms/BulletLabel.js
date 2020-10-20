import React from 'react'

export const BulletLabel = ({ label, color = 'warning' }) => {
    return (
        <div>
            <span className={`bullet bullet-${color} bullet-sm`}></span>
            <small className="text-muted" style={{ marginLeft: 8 }}>{label}</small>
        </div>
    )
}