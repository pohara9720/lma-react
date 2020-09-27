import React from 'react'
import { reduxForm } from 'redux-form'
import { validator } from '../../helpers/validator'
import { inventoryCategories } from '../../dictionary'
import { Select } from '../atoms/Select'
import { Input } from '../atoms/Input'
import * as yup from 'yup'

const schema = yup.object().shape({

})

export const AddorEditInventoryRaw = () => {
    return (
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
                            <Select options={inventoryCategories} name='father' label='Sire' />
                        </div>
                        <div className="col-12 form-group">
                            <Select options={inventoryCategories} name='mother' label='Dam' />
                        </div>
                        <div className="col-12 form-group">
                            <label className="d-block" htmlFor="">Sire and Dam</label>
                            <small className="text-muted">* Only link if you own parents and are in Livestock Manager</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body container"></div>
        </div>
    )
}

export const AddorEditInventory = reduxForm({ form: 'inventoryForm', asyncValidate: validator(schema) })(AddorEditInventoryRaw)