import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        isLoading: false,
        user: null,

    },
    mutations:{
        SET_LOADING(state,payload){
            state.isLoading = payload
        },
        SET_USER(state,payload){
            state.user = payload
        }
    },
    actions:{
        setLoading({commit},payload){
            commit("SET_LOADING", payload)
        },
        setUser({commit},payload){
            commit("SET_USER",payload)
        }
    },
    getters:{
        getLoading(state){
            return state.isLoading
        },
        getUser(state){
            return state.user
        }
    }
})