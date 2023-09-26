<template>
    <div class="charts-container">
        <div class="charts-top">
            <h1>Thống kê bài viết</h1>
            <div>
                <apexchart height="100%" width="380" type="donut" :options="donutChartData.options" :series="donutChartData.series"></apexchart>
            </div>
        </div>
        <div class="charts-bottom">
            <h1>Thống kê theo tháng</h1>
            <apexchart height="95%"  type="line" :options="lineChartData.options" :series="lineChartData.series"></apexchart>
        </div>
    </div>
</template>


<script>
    import { ref } from 'vue'
    export default {
       setup(){
        const donutChartData = ref({
            options: {},
            series: [44, 55, 41, 17, 15]
        })

        const lineChartData = ref({
            options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
        })
        return {
             donutChartData,
             lineChartData
        }
       }

    }
</script>


<style scoped>
    @import url('./charts.css');
    #chart {
    max-width: 650px;
    margin: 35px auto;
}
</style>
