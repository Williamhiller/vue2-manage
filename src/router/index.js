import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const myAnalyze = r => require.ensure([], () => r(require('@/page/edit/myAnalyze')), 'myAnalyze');
const myAnalyzeList = r => require.ensure([], () => r(require('@/page/data/myAnalyzeList')), 'myAnalyzeList');
const matchList = r => require.ensure([], () => r(require('@/page/data/matchList')), 'matchList');
const analyzeRules = r => require.ensure([], () => r(require('@/page/data/analyzeRules')), 'analyzeRules');
const positions = r => require.ensure([], () => r(require('@/page/data/positions')), 'positions');
const replay = r => require.ensure([], () => r(require('@/page/edit/replay')), 'replay');
const explain = r => require.ensure([], () => r(require('@/page/more/explain')), 'explain');
const push = r => require.ensure([], () => r(require('@/page/setting/push')), 'push');

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
            path: '/myAnalyze',
            component: myAnalyze,
            meta: ['编辑', '比赛分析'],
        },{
            path: '/replay',
            name: 'replay',
            component: replay,
            meta: ['编辑', '复盘'],
        },{
            path: '/myAnalyzeList',
            component: myAnalyzeList,
            meta: ['数据管理', '分析列表'],
        },{
            path: '/matchList',
            component: matchList,
            meta: ['数据管理', '比赛列表'],
        },{
            path: '/analyzeRules',
            component: analyzeRules,
            meta: ['数据管理', '分析规则'],
        },{
            path: '/positions',
            component: positions,
            meta: ['数据管理', '基础位置'],
        },{
			path: '/explain',
			component: explain,
			meta: ['其它', '其它'],
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
