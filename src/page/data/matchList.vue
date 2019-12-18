<template>
    <div>
        <head-top></head-top>

        <div class="edit_container">
            <el-row :gutter="20">
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
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        property="match"
                        label="联赛"
                        :filters="options"
                        :filter-method="filterMatch"
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
                        property="asianOdd"
                        label="亚盘">
                    </el-table-column>
                    <el-table-column
                        property="code"
                        label="编号">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { getMatchList } from '@/api/getData'
    import headTop from '../../components/headTop'

    export default {
        data(){
            return {
                match: '',
                tableData: [],
                options: []
            }
        },
    	components: {
    		headTop,
    	},
        computed: {

        },

        methods: {
            filterMatch(value, row) {
                return row.match === value;
            },
            async getList(){
                let params = {
                    match: this.match,
                    round: this.round,
                    code: this.code
                };

                const res = await getMatchList(params);
                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '查询成功'
                    });
                    this.tableData = res.data.data;
                    let arr = [], options = [];
                    this.tableData.forEach((item) => {
                        if(!arr.includes(item.match)) {
                            options.push({
                                text: item.match, value: item.match
                            });
                            arr.push(item.match)
                        }
                    });
                    this.options = options;
                }else{
                    this.$message.error("查询失败");
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
