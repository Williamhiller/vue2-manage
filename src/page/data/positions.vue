<template>
    <div>
        <head-top></head-top>

        <div class="edit_container">
            <el-row :gutter="10">
                <el-col :span="2">
                    <el-input v-model="add.match" placeholder="联赛"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="add.position" placeholder="赔率"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-input v-model="add.kickback" placeholder="返还率"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-input v-model="add.area" placeholder="区间"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="addList">添加</el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>

            <el-row :gutter="20" class="mb20">
                <el-col :span="4">
                    <el-input v-model="match" placeholder="联赛"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="getList">确定</el-button>
                </el-col>
            </el-row>

            <div class="table_container">
                <el-table
                    :data="tableData"
                    border
                    style="width: 700px">
                    <el-table-column
                        type="index"
                        width="40">
                    </el-table-column>
                    <el-table-column
                        property="match"
                        label="联赛"
                        :filters="options"
                        :filter-method="filterMatch"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        property="position"
                        label="位置"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        property="kickback"
                        label="返还率"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        property="area"
                        label="区间"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template  slot-scope="scope">
                            <el-button size="mini" type="danger" plain icon="el-icon-delete" @click.native.prevent="deleteItem(scope.row._id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import { getPositionList, addPosition, deletePosition } from '@/api/getData'
    import headTop from '../../components/headTop'

    export default {
        data(){
            return {
                match: '',
                tableData: [],
                add: {},
                options: []
            }
        },
    	components: {
    		headTop,
    	},
        computed: {},
        methods: {
            filterMatch(value, row) {
                return row.match === value;
            },
            async addList(){
                const res = await addPosition(this.add);
                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.getList();
                }else{
                    this.$message.error("添加失败");
                }
            },
            async getList(){
                let params = {
                    match: this.match
                };

                const res = await getPositionList(params);
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
            },
            async deleteItem (id) {
                this.$confirm('此操作将永久删除 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await deletePosition(id)
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
    .mb20 {margin-bottom: 20px}
</style>
