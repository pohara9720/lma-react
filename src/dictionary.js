import { listAnimals } from "./redux/actions/animals"
import { api } from './helpers/api'

export const COW = 'COW'
export const CATTLE = 'CATTLE'
export const SHEEP = 'SHEEP'
export const BULL = 'BULL'
export const PIG = 'PIG'
export const GOAT = 'GOAT'
export const HORSE = 'HORSE'
export const HEIFER = 'HEIFER'
export const STEER = 'STEER'
export const MARE = 'MARE'
export const STUD = 'STUD'
export const FILLY = 'FILLY'
export const GELDING = 'GELDING'
export const SOW = 'SOW'
export const BOAR = 'BOAR'
export const GILT = 'GILT'
export const BARROW = 'BARROW'
export const DOE = 'DOE'
export const BUCK = 'BUCK'
export const DOELING = 'DOELING'
export const WETHER = 'WETHER'
export const EWE = 'EWE'
export const RAM = 'RAM'
export const EWE_LAMB = 'EWE_LAMB'
export const BREEDING = 'BREEDING'
export const OTHER = 'OTHER'
export const FEED = 'FEED'
export const HEALTH = 'HEALTH'
export const REPRODUCTION = 'REPRODUCTION'
export const ADMIN_ROLE = 'ADMIN'
export const LMA_AUTH_TOKEN = 'LMA_AUTH_TOKEN'
export const SEMEN = 'SEMEN'
export const EMBRYO = 'EMBRYO'
export const LIVESTOCK = 'LIVESTOCK'
export const INVENTORY = 'INVENTORY'


export const define = (dictionary = [], id) => {
    const found = dictionary.filter(x => x.id === id)
    if (!found) {
        throw new Error('Nothing was found')
    }
    return found.label
}

export const animalFilters = (listAnimals) => {
    const onClick = async (category) => {
        if (category) {
            const { data } = await api.get(`animal/${category}/by_type`)
            listAnimals(data)
        }
        else {
            const { data } = await api.get('animal')
            listAnimals(data?.results)
        }
    }
    return [
        { id: 'ALL_FILTERS', label: 'Filter', onClick: () => onClick() },
        { id: 'ALL_CATTLE', label: 'All Cattle', onClick: () => onClick(CATTLE) },
        { id: 'ALL_SHEEP', label: 'All Sheep', onClick: () => onClick(SHEEP) },
        { id: 'ALL_PIGS', label: 'All Pigs', onClick: () => onClick(PIG) },
        { id: 'ALL_HORSES', label: 'All Horses', onClick: () => onClick(HORSE) },
        { id: 'ALL_GOATS', label: 'All Goats', onClick: () => onClick(GOAT) },
    ]
}


export const animalOptions = (onCreateSale, onAssign, onDelete) => {
    return [
        { id: 'ALL_OPTIONS', label: 'Options', onClick: () => { } },
        { id: 'CREATE_SALE', label: 'Create Sale', onClick: onCreateSale },
        { id: 'ASSIGN_TASKS', label: 'Assign Tasks', onClick: onAssign },
        { id: 'DELETE_ANIMALS', label: 'Delete Animals', onClick: onDelete, isDelete: true },
    ]
}


export const inventoryFilters = (loadInventory) => {
    const onClick = async (category) => {
        if (category) {
            const { data } = await api.get(`inventory/${category}/by_type`)
            loadInventory(data)
        }
        else {
            const { data } = await api.get('inventory')
            loadInventory(data)
        }
    }
    return [
        { id: 'ALL_FILTERS', label: 'Filters', onClick: () => onClick() },
        { id: SEMEN, label: 'Semen', onClick: () => onClick(SEMEN) },
        { id: EMBRYO, label: 'Embryo', onClick: () => onClick(EMBRYO) },
    ]
}

export const inventoryOptions = (onCreateSale, onAssign, onDelete) => {
    return [
        { id: 'ALL_OPTIONS', label: 'Options', onClick: () => { } },
        { id: 'CREATE_SALE', label: 'Create Sale', onClick: onCreateSale },
        { id: 'ASSIGN_TASKS', label: 'Assign Tasks', onClick: onAssign },
        { id: 'DELETE_ANIMALS', label: 'Delete Inventory', onClick: onDelete, isDelete: true },
    ]
}

export const invoiceFilters = [
    { id: 'ALL_FILTERS', label: 'Filters', onClick: () => console.log('Hello') },
    { id: 'DOWNLOADED', label: 'Downloaded', onClick: () => console.log('Hello') },
    { id: 'SENT', label: 'Sent', onClick: () => console.log('Hello') },
    { id: 'PARTIAL_PAYMENT', label: 'Partial Payment', onClick: () => console.log('Hello') },
    { id: 'PAID', label: 'Paid', onClick: () => console.log('Hello') },
]

export const invoiceOptions = [
    { id: 'ALL_OPTIONS', label: 'Options', onClick: () => console.log('Hello') },
    { id: 'SEND', label: 'Assign Tasks', onClick: () => console.log('Hello') },
    { id: 'DELETE', label: 'Delete Inventory', onClick: () => console.log('Hello'), isDelete: true },
]

export const userOptions = [
    { id: 'ALL_OPTIONS', label: 'Options', onClick: () => console.log('Hello') },
    { id: 'SEND', label: 'Assign Task', onClick: () => console.log('Hello') },
    { id: 'DELETE', label: 'Delete Selected', onClick: () => console.log('Hello'), isDelete: true },
]

