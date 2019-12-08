<template>
    <div>
        <head-top></head-top>

        <div class="edit_container">
            <div class="edit_title">
                <h3 class="">文章标题</h3>
                <el-input v-model="title"></el-input>
            </div>
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
    import headTop from '../../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                title : '',
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
                if(this.title === '') {
                    this.$message.warning('标题不能为空！');
                    return;
                }
                if(this.content === '') {
                    this.$message.warning('内容不能为空！');
                    return;
                }
                let params = {
                    title: this.title,
                    content: this.content
                }
                console.log(params)
                const res = await uploadArticle(params)
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
