<template>
    <div>
        <head-top></head-top>
		<section class="data_section">

            <el-row :gutter="10">
                <el-col :span="3">
                    <el-select v-model="account" placeholder="账户">
                        <el-option key="亚博"  value="亚博"></el-option>
                        <el-option key="365"  value="365"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="money" placeholder="余额"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-date-picker
                        v-model="date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="setCount">确定</el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>

            <account-trend :trendData="trendDataList"></account-trend>
		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {setCountData, getCountData} from '@/api/getData'
    import accountTrend from '../components/accountTrend'

    export default {
    	data(){
    		return {
                date : "",
                money : "",
                account : "亚博",
                trendDataList : []
    		}
    	},
    	components: {
    		headTop,
            accountTrend
    	},
    	mounted(){
    	    this.getAccount()
    	},
        computed: {

        },
    	methods: {
    		async setCount(){
    		    let params = {
                    date : this.date,
                    money : this.money,
                    account : this.account
                };

    		    let res = await setCountData(params);
                if (res.data.code === 200) {
                    this.$message.success('添加成功');
                } else {
                    this.$message.error("添加失败");
                }
    		},
            async getAccount () {
    		    let res = await getCountData();
    		    console.log(res.data)
                this.trendDataList = res.data.data;
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
