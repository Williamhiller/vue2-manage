<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
<!--			<header class="section_title">数据统计</header>-->
			<el-row :gutter="20" style="margin-bottom: 10px;">
<!--                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>-->
			</el-row>
		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	data(){
    		return {

    		}
    	},
    	components: {
    		headTop
    	},
    	mounted(){
    		for (let i = 6; i > -1; i--) {
    		}
    	},
        computed: {

        },
    	methods: {
    		async initData(){

    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
