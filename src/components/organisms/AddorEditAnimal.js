import React, { useState, useEffect } from 'react'
import { animalTypes, animalSubTypes, COW } from '../../dictionary'
import { reduxForm, getFormValues } from 'redux-form'
import { validator, fileSchema } from '../../helpers/validator'
import { Select, ParentSelect } from '../atoms/Select'
import { Input } from '../atoms/Input'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { compose } from 'recompose'
import { AttachmentInput, AvatarGroup } from '../atoms/FileInput'
import moment from 'moment'

const schema = yup.object().shape({
    profile_image: fileSchema.required('* Required'),
    header_image: fileSchema.required('* Required'),
    type: yup.string().required('Type is required'),
    sub_type: yup.string().required('Subtype is required'),
    name: yup.string().required('Name is required'),
    registration_number: yup.number().required('Registration number is required'),
    tag_number: yup.number().required('Tag number is required'),
    breed: yup.string(),
    father: yup.string().when('father_placeholder', { is: c => !c, then: s => s.required('Sire is required is required') }),
    mother: yup.string().when('mother_placeholder', { is: c => !c, then: s => s.required('Dam is required is required') }),
    father_placeholder: yup.string().nullable(),
    mother_placeholder: yup.string().nullable(),
    dob: yup.string().test(
        "dob",
        "Date of Birth must be before today",
        value => {
            return moment(value).isBefore(moment(), 'days');
        }
    ),
    attachment: fileSchema
})

export const AddorEditAnimalRaw = ({
    formValues,
    onClose,
    handleSubmit,
    onSubmit,
    onEdit,
    submitting,
    editAnimal,
    initialize,
    onAttachmentDelete
}) => {
    const [sns, setSns] = useState(false)
    const [dns, setDns] = useState(false)
    const { type } = formValues || {}
    const subtypes = animalSubTypes[type] || []
    const isEdit = !!editAnimal

    useEffect(() => {
        if (isEdit) {
            const { profile_image, header_image, type, sub_type, name, tag_number, registration_number, dob, breed, father_placeholder, mother_placeholder, father, mother } = editAnimal || {}
            initialize({ profile_image, header_image, type, sub_type, name, tag_number, registration_number, dob, breed, father_placeholder, mother_placeholder, father: father?.id, mother: mother?.id })
        }
    }, [])

    const Submission = isEdit ? v => onEdit(v, editAnimal.id) : onSubmit

    return (
        <form onSubmit={handleSubmit(Submission)}>
            <div className="card-content collapse show" aria-expanded="true">
                <div className="container mt-1">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <AvatarGroup />
                        </div>
                        <div className="col-12 form-group">
                            <Select disabled={isEdit} options={animalTypes} label='Type' name='type' />
                        </div>
                        <div className="col-12 form-group">
                            <Select options={subtypes} label='Sub Type' name='sub_type' />
                        </div>
                        <Input label='Name' name="name" id="animal-form-name" placeholder="Animal Name" className='form-group col-md-12' />
                    </div>
                    <div className="row">
                        <Input label='Tag Number' name="tag_number" id="animal-form-tag" placeholder="Tag #" className='form-group col-md-12' />
                        <Input label='Registration Number' type='number' name="registration_number" id="animal-form-registration" placeholder="Registration #" className='form-group col-md-12' />
                    </div>
                    <div className="row">
                        <Input label='Date of Birth' type='date' name="dob" id="animal-form-dob" placeholder="DOB" className='pickadate form-group col-md-12' />
                        <Input label='Breed' name="breed" id="animal-form-breed" placeholder="Enter Breed of Animal" className='form-group col-md-12' />
                    </div>
                    <div className="row">
                        <div className="col-12 form-group">
                            <ParentSelect disabled={isEdit} parent='father' type={type} notInSystem={sns} />
                            <div className="checkbox" style={{ marginTop: 16 }}>
                                <input disabled={isEdit} type="checkbox" className="checkbox-input" checked={sns} onChange={() => setSns(!sns)} id='checkbox7' />
                                <label htmlFor="checkbox7" className="text-muted">Sire not in system</label>
                            </div>
                        </div>
                        <div className="col-12 form-group">
                            <ParentSelect disabled={isEdit} parent='mother' type={type} notInSystem={dns} />
                            <div className="checkbox" style={{ marginTop: 16 }}>
                                <input disabled={isEdit} type="checkbox" className="checkbox-input" checked={dns} onChange={() => setDns(!dns)} id='checkbox6' />
                                <label htmlFor="checkbox6" className="text-muted">Dam not in system</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 form-group">
                            {isEdit && editAnimal.attachment ?
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid grey', paddingTop: 8 }}>
                                    Delete attachment
                                    <i onClick={() => onAttachmentDelete(editAnimal.attachment, editAnimal.id)} style={{ color: 'red' }} className='bx bx-trash-alt' />
                                </div>
                                :
                                <>
                                    <label className="d-block" htmlFor="">Attach File</label>
                                    <AttachmentInput name='attachment' />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer container">
                <div className="row">
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
                <div className="sidenav-overlay"></div>
            </div>
        </form>
    )
}

export const AddorEditAnimal = compose(
    connect(state => ({
        formValues: getFormValues('animalForm')(state),
        editAnimal: state.editAnimal
    })),
    reduxForm({ form: 'animalForm', asyncValidate: validator(schema) }))(AddorEditAnimalRaw)