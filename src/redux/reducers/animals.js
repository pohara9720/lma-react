import { GET_ANIMAL_LIST } from '../types'

export const animalReducer = (state = [], { type, payload }) => {
    switch (type) {
        case GET_ANIMAL_LIST:
            return payload.animals
        default:
            return state
    }
}
