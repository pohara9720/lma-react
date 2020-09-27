import { GET_ANIMAL_LIST } from '../types'

export const listAnimals = ({ animals }) => ({
    type: GET_ANIMAL_LIST,
    payload: { animals }
});