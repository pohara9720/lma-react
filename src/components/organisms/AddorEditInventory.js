import React, { useEffect } from 'react'
import { reduxForm, getFormValues } from 'redux-form'
import { validator } from '../../helpers/validator'
import { inventoryCategories, animalTypes, EMBRYO, SEMEN } from '../../dictionary'
import { Select, ParentSelect } from '../atoms/Select'
import { Input } from '../atoms/Input'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { compose } from 'recompose'
const schema = yup.object().shape({
    category: yup.string().required('Category is required'),
    animal_category: yup.string().required('Animal type is required'),
    cost: yup.number().required('Cost is required'),
    tank_number: yup.number().required('Tank Number is required'),
    canister_number: yup.number().required('Canister Number is required'),
    top_id: yup.string().required('Top ID is required'),
    units: yup.number().required('Units is required'),
    father: yup.string().when('category', { is: s => s === SEMEN, then: s => s.required('Sire is required') }),
    mother: yup.string().when('category', { is: s => s === EMBRYO, then: s => s.required('Dam is required') }),
})


export const AddorEditInventoryRaw = ({
    formValues,
    onClose,
    onEdit,
    editInventory,
    handleSubmit,
    initialize,
    onSubmit,
    submitting
}) => {
    const { animal_category, category } = formValues || {}
    const isEdit = !!editInventory

    useEffect(() => {
        if (isEdit) {
            const { category, cost, tank_number, canister_number, top_id, units, animal_category, father, mother } = editInventory || {}
            initialize({ category, cost, tank_number, canister_number, top_id, units, animal_category, father: father?.id || 'N/A', mother: mother?.id || 'N/A' })
        } else {
            initialize({ category: EMBRYO })
        }
    }, [])

    const Submission = isEdit ? v => onEdit(v, editInventory.id) : onSubmit

    return (
        <form onSubmit={handleSubmit(Submission)}>
            <div className="card-content collapse show" aria-expanded="true">
                <div className="tab-content mt-1 pl-0">
                    <div className="tab-pane container active" id="details" aria-labelledby="details-tab" role="tabpanel">
                        <div className="row">
                            <div className="col-12 form-group">
                                <Select disabled={isEdit} options={inventoryCategories} name='category' label='Category' />
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
                                <Select disabled={isEdit} options={animalTypes} name='animal_category' label='Category' />
                            </div>
                            {
                                category === SEMEN &&
                                <div className="col-12 form-group">
                                    <ParentSelect disabled={isEdit} noneOption parent='father' type={animal_category} />
                                </div>
                            }
                            {
                                category === EMBRYO &&
                                <div className="col-12 form-group">
                                    <ParentSelect disabled={isEdit} noneOption parent='mother' type={animal_category} />
                                </div>
                            }
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
                            <button disabled={submitting} type='submit' className="btn btn-primary invoice-send-btn">
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
        </form >
    )
}

export const AddorEditInventory = compose(
    connect(state => ({
        formValues: getFormValues('inventoryForm')(state),
        editInventory: state.editInventory
    })),
    reduxForm({ form: 'inventoryForm', asyncValidate: validator(schema) })
)(AddorEditInventoryRaw)