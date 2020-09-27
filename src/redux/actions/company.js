import { LOAD_COMPANY } from '../types'

export const loadCompany = ({ company }) => ({
    type: LOAD_COMPANY,
    payload: company
});