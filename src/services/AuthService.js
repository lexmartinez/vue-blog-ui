'use strict'
import axios from 'axios'
import config from './config'

const client = axios.create({
  baseURL: config.baseURL
})

const endpoint = '/auth'

export default {
  login: (payload) => {
    return client.post(endpoint, payload)
  },
  logout: (token) => {
    return client.delete(endpoint + '/' + token)
  },
  validate: (token) => {
    return client.get(endpoint + '/' + token)
  }
}
