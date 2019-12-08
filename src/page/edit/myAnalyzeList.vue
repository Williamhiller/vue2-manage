<template>
    <div>
        <head-top></head-top>

        <div class="edit_container">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="edit_title">
                        <h3 class="">联赛</h3>
                        <el-input v-model="match"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="edit_title">
                        <h3 class="">轮次</h3>
                        <el-input v-model="round"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="edit_title">
                        <h3 class="">球探编号</h3>
                        <el-input v-model="code"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="edit_title">
                        <h3 class="" style="color: #fff">查询</h3>
                        <el-button type="primary" @click="getList">确定</el-button>
                    </div>
                </el-col>
            </el-row>

            <el-divider></el-divider>
            <div class="table_container">
                <el-table
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        property="registe_time"
                        label="注册日期"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        property="username"
                        label="用户姓名"
                        width="220">
                    </el-table-column>
                    <el-table-column
                        property="city"
                        label="注册地址">
                    </el-table-column>
                </el-table>
                <div class="Pagination" style="text-align: left;margin-top: 10px;">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="20"
                        layout="total, prev, pager, next"
                        :total="count">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getCodeData,uploadAnalyze } from '@/api/getData'
    import headTop from '../../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                match : '',
                round : '',
                code : '',
                tableData: [{
                    registe_time: '2016-05-02',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1518 弄'
                }],
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    		quillEditor,
    	},
        computed: {

        },
        methods: {
            async getList(){
                if(this.code === '') {
                    this.$message.warning('编号不能为空！');
                    return;
                }
                if(this.content === '') {
                    this.$message.warning('内容不能为空！');
                    return;
                }
                let matchData = this.matchData
                let params = {
                    match: this.match,
                    round: this.round,
                    code: this.code,
                    content: this.content,
                    homeName : matchData.homeName,
                    guestName : matchData.guestName,
                    homeScore : matchData.homeScore,
                    guestScore : matchData.guestScore,
                    first : matchData.first,
                    output: matchData.output,
                    analyse: matchData.content
                };

                const res = await uploadAnalyze(params);
                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    Object.assign(this.$data, this.$options.data.call(this));
                }else{
                    this.$message.error("添加失败");
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
	.editer{
		height: 350px;
	}
    .edit_title {
        margin-bottom: 10px;
    }
	.submit_btn{
		text-align: center;
	}
</style>
