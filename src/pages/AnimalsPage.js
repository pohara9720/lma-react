import React from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { useModal } from '../hooks/useModal'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { AddorEditAnimal } from '../components/organisms/AddorEditAnimal'
import { useTable } from '../hooks/useTable'
import { TableHeaderActions } from '../components/molecules/TableHeaderActions'
import { animalOptions, animalFilters } from '../dictionary'
import { BulletLabel } from '../components/atoms/BulletLabel'
import { Loading } from '../components/atoms/Loading'
import { useFetch } from '../hooks/useFetch'
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
        label: 'Category',
        name: 'tag_number',
    },
    {
        label: 'Tag #',
        name: 'registration_number',
    },
    {
        label: 'Registration #',
        name: 'dob'
    },
    {
        label: 'Date of Birth',
        name: 'type',
        render: (({ type }) => <BulletLabel label={type} />)
    },

]

export const AnimalsPageRaw = ({ listAnimals }) => {
    const { Modal, toggle } = useModal()
    const { data, loading, error } = useFetch('/animal')
    const { Table, selected } = useTable(data?.results, columns)

    if (loading) return <Loading />
    if (error) throw error

    data && listAnimals(data.results)

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
                    <Modal title='Add Animal' onClose={toggle} onSubmit={() => console.log('implements')}>
                        <AddorEditAnimal />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

const mapDispathToProps = dispatch => ({
    listAnimals: (animals) => dispatch(listAnimals({ animals }))
})

export const AnimalsPage = connect(null, mapDispathToProps)(AnimalsPageRaw)
