import React, { useState } from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { UserInfoTab } from '../components/organisms/UserInfoTab'
import { BillingTab } from '../components/organisms/BillingTab'
import { ManageUsersTab } from '../components/organisms/ManageUsersTab'
import { CompanyTab } from '../components/organisms/CompanyTab'
import { AccountTab } from '../components/organisms/AccountTab'
import { Tabs } from '../components/molecules/Tabs'

export const ProfilePage = () => {
    const [active, setActive] = useState('Profile')

    const tabs = [
        {
            title: 'Profile',
            icon: 'bx bxs-group mr-25'
        },
        {
            title: 'Company',
            icon: 'bx bxs-group mr-25'
        },
        {
            title: 'Manage Users',
            icon: 'bx bxs-group mr-25'
        },
        {
            title: 'Billing',
            icon: 'bx bxs-group mr-25'
        },
        {
            title: 'Account',
            icon: 'bx bxs-group mr-25'
        }
    ]

    const renderPage = (active) => {
        switch (active) {
            case 'Account': return <AccountTab setActive={setActive} />
            case 'Company': return <CompanyTab />
            case 'Manage Users': return <ManageUsersTab />
            case 'Billing': return <BillingTab />
            case 'Profile': return <UserInfoTab />
            default: return <UserInfoTab />
        }
    }

    const page = renderPage(active)

    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <BreadCrumbs />
                <div className="content-body">
                    <Tabs tabs={tabs} active={active} setActive={setActive} />
                    <div className="tab-content">
                        {page}
                    </div>
                </div>
            </div>
        </div>
    )
}

