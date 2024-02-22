import axios from "axios"

const host = "http://localhost:8000/"
const default_url = host + "api/"
const sanctum_url = host + "sanctum/"
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
}

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

/**
 * The wrapper for GET requests
 * @param URLTail The rest of URL
 * @param params Request parameters
 * @returns
 */
export const rqGet = (URLTail: string, params = {}, URLHead = default_url) =>
  axios.get(URLHead + URLTail + "?" + new URLSearchParams(params))

/**
 * The wrapper for POST requests
 * @param URLTail The rest of URL
 * @param params Request parameters
 * @returns
 */
export const rqPost = (URLTail: string, params = {}, URLHead = default_url) =>
  axios.get(sanctum_url + "csrf-cookie").then(res => 
    axios.post(URLHead + URLTail, params)
  )

export const rqPatch = (URLTail: string, params = {}, URLHead = default_url) =>
  axios.get(sanctum_url + "csrf-cookie").then(res => 
    axios.patch(URLHead + URLTail, params)
  )

export const rqDelete = (URLTail: string, params = {}, URLHead = default_url) =>
  axios.get(sanctum_url + "csrf-cookie").then(res => 
    axios.delete(URLHead + URLTail, params)
  )
