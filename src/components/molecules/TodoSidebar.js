import React, { useState } from 'react'

export const TodoSidebar = ({ onClick, active }) => {
    const className = key => key === active ? 'task-filter-active' : ''

    const filters = [
        {
            name: 'All Tasks',
            icon: "ficon bx bx- menu"
        },
        {
            name: 'Completed',
            icon: "ficon bx bx-check"
        },
        {
            name: 'Not Completed',
            icon: "ficon bx bx-x"
        }
    ]
    const labels = [
        {
            name: 'Feed',
            className: "bullet bullet-sm bullet-primary"
        },
        {
            name: 'Health',
            className: "bullet bullet-sm bullet-success"
        },
        {
            name: 'Reproduction',
            className: "bullet bullet-sm bullet-danger"
        }, {
            name: 'Breeding',
            className: "bullet bullet-sm bullet-warning"
        },
        {
            name: 'Other',
            className: "bullet bullet-sm bullet-info"
        }
    ]

    const Element = ({ icon, className }) => icon ? <i className={icon} /> : <span className={className} />

    return (
        <div className="todo-app-menu task-filter-container">
            <div className="sidebar-menu-list">
                <label className="filter-label mt-2 mb-1 pt-25">Filters</label>
                <div className="list-group" style={{ paddingRight: 10 }}>
                    {
                        filters.map((item, i) =>
                            <a onClick={() => onClick(item)} key={i} href="#" className="list-group-item border-0 d-flex align-items-center justify-content-between" style={{ padding: '10px 0' }}>
                                <span className={className(item.name)}>{item.name}</span>
                                <Element {...item} />
                            </a>
                        )
                    }
                </div>
                <label className="filter-label mt-2 mb-1 pt-25">Labels</label>
                <div className="list-group" style={{ paddingRight: 10 }}>
                    {labels.map((item, i) =>
                        <a onClick={() => onClick(item)} key={i} href="#" className="list-group-item border-0 d-flex align-items-center justify-content-between" style={{ padding: '10px 0' }}>
                            <span className={className(item.name)}>{item.name}</span>
                            <Element {...item} />
                        </a>
                    )}
                </div>
            </div >
        </div >
    )
}