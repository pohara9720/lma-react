import React from 'react'


export const Modal = ({ open, onClose, children, title, onSubmit, actionless }) => {
    const className = open ? 'sidebar-overlay show' : 'sidebar-overlay'
    return (
        <>
            <div className={className} onClick={onClose}></div>
            <div className="app-content content lma-list">
                <div className='sidebar card'></div>
                <div className='sidebar card'>
                    <div className="card-header border-bottom">
                        <div className="d-flex">
                            <h4 className="card-title">{title}</h4>
                            <div className="heading-elements">
                                <ul className="list-inline mb-0">
                                    <li><a onClick={onClose} data-action="close"><i className="bx bx-x"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {children}
                    <div className="card-footer container">
                        {
                            !actionless && <div className="row">
                                <div className="col-xs-6">
                                    <button onClick={onSubmit} className="btn btn-primary invoice-send-btn">
                                        <span>Save Changes</span>
                                    </button>
                                </div>
                                <div className="col-xs-6">
                                    <button data-action="close" onClick={onClose} className="btn invoice-send-btn">
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        }
                        <div className="sidenav-overlay"></div>
                    </div>
                </div>
            </div>
        </>
    )
}