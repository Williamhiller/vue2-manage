import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'avatar.jpg'
	},
}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.data.code === 200) {
				commit('saveAdminInfo', res.data.data);
			}else{
				throw new Error(res.type)
			}
		}catch(err){
			console.log(err.message)
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})
