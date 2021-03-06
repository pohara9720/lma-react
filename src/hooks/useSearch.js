import { useState, useEffect } from 'react'
import { api } from '../helpers/api'
import { debounce } from '../helpers/index'

export const useSearch = (entity, setter) => {
    const [value, setValue] = useState('')

    const onChange = e => debounce(setValue(e.target.value), 500)

    useEffect(() => {
        const fetch = async () => {
            const { data } = await api.post(`${entity}/search/`, { value })
            setter(data)
        }
        fetch()
    }, [value])

    return { onChange, value }
}