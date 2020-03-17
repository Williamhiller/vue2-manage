<template>
    <div class="">
        <head-top></head-top>

        <div class="compareLine">
            <el-row :gutter="20">
                <el-col :span="3">
                    <div class="edit_title">
                        <h3 class="">跳动</h3>
                        <el-input v-model="skip"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="edit_title">
                        <h3 class="" style="color: #fff">查询</h3>
                        <el-button type="primary" @click="getData">确定</el-button>
                    </div>
                </el-col>
            </el-row>
负
            <el-divider></el-divider>
            <el-radio @change="initData" v-model="compareType"  label="kickback">返还率</el-radio>
            <el-radio @change="initData" v-model="compareType"  label="odd">赔率</el-radio>
            <el-divider></el-divider>

<!--            <div class="companyColor">-->
<!--                <span class="w">威廉<em></em></span>-->
<!--                <span class="l">立博<em></em></span>-->
<!--                <span class="bet">365<em></em></span>-->
<!--            </div>-->
            <div id="kickbackChart" style="width: 50%;height:350px;"></div>
        </div>
    </div>
</template>

<script>
	import headTop from '../../components/headTop';
    import { getCompareData } from '@/api/getData'

    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/legend';

    export default {
    	components: {
    		headTop,
    	},
        data(){
            return {
                skip : "",
                compareType : "kickback",
                lineData : null
            }
        },
        mounted(){
            this.kickbackChart = echarts.init(document.getElementById('kickbackChart'));
        },
        methods : {
            async getData () {
                const res = await getCompareData({skip : this.skip});
                if (res.data.code === 200) {
                    this.lineData = res.data.data[0];
                    this.initData();
                }else{
                    this.$message.error("获取数据失败");
                }
            },
            initData(){
                let parseData = (name, dataAll, series) => {
                    let colors = {
                        w : "#F5B93B",
                        l : "#f01e28",
                        bet : "#14805e"
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
                        text: 'Kickback Line'
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
                        bet = this.lineData.bet;
                    if(l) {
                        parseData("l", l, series);
                    }
                    if(w) {
                        parseData("w", w, series);
                    }
                    if(bet) {
                        parseData("bet", bet, series);
                    }

                    option.series = series;
                    this.kickbackChart.setOption(option);
                }

            }
        }
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';

    .compareLine {
        padding: 20px;
    }
</style>
