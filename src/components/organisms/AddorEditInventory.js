import React from 'react'
import { reduxForm } from 'redux-form'
import { validator } from '../../helpers/validator'
import { inventoryCategories } from '../../dictionary'
import { Select, ParentSelect } from '../atoms/Select'
import { Input } from '../atoms/Input'
import * as yup from 'yup'

const schema = yup.object().shape({
    category: yup.string().required('Category is required'),
    cost: yup.number().required('Cost is required'),
    tank_number: yup.number().required('Tank Number is required'),
    canister_number: yup.number().required('Canister Number is required'),
    top_id: yup.string().required('Top ID is required'),
    units: yup.number().required('Units is required'),
    father: yup.string().required('Sire is required'),
    mother: yup.string().required('Mother is required'),
})

export const AddorEditInventoryRaw = ({ onClose, handleSubmit, onSubmit }) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-content collapse show" aria-expanded="true">
                <div className="tab-content mt-1 pl-0">
                    <div className="tab-pane container active" id="details" aria-labelledby="details-tab" role="tabpanel">
                        <div className="row">
                            <div className="col-12 form-group">
                                <Select options={inventoryCategories} name='category' label='Category' />
                            </div>
                            <div className="col-12 form-group">
                                <Input label='Cost' type='number' name="cost" id="inventory-form-cost" placeholder="0" />
                            </div>
                            <div className="col-12 form-group">
                                <Input label='Tank Number' name="tank_number" id="inventory-form-tank" placeholder="Tank #" />
                            </div>
                            <div className="col-12 form-group">
                                <Input label='Canister Number' name="canister_number" id="inventory-form-canister" placeholder="Canister #" />
                            </div>
                            <div className="col-12 form-group">
                                <Input label='Top ID' name="top_id" id="inventory-form-topId" placeholder="Top ID" />
                            </div>
                            <div className="col-12 form-group">
                                <Input label='Number of Units' type='number' name="units" id="inventory-form-units" placeholder="0" />
                            </div>
                            <div className="col-12 form-group">
                                <ParentSelect parent='father' />
                            </div>
                            <div className="col-12 form-group">
                                <ParentSelect parent='mother' />
                            </div>
                            <div className="col-12 form-group">
                                <label className="d-block" htmlFor="">Sire and Dam</label>
                                <small className="text-muted">* Only link if you own parents and are in Livestock Manager</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer container">
                    <div className='row'>
                        <div className="col-xs-6">
                            <button type='submit' className="btn btn-primary invoice-send-btn">
                                <span>Save Changes</span>
                            </button>
                        </div>
                        <div className="col-xs-6">
                            <button data-action="close" onClick={onClose} className="btn invoice-send-btn">
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export const AddorEditInventory = reduxForm({ form: 'inventoryForm', asyncValidate: validator(schema) })(AddorEditInventoryRaw)