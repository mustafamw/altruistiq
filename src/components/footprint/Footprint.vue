<template>
  <div class="footprint">
    <h1>Historic global carbon footprint</h1>
    <div class="details">
      <div class="content">
        <div class="label">year</div>
        <div class="value">{{year}}</div>
      </div>
      <div class="content">
        <div class="label">global total</div>
        <div class="value">{{total | float(2)}}</div>
      </div>
    </div>
    <Chart 
      :items="items"
      :maxCarbonValue="maxCarbonValue"
      v-if="items.length > 0"/>
    <small class="source">data source: https://data.footprintnetwork.org</small>
  </div>
</template>

<script>
import Chart from '../chart/Chart.vue'

export default {
  name: 'Footprint',
  props: {
    data: {
      type: Object
    },
    allCarbonValues: {
      type: Array
    },
    loading: {
      type: Boolean
    },
    loaded: {
      type: Boolean
    }
  },
  components: {
    Chart
  },
  data() {
    return {
      index: 0,
      year: 0,
      total: 0,
      maxCarbonValue: 0,
      items: []
    }
  },
  methods: {
    setData() {
      const data = Object.entries(this.data)
      const [key, value] =  Object.values(data[this.index])
      this.year = key
      this.total = 0
      this.items = Object.values(value).sort((a, b) => {
        if ( a.carbon > b.carbon ){
          return -1;
        }
        if ( a.carbon < b.carbon ){
          return 1;
        }
        return 0;
      })
      this.items.forEach(({ carbon }) => {
        this.total = parseFloat((this.total + carbon).toFixed(2))
      })
      this.index ++
      if(data.length === this.index) {
        this.index = 0
      }
      setTimeout(() => this.setData(), 1500)
    }
  },
  mounted() {
    this.maxCarbonValue = Math.max(...this.allCarbonValues)
    this.setData()
  }
}
</script>

<style lang="sass" scoped>
  .footprint
    h1 
      font-size: 48px
      text-align: center
      margin: 0px
      padding: 40px 0px
    .details
      display: flex
      justify-content: center
      padding-bottom: 40px
      .content
        min-width: 300px
        .label
          font-weight: 300
          font-size: 24px
          line-height: 29px
          text-align: center
          color: #808080
        .value
          font-weight: bold
          font-size: 56px
          line-height: 68px
          text-align: center
          color: #0F6F6F
    .source
      display: block
      font-size: 12px
      line-height: 15px
      text-align: center
      padding-top: 40px
      padding-bottom: 40px
@media screen and (max-width: 600px) 
  .footprint
    h1
      font-size: 24px
      padding: 20px 0px
    .details
      display: block
      padding-bottom: 20px
      .content
        .label
          font-size: 16px
          line-height: 29px
        .value
          font-size: 36px
          line-height: 48px
</style>