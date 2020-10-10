import React, {
    useEffect
} from 'react'
import { Select } from '../atoms/Select'
import { Input } from '../atoms/Input'
import { invoiceTypeOptions, INVENTORY, LIVESTOCK } from '../../dictionary'
import { FieldArray } from 'redux-form'

const InvoiceItem = ({ fields, meta: { error }, animals, inventory, formValues, changeFieldValue }) => {
    const { invoice_items } = formValues || {}

    return (
        <div>
            {fields.map((field, i) => {
                const { type, cost, quantity, item } = invoice_items && invoice_items[i] || {}
                const found = inventory.find(x => x.id === item)
                const itemSelection = type === INVENTORY ? inventory : animals
                const total = Number.isNaN((cost * quantity)) ? 0 : (cost * quantity).toFixed(2)

                const render = (option) => {
                    const { id, type, tag_number, name, tank_number } = option || {}
                    const value = type ? `${name} (Tag#${tag_number})` : `Tank#(${tank_number})`
                    return <option key={id} value={id}>{value}</option>
                }

                if (type === INVENTORY) {
                    if (found) {
                        changeFieldValue(found.cost, i, 'cost')
                    }
                }

                if (quantity > found?.units) {
                    changeFieldValue(found?.units, i, 'quantity')
                }

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
                                    <Select options={itemSelection} name={`${field}.item`} render={render} />
                                </div>
                                <div className="col-md-2 col-12 form-group">
                                    <Input name={`${field}.cost`} type='number' disabled={type === INVENTORY} />
                                </div>
                                <div className="col-md-2 col-12 form-group">
                                    <Input name={`${field}.quantity`} type='number' className='' />
                                    <strong>{found && `*${found.units} available`}</strong>
                                </div>
                                <div className="col-md-2 col-12 form-group">
                                    <label className="d-md-none">Price</label>
                                    <strong className="text-primary align-middle">${total}*</strong>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
}

export const InvoiceItemCreator = ({ initialize, inventory, animals, invoiceItems, formValues, changeFieldValue }) => {

    useEffect(() => {
        if (invoiceItems.length) {
            const mapToForm = ({ type, cost, quantity, id }) => ({
                type: type ? type === LIVESTOCK : INVENTORY,
                cost,
                quantity,
                item: id
            })
            const invoice_items = invoiceItems.map(mapToForm)
            console.log('ITEMS', invoice_items)
            initialize({ invoice_items })
        } else {
            initialize({ invoice_items: [{ type: INVENTORY }] })
        }

    }, [])

    return (
        <div data-repeater-list="group-b">
            <FieldArray
                name='invoice_items'
                component={InvoiceItem}
                inventory={inventory}
                animals={animals}
                formValues={formValues}
                invoiceItems={invoiceItems}
                changeFieldValue={changeFieldValue}
            />
        </div>
    )
}

