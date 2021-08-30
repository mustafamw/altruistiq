<template>
  <div id="app">
    <Loading
      v-if="footprint.loading" />
    <Footprint 
      v-bind="footprint"
      v-if="footprint.loaded"/>
  </div>
</template>

<script>
import { 
  mapState,
  mapActions
} from 'vuex'
import {
  GET_FOOTPRINT_LIST
} from './store/types/types'
import Footprint from './components/footprint/Footprint.vue'
import Loading from './components/loading/Loading.vue'

export default {
  name: 'App',
  components: {
    Footprint,
    Loading
  },
  computed: {
    ...mapState({
      footprint: state => state.footprint
    })
  },
  methods: {
    ...mapActions([`footprint/${GET_FOOTPRINT_LIST}`])
  },
  mounted() {
    this[`footprint/${GET_FOOTPRINT_LIST}`]()
  }
}
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap')

  #app
    font-family: Inter
    height: 100%
</style>
