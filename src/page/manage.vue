<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive"
                         background-color="#324057"
                         text-color="#fff"
                         active-text-color="#ffd04b"
                         style="min-height: 100%;" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
<!--						<el-menu-item index="userList">用户列表</el-menu-item>-->
                        <el-menu-item index="matchList">比赛列表</el-menu-item>
                        <el-menu-item index="myAnalyzeList">分析列表</el-menu-item>
                        <el-menu-item index="analyzeRules">规则</el-menu-item>
                        <el-menu-item index="positions">位置信息</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>编辑</template>
						<el-menu-item index="myAnalyze">比赛分析</el-menu-item>
						<el-menu-item index="replay">复盘</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="push">APP推送设置</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>其它</template>
						<el-menu-item index="explain">其它</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				// return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
    .el-menu {
        border-right:none
    }
</style>
