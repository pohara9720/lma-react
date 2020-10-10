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
import { setInvoiceItems } from '../redux/actions/invoiceItems'
import { compare } from '../helpers/index'
import { PageWrapper } from '../components/atoms/PageWrapper'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

const columns = [
    {
        label: 'Top Id',
        name: 'top_id'
    },
    {
        label: 'Sire',
        name: 'father',
        render: (({ father }) => father ? <div>{`${father.name} (Tag# ${father.tag_number})`}</div> : 'N/A')
    },
    {
        label: 'Dam',
        name: 'mother',
        render: (({ mother }) => mother ? <div>{`${mother.name} (Tag# ${mother.tag_number})`}</div> : 'N/A')
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

export const InventoryPageRaw = ({ inventory, loadInventory, setInvoiceItems, history }) => {
    const { Modal, toggle } = useModal()
    const { selected, Table } = useTable(inventory, columns)

    const searchConfig = {
        entity: 'inventory',
        keys: ['top_id', 'tank_number'],
        setter: loadInventory
    }

    useEffect(() => {
        const fetch = async () => {
            const { data: init } = await api.get('inventory')
            loadInventory(init)
        }
        fetch()
    }, [])

    const onCreateSale = () => {
        const items = compare(selected, inventory)
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
        const { data } = await api.post('inventory/', values)
        loadInventory([data, ...inventory])
        toggle()
    }

    return (
        <PageWrapper>
            <BreadCrumbs />
            <div className="content-body">
                <section className="invoice-list-wrapper">
                    <PageHeaderActions title='Add Inventory' onAdd={toggle} onExport='inventory' />
                    <TableHeaderActions searchConfig={searchConfig} options={inventoryOptions(onCreateSale, onAssign, onDelete)} filters={inventoryFilters(loadInventory)} />
                    <Table />
                </section>
                <Modal actionless title='Add Inventory' onClose={toggle}>
                    <AddorEditInventory onClose={toggle} onSubmit={onSubmit} />
                </Modal>
            </div>
        </PageWrapper>
    )
}

const mapStateToProps = ({ inventory }) => ({ inventory })
const mapDispatchToProps = dispatch => ({
    loadInventory: (inventory) => dispatch(loadInventory({ inventory })),
    setInvoiceItems: (invoiceItems) => dispatch(setInvoiceItems({ invoiceItems }))
})


export const InventoryPage = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(InventoryPageRaw)