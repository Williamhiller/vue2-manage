<template>
    <div>
        <pre>{{text}}</pre>
    </div>
</template>

<script>
// 引入折线图

export default {
    name: "williamData",
    data () {
        return {
            text : ""
        }
    },
    props: ['william'],
    created() {
        this.initData()
    },
    methods: {
        initData () {
            if(!this.william) {
                return
            }
            let william = this.william;
            let arr = william.split(";");
            arr.reverse().forEach( (item) => {
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

                this.text += `${a.toFixed(2)} ${b.toFixed(2)} ${c.toFixed(2)} | ${date} | ${rate} \n`
            });
        }
    },
    watch: {
        william (newVal,OldVal) {
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
    }
</style>
