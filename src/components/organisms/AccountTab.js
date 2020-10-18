import React, { useEffect, useState } from 'react'
import { api } from '../../helpers/api'
import { connect } from 'react-redux'

import { ChangeMembership } from '../atoms/ChangeMembership'

export const AccountTabRaw = ({ setActive, company }) => {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const { data } = await api.get(`user/${company.subscription}/retrieve_subscription/`)
            setInfo(data)
        }
        fetch()
    }, [])

    const itemId = info?.subscription?.items?.data[0].id

    const tier = info?.product?.metadata?.tier

    const isMonthly = tier && tier.includes('Month')

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
                        {/* <span>5,000+ Head</span> */}
                        <span><a href='#'>{tier}</a></span>
                    </div>
                    <ChangeMembership itemId={itemId} isMonthly={isMonthly} />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = ({ company }) => ({ company })
export const AccountTab = connect(mapStateToProps, null)(AccountTabRaw)