import { combineReducers } from "redux";
import { animalReducer } from "./animals";
import { companyReducer } from "./company";
import { userReducer } from "./users";
import { reducer as form } from 'redux-form';

export const initState = {
    animals: [],
    company: null,
    users: []
}

export const rootReducer = combineReducers({
    animals: animalReducer,
    company: companyReducer,
    users: userReducer,
    form
});


