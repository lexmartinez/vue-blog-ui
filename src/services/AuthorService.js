'use strict'
import axios from 'axios'
import config from './config'

const client = axios.create({
  baseURL: config.baseURL
})

const endpoint = '/authors'

export default {
  list: () => {
    return client.get(endpoint)
  },
  page: (sortBy, order) => {
    return client.get(endpoint + '?sort_by=' + (sortBy || 'name') + '&sort_order=' + (order || 'ASC'))
  },
  create: (author) => {
    return client.post(endpoint, author)
  },
  update: (id, author) => {
    return client.put(endpoint + '/' + id, author)
  },
  delete: (id) => {
    return client.delete(endpoint + '/' + id)
  }
}
