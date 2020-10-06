import { LOAD_INVENTORY } from '../types'

export const loadInventory = ({ inventory }) => ({
    type: LOAD_INVENTORY,
    payload: { inventory }
});