import React from 'react'
import { Select } from '../atoms/Select'
import { states } from '../../dictionary'
import { Input } from '../atoms/Input'
import { reduxForm } from 'redux-form'
import * as yup from 'yup'
import { validator } from '../../helpers/validator'

const schema = yup.object().shape({

})

export const BillingTabRaw = () => {
    return (
        <div className="tab-pane fade active show" id="billing" aria-labelledby="billing-tab" role="tabpanel">
            <h4 className="mb-1">Card Information</h4>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <Input label='Name on Card' placeholder='Name on Card' name='name' />
                    </div>
                    <div className="form-group">
                        <Input label='Card Number' placeholder='Card Number' name='number' type='number' />
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
                    <div className="form-group mt-1">
                        <div className="checkbox">
                            <Input label='Billing address is the same as personal address' name='billingSame' type='checkbox' />
                        </div>
                    </div>
                    <div className="form-group">
                        <Input label='Address' placeholder='Address' name='address' />
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
                <div className="col-md-6">
                    <h4 className="mb-1">Recurring Payment</h4>
                    <p className="text-muted text-uppercase font-small-3">Turn Off To Stop Recurring
                                                Payments</p>
                    <div className="custom-control custom-switch custom-control-inline mb-1">
                        <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                        <label className="custom-control-label mr-1" htmlFor="customSwitch1">
                        </label>
                        <span>Payments On</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-sm-row flex-column justify-content-start mt-1">
                <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save Changes</button>
            </div>
        </div>
    )
}

export const BillingTab = reduxForm({ form: 'billingForm', asyncValidate: validator(schema) })(BillingTabRaw)