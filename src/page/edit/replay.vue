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
                <el-collapse-item title="威廉数据" name="2">
                    <william-data :william="williamOdd"></william-data>
                </el-collapse-item>
                <el-collapse-item title="分析" name="3">
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
    import williamData from '../../components/williamData'

    export default {
        data(){
            return {
                code : '',
                result: '',
                score: '',
                activeNames: ['1','2'],
                replay: '',
                analyseData : {},
                editorOption: {},
                williamOdd : '2.9|3.8|2.2|07-24 07:56|1.01|0.94|0.89;2.87|3.8|2.25|07-24 07:52|1.00|0.94|0.91;2.9|3.8|2.2|07-24 07:49|1.01|0.94|0.89;2.8|3.8|2.25|07-24 07:32|0.97|0.94|0.91;2.87|3.75|2.25|07-24 07:21|1.00|0.93|0.91;2.8|3.8|2.25|07-24 07:14|0.97|0.94|0.91;2.8|3.75|2.3|07-24 06:55|0.97|0.93|0.93;2.8|3.7|2.3|07-24 06:53|0.97|0.92|0.93;2.8|3.75|2.3|07-24 06:52|0.97|0.93|0.93;2.8|3.7|2.3|07-24 06:30|0.97|0.92|0.93;2.8|3.75|2.3|07-24 06:28|0.97|0.93|0.93;2.8|3.7|2.3|07-24 06:24|0.97|0.92|0.93;2.8|3.75|2.3|07-24 04:48|0.97|0.93|0.93;2.75|3.8|2.3|07-24 04:17|0.95|0.94|0.93;2.8|3.75|2.3|07-24 04:15|0.97|0.93|0.93;2.75|3.8|2.3|07-24 03:46|0.95|0.94|0.93;2.7|3.8|2.35|07-24 03:44|0.94|0.94|0.95;2.75|3.8|2.3|07-24 03:39|0.95|0.94|0.93;2.7|3.9|2.3|07-24 03:37|0.94|0.97|0.93;2.75|3.8|2.3|07-24 03:22|0.95|0.94|0.93;2.7|4|2.25|07-24 01:11|0.94|0.99|0.91;2.7|4|2.3|07-24 01:03|0.94|0.99|0.93;2.7|4|2.25|07-24 00:52|0.94|0.99|0.91;2.7|4|2.3|07-24 00:50|0.94|0.99|0.93;2.7|4|2.25|07-24 00:33|0.94|0.99|0.91;2.7|4|2.3|07-24 00:24|0.94|0.99|0.93;2.62|4|2.35|07-24 00:06|0.91|0.99|0.95;2.7|4|2.3|07-23 23:56|0.94|0.99|0.93;2.62|4|2.35|07-23 23:42|0.91|0.99|0.95;2.6|4|2.35|07-23 22:53|0.90|0.99|0.95;2.55|4|2.37|07-23 22:10|0.88|0.99|0.96;2.5|4|2.45|07-23 21:59|0.87|0.99|0.99;2.55|4|2.4|07-23 21:32|0.88|0.99|0.97;2.55|4|2.37|07-23 21:28|0.88|0.99|0.96;2.55|4|2.4|07-23 21:20|0.88|0.99|0.97;2.55|4|2.37|07-23 19:38|0.88|0.99|0.96;2.6|4|2.35|07-23 17:41|0.90|0.99|0.95;2.55|4|2.37|07-23 17:06|0.88|0.99|0.96;2.5|4|2.45|07-23 16:11|0.87|0.99|0.99;2.55|4|2.4|07-23 16:04|0.88|0.99|0.97;2.5|4.2|2.37|07-23 12:08|0.87|1.04|0.96;2.5|4.2|2.4|07-23 10:32|0.87|1.04|0.97;2.5|4.2|2.37|07-23 09:37|0.87|1.04|0.96;2.55|4.2|2.35|07-22 03:05|0.88|1.04|0.95;2.6|4.2|2.3|07-22 03:03|0.90|1.04|0.93;2.55|4.2|2.35|07-22 02:36|0.88|1.04|0.95;2.5|4.2|2.35|07-21 09:32|0.87|1.04|0.95;2.5|4.2|2.4|07-21 08:06|0.87|1.04|0.97;2.5|4.2|2.37|07-21 08:00|0.87|1.04|0.96;2.55|4|2.37|07-21 00:22|0.88|0.99|0.96;2.55|4|2.4|07-21 00:06|0.88|0.99|0.97;2.5|4|2.45|07-21 00:04|0.87|0.99|0.99;2.45|4|2.5|07-20 19:10|0.85|0.99|1.01;2.45|4.2|2.45|07-20 16:35|0.85|1.04|0.99;2.45|4|2.5|07-20 13:45|0.85|0.99|1.01;2.45|4.2|2.45|07-20 12:51|0.85|1.04|0.99;2.45|4|2.5|07-20 10:11|0.85|0.99|1.01;2.37|4|2.55|07-20 09:11|0.82|0.99|1.03;2.3|4|2.7|07-20 09:06|0.80|0.99|1.09;2.25|4|2.7|07-20 09:04|0.78|0.99|1.09;2.2|4|2.8|07-20 09:02|0.76|0.99|1.13;2.25|4|2.7|07-20 08:47|0.78|0.99|1.09;2.2|4|2.8|07-20 08:40|0.76|0.99|1.13;2.15|4|2.87|07-20 07:40|0.75|0.99|1.16;2.2|4|2.8|07-20 07:08|0.76|0.99|1.13;2.15|4|2.87|07-20 06:42|0.75|0.99|1.16;2.35|4.2|2.5|07-20 06:31|0.81|1.04|1.01;2.6|4.2|2.3|07-20 06:29|0.90|1.04|0.93;2.35|4.2|2.5|07-20 06:27|0.81|1.04|1.01;2.2|4.2|2.7|07-20 06:24|0.76|1.04|1.09;1.95|4.2|3.3|07-20 06:18|0.68|1.04|1.34;1.91|4.2|3.4|07-20 06:16|0.66|1.04|1.38;'
            }
        },
    	components: {
    		headTop,quillEditor, williamData
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
                    this.williamOdd = res.data.data.william
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
