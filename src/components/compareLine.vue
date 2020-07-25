<template>
    <div class="compareLine">
        <div class="companyColor">
            <span class="w">威廉<em></em></span>
            <span class="l">立博<em></em></span>
            <span class="bet">365<em></em></span>
        </div>
        <div id="compareLine" class="" style="width: 100%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入折线图
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/dataZoom';
    import 'echarts/lib/component/tooltip';

    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('compareLine'));
            this.initData();
        },
        props: ['lineData'],
        methods: {
            initData(){

                let parseData = (name, dataAll, series) => {
                    let colors = {
                        w : "#F5B93B",
                        l : "#f01e28",
                        bet : "#14805e",
                        betfair : "#000000"
                    };

                    let arrObj = {
                        a : [],
                        b : [],
                        c : []
                    };
                    let arr = dataAll.split(";");
                    arr.forEach( (item) => {
                        if(!item) {
                            return;
                        }
                        let detail = item.split("|");
                        let a = parseFloat(detail[0]),
                            b = parseFloat(detail[1]),
                            c = parseFloat(detail[2]);
                        let rate = a*b*c*100/(a*b+a*c+b*c);
                        rate = Math.round(rate*100)/100;

                        let date = detail[3];
                        // "04-27 19:11".split("-");
                        if(date.split("-")[0].length < 4) { // 判断第一个是否是年，有可能是有年份的
                            let year = new Date().getFullYear();
                            let month = Number.parseInt(date.split("-")[0]);
                            if(month > 8) { //  很少提前4个月开出，故认为年份要-1
                                year--;
                            }
                            date = `${year}-${date}`;
                            date = date.replace(/-/g, "/")
                        }
                        let all = ""+`${a} ${b} ${c}`;

                        arrObj.a.push([date, a, rate, all]);
                        arrObj.b.push([date, b, rate, all]);
                        arrObj.c.push([date, c, rate, all])
                    });
                    let convert = {
                        a : "胜",
                        b : "平",
                        c : "负"
                    };
                    for(let key in arrObj) {
                        series.push({
                            name: convert[key],
                            type: 'line',
                            step: 'start',
                            data: arrObj[key],
                            symbol: 'circle',
                            symbolSize: 5,
                            lineStyle: {
                                normal : {
                                    color : colors[name],
                                    width : 2
                                }
                            },
                            itemStyle: {
                                normal : {
                                    borderColor: colors[name],
                                    color: colors[name],
                                    width : 2
                                }
                            }
                        })
                    }
                };

                const option = {
                    title: {
                        text: 'Compare Line'
                    },
                    tooltip: {
                        show : true,
                        trigger: 'item',
                        formatter: function (params) {
                            return `返还：${params.data[2]}<br> 赔率：${params.data[3]}`;
                        }
                    },
                    legend: {
                        data: ['胜', '平', '负'],
                        borderColor : "#fff",
                        selectedMode : "single"
                    },
                    grid: {
                        left: '1%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 100
                    }, {
                        start: 0,
                        end: 100,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    xAxis: {
                        type: 'time'
                    },
                    yAxis: {
                        type: 'value',
                        min : function (value) {
                            return value.min;
                        },
                        max : function (value) {
                            return value.max + 0.2;
                        },
                        minInterval : 0.01
                    },
                    series: []
                };
                if(this.lineData) {
                    let series = [];
                    let w = this.lineData.william,
                        l = this.lineData.ladbrokes,
                        bet = this.lineData.bet,
                        betfair = this.lineData.betfair;
                    if(l) {
                        parseData("l", l, series);
                    }
                    if(w) {
                        parseData("w", w, series);
                    }
                    if(bet) {
                        parseData("bet", bet, series);
                    }
                    if(bet) {
                        parseData("betfair", betfair, series);
                    }

                    option.series = series;
                    this.myChart.setOption(option);
                }

            }
        },
        watch: {
            lineData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    @w: #F5B93B;
    @l: #f01e28;
    @bet: #14805e;
    @betfair: #000000;
    .compareLine {
        /*display: flex;*/
        /*justify-content: center;*/
        margin-top: 20px;
        padding: 10px;
        position: relative;
    }
    .companyColor {
        text-align: right;
        padding: 10px 40px;
        position: absolute;
        right: 0;
        font-size: 14px;
        span {
            margin-left: 10px;
        }

        em {
            display: inline-block;
            width: 20px;
            height: 10px;
            margin-left: 5px;
            border-radius: 5px;
        }

        .w {
            color: @w;
            em{background-color: @w;}
        }
        .l {
            color: @l;
            em{background-color: @l;}
        }
        .bet {
            color: @bet;
            em{background-color: @bet;}
        }
        .betfair {
            color: @betfair;
            em{background-color: @betfair;}
        }
    }
</style>
