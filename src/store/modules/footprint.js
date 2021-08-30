import { 
  GET_FOOTPRINT_LIST,
  SET_FOOTPRINT_LIST,
  SET_FOOTPRINT_LIST_LOADING,
  SET_FOOTPRINT_CARBON
} from '../types/types'
import { httpRequest } from '../../utils/httpRequest'
import { colors } from '../../utils/colors'

export default {
  namespaced: true,
  state: () => ({
    data: {},
    allCarbonValues: [],
    loaded: false,
    loading: false
  }),
  mutations: {
    [SET_FOOTPRINT_LIST]: (state, data) => {
      state.data = data
      state.allCarbonValues = []
      state.loaded = true
      state.loading = false
    },
    [SET_FOOTPRINT_LIST_LOADING]: (state) => {
      state.loaded = false
      state.loading = true
    },
    [SET_FOOTPRINT_CARBON]: (state, allCarbonValues) => {
      state.allCarbonValues = allCarbonValues
    }
  },
  actions: {
    [GET_FOOTPRINT_LIST]: async({ commit }) => {
      commit(SET_FOOTPRINT_LIST_LOADING)
      let list = {}
      const allCarbonValues = []
      const countries = await httpRequest('get', 'countries')
      await Promise.all(countries.map(async({ countryCode }) => {
        const countryData = await httpRequest('get', `data/${countryCode}/all/EFCpc`)
        countryData.forEach(
          ({ 
            year,
            countryCode,
            countryName,
            carbon 
          }) => {
          if(carbon && carbon >= 0) {
            const carbonFixed = parseFloat(carbon.toFixed(2))
            allCarbonValues.push(carbonFixed)
            if(!list[year]) {
              list[year] = {
                [countryCode]: {
                  countryName,
                  carbon: carbonFixed,
                  color: colors[countryCode],
                  countryCode
                }
              }
            } else {
              list[year][countryCode] = {
                countryName,
                carbon: carbonFixed,
                color: colors[countryCode],
                countryCode
              }
            }
          }
        })
      }))
      .catch(error => {
        console.log(error)
      })
      commit(SET_FOOTPRINT_LIST, list)
      commit(SET_FOOTPRINT_CARBON, allCarbonValues)
    }
  }
}