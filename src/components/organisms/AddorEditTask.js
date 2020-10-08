import React, { useEffect } from 'react'
import { reduxForm, getFormValues, FieldArray, change } from 'redux-form'
import { validator } from '../../helpers/validator'
import { toMulti } from '../../helpers/index'
import { Select } from '../atoms/Select'
import { Input } from '../atoms/Input'
import { TextArea } from '../atoms/TextArea'
import { MultiSelect } from '../atoms/MultiSelect'
import * as yup from 'yup'
import { taskCategories, BREEDING, animalTypes, CATTLE, PIG, SHEEP, HORSE, GOAT } from '../../dictionary'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import styled from 'styled-components'
import moment from 'moment'

const Icon = styled.div`
    border-radius:8px;
    padding: 8px;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    background:#F2F4F4;
    height:40px;
    margin-top:22px;
`

const breedingObj = yup.object().shape({
    female_select: yup.string().required('Female Required'),
    breeding_selection: yup.string().required('Male/Semen Required'),
})

const schema = yup.object().shape({
    category: yup.string().required('Category is required'),
    title: yup.string().required('Title is required'),
    task_due_date: yup.string().required('Task due date is required'),
    description: yup.string().required('Description is required'),
    users: yup.array().of(yup.string()).required('At least 1 user must be selected'),
    breeding: yup.array().of(breedingObj).required(),
    // conditionals
    animals: yup.array().of(yup.string()).when('category', { is: c => c !== BREEDING, then: s => s.required('At least 1 animal must be selected') }),
    due_date: yup.string().when('category', { is: c => c === BREEDING, then: s => s.required('Animal due date is required') }), //ONLY BREEDING
    cost: yup.number().when('category', { is: c => c !== BREEDING, then: s => s.required('Cost is required') }), //EVERYTHING BUT BREEDING
    // .when('category', { is: c => c !== OTHER, then: s => s.required() }), //EVERYTHING BUT OTHER
})

const Breeding = ({ fields }) => {
    // const [sperm, setSperm] = useState([])
    // const { breeding } = formValues
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [breeding])
    const test = [{ id: '123', type: 'inventory', label: 'Inventory Item' }, { id: '1234', type: 'animal', label: 'Animal Item' }]
    const render = (item) => <option value={JSON.stringify(item)}>{item.label}</option>
    return (
        <div>
            {
                fields.map((item, i) => {
                    return (
                        <div key={i}>
                            <div className='row'>
                                <div className='form-group col-5'>
                                    <Select options={taskCategories} name={`${item}.female_select`} label='Female' />
                                </div>
                                <div className='form-group col-5'>
                                    <Select options={test} name={`${item}.breeding_selection`} label='Male or Semen' render={render} />
                                </div>
                                <div className='col-2'>
                                    <Icon onClick={() => fields.remove(i)}>
                                        <i className='bx bx-trash-alt'></i>
                                    </Icon>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="col-12 form-group" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <button onClick={() => fields.push()} style={{ width: '100%', backgroundColor: "#F2F4F4" }} className="btn invoice-send-btn">Breed Another</button>
            </div>
        </div>
    )
}

export const AddorEditTaskRaw = ({ formValues, onClose, handleSubmit, animals, users, onSubmit, initialize, dispatch, ...rest }) => {
    const { category, breeding_type, task_due_date } = formValues || {}
    const isBreeding = category === BREEDING
    const isActive = users.filter(({ is_active }) => is_active === true)
    const userOptions = toMulti(isActive, (({ first_name, last_name }) => `${first_name} ${last_name}`))
    const animalOptions = toMulti(animals, (({ tag_number, name }) => `${name} (Tag# ${tag_number})`))

    const getDueDate = date => {
        switch (breeding_type) {
            case PIG: return moment(date).add(114, 'days').format('YYYY-MM-DD')
            case HORSE: return moment(date).add(330, 'days').format('YYYY-MM-DD')
            case SHEEP: return moment(date).add(152, 'days').format('YYYY-MM-DD')
            case GOAT: return moment(date).add(150, 'days').format('YYYY-MM-DD')
            case CATTLE: return moment(date).add(283, 'days').format('YYYY-MM-DD')
            default: return moment(date).add(283, 'days').format('YYYY-MM-DD')
        }
    }

    useEffect(() => {
        if (isBreeding) {
            const due_date = getDueDate(task_due_date)
            const breeding = [{}]
            dispatch(change('taskForm', 'breeding', breeding))
            dispatch(change('taskForm', 'due_date', due_date))
        }
    }, [task_due_date, breeding_type])

    return (
        <form id="compose-form" className="mt-1" onSubmit={handleSubmit(onSubmit)}>
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
                            <Input label='Cost' type='number' name="cost" id="task-form-cost" placeholder="Cost" />
                        </div>
                    }
                    <div className="assigned d-flex justify-content-between">
                        <div>
                            <Input label='Task Date' type='date' name="task_due_date" id="task-form-assignedOn" placeholder="Task Date" />
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
                        !isBreeding &&
                        <div className="form-group">
                            <MultiSelect options={animalOptions} placeholder='Select Animals' name='animals' label='Animals Assigned To' />
                        </div>
                    }
                    <div className='form-group'>
                        <TextArea name='description' cols="1" rows="4" placeholder='Description' label='Description' />
                    </div>
                </div>
                <div className="card-body border-bottom task-description">
                    <div className='form-group'>
                        <Select options={animalTypes} name='breeding_type' label='Type of Animal to be bred' />
                    </div>
                    <ul className="list-unstyled">
                        {
                            isBreeding && breeding_type && <FieldArray name="breeding" component={Breeding} />
                        }
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
        animals: state.animals,
        users: state.users,
        formValues: getFormValues('taskForm')(state)
    })),
    reduxForm({ form: 'taskForm', asyncValidate: validator(schema) }))(AddorEditTaskRaw)
