import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { api } from '../../helpers/api'

const RadioGroup = styled.div`
    display:flex;
    align-items:center;
    margin: 16px 0;
    label {
        margin-bottom:0;
    }
`

export const ChangeMembershipRaw = ({ animals, itemId, isMonthly }) => {
    const [checked, setChecked] = useState(null)
    const { count } = animals || {}
    const options = [
        {
            disabled: count > 10,
            value: 'FREE',
            label: 'Free Tier'
        },
        {
            disabled: count > 100,
            value: 'BASIC_MONTHLY',
            label: 'Basic Monthly ($10/month)'
        },
        {
            disabled: count > 1500,
            value: 'STANDARD_MONTHLY',
            label: 'Standard Monthly ($20/month)'
        },
        {
            disabled: false,
            value: 'PROFESSIONAL_MONTHLY',
            label: 'Professional Monthly ($30/month)'
        },
        {
            disabled: count > 100,
            value: 'BASIC_ANNUALLY',
            label: 'Basic Annually ($90/year)'
        },
        {
            disabled: count > 1500,
            value: 'STANDARD_ANNUALLY',
            label: 'Standard Annually ($200/year)'
        },
        {
            disabled: false,
            value: 'PROFESSIONAL_ANNUALLY',
            label: 'Professional Annually ($300/year)'
        }
    ]

    const onClick = async () => {
        if (checked) {
            const { data } = await api.post('user/update_subscription/', { id: itemId, price: checked })
            console.log(data)
        }
    }

    const selections = isMonthly ? options.filter(({ label }) => label.includes('Month') || label.includes('Free')) : options.filter(({ label }) => label.includes('Annual'))

    return (
        <div>
            {selections.map(({ disabled, label, value }, i) =>
                <RadioGroup key={i}>
                    <input onChange={e => setChecked(e.target.value)} disabled={disabled} type="radio" name="membershipitemIid" id={value} value={value} checked={checked === value} />
                    <label style={{ marginLeft: 8 }} htmlFor={value}>{label}</label>
                </RadioGroup>)}
            <div className="d-flex flex-sm-row flex-column justify-content-start mt-1">
                <button onClick={onClick} type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save Changes</button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ animals }) => ({ animals })

export const ChangeMembership = connect(mapStateToProps, null)(ChangeMembershipRaw)