<script setup lang="ts">
const option: ECOption = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    className: 'echarts-tooltip',
  },
  legend: {
    left: 'center',
    bottom: '10',
    data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts'],
  },
  series: [
    {
      name: 'WEEKLY WRITE ARTICLES',
      type: 'pie',
      roseType: 'radius',
      radius: [15, 95],
      center: ['50%', '38%'],
      data: [
        { value: 320, name: 'Industries' },
        { value: 240, name: 'Technology' },
        { value: 149, name: 'Forex' },
        { value: 100, name: 'Gold' },
        { value: 59, name: 'Forecasts' },
      ],
      animationEasing: 'cubicInOut',
    },
  ],
}
</script>

<template>
  <v-chart :option="option" autoresize />
</template>
