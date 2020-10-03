import React from 'react'
import { Input } from '../../atoms/Input'
import { Select } from '../../atoms/Select'
import { states } from '../../../dictionary'

export const AccountStep = ({ errors }) => {
    return (
        <fieldset>
            <div className="row">
                <div className="col-md-6 col-12">
                    <div className="col-12">
                        <Input manualErrors={errors} label='First Name' name="first_name" id="signup-first-name" placeholder="Enter Your First name" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='Last Name' name="last_name" id="signup-last-name" placeholder="Enter Your Last name" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='Email' name="email" id="signup-email" placeholder="Enter Your Email" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='Password' type='password' name="password" id="signup-password" placeholder="Enter Your Password" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='Confirm Password' type='password' name="confirm_password" id="signup-confirm-password" placeholder="Enter Your Password Confirmation" />
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="col-12">
                        <Input manualErrors={errors} label='Street Address' name="street" id="signup-street" placeholder="Enter Your Street Address" />
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='City' name="city" id="signup-city" placeholder="Enter Your City" />
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <Select options={states} label='State' name='state' />
                        </div>
                    </div>
                    <div className="col-12">
                        <Input manualErrors={errors} label='Zip Code' type='number' name="zipcode" id="signup-zipcode" placeholder="Enter Your Zip Code" />
                    </div>
                </div>
            </div>
        </fieldset>
    )
}