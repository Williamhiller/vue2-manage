<template>
    <div class="trendChart">
        <div id="trendChart" class="" style="width: 100%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/legend';

    export default {
        mounted(){
            this.trendChart = echarts.init(document.getElementById('trendChart'));
            this.initData();
        },
        props: ['trendData'],
        methods: {
            initData(){
                let data = [];
                console.log(this.trendData)
                this.trendData.forEach( item => {
                    data.push([item.date, item.money])
                });
                const option = {
                    title: {
                        text: '账户变动趋势',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'axis',
                        // formatter: function (params) {
                        //     params = params[0];
                        //     var date = new Date(params.name);
                        //     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                        // },
                    },
                    xAxis: {
                        type: 'time',
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        },
                        min : function (value) {
                            return value.min;
                        },
                        max : function (value) {
                            return value.max;
                        }
                    },
                    series: [{
                        name: '模拟数据',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            normal : {
                                color : "#f01e28",
                                width : 2
                            }
                        },
                        itemStyle: {
                            normal : {
                                borderColor: "#f01e28",
                                color: "#fff",
                                width : 2
                            }
                        },
                        data: data
                    }]
                };

                this.trendChart.setOption(option);
            }
        },
        watch: {
            trendData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">

</style>
