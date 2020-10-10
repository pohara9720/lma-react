import React, { useEffect } from 'react'
import { PageHeaderActions } from '../molecules/PageHeaderActions'
import { useTable } from '../../hooks/useTable'
import { TableHeaderActions } from '../molecules/TableHeaderActions'
import { userOptions } from '../../dictionary'
import { useModal } from '../../hooks/useModal'
import { Input } from '../atoms/Input'
import { reduxForm, FieldArray } from 'redux-form'
import { emailFieldArrayValidator as validate } from '../../helpers/validator'
import { api } from '../../helpers/api'
import { listUsers } from '../../redux/actions/users'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Actions = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justfiy-content:space-between
`

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

const emails = ({ fields }) => (
    <div>
        {fields.map((email, i) => (
            <Container key={i}>
                <Input className='special-input' label='Email' name={email} placeholder="Enter Email" />
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

const ModalContentRaw = ({ initialize, handleSubmit, onSubmit, ...rest }) => {

    useEffect(() => {
        initialize({ emails: [""] })
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

const ModalContent = reduxForm({ form: 'companyUserForm', validate })(ModalContentRaw)

export const ManageUsersTabRaw = ({ loadUsers, users }) => {
    const onDelete = async id => {
        const result = await api.delete(`user/${id}`)
        const state = users.filter((user) => user.id !== id)
        loadUsers(state)
    }
    const onResendLink = async email => {
        const { data } = await api.post('user/resend_email/', { email })
        console.log('DATA', data)
    }

    const columns = [
        {
            label: 'Email',
            name: 'email',
            render: (({ email }) => <a href='#'>{email}</a>)
        },
        {
            label: 'First Name',
            name: 'first_name',
        },
        {
            label: 'Last Name',
            name: 'last_name' //NOTE email last name
        },
        {
            label: 'Role',
            name: 'role'
        },
        {
            label: 'Status',
            name: 'is_active',
            render: (({ is_active }) => <div>{is_active ? 'Active' : 'Inactive'}</div>)
        },
        {
            label: 'Actions',
            name: 'id',
            render: (({ id, email, is_active }) =>
                <Actions>
                    {!is_active && <button className='btn btn-primary' onClick={() => onResendLink(email)}>Resend Invite</button>}
                    <div style={{ cursor: 'pointer' }} onClick={() => onDelete(id)}>
                        <i style={{ marginLeft: 8, fontSize: 24 }} className='bx bx-trash-alt'></i>
                    </div>
                </Actions>
            )
        },

    ]

    const { toggle, Modal } = useModal()
    const { Table } = useTable(users, columns)

    const searchConfig = {
        entity: 'user',
        keys: ['first_name', 'last_name'],
        setter: loadUsers
    }

    useEffect(() => {
        const fetch = async () => {
            const { data: init } = await api.get('user')
            loadUsers(init)
        }
        fetch()
    }, [])

    const onSubmit = async (values) => {
        const { data } = await api.post('user/', values)
        const result = [...users, ...data]
        loadUsers(result)
        toggle()
    }

    return (
        <div className="tab-pane fade active show" aria-labelledby="users-tab" role="tabpanel">
            <section className="invoice-list-wrapper">
                <PageHeaderActions onAdd={toggle} title='Add User' />
                <TableHeaderActions searchConfig={searchConfig} options={userOptions} />
                <Table />
            </section>
            <Modal title='Add Users' onClose={toggle} actionless>
                <ModalContent onSubmit={onSubmit} />
            </Modal>
        </div>
    )
}

const mapStateToProps = ({ users, company }) => ({ users, company })
const mapDispatchToProps = dispatch => ({
    loadUsers: (users) => dispatch(listUsers({ users }))
})

export const ManageUsersTab = connect(mapStateToProps, mapDispatchToProps)(ManageUsersTabRaw)


