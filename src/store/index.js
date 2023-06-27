import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate"; //引入vuex状态持久化（页面刷新状态依然保存）
export default createStore({
    state: {
        loginStatus: null,
    },
    getters: {},
    mutations: {
        setLoginStatus(state, payload) {
            state.loginStatus = payload;
        },
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState({
            key: 'vuex',
            storage: window.sessionStorage, //使用会话缓存机制
        })
    ]
});
