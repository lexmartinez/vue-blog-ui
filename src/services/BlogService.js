'use strict'
import axios from 'axios'
import config from './config'

const client = axios.create({
  baseURL: config.baseURL
})

const endpoint = '/articles'

export default {
  getArticles: (tag) => {
    let suffix = ''
    if (tag) {
      suffix = '?tag=' + tag
    }
    return client.get(endpoint + suffix)
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
