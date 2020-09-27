import React from 'react'

export const Tabs = ({ active, setActive, tabs }) => {

    const ListItem = ({ title, icon }) => (
        <li className={`nav-item ${title === active ? 'current' : ''}`}>
            <div onClick={() => setActive(title)} className={`nav-link d-flex align-items-center ${active === title ? 'active' : ''}`}>
                <i className={icon}></i><span className="d-none d-sm-block">{title}</span>
            </div>
        </li>
    )

    return (
        <ul className="nav nav-tabs mb-2" role="tablist">
            {tabs.map((all, i) => <ListItem key={i}{...all} />)}
        </ul>
    )
}