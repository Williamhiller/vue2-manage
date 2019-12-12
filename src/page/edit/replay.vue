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

            <quill-editor v-model="replay"
                          ref="myQuillEditor"
                          class="editer"
                          :options="editorOption">
            </quill-editor>


        </div>

        <el-row :gutter="20" style="padding: 10px 40px 80px">
            <el-col :span="6">
                <div class="edit_title">
                    <el-input v-model="result" type="number" placeholder="赛果"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="edit_title">
                    <el-input v-model="score" placeholder="比分"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="edit_title">
                    <el-button type="primary" @click="uploadReplay">提交</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { getAnalyzeByCode,uploadReplay } from '@/api/getData'
    import headTop from '../../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                code : '',
                result: '',
                score: '',
                activeNames: ['1','2'],
                replay: '',
                analyseData : {},
                editorOption: {}
            }
        },
    	components: {
    		headTop,quillEditor
    	},
        watch: {
            $route() {
                if (this.$route.name === 'replay') {
                    this.code = this.$route.query.code;
                    this.getAnalyzeData()
                }
             }
        },
        mounted () {

        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            async getAnalyzeData(){
                const res = await getAnalyzeByCode(this.code);
                if (res.data.code === 200) {
                    this.analyseData = res.data.data;
                    this.replay = this.analyseData.replay;
                }else{
                    this.$message.error("获取数据失败");
                }
            },
            async uploadReplay(){
                let params = {
                    code : this.code,
                    replay : this.replay,
                    result : this.result,
                    score : this.score
                };
                const res = await uploadReplay(params);
                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    });
                    Object.assign(this.$data, this.$options.data.call(this));
                }else{
                    this.$message.error("保存失败");
                }
            }
        },
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
    .edit_container{
        padding: 40px;
        margin-bottom: 40px;
    }
    .editer{
        height: 150px;
    }
    .edit_title {
        margin-bottom: 10px;
    }
    .submit_btn{
        text-align: center;
    }
</style>
