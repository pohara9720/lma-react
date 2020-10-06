import moment from 'moment'

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const toMulti = (data, func, label = 'label') => data.map(item => ({ value: item.id, label: !func ? item[label] : func(item) }))

export const readDate = date => moment(date).format('ll')

export const price = number => {
    const [dollars, cents] = number.toString().split('.')
    console.log(dollars, cents)
    return (parseInt(dollars) * 100) + (cents ? parseInt(cents) : 0)
}

export const unique = a => {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}