import React, { useState, useEffect } from 'react'
import { readDate } from '../../helpers/index'
import { FEED, BREEDING, OTHER, HEALTH, REPRODUCTION } from '../../dictionary'

export const TimelineItem = ({ task_due_date, title, users, category }) => {
    const colors = {
        [FEED]: 'primary',
        [BREEDING]: 'warning',
        [OTHER]: 'info',
        [HEALTH]: 'success',
        [REPRODUCTION]: 'danger'
    }
    return (
        <li className={`timeline-items timeline-icon-${colors[category]} active`}>
            <div className="timeline-time">{readDate(task_due_date)}</div>
            <h6 className="timeline-title">{title}</h6>
            <p className="timeline-text">Assigned: {users.map(({ first_name, last_name }) => `${first_name} ${last_name} ,`)}</p>
        </li>
    )
}

export const HealthTab = ({ tasks }) => (
    <div className="tab-pane pl-0" id="health" aria-labelledby="health-tab" role="tabpanel">
        <div className="card border">
            <div className="card-content">
                <div className="card-body">
                    <h4 className="card-title">Activity</h4>
                    <ul className="widget-timeline">
                        {tasks.map((t, i) => <TimelineItem key={i} {...t} />)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
)
