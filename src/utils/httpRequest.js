import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 5 * 60 * 1000 // 5min
})

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter
})

export const httpRequest = async (method = 'get', endpoint) => {
  const { 
    VUE_APP_API_ENDPOINT: url, 
    VUE_APP_API_AUTH_USERNAME: username,
    VUE_APP_API_AUTH_PASSWORD: password
  } = process.env
  
  const { data } = await api[method](
    `${url}/${endpoint}`,
    {
      auth: {
        username,
        password
      }
    }
  )
  return data
}