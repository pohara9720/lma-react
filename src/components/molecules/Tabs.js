import React from 'react'
import { ADMIN_ROLE } from '../../dictionary'

export const Tabs = ({ active, setActive, tabs, role }) => {
    const isAdmin = role === ADMIN_ROLE
    const ListItem = ({ title, icon, adminOnly }) => !adminOnly || (adminOnly && isAdmin) ? (
        <li className={`nav-item ${title === active ? 'current' : ''}`}>
            <div onClick={() => setActive(title)} className={`nav-link d-flex align-items-center ${active === title ? 'active' : ''}`}>
                <i className={icon}></i><span className="d-none d-sm-block">{title}</span>
            </div>
        </li>
    ) : null

    return (
        <ul className="nav nav-tabs mb-2" role="tablist">
            {tabs.map((all, i) => <ListItem key={i}{...all} />)}
        </ul>
    )
}