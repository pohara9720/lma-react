import React from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { InvoiceActions } from '../components/atoms/InvoiceActions'
import logo from '../app-assets/images/logo/logo.png'
import { withRouter } from 'react-router-dom'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { useFetch } from '../hooks/useFetch'
import { Loading } from '../components/atoms/Loading'
import { readDate, displayToast } from '../helpers/index'
import { api } from '../helpers/api'
import { StatusBubble } from '../components/atoms/StatusBubble'


export const InvoicePageRaw = ({ company, id }) => {
    const { data, loading, error } = useFetch(`/sale/${id}`)

    if (loading) return <Loading />
    if (error) throw error

    const { bill_to_name, bill_to_address, phone, number, email: bill_to_email, issue_date, due_date, items, status, title, total } = data || {}
    const { name, email, address } = company || {}
    const { street, city, state, zipcode } = address || {}

    const onSend = async () => {
        try {
            await api.post('sale/resend_invoices/', { invoices: [{ email: bill_to_email, id }] })
            displayToast({ success: true })
        } catch (error) {
            displayToast({ error: true })
        }
    }

    const onDownload = async () => {
        try {
            const { data } = await api.get(`sale/${id}/download_invoice/`)
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${number}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
            displayToast({ success: true })
        } catch (error) {
            console.log(error)
            displayToast({ error: true })
        }
    }

    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <BreadCrumbs title='Invoice' />
                <div className="content-body">
                    <section className="invoice-view-wrapper">
                        <div className="row">
                            <div className="col-xl-9 col-md-8 col-12">
                                <div className="card border">
                                    <div className="card-content">
                                        <div className="card-body pb-0 mx-25">
                                            <div className="row">
                                                <div className="col-xl-4 col-md-12">
                                                    <span className="invoice-number mr-50">Invoice#</span>
                                                    <span>{number}</span>
                                                </div>
                                                <div className="col-xl-8 col-md-12">
                                                    <div className="d-flex align-items-center justify-content-xl-end flex-wrap">
                                                        <div className="mr-3">
                                                            <small className="text-muted">Date Issue:</small>
                                                            <span>{readDate(issue_date)}</span>
                                                        </div>
                                                        <div>
                                                            <small className="text-muted">Date Due:</small>
                                                            <span>{readDate(due_date)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row my-3">
                                                <div className="col-6">
                                                    <h4 className="text-primary">Invoice</h4>
                                                    <span>{title}</span>
                                                </div>
                                                <div className="col-6 d-flex justify-content-end">
                                                    <img src={logo} alt="logo" height="46" />
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="row invoice-info">
                                                <div className="col-6 mt-1">
                                                    <h6 className="invoice-from">Bill From</h6>
                                                    <div className="mb-1">
                                                        <span>{name}</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>{street} {city}, {state} {zipcode}</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>{email}</span>
                                                    </div>
                                                </div>
                                                <div className="col-6 mt-1">
                                                    <h6 className="invoice-to">Bill To</h6>
                                                    <div className="mb-1">
                                                        <span>{bill_to_name}</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>{bill_to_address}</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>{bill_to_email}</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>{phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                        <div className="invoice-product-details table-responsive mx-md-25">
                                            <table className="table table-borderless mb-0">
                                                <thead>
                                                    <tr className="border-0">
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Item</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Cost</th>
                                                        <th scope="col">Qty</th>
                                                        <th scope="col" className="text-right">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        items && items.map(({ type, cost, description, inventory, animal, quantity }, i) =>
                                                            <tr key={i}>
                                                                <td>{type}</td>
                                                                <td>{animal ? `${animal.name} (${animal.tag_number})` : `Tank# ${inventory.tank_number}`}</td>
                                                                <td>{description}</td>
                                                                <td>${cost.toFixed(2)}</td>
                                                                <td>{quantity}</td>
                                                                <td className="text-primary text-right font-weight-bold">${(quantity * cost).toFixed(2)}</td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card-body pt-0 mx-25">
                                            <hr />
                                            <div className="row">
                                                <div className="col-4 col-sm-6 mt-75 invoice-footer">
                                                    <div className="row d-flex">
                                                        <div className="col-12">
                                                            <p>Thanks for your business.</p>
                                                        </div>
                                                        <div className="col-12 align-self-end">
                                                            <p>Created using Livestock Manager, LLC.at livestockmanagerapp.com.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8 col-sm-6 d-flex justify-content-end mt-75">
                                                    <div className="invoice-subtotal">
                                                        <div className="invoice-calc d-flex justify-content-between">
                                                            <span className="invoice-title">Status</span>
                                                            <span className="invoice-value"><StatusBubble status={status} color={status === 'PAID' ? 'success' : 'danger'} /></span>
                                                        </div>
                                                        <hr />
                                                        <div className="invoice-calc d-flex justify-content-between">
                                                            <span className="invoice-title">Invoice Total</span>
                                                            <span className="invoice-value">${total?.toFixed(2)}</span>
                                                        </div>
                                                        <div className="invoice-calc d-flex justify-content-between">
                                                            <span className="invoice-title">Balance (USD)</span>
                                                            <span className="invoice-value">${total?.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <InvoiceActions onDownload={onDownload} onSend={onSend} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ company }) => ({ company })

export const InvoicePage = compose(
    withRouter,
    withProps(({ match }) => ({
        id: match.params.invoiceId
    })),
    connect(mapStateToProps, null),
)(InvoicePageRaw)