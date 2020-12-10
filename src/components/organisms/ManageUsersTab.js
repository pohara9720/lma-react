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
import { displayToast, compare } from '../../helpers'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { setTaskItems, setTaskModal } from '../../redux/actions/tasks'

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

const ModalContentRaw = ({ initialize, handleSubmit, onSubmit, disabled, submitting, ...rest }) => {

    useEffect(() => {
        initialize({ emails: [""] })
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-content collapse show" aria-expanded="true">
                <div className="tab-content mt-1 pl-0">
                    <div className="tab-pane container active" id="details" aria-labelledby="details-tab" role="tabpanel">
                        <FieldArray name="emails" component={emails} />
                        <button type='submit' disabled={submitting} style={{ width: '100%' }} className='btn btn-primary'>Submit</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const ModalContent = reduxForm({ form: 'companyUserForm', validate })(ModalContentRaw)

export const ManageUsersTabRaw = ({ loadUsers, users, history, setTaskModal, setTaskItems }) => {

    const onDelete = async id => {
        try {
            await api.post(`user/${id}/delete_single`)
            const { results, ...rest } = users || {}
            const state = results.filter((user) => user.id !== id)
            loadUsers({ ...rest, results: state })
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }
    const onResendLink = async email => {
        try {
            await api.post('user/resend_email/', { email })
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }

    const columns = [
        {
            label: 'Email',
            name: 'email',
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

    const fetch = async () => {
        const { data: init } = await api.get(`user/?page=${page}`)
        loadUsers(init)
    }

    const { toggle, Modal } = useModal()
    const { Table, page, selected } = useTable(users, columns)

    const searchConfig = {
        entity: 'user',
        setter: loadUsers
    }

    const onAssign = () => {
        const items = compare(selected, users.results)
        setTaskItems(items)
        history.push('/tasks')
        setTaskModal(true)
    }

    const onDeleteMultiple = async () => {
        if (!selected.length) {
            return null
        } else {
            await api.post('user/batch_delete/', { users: selected })
            fetch()
        }
    }

    useEffect(() => {
        fetch()
    }, [page])

    const onSubmit = async (values) => {
        try {
            const { data } = await api.post('user/', values)
            const { results, ...rest } = users
            loadUsers({
                results: [...results, ...data],
                ...rest
            })
            toggle()
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }

    return (
        <div className="tab-pane fade active show" aria-labelledby="users-tab" role="tabpanel">
            <section className="invoice-list-wrapper">
                <PageHeaderActions onAdd={toggle} title='Add User' />
                <TableHeaderActions searchConfig={searchConfig} options={userOptions(onAssign, onDeleteMultiple)} />
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
    loadUsers: (users) => dispatch(listUsers({ users })),
    setTaskItems: (taskItems) => dispatch(setTaskItems({ taskItems })),
    setTaskModal: (boolean) => dispatch(setTaskModal(boolean))
})

export const ManageUsersTab = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ManageUsersTabRaw)


