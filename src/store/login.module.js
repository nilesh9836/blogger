import { loginService } from '../services/login.service';

import { router } from '../router';

const state = {
    isLogin: false,
    token:null,
    user:null,
	content: [],
	oldContent: [],
	username: null,
	useremail: null
};
const actions = {
    login({commit}, { username, password }) {
        commit('loginRequest', { username });

        let result = loginService.login(username, password);
        if(result){
            commit('loginSuccess');
            console.log("login success");
        } else {
			commit('loginFailure')
		}
    },
    logout({commit}) {
        commit('resetState');
        router.push('/');
    },
    clearState ({ commit }) {
        commit('resetState');
    },
	storeBlog({ commit},{content}) {
		commit('storeBlog',{content});
	}
};
const mutations = {
    resetState (state) {
        state.isLogin=false;
        state.token=null;
        state.user=null;
		localStorage.setItem('isLogin',false);
    },
    loginRequest(state, user) {
        state.isLogin=true;
        state.token=null;
        state.user=user;
		state.username = user.username === 'nilesh'? 'Nilesh Mishra': 'Sandeep Singh';
		state.useremail = user.username === 'nilesh'? 'mishranileshkumar6@gmail.com': 'sandeep.singh@gmail.com';
		localStorage.setItem('user',JSON.stringify({username:state.username,useremail:state.useremail}));
    },
    loginSuccess(state) {
        state.isLogin=true;
        state.token=null;
        state.user=null;
		localStorage.setItem('isLogin',true);
    },
    loginFailure(state) {
        state.isLogin=false;
		localStorage.setItem('isLogin',false);
    },
	storeBlog(state,content) {
	// 	//if(!state.content.length) {
	// 	if(localStorage.content) state.oldContent.push(...JSON.parse(localStorage.content));
	// 	state.oldContent.push(content);
	// 	//}
		state.content.push(content);
		var existingEntries = JSON.parse(localStorage.getItem("content"));
    if(existingEntries == null) existingEntries = [];
    existingEntries.push(content);

		localStorage.setItem('content',JSON.stringify(existingEntries));
	}
};
export const login = {
    namespaced: true,
    state,
    actions,
    mutations
};
export const logout = {
    namespaced: true,
    state,
    actions,
    mutations
};
export const storeBlog = {
    namespaced: true,
    state,
    actions,
    mutations
};

