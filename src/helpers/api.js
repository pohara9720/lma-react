import { API_URL } from '../config'
import axios from 'axios'

const formatUrl = (url) => `${API_URL}/${url}`

const init = {}

const get = async (url, options = init) => await axios.get(formatUrl(url), options)
const post = async (url, body, options = init) => await axios.post(formatUrl(url), body, options)
const put = async (url, body, options = init) => await axios.put(formatUrl(url), body, options)
const remove = async (url, options = init) => await axios.delete(formatUrl(url), options)

export const getPdf = (entity) => formatUrl(`${entity}/get_pdf`)

export const api = { get, post, put, delete: remove }
