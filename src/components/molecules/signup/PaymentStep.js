import React from 'react'
import { Input } from '../../atoms/Input'
import { Select } from '../../atoms/Select'
import { states } from '../../../dictionary'

export const PaymentStep = ({ errors }) => {
    return (
        <fieldset>
            <div className="row review-section">
                <div className="col-md-8 col-12">
                    <div className="col-12">
                        <Input manualErrors={errors} label='Name on Card' name="payment_name" id="signup-payment-name" placeholder="Enter Cardholder Name" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='Card Number' type='number' name="payment_card" id="signup-payment-card" placeholder="Enter Your Card Number" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='Expiration Date' type='date' name="payment_expiration" id="signup-payment-expiration" placeholder="Enter Your Expiration Date" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='CVC' type='number' name="payment_cvc" id="signup-payment-cvc" placeholder="Enter Your CVC" />
                    </div>
                    <br />
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="checkbox">
                                <input type="checkbox" className="checkbox-input" id="checkbox7" />
                                <label htmlFor="checkbox7" className="text-muted">COMPANY ADDRESS IS THE SAME AS PERSONAL ADDRESS</label>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="col-12">
                        <Input manualErrors={errors} label='Street Address' name="payment_street" id="signup-payment-street" placeholder="Enter Your Street Address" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='City' name="payment_city" id="signup-payment-city" placeholder="Enter Your City" />
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <Select options={states} label='State' name='payment_state' />
                        </div>
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='Zip Code' type='number' name="payment_zipcode" id="signup-payment-zipcode" placeholder="Enter Your Zip Code" />
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
                                    <span>Standard Tier</span>
                                    <span>$200.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex align-self-end justify-content-between">
                                <h3>Total</h3>
                                <span>$200.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}