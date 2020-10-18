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

export const compare = (ids, dict) => {
    let objs = []
    dict && dict.map(item => ids.includes(item.id) ? objs.push(item) : null)
    return objs
}

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const displayToast = ({ error, success }) => {
    const toast = document.getElementById("snackbar-toast");
    const errorText = document.createTextNode('There was an issue processing your request. Please try again');
    const successText = document.createTextNode('You request was successful');
    if (error) {
        toast.className = "show error";
        toast.appendChild(errorText);
    }
    if (success) {
        toast.className = "show success";
        toast.appendChild(successText);
    }
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
    setTimeout(() => { toast.className = toast.className.replace("error", ""); }, 3000);
    setTimeout(() => { toast.className = toast.className.replace("success", ""); }, 3000);
    setTimeout(() => { toast.removeChild(error ? errorText : successText) }, 3000);
}