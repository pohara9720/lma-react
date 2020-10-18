import { LOAD_INVENTORY, EDIT_INVENTORY } from '../types'

export const loadInventory = ({ inventory }) => ({
    type: LOAD_INVENTORY,
    payload: { inventory }
});

export const setEditInventory = ({ inventory }) => ({
    type: EDIT_INVENTORY,
    payload: { inventory }
});