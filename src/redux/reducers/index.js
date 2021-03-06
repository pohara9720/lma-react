import { combineReducers } from "redux";
import { animalReducer, editAnimalReducer } from "./animals";
import { companyReducer } from "./company";
import { userReducer, activeUserReducer, registeredUserReducer } from "./users";
import { inventoryReducer, editInventoryReducer } from "./inventory";
import { reducer as form } from 'redux-form';
import { taskReducer, taskModalReducer, taskItemReducer, editTaskReducer } from "./tasks";
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
    invoiceItems: [],
    taskModalOpen: false,
    taskItems: [],
    editAnimal: null,
    editInventory: null,
    editTask: null
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
    taskModalOpen: taskModalReducer,
    taskItems: taskItemReducer,
    editAnimal: editAnimalReducer,
    editInventory: editInventoryReducer,
    editTask: editTaskReducer,
    form
});


