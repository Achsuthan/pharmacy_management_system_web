import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        isLoading: false

    },
    mutations:{
        SET_LOADING(state,payload){
            state.isLoading = payload
        }
    },
    actions:{
        setLoading({commit},payload){
            commit("SET_LOADING", payload)
        }
    },
    getters:{
        getLoading(state){
            return state.isLoading
        }
    }
})