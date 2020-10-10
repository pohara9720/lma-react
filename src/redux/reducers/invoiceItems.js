import { SET_INVOICE_ITEMS } from '../types'

export const invoiceItemReducer = (state = [], { type, payload }) => {
    switch (type) {
        case SET_INVOICE_ITEMS:
            return payload.invoiceItems
        default:
            return state
    }
}
