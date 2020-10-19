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
import { compare, displayToast } from '../helpers/index'
import { PageWrapper } from '../components/atoms/PageWrapper'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { setTaskItems, setTaskModal } from '../redux/actions/tasks'
import { setEditInventory } from '../redux/actions/inventory'

export const InventoryPageRaw = ({
    inventory,
    loadInventory,
    setInvoiceItems,
    history,
    setTaskItems,
    setTaskModal,
    setEditInventory
}) => {
    const { Modal, toggle } = useModal()

    const columns = [
        {
            label: '',
            name: 'id',
            render: ((item) =>
                <div onClick={() => {
                    toggle()
                    setEditInventory(item)
                }} style={{ cursor: 'pointer' }}>
                    <i className='bx bx-edit' />
                </div>)
        },
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
            label: '# of Units',
            name: 'units',
            render: (({ units }) => units.toString())
        },
        {
            label: 'Category',
            name: 'category',
            render: (({ category }) => <BulletLabel label={category} />)
        },
    ]

    const { selected, Table, page } = useTable(inventory, columns)

    const searchConfig = {
        entity: 'inventory',
        setter: loadInventory
    }

    useEffect(() => {
        const fetch = async () => {
            const { data: init } = await api.get(`inventory/?page=${page}`)
            loadInventory(init)
        }
        fetch()
    }, [page])

    const onCreateSale = () => {
        const items = compare(selected, inventory.results)
        setInvoiceItems(items)
        history.push('/sales/manage-invoice')
    }

    const onAssign = () => {
        const items = compare(selected, inventory.results)
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
            const { data } = await api.post('inventory/', values)
            const { results, ...rest } = inventory
            loadInventory({
                results: [data, ...results],
                ...rest
            })
            toggle()
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }

    }

    const onEdit = async (values, id) => {
        try {
            const { data } = await api.patch(`inventory/${id}/`, values)
            const { results, ...rest } = inventory
            const updated = results.filter(x => x.id !== id)
            loadInventory({
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
        setEditInventory(null)
    }

    return (
        <PageWrapper>
            <BreadCrumbs />
            <div className="content-body">
                <section className="invoice-list-wrapper">
                    <PageHeaderActions title='Add Inventory' onAdd={toggle} onExport='inventory' onImport='inventory' />
                    <TableHeaderActions searchConfig={searchConfig} options={inventoryOptions(onCreateSale, onAssign, onDelete)} filters={inventoryFilters(loadInventory)} />
                    <Table />
                </section>
                <Modal actionless title='Add Inventory' onClose={onClose}>
                    <AddorEditInventory onClose={onClose} onSubmit={onSubmit} onEdit={onEdit} />
                </Modal>
            </div>
        </PageWrapper>
    )
}

const mapStateToProps = ({ inventory }) => ({ inventory })

const mapDispatchToProps = dispatch => ({
    loadInventory: (inventory) => dispatch(loadInventory({ inventory })),
    setInvoiceItems: (invoiceItems) => dispatch(setInvoiceItems({ invoiceItems })),
    setTaskItems: (taskItems) => dispatch(setTaskItems({ taskItems })),
    setTaskModal: (boolean) => dispatch(setTaskModal(boolean)),
    setEditInventory: (inventory) => dispatch(setEditInventory({ inventory }))
})


export const InventoryPage = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(InventoryPageRaw)