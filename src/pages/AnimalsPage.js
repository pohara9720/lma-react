import React, { useEffect } from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { useModal } from '../hooks/useModal'
import { readDate } from '../helpers/index'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { AddorEditAnimal } from '../components/organisms/AddorEditAnimal'
import { useTable } from '../hooks/useTable'
import { TableHeaderActions } from '../components/molecules/TableHeaderActions'
import { animalOptions, animalFilters } from '../dictionary'
import { BulletLabel } from '../components/atoms/BulletLabel'
import { api } from '../helpers/api'
import { connect } from 'react-redux'
import { listAnimals } from '../redux/actions/animals'
import { Link, withRouter } from 'react-router-dom'
import { compare } from '../helpers/index'
import { setInvoiceItems } from '../redux/actions/invoiceItems'
import { PageWrapper } from '../components/atoms/PageWrapper'
import { compose } from 'recompose'

const columns = [
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
    },

]

export const AnimalsPageRaw = ({ listAnimals, animals, setInvoiceItems, history, match }) => {
    const { Modal, toggle } = useModal()
    const { Table, selected } = useTable(animals, columns)

    const searchConfig = {
        entity: 'animal',
        keys: ['name', 'tag_number'],
        setter: listAnimals
    }

    useEffect(() => {
        const fetch = async () => {
            const { data: init } = await api.get('animal')
            listAnimals(init.results)
        }
        fetch()
    }, [])

    const onCreateSale = () => {
        const items = compare(selected, animals)
        setInvoiceItems(items)
        history.push('/sales/manage-invoice')
    }

    const onAssign = () => {
        console.log(selected)
    }

    const onDelete = () => {
        if (!selected.length) {
            return null
        } else {
            console.log(selected)
        }
    }

    const onSubmit = async values => {
        let formData = new FormData();
        Object.entries(values).map(entry => {
            const [key, value] = entry
            formData.append(key, value)
        })
        const { data } = await api.post('animal/', formData)
        listAnimals([data, ...animals])
        toggle()
    }

    return (
        <PageWrapper>
            <BreadCrumbs />
            <div className="content-body">
                <section className="invoice-list-wrapper">
                    <PageHeaderActions title='Add Animal' onAdd={toggle} onExport='animal' />
                    <TableHeaderActions searchConfig={searchConfig} options={animalOptions(onCreateSale, onAssign, onDelete)} filters={animalFilters(listAnimals)} />
                    <Table />
                </section>
                <Modal actionless title='Add Animal' onClose={toggle}>
                    <AddorEditAnimal onClose={toggle} onSubmit={onSubmit} />
                </Modal>
            </div>
        </PageWrapper>
    )
}

const mapStateToProps = ({ animals }) => ({ animals })

const mapDispathToProps = dispatch => ({
    listAnimals: (animals) => dispatch(listAnimals({ animals })),
    setInvoiceItems: (invoiceItems) => dispatch(setInvoiceItems({ invoiceItems }))
})

export const AnimalsPage = compose(
    withRouter,
    connect(mapStateToProps, mapDispathToProps)
)(AnimalsPageRaw)
