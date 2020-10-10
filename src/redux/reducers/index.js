import { combineReducers } from "redux";
import { animalReducer } from "./animals";
import { companyReducer } from "./company";
import { userReducer, activeUserReducer, registeredUserReducer } from "./users";
import { inventoryReducer } from "./inventory";
import { reducer as form } from 'redux-form';
import { taskReducer } from "./tasks";
import { saleReducer } from "./sales";
import { invoiceItemReducer } from "./invoiceItems";

export const initState = {
    animals: [],
    company: null,
    users: [],
    activeUser: null,
    registeredUser: null,
    inventory: [],
    tasks: [],
    sales: [],
    invoiceItems: []
}

export const rootReducer = combineReducers({
    animals: animalReducer,
    company: companyReducer,
    users: userReducer,
    activeUser: activeUserReducer,
    inventory: inventoryReducer,
    tasks: taskReducer,
    sales: saleReducer,
    registeredUser: registeredUserReducer,
    invoiceItems: invoiceItemReducer,
    form
});


