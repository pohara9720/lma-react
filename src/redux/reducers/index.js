import { combineReducers } from "redux";
import { animalReducer } from "./animals";
import { companyReducer } from "./company";
import { reducer as form } from 'redux-form';

export const initState = {
    animals: [],
    company: null
}

export const rootReducer = combineReducers({
    animals: animalReducer,
    company: companyReducer,
    form
});


