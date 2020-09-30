import moment from 'moment'

export const define = (dictionary = [], id) => {
    const found = dictionary.filter(x => x.id === id)
    if (!found) {
        throw new Error('Nothing was found')
    }
    return found
}

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const toMulti = (data, label = 'label') => data.map(item => ({ value: item.id, label: item[label] }))

export const readDate = date => moment(date).format('ll')