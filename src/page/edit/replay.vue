<template>
    <div>
        <head-top></head-top>

        <div class="edit_container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="edit_title">
                        <h3 class="">球探编号</h3>
                        <el-input v-model="code"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="edit_title">
                        <h3 class="" style="color: #fff">查询</h3>
                        <el-button type="primary" @click="getAnalyzeData">确定</el-button>
                    </div>
                </el-col>
            </el-row>

            <div style="height: 30px"></div>

            <el-collapse v-model="activeNames">
                <el-collapse-item title="数据对比" name="1">
                    <pre>{{analyseData.output}}</pre>
                </el-collapse-item>
                <el-collapse-item title="分析" name="2">
                    <div v-html="analyseData.analyse"></div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import { getAnalyzeByCode } from '@/api/getData'
    import headTop from '../../components/headTop'

    export default {
        data(){
            return {
                code : '',
                activeNames: [],
                analyseData : {}
            }
        },
    	components: {
    		headTop,
    	},
        computed: {

        },
        methods: {
            async getAnalyzeData(){

                const res = await getAnalyzeByCode(this.code);
                if (res.data.code === 200) {
                    this.analyseData = res.data.data;
                }else{
                    this.$message.error("获取数据失败");
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../../style/mixin';
    .edit_container{
        padding: 40px;
        margin-bottom: 40px;
    }
</style>
