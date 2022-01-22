import Vue from 'vue'

const state = {
	userInfo: {},
	cities:[],
	auth:[]
}

const getters = {
	
}

const mutations = {
	PUSHUSERINFO: (state, userInfo) => {
		state.userInfo = userInfo
	},
	PUSHAUTH:(state, auth) => {
		state.auth = auth
	}
}

const actions = {
	// 登录
	
	toLogin({
		commit
	}, params) {
		commit('PUSHUSERINFO', params)
	},
	
	updateUserInfo({
		commit
	}, params) {
		commit('PUSHUSERINFO', params)
	},
	
	updateAuth({
		commit
	}, params) {
		commit('PUSHAUTH', params)
	},
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
