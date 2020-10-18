import { API_URL } from '../config'
import axios from 'axios'
import { LMA_AUTH_TOKEN } from '../dictionary'

const formatUrl = (url) => `${API_URL}/${url}`

const init = {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem(LMA_AUTH_TOKEN)}`
    }
}

const get = async (url, options = init) => await axios.get(formatUrl(url), options)
const post = async (url, body, options = init) => await axios.post(formatUrl(url), body, options)
const put = async (url, body, options = init) => await axios.put(formatUrl(url), body, options)
const patch = async (url, body, options = init) => await axios.patch(formatUrl(url), body, options)
const remove = async (url, options = init) => await axios.delete(formatUrl(url), options)

export const getPdf = (entity) => formatUrl(`${entity}/get_pdf`)

export const downloadInvoice = id => formatUrl(`sale/${id}/download_invoice`)

export const api = { get, post, put, delete: remove, patch }
