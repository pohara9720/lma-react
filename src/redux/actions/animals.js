import { GET_ANIMAL_LIST, EDIT_ANIMAL } from '../types'

export const listAnimals = ({ animals }) => ({
    type: GET_ANIMAL_LIST,
    payload: { animals }
});

export const setEditAnimal = ({ animal }) => ({
    type: EDIT_ANIMAL,
    payload: { animal }
});