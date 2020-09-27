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