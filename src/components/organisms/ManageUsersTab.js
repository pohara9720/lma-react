import React, { Component, useEffect } from 'react'
import { PageHeaderActions } from '../molecules/PageHeaderActions'
import { useTable } from '../../hooks/useTable'
import { TableHeaderActions } from '../molecules/TableHeaderActions'
import { animalOptions, animalFilters } from '../../dictionary'
import { BulletLabel } from '../atoms/BulletLabel'
import { useModal } from '../../hooks/useModal'
import { Input } from '../atoms/Input'
import { reduxForm, FieldArray, Field } from 'redux-form'
import { validator } from '../../helpers/validator'
import * as yup from 'yup'
import styled from 'styled-components'

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

const Container = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    width:100%;
    margin:16px 0;
`

const schema = yup.object().shape({
    emails: yup.array().of(yup.string().email()).required('Valid Email is Required')
})

const columns = [
    {
        label: 'Tag #',
        name: 'tag'
    },
    {
        label: 'Name',
        name: 'name',
        render: (({ id }) => <div>{id}</div>)
    },
    {
        label: 'DOB',
        name: 'dob'
    },
    {
        label: 'Category',
        name: 'category',
        render: (item) => <BulletLabel label={item.category} />
    },

]

const emails = ({ fields }) => (
    <div>
        {fields.map((email, i) => (
            <Container key={i}>
                <Input className='special-input' label='Email' name={`${email}.email`} placeholder="Enter Email" />
                <Icon onClick={() => fields.remove(i)}>
                    <i className='bx bx-trash-alt'></i>
                </Icon>
            </Container>
        ))}
        <div className="col-12 form-group" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <button onClick={() => fields.push()} style={{ width: '100%', backgroundColor: "#F2F4F4" }} className="btn invoice-send-btn">Add Another Email</button>
        </div>
    </div>
)

const ModalContentRaw = ({ initialize, handleSubmit, ...rest }) => {
    useEffect(() => {
        initialize({ emails: [""] })
    }, [])
    const submit = (values, ...other) => {
        console.log('STUFF', values, rest, other)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="card-content collapse show" aria-expanded="true">
                <div className="tab-content mt-1 pl-0">
                    <div className="tab-pane container active" id="details" aria-labelledby="details-tab" role="tabpanel">
                        <FieldArray name="emails" component={emails} />
                        <button onClick={() => console.log('hello')} style={{ width: '100%' }} className='btn btn-primary'>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const ModalContent = reduxForm({ form: 'companyUserForm', asyncValidate: validator(schema) })(ModalContentRaw)

export const ManageUsersTab = () => {
    const { toggle, Modal } = useModal()
    const { Table } = useTable([], columns)
    return (
        <div className="tab-pane fade active show" aria-labelledby="users-tab" role="tabpanel">
            <section className="invoice-list-wrapper">
                <PageHeaderActions onAdd={toggle} title='Add User' />
                <TableHeaderActions options={animalOptions} filters={animalFilters} />
                <Table />
            </section>
            <Modal title='Add Users' onClose={toggle} actionless>
                <ModalContent />
            </Modal>
        </div>
    )
}


