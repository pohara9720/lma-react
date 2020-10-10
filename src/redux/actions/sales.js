import { LOAD_SALES } from '../types'

export const loadSales = ({ sales }) => ({
    type: LOAD_SALES,
    payload: { sales }
});