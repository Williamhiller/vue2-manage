<template>
    <div>
        <head-top></head-top>

        <div class="edit_container">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="edit_title">
                        <h3 class="">联赛</h3>
                        <el-input v-model="match"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="edit_title">
                        <h3 class="">轮次</h3>
                        <el-input v-model="round"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="edit_title">
                        <h3 class="">球探编号</h3>
                        <el-input v-model="code" @keyup.13.native="getData"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">

                </el-col>
            </el-row>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="对战数据" name="1">
                    <pre>{{matchData.output}}</pre>
                </el-collapse-item>
                <el-collapse-item title="威廉数据" name="2">
                    <william-data :william="williamOdd"></william-data>
                </el-collapse-item>
            </el-collapse>
        	<quill-editor v-model="content"
                ref="myQuillEditor"
                class="editer"
                :options="editorOption"
                @ready="onEditorReady($event)">
  			</quill-editor>
        </div>
        <div class="submit_btn">
  			<el-button type="primary" @click="submit">提交</el-button>
        </div>
        <div>
            <compare-line :lineData='lineData'></compare-line>
        </div>
    </div>
</template>

<script>
    import { getCodeData,uploadAnalyze } from '@/api/getData'
    import headTop from '../../components/headTop'
    import { quillEditor } from 'vue-quill-editor'
    import compareLine from '../../components/compareLine'
    import williamData from '../../components/williamData'

    export default {
        data(){
            return {
                activeNames : ['1'],
                match : '',
                round : '',
                code : '',
                content: '',
			    editorOption: {},
                matchData : {},
                lineData : null,
                williamOdd : ''
            }
        },
    	components: {
    		headTop,
    		quillEditor,
            compareLine,
            williamData
    	},
        computed: {
          	editor() {
	        	return this.$refs.myQuillEditor.quill
	      	}
        },
        methods: {
		    onEditorReady(editor) {
                
		    },
            async getData() {
		        let res = await getCodeData(this.code)
                if(res.data.code === 200) {
                    this.matchData = res.data.data;
                }
                this.williamOdd = this.matchData.william;

                this.lineData = {
                    william : this.matchData.william,
                    ladbrokes : this.matchData.ladbrokes,
                    bet : this.matchData.bet
                };
            },
            async submit(){
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
                    analyse: matchData.content,
                    william: matchData.william
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
