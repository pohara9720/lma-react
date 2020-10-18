import { GET_ANIMAL_LIST, EDIT_ANIMAL } from '../types'

export const animalReducer = (state = [], { type, payload }) => {
    switch (type) {
        case GET_ANIMAL_LIST:
            return payload.animals
        default:
            return state
    }
}

export const editAnimalReducer = (state = [], { type, payload }) => {
    switch (type) {
        case EDIT_ANIMAL:
            return payload.animal
        default:
            return state
    }
}