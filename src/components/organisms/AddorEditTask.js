import React from 'react'
import { reduxForm, getFormValues } from 'redux-form'
import { validator } from '../../helpers/validator'
import { toMulti } from '../../helpers/index'
import { Select } from '../atoms/Select'
import { Input } from '../atoms/Input'
import { TextArea } from '../atoms/TextArea'
import { MultiSelect } from '../atoms/MultiSelect'
import * as yup from 'yup'
import { taskCategories, BREEDING, OTHER } from '../../dictionary'
import { connect } from 'react-redux'
import { compose } from 'recompose'

const schema = yup.object().shape({
    category: yup.string().required(),
    title: yup.string().required(),
    assigned_date: yup.string().required(),
    description: yup.string().required(),
    users: yup.array().of(yup.string()).required(),
    due_date: yup.string().when('category', { is: c => c === BREEDING, then: s => s.required() }), //ONLY BREEDING
    cost: yup.number().when('category', { is: c => c !== BREEDING, then: s => s.required() }), //EVERYTHING BUT BREEDING
    animals: yup.array().of(yup.string()).when('category', { is: c => c !== OTHER, then: s => s.required() }), //EVERYTHING BUT OTHER
})

export const AddorEditTaskRaw = ({ formValues, onClose, handleSubmit }) => {
    const { category } = formValues || {}
    const isBreeding = category === BREEDING
    const isOther = category === OTHER
    const userOptions = toMulti(taskCategories)
    const submit = values => {
        console.log(values)
    }
    return (
        <form id="compose-form" className="mt-1" onSubmit={handleSubmit(submit)}>
            <div className="card-content">
                <div className="card-body py-0 border-bottom">
                    <div className='form-group'>
                        <Select options={taskCategories} name='category' label='Category' />
                    </div>
                    <div className="form-group">
                        <Input label='Task Title' name="title" id="task-form-title" placeholder="Title" />
                    </div>
                    {
                        !isBreeding &&
                        <div className="form-group">
                            <Input label='Cost' name="cost" id="task-form-cost" placeholder="Title" />
                        </div>
                    }
                    <div className="assigned d-flex justify-content-between">
                        <div>
                            <Input label='Task Date' type='date' name="assigned_date" id="task-form-assignedOn" placeholder="Task Date" />
                        </div>
                        {
                            isBreeding &&
                            <div>
                                <Input label='Due Date' type='date' name="due_date" id="task-form-dueDate" placeholder="Due Date" />
                            </div>
                        }
                    </div>
                    <div className="form-group">
                        <MultiSelect options={userOptions} placeholder='Select Users' name='users' label='Users Assigned To' />
                    </div>
                    {
                        !isOther &&
                        <div className="form-group">
                            <MultiSelect options={userOptions} placeholder='Select Animals' name='animals' label='Animals Assigned To' />
                        </div>
                    }
                    <div className='form-group'>
                        <TextArea name='description' cols="1" rows="4" placeholder='Description' label='Description' />
                    </div>
                </div>
                <div className="card-body border-bottom task-description">
                    <ul className="list-unstyled">
                        {/* <li className="tag-item">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="form-group mr-1 flex-grow-1">
                                    <label htmlFor="">Tag #</label>
                                    <select className="select2 form-control">
                                        <option value="1">Tag 123</option>
                                        <option value="1">Tag 672</option>
                                    </select>
                                </div>
                                <div className="form-group flex-grow-1">
                                    <label htmlFor="">Bred To</label>
                                    <select className="select2 form-control">
                                        <optgroup label="Animals">
                                            <option value="1">Tag 238</option>
                                            <option value="2">Tag 672</option>
                                        </optgroup>
                                        <optgroup label="Inventory">
                                            <option value="3">Primo</option>
                                            <option value="4">Prumo</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <button className="btn btn-icon d-flex align-items-center" type="button" data-repeater-delete="">
                                    <i className="bx bx-x"></i>
                                </button>
                            </div>
                        </li> */}
                    </ul>
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
            </div>
        </form>
    )
}

export const AddorEditTask = compose(
    connect(state => ({
        formValues: getFormValues('taskForm')(state)
    })),
    reduxForm({ form: 'taskForm', asyncValidate: validator(schema) }))(AddorEditTaskRaw)
