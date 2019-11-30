import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const myAnalyze = r => require.ensure([], () => r(require('@/page/myAnalyze')), 'myAnalyze');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const push = r => require.ensure([], () => r(require('@/page/push')), 'push');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
            path: '/myAnalyze',
            component: myAnalyze,
            meta: ['编辑', '比赛分析'],
        },{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		},{
            path: '/push',
            component: push,
            meta: ['设置', 'APP推送设置'],
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
