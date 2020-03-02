<template>
    <div>
        <head-top></head-top>

        <div class="edit_container">
            <el-row :gutter="10">
                <el-col :span="2">
                    <el-input type="textarea" v-model="add.result" placeholder="赛果"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-input type="textarea" v-model="add.area" placeholder="区间"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input type="textarea" v-model="add.situation" placeholder="形势"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input type="textarea" v-model="add.tactics" placeholder="策略"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="setTactics">确定</el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>

            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input v-model="tacticsAdd.code" placeholder="代码"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="tacticsAdd.match" placeholder="联赛"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="tacticsAdd.odd" placeholder="赔率"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="tacticsAdd.score" placeholder="比分"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addTacticsMatch">确定</el-button>
                </el-col>
            </el-row>

            <el-divider></el-divider>
            <div class="table_container">

                <el-row :gutter="20" class="mt20">
                    <el-col :span="20">
                        <el-checkbox-group v-model="areaArr">
                            <el-checkbox @change="filterTactic" v-for="item in ranges" v-bind:label="item" v-bind:key="item"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                    <el-col :span="20" style="margin-top: 10px">
                        <el-checkbox-group v-model="resultArr">
                            <el-checkbox label="胜" @change="filterTactic"></el-checkbox>
                            <el-checkbox label="平" @change="filterTactic"></el-checkbox>
                            <el-checkbox label="负" @change="filterTactic"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>

                <el-divider></el-divider>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-table
                            :data="tacticsList"
                            highlight-current-row
                            @current-change="getTacticsMatch"
                            border
                            style="width: 100%">
                            <el-table-column
                                width="80"
                                property="area"
                                label="区间">
                            </el-table-column>
                            <el-table-column
                                width="60"
                                property="result"
                                label="赛果">
                            </el-table-column>
                            <el-table-column
                                property="situation"
                                label="形势">
                            </el-table-column>
                            <el-table-column
                                property="tactics"
                                label="策略">
                            </el-table-column>
                            <el-table-column
                                width="80"
                                label="操作">
                                <template  slot-scope="scope">
                                    <el-button size="mini" type="danger" plain icon="el-icon-delete" @click.native.prevent="deleteTactics(scope.row._id)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="12">
                        <el-table
                            :data="tacticsMatch"
                            border
                            style="width: 100%">
                            <el-table-column
                                property="code"
                                label="代码">
                            </el-table-column>
                            <el-table-column
                                property="match"
                                label="联赛">
                            </el-table-column>
                            <el-table-column
                                property="odd"
                                label="赔率">
                            </el-table-column>
                            <el-table-column
                                property="score"
                                label="赛果">
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template  slot-scope="scope">
                                    <el-button size="mini" type="danger" plain icon="el-icon-delete" @click.native.prevent="deleteTacticsMatch(scope.row._id)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import { addTactics , getTacticsList, deleteTactics, getTacticsMatchList, addTacticsMatch, deleteTacticsMatch} from '../../api/getData'
    import headTop from '../../components/headTop'

    export default {
        data(){
            return {
                ranges : [ "2", "1.5", "1", "0", "-1", "-1.5", "-2"],
                tacticsListAll: [],
                tacticsList: [],
                tacticsMatch: [],
                tacticsAdd: {
                    match: '',
                    code: '',
                    odd: '',
                    score: ''
                },
                add: {
                    result: '',
                    area: '',
                    tactics: '',
                    situation: ''
                },
                activeRow: null,
                areaArr : [],
                resultArr : ["胜","平","负"]
            }
        },
    	components: {
    		headTop
    	},
        mounted(){
            this.getTactics();
        },
        computed: {
        },
        methods: {
            filterTactic() {
                this.tacticsList = this.tacticsListAll.filter(item => {
                    let areaArr = this.areaArr;
                    let resultArr = this.resultArr;
                    return areaArr.includes(item.area) && resultArr.includes(item.result)
                })
            },
            async getTactics() {
                const res = await getTacticsList();
                if (res.data.code === 200) {
                    this.tacticsListAll = res.data.data;
                    // this.filterTactic();
                    this.$message.success('查询成功');
                } else {
                    this.$message.error("查询失败");
                }
            },
            async setTactics() {
                let params = {
                    result: this.add.result,
                    area: this.add.area,
                    tactics: this.add.tactics,
                    situation: this.add.situation
                };

                const res = await addTactics(params);
                if (res.data.code === 200) {
                    this.getTactics();
                    this.$message.success('添加成功');
                } else {
                    this.$message.error("添加失败");
                }
            },
            async deleteTactics(id) {

                const res = await deleteTactics(id);
                if (res.data.code === 200) {
                    this.getTactics();
                    this.$message.success('删除成功');
                } else {
                    this.$message.error("删除失败");
                }
            },
            async getTacticsMatch(row) {
                this.activeRow = row;
                console.log(row)
                let tacticId = row._id;
                let res = await getTacticsMatchList(tacticId);
                if (res) {
                    this.tacticsMatch = res.data.data;
                    this.$message.success('查询成功');
                }
            },
            async addTacticsMatch() {
                let params = this.tacticsAdd;
                params.tacticId = this.activeRow._id;

                const res = await addTacticsMatch(params);
                if (res.data.code === 200) {
                    this.getTacticsMatch(this.activeRow);
                    this.$message.success('添加成功');
                } else {
                    this.$message.error("添加失败");
                }
            },
            async deleteTacticsMatch(id) {
                const res = await deleteTacticsMatch(id);
                if (res.data.code === 200) {
                    this.$message.success('删除成功');
                } else {
                    this.$message.error("删除失败");
                }
            }
        }
    }
</script>

<style lang="less">
	@import '../../style/mixin';
	.edit_container{
		padding: 40px;
		margin-bottom: 40px;
	}
</style>
