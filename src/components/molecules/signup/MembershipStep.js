import React, { useState, useEffect } from 'react'

const MembershipCards = ({ active, setActive, options }) => {

    const font = (monthlyId, annualId) => ({ color: (active.monthlyId === monthlyId || active.annualId === annualId) ? '#fff' : 'inherit' })

    const style = (monthlyId, annualId, disabled) => ({
        marginBottom: 32,
        backgroundColor: disabled ? '#C0C0C0' : (active.monthlyId === monthlyId || active.annualId === annualId) ? '#5A8DEE' : 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...font(monthlyId, annualId)
    })
    return options.map(({ monthlyId, annualId, members, name, price, features, disabled }, i) =>
        <div onClick={() => disabled ? null : setActive(options[i])} key={i} className="swiper-slide rounded swiper-shadow py-1 px-3" style={style(monthlyId, annualId, disabled)}>
            <div className="d-flex justify-content-center py-1">
                <h4 style={font(monthlyId, annualId)} className="swiper-text">{members}</h4>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <h1 style={font(monthlyId, annualId)} className="swiper-text">{name}</h1>
            </div>
            <div className="d-flex justify-content-center mb-2">
                <span style={font(monthlyId, annualId)} className="swiper-text">{price}</span>
            </div>
            <ul className="d-flex align-self-end list-group">
                {
                    features.map((feature, j) =>
                        <li style={font(monthlyId, annualId,)} key={j} className="list-group-item border-none d-flex justify-content-center align-items-center py-0">
                            <span><i className='swiper-text bx bx-check'></i></span>
                            <span className="swiper-text">{feature}</span>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}


export const MembershipStep = ({ quantity = 0, onChange }) => {
    const options = [
        {
            monthlyId: 'FREE',
            annualId: 'FREE',
            members: '0-10 Head',
            name: 'Free',
            total: 0,
            disabled: quantity > 10,
            price: '$0/month or $0/year',
            annually: 0,
            monthly: 0,
            features: ['Free Inventory Management.', 'Up to 25 units of semen/inventory.', 'Unlimited Sub Users.', 'Herd Management.', 'Sales and Profit Manager.'],

        },
        {
            monthlyId: 'BASIC_MONTHLY',
            annualId: 'BASIC_ANNUALLY',
            members: '11-100 Head',
            name: 'Basic',
            total: 90,
            disabled: quantity > 100,
            annually: 90,
            monthly: 10,
            price: '$10/month or $90/year',
            features: ['Free Inventory Management.', 'Unlimited semen/inventory.', 'Unlimited Sub Users.', 'Herd Management.', 'Sales and Profit Manager.']
        },
        {
            monthlyId: 'STANDARD_MONTHLY',
            annualId: 'STANDARD_ANNUALLY',
            members: '101-1500 Head',
            name: 'Standard',
            total: 200,
            disabled: quantity > 1500,
            annually: 200,
            monthly: 20,
            price: '$20/month or $200/year',
            features: ['Free Inventory Management.', 'Unlimited semen/inventory.', 'Unlimited Sub Users.', 'Herd Management.', 'Sales and Profit Manager.']
        },
        {
            monthlyId: 'PROFESSIONAL_MONTHLY',
            annualId: 'PROFESSIONAL_ANNUALLY',
            members: '1500-Unlimited Head',
            name: 'Professional',
            total: 300,
            annually: 300,
            monthly: 30,
            disabled: false,
            price: '$30/month or $300/year',
            features: ['Free Inventory Management.', 'Unlimited semen/inventory.', 'Unlimited Sub Users.', 'Herd Management.', 'Sales and Profit Manager.']
        }
    ]
    const init = (quantity > 10 && quantity < 100)
        ? options[1]
        : (quantity > 100 && quantity < 1500)
            ? options[2]
            : (quantity > 1500)
                ? options[3]
                : options[0]
    const [active, setActive] = useState(init)
    const [annual, setAnnual] = useState(false)
    const { name, price, annually, monthly } = active
    const total = annual ? annually : monthly

    useEffect(() => {
        const { monthlyId, annualId } = active
        const value = annual ? annualId : monthlyId
        onChange(value)
    }, [active, annual])
    return (
        <fieldset>
            <div className="review-section row">
                <div className="col-md-8">
                    <div className="card bg-transparent shadow-none">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="swiper-centered-slides-2 swiper-container p-1">
                                    <div className="swiper-wrapper">
                                        <MembershipCards active={active} setActive={setActive} options={options} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 cart">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Cart</h2>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-1">
                                    <span>{name}</span>
                                    <span>{price}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="checkbox" style={{ marginBottom: 16 }}>
                                <input type="checkbox" className="checkbox-input" checked={annual} onChange={() => setAnnual(!annual)} id='checkbox7' />
                                <label htmlFor="checkbox7" className="text-muted">Pay Annually</label>
                            </div>
                            <div className="d-flex align-self-end justify-content-between">
                                <h3>Total</h3>
                                <span>{(total + (total * .08)).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}