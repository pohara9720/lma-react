import React from 'react'


export const HealthTab = () => {
    return (
        <div className="tab-pane pl-0" id="health" aria-labelledby="health-tab" role="tabpanel">
            <div className="card border">
                <div className="card-content">
                    <div className="card-body">
                        <h4 className="card-title">Activity</h4>
                        <ul className="widget-timeline">
                            <li className="timeline-items timeline-icon-success active">
                                <div className="timeline-time">Mon 8:17pm</div>
                                <h6 className="timeline-title">Gave Vaccination Shots</h6>
                                <p className="timeline-text">Assigned: <a href="JavaScript:void(0);">Jonny Richie</a></p>
                            </li>
                            <li className="timeline-items timeline-icon-primary active">
                                <div className="timeline-time">5 days ago</div>
                                <h6 className="timeline-title">AI'd to Primo</h6>
                                <p className="timeline-text">Assigned: <a href="JavaScript:void(0);">Mathew Slick</a></p>
                            </li>
                        </ul>
                        {/* <button className="btn btn-block btn-primary">View All Notifications</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}