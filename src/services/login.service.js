import { loginService } from '../services/login.service';
import { router } from '../router';

// State of the application
const state = {
    isLogin: false,
    token: null,
    user: null,
    content: [],
    oldContent: [],
    username: null,
    useremail: null
};

// Actions that can be dispatched
const actions = {
    // Login action
    async login({commit}, { username, password }) {
        commit('loginRequest', { username });

        let result = await loginService.login(username, password);
        if(result){
            commit('loginSuccess');
            console.log("login success");
        } else {
            commit('loginFailure');
        }
    },
    // Logout action
    logout({commit}) {
        commit('resetState');
        router.push('/');
    },
    // Clear state action
    clearState ({ commit }) {
        commit('resetState');
    },
    // Store blog action
    storeBlog({ commit},{content}) {
        commit('storeBlog',{content});
    },
    // Signup action
    async signup({commit},{username, password}) {
        let result = await loginService.signup(username, password);
        if (result) {
            commit('signUpSucess');
            console.log("signup success");
        } else {
            commit('signUpFailure');
        }
    }
};

// Mutations to change the state
const mutations = {
    // Reset state mutation
    resetState (state) {
        Object.assign(state, {
            isLogin: false,
            token: null,
            user: null
        });
        localStorage.setItem('isLogin',false);
    },
    // Login request mutation
    loginRequest(state, user) {
        Object.assign(state, {
            isLogin: true,
            token: null,
            user: user,
            username: user.username === 'nilesh'? 'Nilesh Mishra': 'Sandeep Singh',
            useremail: user.username === 'nilesh'? 'mishranileshkumar6@gmail.com': 'sandeep.singh@gmail.com'
        });
        localStorage.setItem('user',JSON.stringify({username:state.username,useremail:state.useremail}));
    },
    // Login success mutation
    loginSuccess(state) {
        Object.assign(state, {
            isLogin: true,
            token: null,
            user: null
        });
        localStorage.setItem('isLogin',true);
    },
    // Signup success mutation
    signUpSucess(state) {
        Object.assign(state, {
            isLogin: false,
            token: null,
            user: null
        });
        localStorage.setItem('isLogin', false);
    },
    // Login failure mutation
    loginFailure(state) {
        Object.assign(state, {
            isLogin: false
        });
        localStorage.setItem('isLogin',false);
    },
    // Store blog mutation
    storeBlog(state,content) {
        state.content.push(content);
        var existingEntries = JSON.parse(localStorage.getItem("content"));
        if(existingEntries == null) existingEntries = [];
        existingEntries.push(content);
        localStorage.setItem('content',JSON.stringify(existingEntries));
    }
};

// Exporting modules
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
export const signup = {
    namespaced: true,
    state,
    actions,
    mutations
};