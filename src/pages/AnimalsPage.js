import React, { useEffect } from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { useModal } from '../hooks/useModal'
import { readDate } from '../helpers/index'
import { displayToast } from '../helpers/index'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { AddorEditAnimal } from '../components/organisms/AddorEditAnimal'
import { useTable } from '../hooks/useTable'
import { TableHeaderActions } from '../components/molecules/TableHeaderActions'
import { animalOptions, animalFilters } from '../dictionary'
import { BulletLabel } from '../components/atoms/BulletLabel'
import { api } from '../helpers/api'
import { connect } from 'react-redux'
import { listAnimals, setEditAnimal } from '../redux/actions/animals'
import { Link, withRouter } from 'react-router-dom'
import { compare } from '../helpers/index'
import { setInvoiceItems } from '../redux/actions/invoiceItems'
import { PageWrapper } from '../components/atoms/PageWrapper'
import { compose } from 'recompose'
import { setTaskItems, setTaskModal } from '../redux/actions/tasks'


export const AnimalsPageRaw = ({
    listAnimals,
    animals,
    setInvoiceItems,
    history,
    setTaskModal,
    setTaskItems,
    setEditAnimal
}) => {
    const { Modal, toggle } = useModal()
    const columns = [
        {
            label: '',
            name: 'id',
            render: ((item) =>
                <div onClick={() => {
                    toggle()
                    setEditAnimal(item)
                }} style={{ cursor: 'pointer' }}>
                    <i className='bx bx-edit' />
                </div>)
        },
        {
            label: 'Name',
            name: 'name',
            render: (({ name, id }, { match }) => <Link to={`${match.url}/${id}`}>{name}</Link>)
        },
        {
            label: 'Tag #',
            name: 'tag_number',
        },
        {
            label: 'Registration #',
            name: 'registration_number',
        },
        {
            label: 'DATE OF BIRTH',
            name: 'dob',
            render: (({ dob }) => readDate(dob))
        },
        {
            label: 'Category',
            name: 'type',
            render: (({ type }) => <BulletLabel label={type} />)
        }
    ]


    const { Table, selected, page } = useTable(animals, columns)

    const searchConfig = {
        entity: 'animal',
        setter: listAnimals
    }

    const fetch = async () => {
        const { data } = await api.get(`animal/?page=${page}`)
        listAnimals(data)
    }

    useEffect(() => {
        fetch()
    }, [page])

    const onCreateSale = () => {
        const items = compare(selected, animals.results)
        setInvoiceItems(items)
        history.push('/sales/manage-invoice')
    }

    const onAssign = () => {
        const items = compare(selected, animals.results)
        setTaskItems(items)
        history.push('/tasks')
        setTaskModal(true)
    }

    const onDelete = () => {
        if (!selected.length) {
            return null
        } else {
            console.log(selected)
        }
    }

    const onSubmit = async values => {
        try {
            let formData = new FormData();
            Object.entries(values).map(entry => {
                const [key, value] = entry
                formData.append(key, value)
            })
            const { data } = await api.post('animal/', formData)
            const { results, ...rest } = animals
            listAnimals({
                results: [data, ...results],
                ...rest
            })
            toggle()
            displayToast({ success: true })
        } catch (error) {

        }
    }

    const onEdit = async (values, id) => {
        try {
            let formData = new FormData();
            Object.entries(values).map(entry => {
                const [key, value] = entry
                formData.append(key, value)
            })
            const { data } = await api.patch(`animal/${id}/`, formData)
            const { results, ...rest } = animals
            const updated = results.filter(x => x.id !== id)
            listAnimals({
                results: [data, ...updated],
                ...rest
            })
            toggle()
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }

    const onClose = () => {
        toggle()
        setEditAnimal(null)
    }

    const onAttachmentDelete = async (url, id) => {
        try {
            const { data } = await api.post('animal/delete_attachment/', { url, id })
            const { results, ...rest } = animals
            const updated = results.filter(x => x.id !== id)
            listAnimals({
                results: [data, ...updated],
                ...rest
            })
            toggle()
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }

    }

    return (
        <PageWrapper>
            <BreadCrumbs />
            <div className="content-body">
                <section className="invoice-list-wrapper">
                    <PageHeaderActions title='Add Animal' onAdd={toggle} onExport='animal' onImport='animal' refetch={fetch} />
                    <TableHeaderActions searchConfig={searchConfig} options={animalOptions(onCreateSale, onAssign, onDelete)} filters={animalFilters(listAnimals)} />
                    <Table />
                </section>
                <Modal actionless title='Add Animal' onClose={onClose}>
                    <AddorEditAnimal onClose={onClose} onSubmit={onSubmit} onEdit={onEdit} onAttachmentDelete={onAttachmentDelete} />
                </Modal>
            </div>
        </PageWrapper>
    )
}

const mapStateToProps = ({ animals }) => ({ animals })

const mapDispathToProps = dispatch => ({
    listAnimals: (animals) => dispatch(listAnimals({ animals })),
    setInvoiceItems: (invoiceItems) => dispatch(setInvoiceItems({ invoiceItems })),
    setTaskItems: (taskItems) => dispatch(setTaskItems({ taskItems })),
    setTaskModal: (boolean) => dispatch(setTaskModal(boolean)),
    setEditAnimal: (animal) => dispatch(setEditAnimal({ animal }))
})

export const AnimalsPage = compose(
    withRouter,
    connect(mapStateToProps, mapDispathToProps)
)(AnimalsPageRaw)
