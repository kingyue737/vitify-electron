<script setup lang="ts">
const data = [
  ['2022-06-05', 116],
  ['2022-06-06', 129],
  ['2022-06-07', 135],
  ['2022-06-08', 86],
  ['2022-06-09', 73],
  ['2022-06-10', 85],
  ['2022-06-11', 73],
  ['2022-06-12', 68],
  ['2022-06-13', 92],
  ['2022-06-14', 130],
  ['2022-06-15', 245],
  ['2022-06-16', 139],
  ['2022-06-17', 115],
  ['2022-06-18', 111],
  ['2022-06-19', 309],
  ['2022-06-20', 206],
  ['2022-06-21', 137],
  ['2022-06-22', 128],
  ['2022-06-23', 85],
  ['2022-06-24', 94],
  ['2022-06-25', 71],
  ['2022-06-26', 106],
  ['2022-06-27', 84],
  ['2022-06-28', 93],
  ['2022-06-29', 85],
  ['2022-06-30', 73],
  ['2022-07-01', 83],
  ['2022-07-02', 125],
  ['2022-07-03', 107],
  ['2022-07-04', 82],
  ['2022-07-05', 44],
  ['2022-07-06', 72],
  ['2022-07-07', 106],
  ['2022-07-08', 107],
  ['2022-07-09', 66],
  ['2022-07-10', 91],
  ['2022-07-11', 92],
  ['2022-07-12', 113],
  ['2022-07-13', 107],
  ['2022-07-14', 131],
  ['2022-07-15', 111],
  ['2022-07-16', 64],
  ['2022-07-17', 69],
  ['2022-07-18', 88],
  ['2022-07-19', 77],
  ['2022-07-20', 83],
  ['2022-07-21', 111],
  ['2022-07-22', 57],
  ['2022-07-23', 55],
  ['2022-07-24', 60],
]

const option: ECOption = {
  backgroundColor: 'transparent',
  dataset: { source: data },
  visualMap: {
    show: false,
    type: 'continuous',
    min: 0,
    max: 400,
  },
  tooltip: {
    trigger: 'axis',
    className: 'echarts-tooltip',
  },
  grid: {
    top: 20,
    left: '2%',
    right: '2%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'value',
      type: 'line',
      showSymbol: false,
      lineStyle: {
        width: 4,
      },
    },
  ],
}
</script>

<template>
  <v-chart :option="option" autoresize />
</template>