export const invoiceTypeOptions = [
    { id: LIVESTOCK, label: 'Livestock' },
    { id: INVENTORY, label: 'Inventory' }
]

export const invoiceItemOptions = [
    { id: '1', label: '725', onClick: () => console.log('Hello') },
    { id: '2', label: '829', onClick: () => console.log('Hello') },
    { id: '3', label: '287', onClick: () => console.log('Hello') },
    { id: '4', label: '332', onClick: () => console.log('Hello') },
]

export const taskFilters = [
    { id: 'ALL_FILTERS', label: 'Sort', onClick: () => console.log('Hello') },
    { id: 'ASCENDING', label: 'Ascending', onClick: () => console.log('Hello') },
    { id: 'DESCENDING', label: 'Descending', onClick: () => console.log('Hello') },
]

export const inventoryCategories = [
    { id: 'EMBRYO', 'label': 'Embryo' },
    { id: 'SEMEN', 'label': 'Semen' },
]

export const taskCategories = [
    { id: FEED, 'label': 'Feed' },
    { id: HEALTH, 'label': 'Health' },
    { id: REPRODUCTION, 'label': 'Reproduction' },
    { id: BREEDING, 'label': 'Breeding' },
    { id: OTHER, 'label': 'Other' },
]

export const animalTypes = [
    { id: '', label: '' },
    { id: CATTLE, label: 'Cattle' },
    { id: SHEEP, label: 'Sheep' },
    { id: HORSE, label: 'Horse' },
    { id: PIG, label: 'Pig' },
    { id: GOAT, label: 'Goat' },
]

const cowSubTypes = [
    { id: COW, label: 'Cow' },
    { id: BULL, label: 'Bull' },
    { id: HEIFER, label: 'Heifer' },
    { id: STEER, label: 'Steer' },
]

const horseSubTypes = [
    { id: MARE, label: 'Mare' },
    { id: STUD, label: 'Stud' },
    { id: FILLY, label: 'Filly' },
    { id: GELDING, label: 'Gelding' },
]

const pigSubTypes = [
    { id: SOW, label: 'Sow' },
    { id: BOAR, label: 'Boar' },
    { id: GILT, label: 'Gilt' },
    { id: BARROW, label: 'Barrow' },
]

const goatSubTypes = [
    { id: DOE, label: 'Doe' },
    { id: BUCK, label: 'Buck' },
    { id: DOELING, label: 'Doeling' },
    { id: WETHER, label: 'Wether' },
]

const sheepSubTypes = [
    { id: EWE, label: 'Ewe' },
    { id: RAM, label: 'Ram' },
    { id: EWE_LAMB, label: 'Ewe Lamb' },
    { id: WETHER, label: 'Wether' },
]

export const animalSubTypes = {
    [CATTLE]: cowSubTypes,
    [SHEEP]: sheepSubTypes,
    [HORSE]: horseSubTypes,
    [PIG]: pigSubTypes,
    [GOAT]: goatSubTypes
}

export const states = [
    { id: "AL", label: "Alabama" },
    { id: "AK", label: "Alaska" },
    { id: "AZ", label: "Arizona" },
    { id: "AR", label: "Arkansas" },
    { id: "CA", label: "California" },
    { id: "CO", label: "Colorado" },
    { id: "CT", label: "Connecticut" },
    { id: "DE", label: "Delaware" },
    { id: "DC", label: "District Of Columbia" },
    { id: "FL", label: "Florida" },
    { id: "GA", label: "Georgia" },
    { id: "HI", label: "Hawaii" },
    { id: "ID", label: "Idaho" },
    { id: "IL", label: "Illinois" },
    { id: "IN", label: "Indiana" },
    { id: "IA", label: "Iowa" },
    { id: "KS", label: "Kansas" },
    { id: "KY", label: "Kentucky" },
    { id: "LA", label: "Louisiana" },
    { id: "ME", label: "Maine" },
    { id: "MD", label: "Maryland" },
    { id: "MA", label: "Massachusetts" },
    { id: "MI", label: "Michigan" },
    { id: "MN", label: "Minnesota" },
    { id: "MS", label: "Mississippi" },
    { id: "MO", label: "Missouri" },
    { id: "MT", label: "Montana" },
    { id: "NE", label: "Nebraska" },
    { id: "NV", label: "Nevada" },
    { id: "NH", label: "New Hampshire" },
    { id: "NJ", label: "New Jersey" },
    { id: "NM", label: "New Mexico" },
    { id: "NY", label: "New York" },
    { id: "NC", label: "North Carolina" },
    { id: "ND", label: "North Dakota" },
    { id: "OH", label: "Ohio" },
    { id: "OK", label: "Oklahoma" },
    { id: "OR", label: "Oregon" },
    { id: "PA", label: "Pennsylvania" },
    { id: "RI", label: "Rhode Island" },
    { id: "SC", label: "South Carolina" },
    { id: "SD", label: "South Dakota" },
    { id: "TN", label: "Tennessee" },
    { id: "TX", label: "Texas" },
    { id: "UT", label: "Utah" },
    { id: "VT", label: "Vermont" },
    { id: "VA", label: "Virginia" },
    { id: "WA", label: "Washington" },
    { id: "WV", label: "West Virginia" },
    { id: "WI", label: "Wisconsin" },
    { id: "WY", label: "Wyoming" },
]