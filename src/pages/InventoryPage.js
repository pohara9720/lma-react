import React, { useEffect } from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { useModal } from '../hooks/useModal'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { AddorEditInventory } from '../components/organisms/AddorEditInventory'
import { TableHeaderActions } from '../components/molecules/TableHeaderActions'
import { inventoryFilters, inventoryOptions } from '../dictionary'
import { connect } from 'react-redux'
import { useTable } from '../hooks/useTable'
import { loadInventory } from '../redux/actions/inventory'
import { api } from '../helpers/api'
import { BulletLabel } from '../components/atoms/BulletLabel'

const columns = [
    {
        label: 'Top Id',
        name: 'top_id'
    },
    {
        label: 'Sire',
        name: 'father',
        render: (({ father: { tag_number, name } }) => <div>{`${name} (Tag# ${tag_number})`}</div>)
    },
    {
        label: 'Dam',
        name: 'mother',
        render: (({ mother: { tag_number, name } }) => <div>{`${name} (Tag# ${tag_number})`}</div>)
    },
    {
        label: 'Tank #',
        name: 'tank',
        render: (({ tank_number }) => tank_number.toString())

    },
    {
        label: 'Canister #',
        name: 'canister',
        render: (({ canister_number }) => canister_number.toString())
    },
    {
        label: 'Category',
        name: 'category',
        render: (({ category }) => <BulletLabel label={category} />)
    },
]

export const InventoryPageRaw = ({ inventory, loadInventory }) => {
    const { Modal, toggle } = useModal()
    const { selected, Table } = useTable(inventory, columns)

    useEffect(() => {
        const fetch = async () => {
            const { data: init } = await api.get('inventory')
            loadInventory(init)
        }
        fetch()
    }, [])

    const onSubmit = async values => {
        const { data } = await api.post('inventory/', values)
        loadInventory([data, ...inventory])
        toggle()
    }

    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <BreadCrumbs />
                <div className="content-body">
                    <section className="invoice-list-wrapper">
                        <PageHeaderActions title='Add Inventory' onAdd={toggle} onExport='inventory' />
                        <TableHeaderActions options={inventoryOptions} filters={inventoryFilters} />
                        <Table />
                    </section>
                    <Modal actionless title='Add Inventory' onClose={toggle}>
                        <AddorEditInventory onClose={toggle} onSubmit={onSubmit} />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ inventory }) => ({ inventory })
const mapDispatchToProps = dispatch => ({
    loadInventory: (inventory) => dispatch(loadInventory({ inventory }))
})


export const InventoryPage = connect(mapStateToProps, mapDispatchToProps)(InventoryPageRaw)