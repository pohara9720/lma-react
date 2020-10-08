import React from 'react'
import { Input } from '../../atoms/Input'
import { Select } from '../../atoms/Select'
import { states } from '../../../dictionary'
import { FileInput } from '../../atoms/FileInput'


export const CompanyStep = ({ errors }) => {
    return (
        <fieldset>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="media mb-2">
                                        <FileInput name='company_logo' label='Logo' />
                                    </div>
                                </div>
                                <Input manualErrors={errors} label='Company Name' name="company_name" id="signup-company-name" placeholder="Enter Your Company Name" />
                                <br />
                                <Input manualErrors={errors} label='Street Address' name="company_street" id="signup-company-street" placeholder="Enter Your Street Address" />
                                <Input manualErrors={errors} label='City' name="company_city" id="signup-company-email" placeholder="Enter Your City" />
                                <div className="form-group">
                                    <Select options={states} label='State' name='company_state' />
                                </div>
                                <Input manualErrors={errors} label='Zip Code' type='number' name="company_zipcode" id="signup-company-zipcode" placeholder="Enter Your Zip Code" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}