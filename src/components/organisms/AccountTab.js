import React from 'react'

export const AccountTab = ({ setActive }) => {
    return (
        <div className="tab-pane fade active show" id="account" aria-labelledby="account-tab"
            role="tabpanel">
            <div className="row">
                <div className="col-md-8">
                    <div className="d-flex justify-content-between pb-4 border-bottom">
                        <span>Membership & Billing</span>
                        <div className="d-block">
                            <a className="d-block" href='#' onClick={() => setActive('Profile')}>Change Password</a>
                            <a className="d-block" href='#' onClick={() => setActive('Billing')}>Update Billing Info</a>
                        </div>
                    </div>
                    <div className="mt-2 pb-2 d-flex justify-content-between border-bottom">
                        <span>Membership Plan</span>
                        <span>5,000+ Head</span>
                        <span><a href='#' onClick={() => setActive('Company')}>Change Plan</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}