import React, {
    useEffect
} from 'react'
import { Select } from '../atoms/Select'
import { Input } from '../atoms/Input'
import { invoiceTypeOptions, invoiceItemOptions } from '../../dictionary'
import { FieldArray } from 'redux-form'

const InvoiceItem = ({ fields }) => (
    <div>
        {fields.map((field, i) => {
            return (
                <div data-repeater-item key={i}>
                    <div className="row mb-50 px-2">
                        <div className="d-none d-sm-block col-md-3 invoice-item-title">Type</div>
                        <div className="d-none d-sm-block col-md-3 invoice-item-title">Item</div>
                        <div className="d-none d-sm-block col-md-2 invoice-item-title">Cost</div>
                        <div className="d-none d-sm-block col-md-2 invoice-item-title">Qty</div>
                        <div className="d-none d-sm-block col-md-2 invoice-item-title">Price</div>
                    </div>
                    <div className="invoice-item d-flex border rounded mb-1">
                        <div className="invoice-item-filed row flex-grow-1 pt-1 px-1">
                            <div className="col-md-3 col-12 form-group">
                                <Select options={invoiceTypeOptions} name={`${field}.type`} />
                            </div>
                            <div className="col-md-3 col-12 form-group">
                                <Select options={invoiceItemOptions} name={`${field}.item`} />
                            </div>
                            <div className="col-md-2 col-12 form-group">
                                <Input name={`${field}.cost`} type='number' />
                            </div>
                            <div className="col-md-2 col-12 form-group">
                                <Input name={`${field}.quantity`} type='number' />
                            </div>
                            <div className="col-md-2 col-12 form-group">
                                <label className="d-md-none">Price</label>
                                <strong className="text-primary align-middle">$24.00*</strong>
                            </div>
                            <div className="col-md-4 col-12 form-group">
                                <Input name={`${field}.description`} placeholder='Small Description' />
                            </div>
                        </div>
                        <div className="invoice-icon flex-column border-left p-25">
                            <span onClick={() => fields.remove(i)} className="invoice-item-delete cursor-pointer" data-repeater-delete>
                                <i className="bx bx-x"></i>
                            </span>
                        </div>
                    </div>
                </div>
            )
        }
        )}
        <div className="form-group">
            <div className="col p-0">
                <button onClick={() => fields.push()} className="btn btn-light-primary btn-sm" data-repeater-create type="button">
                    <i className="bx bx-plus"></i>
                    <span className="invoice-repeat-btn">Add Item</span>
                </button>
            </div>
        </div>
    </div>
)

export const InvoiceItemCreator = ({ initialize }) => {
    useEffect(() => {
        initialize({ invoice_items: [{}] })
    }, [])
    return (
        <div data-repeater-list="group-b">
            <FieldArray name='invoice_items' component={InvoiceItem} />
        </div>
    )
}

