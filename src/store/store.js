import Vue from 'vue'
import Vuex from 'vuex'
import footprint from '../store/modules/footprint'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    footprint
  }
})