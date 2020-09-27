import React from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { useModal } from '../hooks/useModal'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { AddorEditInventory } from '../components/organisms/AddorEditInventory'
import { TableHeaderActions } from '../components/molecules/TableHeaderActions'
import { inventoryFilters, inventoryOptions } from '../dictionary'
import { withInventory } from '../hoc/withInventory'
import { useTable } from '../hooks/useTable'

const columns = [
    {
        label: 'Top Id',
        name: 'top_id'
    },
    {
        label: 'Sire',
        name: 'sire',
    },
    {
        label: 'Dam',
        name: 'dam'
    },
    {
        label: 'Tank #',
        name: 'tank',

    },
    {
        label: 'Canister #',
        name: 'canister',
    },
]

export const InventoryPageRaw = ({ inventory }) => {
    const { Modal, toggle } = useModal()
    const { selected, Table } = useTable(inventory, columns)
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
                    <Modal title='Add Inventory' onClose={toggle} onSubmit={() => console.log('implements')}>
                        <AddorEditInventory />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export const InventoryPage = withInventory(InventoryPageRaw)