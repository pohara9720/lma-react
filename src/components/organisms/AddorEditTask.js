import React, { useEffect, useState } from 'react'
import { reduxForm, getFormValues, FieldArray, change } from 'redux-form'
import { validator } from '../../helpers/validator'
import { toMulti } from '../../helpers/index'
import { Select } from '../atoms/Select'
import { Input } from '../atoms/Input'
import { TextArea } from '../atoms/TextArea'
import { MultiSelect } from '../atoms/MultiSelect'
import * as yup from 'yup'
import { taskCategories, BREEDING, animalTypes, CATTLE, PIG, SHEEP, HORSE, GOAT, FEED } from '../../dictionary'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import styled from 'styled-components'
import moment from 'moment'
import { api } from '../../helpers/api'

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
    // conditionals
    breeding: yup.array().of(breedingObj).when('category', { is: c => c === BREEDING, then: s => s.required('Breeding sets are required') }),
    animals: yup.array().of(yup.string()).when('category', { is: c => c !== BREEDING, then: s => s.required('At least 1 animal must be selected') }),
    due_date: yup.string().when('category', { is: c => c === BREEDING, then: s => s.required('Animal due date is required'), otherwise: s => s.nullable(), }), //ONLY BREEDING
    cost: yup.number().when('category', { is: c => c !== BREEDING, then: s => s.required('Cost is required') }), //EVERYTHING BUT BREEDING
})

const Breeding = ({ fields, options }) => {
    const { females, semen } = options || {}
    const renderFemales = (({ id, name, tag_number }) => <option key={id} value={id}>{`${name} (${tag_number})`}</option>)
    const renderSemen = (({ id, type, father, tag_number, tank_number }) => {
        const itemType = type ? 'animal' : 'inventory'
        const tagValue = type ? `Tag# ${tag_number}(Animal)` : `${father ? 'Tag#' : 'Tank #'}${father?.tag_number || tank_number} (Semen)`
        return <option key={id} value={JSON.stringify({ id, type: itemType })}>{tagValue}</option>
    })
    return (
        <div>
            {
                fields.map((item, i) => {
                    return (
                        <div key={i}>
                            <div className='row'>
                                <div className='form-group col-5'>
                                    <Select disabled={!females?.length} placeholder={!females?.length ? 'None in system' : ''} render={renderFemales} options={females} name={`${item}.female_select`} label='Female' />
                                </div>
                                <div className='form-group col-5'>
                                    <Select disabled={!semen?.length} placeholder={!semen?.length ? 'None in system' : ''} render={renderSemen} options={semen} name={`${item}.breeding_selection`} label='Male or Semen' />
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

export const AddorEditTaskRaw = ({ formValues,
    onClose,
    handleSubmit,
    animals,
    users,
    onSubmit,
    initialize,
    dispatch,
    submitting,
    taskItems,
    editTask,
    onEdit,
    ...rest
}) => {
    const { category, breeding_type, task_due_date } = formValues || {}
    const isBreeding = category === BREEDING
    const isActive = users.filter(({ is_active }) => is_active === true)
    const userOptions = toMulti(isActive, (({ first_name, last_name }) => `${first_name} ${last_name}`))
    const animalOptions = toMulti(animals, (({ tag_number, name }) => `${name} (Tag# ${tag_number})`))
    const [breedingData, setBreedingData] = useState([])
    const [defaultUsers, setDefaultUsers] = useState([])
    const [defaultAnimals, setDefaultAnimals] = useState([])
    const isEdit = !!editTask

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
        let a = []
        let u = []
        let i = []
        const mapBreeding = ({ female, animal_semen, inventory_semen }) => ({
            female_select: female?.id,
            breeding_selection: JSON.stringify({ id: animal_semen?.id || inventory_semen?.id, type: animal_semen ? 'animal' : 'inventory' })
        })
        const mapToForm = (({ type, first_name, last_name, id, tank_number, name, tag_number }) => {
            if (type) {
                a.push({ label: `${name} (Tag# ${tag_number})`, value: id })
            }
            if (first_name) {
                u.push({ label: `${first_name} ${last_name}`, value: id })
            }
            if (tank_number) {
                i.push({ id, tank_number })
            }
        })

        if (isEdit) {
            const { category, title, cost, task_due_date, due_date, users, animals, description, breeding_sets } = editTask || {}

            users.map(mapToForm)
            animals.map(mapToForm)
            const common = {
                category,
                title,
                cost: (cost / 100).toFixed(2),
                task_due_date,
                due_date: category !== BREEDING ? null : due_date,
                users: users.map(({ id }) => id),
                animals: animals.map(({ id }) => id),
                description
            }

            const breedingInit = {
                breeding: breeding_sets.map(mapBreeding),
                breeding_type: breeding_sets[0]?.female?.type,
                ...common
            }

            const init = breeding_sets?.length ? breedingInit : common

            initialize(init)

            if (a.length) {
                setDefaultAnimals(a)
            }
            if (u.length) {
                setDefaultUsers(u)
            }
            if (i.length) {
                initialize({ category: BREEDING })
            }
        }
        if (taskItems && taskItems.length) {
            taskItems.map(mapToForm)
            if (a.length) {
                setDefaultAnimals(a)
            }
            if (u.length) {
                setDefaultUsers(u)
            }
            if (i.length) {
                initialize({ category: BREEDING })
            }
        }
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const { data } = await api.post('inventory/get_breeding_sets/', { type: breeding_type })
            setBreedingData(data)
        }
        if (isBreeding) {
            const due_date = getDueDate(task_due_date)
            if (!isEdit) {
                const breeding = [{}]
                dispatch(change('taskForm', 'breeding', breeding))
            }
            dispatch(change('taskForm', 'due_date', due_date))
            fetch()
        }
    }, [task_due_date, breeding_type])

    const Submission = isEdit ? v => onEdit(v, editTask.id) : onSubmit

    return (
        <form id="compose-form" className="mt-1" onSubmit={handleSubmit(Submission)}>
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
                        <MultiSelect defaultValue={defaultUsers} options={userOptions} placeholder='Select Users' name='users' label='Users Assigned To' />
                    </div>
                    {
                        !isBreeding &&
                        <div className="form-group">
                            <MultiSelect defaultValue={defaultAnimals} options={animalOptions} placeholder='Select Animals' name='animals' label='Animals Assigned To' />
                        </div>
                    }
                    <div className='form-group'>
                        <TextArea name='description' cols="1" rows="4" placeholder='Description' label='Description' />
                    </div>
                </div>
                <div className="card-body border-bottom task-description">
                    {
                        isBreeding &&
                        <div className='form-group'>
                            <Select options={animalTypes} name='breeding_type' label='Type of Animal to be bred' />
                        </div>
                    }
                    {
                        isBreeding && breeding_type &&
                        <ul className="list-unstyled">
                            <FieldArray name="breeding" component={Breeding} options={breedingData} />
                        </ul>
                    }
                </div>
                <div className="card-footer container">
                    <div className="row">
                        <div className="col-xs-6">
                            <button type='submit' disabled={submitting} className="btn btn-primary invoice-send-btn">
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
        animals: state.animals.results,
        users: state.users.results,
        taskItems: state.taskItems,
        formValues: getFormValues('taskForm')(state),
        editTask: state.editTask
    })),
    reduxForm({ form: 'taskForm', asyncValidate: validator(schema) }))(AddorEditTaskRaw)
