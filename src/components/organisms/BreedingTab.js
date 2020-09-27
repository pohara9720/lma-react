import React from 'react'


export const BreedingTab = () => {
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
                            <li className="timeline-items timeline-icon-success active">
                                <div className="timeline-time">Mon 8:17pm</div>
                                <h6 className="timeline-title">Pull CIDR's</h6>
                                <p className="timeline-text">Assigned: <a href="JavaScript:void(0);">Jonny Richie</a></p>
                            </li>
                            <li className="timeline-items timeline-icon-primary active">
                                <div className="timeline-time">5 days ago</div>
                                <h6 className="timeline-title">AI cows</h6>
                                <p className="timeline-text">Assigned: <a href="JavaScript:void(0);">Mathew Slick</a></p>
                            </li>
                            <li className="timeline-items timeline-icon-danger active">
                                <div className="timeline-time">7 hours ago</div>
                                <h6 className="timeline-title">Gave shot of cysterelone</h6>
                                <p className="timeline-text">Assigned: <a href="JavaScript:void(0);">Tyler Humphrey</a></p>
                            </li>
                        </ul>
                        {/* <button className="btn btn-block btn-primary">View All Notifications</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}