import React from 'react'
import { BreadCrumbs } from '../components/molecules/BreadCrumbs'
import { InvoiceActions } from '../components/atoms/InvoiceActions'
import logo from '../app-assets/images/logo/logo.png'
import { InvoiceItemCreator } from '../components/molecules/InvoiceItemCreator'
import { Input } from '../components/atoms/Input'
import { TextArea } from '../components/atoms/TextArea'
import { reduxForm } from 'redux-form'
import * as yup from 'yup'
import { validator } from '../helpers/validator'

const schema = yup.object().shape({

})


export const AddorEditInvoicePageRaw = ({ initialize }) => {
    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <BreadCrumbs title='Invoice' />
                <div className="content-body">
                    <section className="invoice-edit-wrapper">
                        <div className="row">
                            <div className="col-xl-9 col-md-8 col-12">
                                <div className="card border">
                                    <div className="card-content">
                                        <div className="card-body pb-0 mx-25">
                                            <div className="row mx-0">
                                                <div className="col-xl-4 col-md-12 d-flex align-items-center pl-0">
                                                    <Input label='Invoice #' name="number" id="invoice-form-number" placeholder="Invoice #" />
                                                </div>
                                                <div className="col-xl-8 col-md-12 px-0 pt-xl-0 pt-1">
                                                    <div className="invoice-date-picker d-flex align-items-center justify-content-xl-end flex-wrap">
                                                        <div className="d-flex align-items-center">
                                                            <Input label='Date Issued' type='date' name="issue_date" id="invoice-form-issued" />
                                                        </div>
                                                        <div className="d-flex align-items-center" style={{ marginLeft: 16 }}>
                                                            <Input label='Date Due' type='date' name="due_date" id="invoice-form-due" />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row my-2 py-50">
                                                <div className="col-sm-6 col-12 order-2 order-sm-1">
                                                    <h4 className="text-primary">Invoice</h4>
                                                    <Input name="title" id="invoice-form-title" />
                                                </div>
                                                <div className="col-sm-6 col-12 order-1 order-sm-1 d-flex justify-content-end">
                                                    <img src={logo} alt="logo" height="46" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row invoice-info">
                                                <div className="col-lg-6 col-md-12 mt-25">
                                                    <h6 className="invoice-to">Bill To</h6>
                                                    <fieldset className="invoice-address form-group">
                                                        <Input name="bill_to_name" id="invoice-form-name" placeholder='Name' />
                                                    </fieldset>
                                                    <fieldset className="invoice-address form-group">
                                                        <TextArea name='bill_to_address' rows="4" placeholder='Address' />
                                                    </fieldset>
                                                    <fieldset className="invoice-address form-group">
                                                        <Input name="bill_to_email" type='email' id="invoice-form-email" placeholder='Email' />
                                                    </fieldset>
                                                    <fieldset className="invoice-address form-group">
                                                        <Input type='number' name="phone" id="invoice-form-phone" placeholder='Phone' />
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                        <div className="card-body pt-50">
                                            <div className="invoice-product-details ">
                                                <form className="form invoice-item-repeater">
                                                    <InvoiceItemCreator initialize={initialize} />
                                                </form>
                                            </div>
                                            <hr />
                                            <div className="invoice-subtotal pt-50">
                                                <div className="row">
                                                    {/* <div className="col-md-5 col-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" value="Partial Payment" disabled />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" value="Happy to give you a 10% discount." disabled />
                                                        </div>
                                                    </div> */}
                                                    <div className="col-lg-12 col-md-12 offset-lg-12 col-12">
                                                        <ul className="list-group list-group-flush">
                                                            <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                <span className="invoice-subtotal-title">Subtotal</span>
                                                                <h6 className="invoice-subtotal-value mb-0">$72.00</h6>
                                                            </li>
                                                            <li className="list-group-item py-0 border-0 mt-25">
                                                                <hr />
                                                            </li>
                                                            <li className="list-group-item d-flex justify-content-between border-0 py-0">
                                                                <span className="invoice-subtotal-title">Invoice Total</span>
                                                                <h6 className="invoice-subtotal-value mb-0">$ 61.40</h6>
                                                            </li>
                                                            <li className="list-group-item d-flex justify-content-between border-0 pb-0">
                                                                <span className="invoice-subtotal-title">Balance (USD)</span>
                                                                <h6 className="invoice-subtotal-value mb-0">$ 10,953</h6>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <InvoiceActions onSave={() => console.log('save')} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export const AddorEditInvoicePage = reduxForm({ form: 'invoiceForm', asyncValidate: validator(schema) })(AddorEditInvoicePageRaw)