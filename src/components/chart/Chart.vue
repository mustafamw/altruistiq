<template>
  <div class="chart">
    <transition-group name="flip-list" tag="ul">
      <li 
        class="total"
        key="total">
        total
      </li>
      <li
        v-for="(item) in items"
        :key="item.countryCode">
        <template v-if="item.carbon > 0">
          <div class="name">{{ item.countryName }}</div>
          <div class="graph">
            <div 
              :style="`
                background: ${item.color};
                width: ${(100 / maxCarbonValue) * item.carbon}%;
              `"></div>
          </div>
          <div class="total">{{ item.carbon | float(2) }}</div>
        </template>
      </li>
     </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
    maxCarbonValue: {
      type: Number
    }
  },
};
</script>

<style lang="sass" scoped>
  .chart
    background: #FFFFFF
    padding: 40px
    min-width: calc(320px - 30px)
    max-width: 837px
    margin: auto
    border: 1px solid #E6E6E6
    box-sizing: border-box
    border-radius: 8px
    ul
      list-style: none
      position: relative
      display: flex
      flex-wrap: wrap
      margin: 0px
      padding: 0px
      li
        display: inline-flex
        width: 100%
        align-items: center
        margin-bottom: 15px
        > div
          width: 100%
        div
          &.name
            width: 150px
            padding-right: 30px
          &.graph
            width: 75%
            overflow: hidden
            div
              height: 17px
              border-radius: 5px
              width: 0%
              -webkit-transition: width 1s ease-in-out
              -moz-transition: width 1s ease-in-out
              -o-transition: width 1s ease-in-out
              transition: width 1s ease-in-out
          &.total
            width: 10%
          &.name,
          &.total
            font-weight: bold
            font-size: 16px
            line-height: 19px
            text-align: right
        &.total
          justify-content: flex-end
          font-size: 12px
          line-height: 15px
          text-align: right
  .flip-list-move 
    transition: transform 1s
@media screen and (max-width: 600px) 
  .chart
    padding: 20px
    ul
      li
        div
          &.name
            width: 100px
            padding-right: 5px
          &.name,
          &.total
            font-size: 12px

</style>

