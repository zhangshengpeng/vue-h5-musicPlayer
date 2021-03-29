<template>
  <div>
    <div id="bar" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
)
export default {
  data: () => ({
  }),
  mounted () {
    const myChart = echarts.init(document.getElementById('bar'))
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }]
    })
  }
}
</script>
