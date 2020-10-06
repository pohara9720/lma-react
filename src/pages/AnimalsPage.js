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
import { Link } from 'react-router-dom'

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

export const AnimalsPageRaw = ({ listAnimals, animals }) => {
    const { Modal, toggle } = useModal()
    const { Table, selected } = useTable(animals, columns)

    useEffect(() => {
        const fetch = async () => {
            const { data: init } = await api.get('animal')
            listAnimals(init.results)
        }
        fetch()
    }, [])

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
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <BreadCrumbs />
                <div className="content-body">
                    <section className="invoice-list-wrapper">
                        <PageHeaderActions title='Add Animal' onAdd={toggle} onExport='animal' />
                        <TableHeaderActions options={animalOptions} filters={animalFilters} />
                        <Table />
                    </section>
                    <Modal actionless title='Add Animal' onClose={toggle}>
                        <AddorEditAnimal onClose={toggle} onSubmit={onSubmit} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ animals }) => ({ animals })

const mapDispathToProps = dispatch => ({
    listAnimals: (animals) => dispatch(listAnimals({ animals }))
})

export const AnimalsPage = connect(mapStateToProps, mapDispathToProps)(AnimalsPageRaw)
