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

                </el-col>
            </el-row>

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
    </div>
</template>

<script>
    import { uploadArticle } from '@/api/getData'
    import headTop from '../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                match : '',
                round : '',
                code : '',
                content: '',
			    editorOption: {}
            }
        },
    	components: {
    		headTop,
    		quillEditor,
    	},
        computed: {
          	editor() {
	        	return this.$refs.myQuillEditor.quill
	      	}
        },
        methods: {
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
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
                let params = {
                    round: this.round,
                    code: this.code,
                    content: this.content
                }
                console.log(params)
                const res = await uploadMyArticle(params)
                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                }else{
                    this.$message.error("添加失败");
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
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
