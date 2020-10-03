import { combineReducers } from "redux";
import { animalReducer } from "./animals";
import { companyReducer } from "./company";
import { userReducer, activeUserReducer } from "./users";
import { reducer as form } from 'redux-form';

export const initState = {
    animals: [],
    company: null,
    users: [],
    activeUser: null
}

export const rootReducer = combineReducers({
    animals: animalReducer,
    company: companyReducer,
    users: userReducer,
    activeUser: activeUserReducer,
    form
});


