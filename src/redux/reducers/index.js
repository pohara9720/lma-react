import { combineReducers } from "redux";
import { animalReducer } from "./animals";
import { companyReducer } from "./company";
import { userReducer, activeUserReducer } from "./users";
import { inventoryReducer } from "./inventory";
import { reducer as form } from 'redux-form';
import { taskReducer } from "./tasks";

export const initState = {
    animals: [],
    company: null,
    users: [],
    activeUser: null,
    inventory: [],
    tasks: []
}

export const rootReducer = combineReducers({
    animals: animalReducer,
    company: companyReducer,
    users: userReducer,
    activeUser: activeUserReducer,
    inventory: inventoryReducer,
    tasks: taskReducer,
    form
});


