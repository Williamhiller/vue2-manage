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
                    border
                    style="width: 80%">
                    <el-table-column
                        type="index"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        property="match"
                        label="联赛"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        property="round"
                        label="轮次"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        property="homeName"
                        label="主队">
                    </el-table-column>
                    <el-table-column
                        property="guestName"
                        label="客队">
                    </el-table-column>
                    <el-table-column
                        property="score"
                        label="比分">
                    </el-table-column>
                    <el-table-column
                        property="code"
                        label="编号">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template  slot-scope="scope">
                            <el-button size="mini" type="primary" plain icon="el-icon-edit" @click.native.prevent="goReplay(scope.row.code)"></el-button>
                            <el-button size="mini" type="danger" plain icon="el-icon-delete" @click.native.prevent="deleteAnalyze(scope.row.code)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { getAnalyzeList, deleteAnalyze } from '@/api/getData'
    import headTop from '../../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                match : '',
                round : '',
                code : '',
                tableData: []
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
                let params = {
                    match: this.match,
                    round: this.round,
                    code: this.code
                };

                const res = await getAnalyzeList(params);
                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '查询成功'
                    });
                    this.tableData = res.data.data;

                }else{
                    this.$message.error("查询失败");
                }
            },
            goReplay (code) {
                this.$router.push( {path:"/replay", query:{code:code}})
            },
            async deleteAnalyze (code) {
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deleteAnalyze(code)
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.getList();
                    }else{
                        this.$message.error("删除失败");
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
