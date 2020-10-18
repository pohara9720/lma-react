import React, { useEffect } from 'react'
import { Select } from '../atoms/Select'
import { states } from '../../dictionary'
import { Input } from '../atoms/Input'
import { reduxForm } from 'redux-form'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { validator } from '../../helpers/validator'
import { compose } from 'recompose'
import { api } from '../../helpers/api'
import moment from 'moment'
import { displayToast } from '../../helpers/index'

const schema = yup.object().shape({
    name: yup.string().required('Name on card is required'),
    number: yup.number().typeError('Card number must be a number').required('Card number is required'),
    expiration: yup.date().required('Expiration data is required'),
    cvc: yup.number().required('CVC is required'),
    street: yup.string().required('Name on card is required'),
    city: yup.string().required('Name on card is required'),
    zipcode: yup.string().required('Name on card is required'),
    state: yup.string().required('Name on card is required'),
})

export const BillingTabRaw = ({ company, initialize, handleSubmit }) => {
    const { payment_info } = company || {}

    useEffect(() => {
        const fetch = async () => {
            const { data } = await api.get(`company/${payment_info}/get_stripe_account`)
            const { name, address, last4, exp_month, exp_year } = data || {}
            const { street, city, state, zipcode } = address || {}
            const expiration = moment([exp_year, exp_month - 1, 1]).format('YYYY-MM-DD')
            initialize({ street, city, state, zipcode, name, expiration, number: `**** **** **** ${last4}` })
        }
        fetch()
    }, [payment_info])

    const onSubmit = async values => {
        try {
            console.log(values)
            const { data } = await api.post(`company/${payment_info}/update_stripe_account/`, values)
            console.log('DATA', data)
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="tab-pane fade active show" id="billing" aria-labelledby="billing-tab" role="tabpanel">
                <h4 className="mb-1">Card Information</h4>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <Input label='Name on Card' placeholder='Name on Card' name='name' />
                        </div>
                        <div className="form-group">
                            <Input label='Card Number' placeholder='Card Number' name='number' />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <Input label='Expiration Date' name='expiration' type='date' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <Input label='CVC' placeholder='CVC' name='cvc' type='number' />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <Input label='Address' placeholder='Address' name='street' />
                        </div>
                        <div className="form-group">
                            <Input label='City' placeholder='City' name='city' />
                        </div>
                        <div className="form-group">
                            <Select options={states} label='State' name='state' />
                        </div>
                        <div className="form-group">
                            <Input label='Zip Code' placeholder='Zip Code' name='zipcode' />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-sm-row flex-column justify-content-start mt-1">
                    <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save Changes</button>
                </div>
            </div>
        </form>
    )
}

const mapStateToProps = ({ company }) => ({ company })

export const BillingTab = compose(
    connect(mapStateToProps, null),
    reduxForm({ form: 'billingForm', asyncValidate: validator(schema) })
)(BillingTabRaw)