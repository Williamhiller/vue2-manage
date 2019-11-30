<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">设置内容</header>

            <div>
                <el-select v-model="type" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                    v-model="date"
                    type="date"
                    format="yyyy/MM/dd"
                    placeholder="日期">
                </el-date-picker>
                <el-time-select
                    placeholder="提示时间"
                    v-model="time"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '24:00'
                    }">
                </el-time-select>
                <el-row :gutter="20" class="mt20">
                    <el-col :span="8">
                        <el-checkbox-group v-model="week">
                            <el-checkbox label="周一"></el-checkbox>
                            <el-checkbox label="周二"></el-checkbox>
                            <el-checkbox label="周三"></el-checkbox>
                            <el-checkbox label="周四"></el-checkbox>
                            <el-checkbox label="周五"></el-checkbox>
                            <el-checkbox label="周六"></el-checkbox>
                            <el-checkbox label="周日"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mt20">
                    <el-col :span="9">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="text">
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" @click="setPush()">提交</el-button>
                    </el-col>
                </el-row>
                <div v-bind:id="rawId | dateFormat"></div>
                <div  class="mt20">
                    <el-table
                        :data="list"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="类型"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="时间">
                        </el-table-column>
                        <el-table-column
                            prop="week"
                            label="周">
                        </el-table-column>
                        <el-table-column
                            prop="text  | capitalize"
                            label="内容">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template  slot-scope="scope">
                                <el-button type="danger" size="small" @click="deletePush(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {getPushList, setPush, deletePush} from '@/api/getData'
    export default {
    	data(){
    		return {
                options: [{
                    value: '喝水',
                    label: '喝水'
                }, {
                    value: '工作',
                    label: '工作'
                }, {
                    value: '出行',
                    label: '出行'
                }, {
                    value: '其它',
                    label: '其它'
                }],
                type: '',
                date: '',
                time: '',
                text : '',
                week : [],
                list: [],
                rawId: '233dddddd'
    		}
    	},
        filters: {
            dateFormat(value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
    	components: {
    		headTop
    	},
    	mounted(){
            this.getPushList()
    	},
        computed: {
        },
    	methods: {
    		async getPushList(){
                const res = await getPushList()
                console.log(res.data)
                this.list = res.data.data;
    		},
            async setPush() {
                const set = await setPush({
                    type: this.type,
                    date: this.date,
                    time: this.time,
                    text: this.text,
                    week: this.week.join(','),
                })
                if(set.data.code === 200) {
                    this.getPushList()
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    });
                }
            },
            async deletePush(row) {
                const set = await deletePush(row._id)
                if(set.data.code === 200) {
                    this.getPushList()
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                }
            }
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .data_section {
        padding: 20px;
        .section_title {
            font-size: 18px;
            margin-bottom: 10px;
        }
    }
	.mt20 {
        margin-top: 20px;
    }
</style>
