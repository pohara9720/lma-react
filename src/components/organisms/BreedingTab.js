import React from 'react'
import { TimelineItem } from './HealthTab'


export const BreedingTab = ({ tasks }) => {
    return (
        <div className="tab-pane active" id="breeding" aria-labelledby="breeding-tab" role="tabpanel">
            <div className="card border">
                <div className="card-content">
                    <div className="card-body">
                        <h4 className="card-title">Breeding Details</h4>
                        <div className="d-flex justify-content-between mb-1">
                            <span>Bred Date</span>
                            <span>05/20/2020</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                            <span>Due Date</span>
                            <span>05/20/2020</span>
                        </div>
                        <div className="d-flex justify-content-between mb-1">
                            <span>Bred To</span>
                            <span>Primo</span>
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