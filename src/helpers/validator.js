import * as yup from 'yup'

const SUPPORTED = ['image/jpg', ' image/jpeg', 'image/png', '.pdf', '.csv']
export const fileSchema = yup.mixed()
    .test(
        "fileSize",
        "File is too large",
        value => !value || (value && value.size <= 512000)
    ).test(
        "fileFormat",
        "Unsupported File type",
        value => !value || value && SUPPORTED.includes(value.type)
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
        console.log(result)
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
    return errors
}