import React, { useEffect } from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { PageHeaderActions } from '../components/molecules/PageHeaderActions'
import { withRouter, Link } from 'react-router-dom'
import { TableHeaderActions } from '../components/molecules/TableHeaderActions'
import { invoiceFilters, invoiceOptions, UNPAID } from '../dictionary'
import { compose } from 'recompose'
import { useTable } from '../hooks/useTable'
import { StatusBubble } from '../components/atoms/StatusBubble'
import { api } from '../helpers/api'
import { loadSales } from '../redux/actions/sales'
import { connect } from 'react-redux'
import { compare, readDate, displayToast } from '../helpers/index'
import { PageWrapper } from '../components/atoms/PageWrapper'

export const SalesPageRaw = ({ history, match, sales, loadSales }) => {
    const columns = [
        {
            label: 'Invoice #',
            name: 'number',
            render: (({ id, number }) => <Link to={`sales/${id}`}> {number}</Link>)
        },
        {
            label: 'Amount due (USD)',
            name: 'total',
            render: (({ total }) => total.toFixed(2))
        },
        {
            label: 'Date',
            name: 'due_date',
            render: (({ due_date }) => readDate(due_date))
        },
        {
            label: 'Customer',
            name: 'bill_to_name',
        },
        {
            label: '# of Items',
            name: 'items',
            render: (({ items }) => items.length)
        },
        {
            label: 'Status',
            name: 'status',
            render: (({ status }) => <StatusBubble status={status} color={status === 'PAID' ? 'success' : 'danger'} />)
        },
    ]

    const fetch = async () => {
        const { data: init } = await api.get(`sale/?page=${page}`)
        loadSales(init)
    }

    const { Table, selected, page, clear } = useTable(sales, columns)

    const searchConfig = {
        entity: 'sale',
        setter: loadSales
    }

    const onSend = async () => {
        try {
            const invoices = compare(selected, sales?.results).map(({ email, id }) => ({ id, email }))
            await api.post('sale/resend_invoices/', { invoices })
            displayToast({ success: true })
        } catch (error) {

        }
    }

    const onDelete = async () => {
        if (!selected.length) {
            return null
        } else {
            await api.post('sale/batch_delete/', { sales: selected })
            fetch()
        }
    }

    const onPaid = async () => {
        try {
            const invoices = compare(selected, sales?.results).filter(({ status }) => status === UNPAID)
            if (invoices.length) {
                const ids = invoices.map(({ id }) => id)
                await api.post('sale/change_to_paid/', { invoices: ids })
                const { data: init } = await api.get(`sale/?page=${page}`)
                loadSales(init)
            }
            clear()
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }

    useEffect(() => {
        fetch()
    }, [page])

    return (
        <PageWrapper>
            <BreadCrumbs />
            <div className="content-body">
                <section className="invoice-list-wrapper">
                    <PageHeaderActions title='Create Sale' onAdd={() => history.push(`${match.url}/manage-invoice`)} onExport='sale' />
                    <TableHeaderActions searchConfig={searchConfig} options={invoiceOptions(onSend, onPaid, onDelete)} filters={invoiceFilters(loadSales)} closeOnly />
                    <Table />
                </section>
            </div>
        </PageWrapper>
    )
}

const mapStateToProps = ({ sales }) => ({ sales })

const mapDispatchToProps = dispatch => ({
    loadSales: (sales) => dispatch(loadSales({ sales }))
})

export const SalesPage = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(SalesPageRaw)