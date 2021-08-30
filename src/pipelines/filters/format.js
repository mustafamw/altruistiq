import Vue from 'vue';

export const float = function(value, decimalPlaces = 0) {
  return typeof value === 'number' ? value.toFixed(decimalPlaces) : (0).toFixed(decimalPlaces)
}

Vue.filter('float', float);