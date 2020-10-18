import * as yup from 'yup'

const SUPPORTED = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf', 'application/csv']

const getUrlType = (url) => {
    const segs = url.split('.')
    const type = segs[segs.length - 1]
    return SUPPORTED.some(x => x.includes(type))
}

export const fileSchema = yup.mixed()
    .test(
        "fileSize",
        "File is too large",
        value => !value || (value && value.size <= 512000) || typeof value === 'string'
    ).test(
        "fileFormat",
        "Unsupported File type",
        value => !value || (value && SUPPORTED.includes(value.type)) || getUrlType(value)
    )

export const validator = (schema) => async formValues => {
    try {
        await schema.validate(formValues, { abortEarly: false })
        return {}
    } catch (errors) {
        const reducer = (errors, err) => ({
            ...errors,
            [err.path]: err.message
        })
        const result = errors.inner.reduce(reducer, {})
        throw result
    }
}

const validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const emailFieldArrayValidator = ({ emails }) => {
    const errors = {}
    if (!emails || !emails.length) {
        errors.emails = { _error: 'At least one email is required' }
    }
    else {
        const emailErrors = []
        emails.forEach((email, index) => {
            if (!validEmail(email)) {
                emailErrors[index] = 'Email must be valid'
            }

        })
        if (emailErrors.length) {
            errors.emails = emailErrors
        }
    }
    console.log('ERRORS EMAILS', errors)
    return errors
}

export const saleValidator = values => {
    const { invoice_items } = values
    let errors = {}
    const schema = yup.object().shape({
        number: yup.number().required('Invoice Number is required'),
        issue_date: yup.date().required('Issue date is required'),
        due_date: yup.date().required('Due date is required'),
        title: yup.string().required('Title is required'),
        bill_to_name: yup.string().required('Bill to name is required'),
        bill_to_address: yup.string().required('Bill to address is required'),
        bill_to_email: yup.string().email().required('Bill to email is required'),
        phone: yup.number().required('Phone number is required')
    })
    try {
        schema.validateSync(values, { abortEarly: false })
    } catch (e) {
        const reducer = (errs, err) => ({
            ...errs,
            [err.path]: err.message
        })
        const result = e.inner.reduce(reducer, {})
        errors = result
    }
    if (!invoice_items || !invoice_items.length) {
        errors.invoice_items = { _error: 'Invoice must have at least 1 line item' }
    } else {
        const invoiceErrors = []
        invoice_items.forEach((invoiceItem, index) => {
            const { type, item, cost, quantity, description } = invoiceItem || {}
            console.log(typeof cost, cost)
            if (!type || typeof type !== 'string') {
                invoiceErrors[index] = { type: 'Valid type is required' }
            }
            if (!item || typeof item !== 'string') {
                invoiceErrors[index] = { item: 'Invoice item is required' }
            }
            if (!cost || typeof cost !== 'string') {
                invoiceErrors[index] = { cost: 'Cost is required' }
            }
            if (!quantity || typeof quantity !== 'string') {
                invoiceErrors[index] = { quantity: 'Quantity is required' }
            }
            if (!description || typeof description !== 'string') {
                invoiceErrors[index] = { description: 'Small description is required' }
            }
        })
        if (invoiceErrors.length) {
            errors.invoice_items = invoiceErrors
        }
    }
    return errors
}

// export const saleValidator = ({
//     bill_to_name,
//     bill_to_address,
//     bill_to_email,
//     issue_date,
//     due_date,
//     number,
//     phone,
//     invoiceItems
// }) => {
//     const errors = {}
//     if (!bill_to_name) {
//         schema.validateSync(23)
//         errors.bill_to_name = { _error: 'Name is required' }
//     }
//     return errors
// }