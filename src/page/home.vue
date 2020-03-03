<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>

            <el-row :gutter="10">
                <el-col :span="2">
                    <el-input v-model="date" placeholder="日期"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-input v-model="money" placeholder="余额"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="account" placeholder="账户"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="setData">确定</el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>

		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	data(){
    		return {
                date : "",
                money : "",
                account : ""
    		}
    	},
    	components: {
    		headTop
    	},
    	mounted(){

    	},
        computed: {

        },
    	methods: {
    		async setData(){

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

	}

</style>
