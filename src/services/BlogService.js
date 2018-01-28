'use strict'
import axios from 'axios'
import config from './config'

const client = axios.create({
  baseURL: config.baseURL
})

const endpoint = '/articles'

export default {
  getArticles: (tag, offset, limit) => {
    let suffix = ''
    let op = '?'
    if (tag) {
      suffix = '?tag=' + tag
      op = '&'
    }

    let url = endpoint + suffix
    if (limit) {
      url = url + op + 'limit=' + limit + '&offset=' + offset
    }
    return client.get(url)
  },
  page: (offset, limit) => {
    let url = endpoint
    if (limit && offset) {
      url = url + '?limit=' + limit + '&offset=' + offset
    } else if (limit) {
      url = url + '?limit=' + limit
    }
    return client.get(url)
  },
  articleByKey: (key) => {
    return client.get(endpoint + '?key=' + key)
  },
  delete: (id) => {
    return client.delete(endpoint + '/' + id)
  },
  create: (article) => {
    return client.post(endpoint, article)
  },
  update: (id, article) => {
    return client.put(endpoint + '/' + id, article)
  }
}
