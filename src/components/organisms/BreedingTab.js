import React from 'react'
import { BREEDING } from '../../dictionary'
import { TimelineItem } from './HealthTab'
import { readDate } from '../../helpers/index'

export const BreedingTab = ({ tasks, breeding, id }) => {
    const { set, due_date, task_due_date } = breeding || {}
    const bredTo = set?.female?.id === id ? set?.female : set?.animal_semen
    return (
        <div className="tab-pane active" id="breeding" aria-labelledby="breeding-tab" role="tabpanel">
            <div className="card border">
                <div className="card-content">
                    <div className="card-body">
                        <h4 className="card-title">Breeding Details</h4>
                        <div className="d-flex justify-content-between mb-1">
                            <span>Bred Date</span>
                            <span>{task_due_date ? readDate(task_due_date) : 'N/A'}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                            <span>Due Date</span>
                            <span>{due_date ? readDate(due_date) : 'N/A'}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                            <span>Bred To</span>
                            <span>{bredTo?.name || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card border">
                <div className="card-content">
                    <div className="card-body">
                        <h4 className="card-title">Activity</h4>
                        <ul className="widget-timeline">
                            {tasks.map((t, i) => <TimelineItem key={i} {...t} />)}
                        </ul>
                        {/* <button className="btn btn-block btn-primary">View All Notifications</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}