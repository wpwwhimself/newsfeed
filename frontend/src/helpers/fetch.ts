// import { getKey } from "./Storage"

const URLHead = "http://localhost:8000/api/"

/**
 * The wrapper for GET requests
 * @param URLTail The rest of URL
 * @param params Request parameters
 * @returns
 */
export const rqGet = (URLTail: string, params = {}) =>
  fetch(URLHead + URLTail + "?" + new URLSearchParams(params))
    .then(res => res.json())

/**
 * The wrapper for POST requests
 * @param URLTail The rest of URL
 * @param params Request parameters
 * @returns
 */
export const rqPost = (URLTail: string, params = {}) =>
  fetch(URLHead + URLTail, {
    method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params)
  }).then(res => res.json())

export const rqPatch = (URLTail: string, params = {}) =>
  fetch(URLHead + URLTail, {
    method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params)
  }).then(res => res.json())

export const rqDelete = (URLTail: string, params = {}) =>
  fetch(URLHead + URLTail, {
    method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params)
  }).then(res => res.json())
