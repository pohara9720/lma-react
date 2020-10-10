import { SET_INVOICE_ITEMS } from '../types'

export const setInvoiceItems = ({ invoiceItems }) => ({
    type: SET_INVOICE_ITEMS,
    payload: { invoiceItems }
});