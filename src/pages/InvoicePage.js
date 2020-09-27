import React from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { InvoiceActions } from '../components/atoms/InvoiceActions'
import logo from '../app-assets/images/logo/logo.png'

export const InvoicePage = () => {
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
                                                    <span>000756</span>
                                                </div>
                                                <div className="col-xl-8 col-md-12">
                                                    <div className="d-flex align-items-center justify-content-xl-end flex-wrap">
                                                        <div className="mr-3">
                                                            <small className="text-muted">Date Issue:</small>
                                                            <span>08/10/2019</span>
                                                        </div>
                                                        <div>
                                                            <small className="text-muted">Date Due:</small>
                                                            <span>08/10/2019</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row my-3">
                                                <div className="col-6">
                                                    <h4 className="text-primary">Invoice</h4>
                                                    <span>Cattle</span>
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
                                                        <span>Clevision PVT. LTD.</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>9205 Whitemarsh Street New York, NY 10002</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>hello@clevision.net</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>601-678-8022</span>
                                                    </div>
                                                </div>
                                                <div className="col-6 mt-1">
                                                    <h6 className="invoice-to">Bill To</h6>
                                                    <div className="mb-1">
                                                        <span>Pixinvent PVT. LTD.</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>203 Sussex St. Suite B Waukegan, IL 60085</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>pixinvent@gmail.com</span>
                                                    </div>
                                                    <div className="mb-1">
                                                        <span>987-352-5603</span>
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
                                                    <tr>
                                                        <td>Livestock</td>
                                                        <td>TAG 554</td>
                                                        <td>Cows</td>
                                                        <td>2,500</td>
                                                        <td>1</td>
                                                        <td className="text-primary text-right font-weight-bold">$5,000.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Inventory</td>
                                                        <td>395</td>
                                                        <td>Embryo</td>
                                                        <td>1,250</td>
                                                        <td>4</td>
                                                        <td className="text-primary text-right font-weight-bold">$6,250.00</td>
                                                    </tr>
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
                                                            <span className="invoice-title">Subtotal</span>
                                                            <span className="invoice-value">$ 11,250.00</span>
                                                        </div>
                                                        <hr />
                                                        <div className="invoice-calc d-flex justify-content-between">
                                                            <span className="invoice-title">Invoice Total</span>
                                                            <span className="invoice-value">$ 10,000.00</span>
                                                        </div>
                                                        <div className="invoice-calc d-flex justify-content-between">
                                                            <span className="invoice-title">Balance (USD)</span>
                                                            <span className="invoice-value">$ 10,000.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <InvoiceActions onDownload={() => console.log('download')} onSend={() => console.log('send email')} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}