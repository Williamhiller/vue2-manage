<template>
    <div>
        <head-top></head-top>

        <div class="edit_container">
            <el-row :gutter="10">
                <el-col :span="2">
                    <el-input type="textarea" v-model="add.match" placeholder="联赛"></el-input>
                </el-col>
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
                    <el-input type="textarea" v-model="add.description" placeholder="策略"></el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" @click="setRules">确定</el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>

            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input v-model="rulesAdd.code" placeholder="代码"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="rulesAdd.odd" placeholder="赔率"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="rulesAdd.score" placeholder="比分"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addRulesMatch">确定</el-button>
                </el-col>
            </el-row>

            <el-divider></el-divider>
            <div class="table_container">

                <el-row :gutter="20" class="mt20">
                    <el-col :span="20">
                        <el-radio 
                            @change="getRules" 
                            v-model="selectedMatch" 
                            v-for="item in matches" 
                            :key="item"
                            v-bind:label="item" 
                            v-bind:text="item"></el-radio>
                    </el-col>
                    <el-col :span="20" style="margin-top: 10px">

                        <el-checkbox-group v-model="areaArr">
                            <el-checkbox @change="filterRule" v-for="item in ranges" v-bind:label="item" v-bind:key="item"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                    <el-col :span="20" style="margin-top: 10px">
                        <el-checkbox-group v-model="resultArr">
                            <el-checkbox label="胜" @change="filterRule"></el-checkbox>
                            <el-checkbox label="平" @change="filterRule"></el-checkbox>
                            <el-checkbox label="负" @change="filterRule"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>

                <el-divider></el-divider>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-table
                            :data="rulesList"
                            highlight-current-row
                            @current-change="getRulesMatch"
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
                                property="description"
                                label="策略">
                            </el-table-column>
                            <el-table-column
                                width="80"
                                label="操作">
                                <template  slot-scope="scope">
                                    <el-button size="mini" type="danger" plain icon="el-icon-delete" @click.native.prevent="deleteRules(scope.row._id)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="12">
                        <el-table
                            :data="rulesMatch"
                            border
                            style="width: 100%">
                            <el-table-column
                                property="code"
                                label="代码">
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
                                    <el-button size="mini" type="danger" plain icon="el-icon-delete" @click.native.prevent="deleteRulesMatch(scope.row._id)"></el-button>
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
    import { addRules , getRulesList, deleteRules, getRulesMatchList, addRulesMatch, deleteRulesMatch} from '../../api/getData'
    import headTop from '../../components/headTop'

    export default {
        data(){
            return {
                ranges : [ "2", "1.5", "1", "0", "-1", "-1.5", "-2"],
                rulesListAll: [],
                rulesList: [],
                rulesMatch: [],
                rulesAdd: {
                    code: '',
                    odd: '',
                    score: ''
                },
                add: {
                    match: '',
                    result: '',
                    area: '',
                    description: '',
                    situation: ''
                },
                activeRow: null,
                areaArr : ["0"],
                resultArr : ["胜"],
                matches : [
                    "欧冠","欧罗巴",
                    "英超", "英冠","英足总杯",
                    "苏超", "苏冠","苏总杯",
                    "西甲","西乙",
                    "意甲","意乙","意杯",
                    "法甲","法乙","法国杯",
                    "葡超","葡甲",
                    "波兰超","土超","俄超",
                    "巴西杯","阿甲","自由杯","南球杯",
                ],
                selectedMatch : ""
            }
        },
    	components: {
    		headTop
    	},
        mounted(){
            // this.getRules();
        },
        computed: {
        },
        methods: {
            filterRule() {
                this.rulesList = this.rulesListAll.filter(item => {
                    let areaArr = this.areaArr;
                    let resultArr = this.resultArr;
                    return areaArr.includes(item.area) && resultArr.includes(item.result)
                })
            },
            async getRules() {
                const res = await getRulesList(this.selectedMatch);
                if (res.data.code === 200) {
                    this.rulesListAll = res.data.data;
                    this.filterRule();
                    this.$message.success('查询成功');
                } else {
                    this.$message.error("查询失败");
                }
            },
            async setRules() {
                let params = {
                    match: this.add.match,
                    result: this.add.result,
                    area: this.add.area,
                    description: this.add.description,
                    situation: this.add.situation
                };

                const res = await addRules(params);
                if (res.data.code === 200) {
                    this.getRules();
                    this.$message.success('添加成功');
                } else {
                    this.$message.error("添加失败");
                }
            },
            async deleteRules(id) {

                const res = await deleteRules(id);
                if (res.data.code === 200) {
                    this.getRules();
                    this.$message.success('删除成功');
                } else {
                    this.$message.error("删除失败");
                }
            },
            async getRulesMatch(row) {
                if(!row) {
                    return ;
                }
                this.activeRow = row;
                let ruleId = row._id;
                let res = await getRulesMatchList(ruleId);
                if (res) {
                    this.rulesMatch = res.data.data;
                    this.$message.success('查询成功');
                }
            },
            async addRulesMatch() {
                let params = this.rulesAdd;
                params.ruleId = this.activeRow._id;

                const res = await addRulesMatch(params);
                if (res.data.code === 200) {
                    this.getRulesMatch(this.activeRow);
                    this.$message.success('添加成功');
                } else {
                    this.$message.error("添加失败");
                }
            },
            async deleteRulesMatch(id) {
                const res = await deleteRulesMatch(id);
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
