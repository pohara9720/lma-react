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

const schema = yup.object().shape({

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

export const AddorEditAnimalRaw = ({ formValues }) => {

    const { type } = formValues || {}
    const subtypes = animalSubTypes[type] || []
    const notInSystem = { id: 'N/A', label: 'Not in System' }
    return (
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
    )
}

export const AddorEditAnimal = compose(
    connect(state => ({
        formValues: getFormValues('animalForm')(state)
    })),
    reduxForm({ form: 'animalForm', asyncValidate: validator(schema) }))(AddorEditAnimalRaw)