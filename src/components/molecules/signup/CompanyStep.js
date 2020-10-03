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
                                <div className="form-group">
                                    <div className="checkbox">
                                        <input type="checkbox" className="checkbox-input" id="checkbox7" />
                                        <label htmlFor="checkbox7" className="text-muted">COMPANY ADDRESS IS THE SAME AS PERSONAL ADDRESS</label>
                                    </div>
                                </div>
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
                {/* <div className="col-md-6">
                                                                        <div className="card">
                                                                            <div className="card-content">
                                                                                <div className="card-body">
                                                                                    <div className="form-group">
                                                                                        <label htmlFor="" className="text-muted">INVITE USERS TO JOIN IN MANAGING YOUR OPERATION</label>
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <label>User Email Addresses</label>
                                                                                        <select className="select2 form-control" multiple id="select2-users-name">
                                                                                            <option value="David Smith">David Smith</option>
                                                                                            <option value="John Doe">John Doe</option>
                                                                                            <option value="James Smith">James Smith</option>
                                                                                            <option value="Maria Garcia">Maria Garcia</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
            </div>
        </fieldset>
    )
}