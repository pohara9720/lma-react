import React from 'react'
import { animalTypes, animalSubTypes } from '../../dictionary'
import { reduxForm, getFormValues } from 'redux-form'
import { validator } from '../../helpers/validator'
import { Select } from '../atoms/Select'
import { Input } from '../atoms/Input'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { compose } from 'recompose'
import { AttachmentInput, AvatarGroup } from '../atoms/FileInput'
import moment from 'moment'

const imageSchema = yup.object().shape({
    file: yup.object().shape({
        name: yup.string().required()
    }).label('File')
})

const schema = yup.object().shape({
    profile_image: imageSchema,
    header_image: imageSchema,
    type: yup.string().required(),
    sub_type: yup.string().required(),
    name: yup.string().required(),
    registration_number: yup.number().required(),
    tag_number: yup.number().required(),
    breed: yup.string(),
    father: yup.string().required(),
    mother: yup.string().required(),
    dob: yup.string().test(
        "dob",
        "Date of Birth must be before today",
        value => {
            return moment(value).isBefore(moment(), 'days');
        }
    ),
    attachment: imageSchema
})

const ParentSelect = ({ parent, type }) => {
    const isFather = parent === 'father'
    const label = isFather ? 'Sire' : 'Dam'
    const payload = { type, parent }
    // NEED TO MAKE ACTION FOR GETTING MALES AND FEMALES BASED ON TYPE
    return (
        <Select options={animalTypes} label={label} name={parent} />
    )
}

export const AddorEditAnimalRaw = ({ formValues, onClose, handleSubmit }) => {

    const { type } = formValues || {}
    const subtypes = animalSubTypes[type] || []
    const notInSystem = { id: 'N/A', label: 'Not in System' }

    const submit = values => {
        console.log(values)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="card-content collapse show" aria-expanded="true">
                <div className="container mt-1">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <AvatarGroup />
                        </div>
                        <div className="col-12 form-group">
                            <Select options={animalTypes} label='Type' name='type' />
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
                            <ParentSelect parent='father' type={type} />
                        </div>

                        <div className="col-12 form-group">
                            <ParentSelect parent='mother' type={type} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label className="d-block" htmlFor="">Attach File</label>
                            <AttachmentInput name='attachment' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer container">
                <div className="row">
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
                <div className="sidenav-overlay"></div>
            </div>
        </form>
    )
}

export const AddorEditAnimal = compose(
    connect(state => ({
        formValues: getFormValues('animalForm')(state)
    })),
    reduxForm({ form: 'animalForm', asyncValidate: validator(schema) }))(AddorEditAnimalRaw)