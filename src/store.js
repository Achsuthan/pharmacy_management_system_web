import Vue from 'vue'
import Vuex from 'vuex'
import homeService from "./services/home";
import messageHandler from "./handler/messageHandler";
import { shuffleArray } from "@/shared/utils";
import orderService from './services/order.service'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isLoading: false,
        user: null,
        prescription: [],

    },
    mutations: {
        SET_LOADING(state, payload) {
            state.isLoading = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_PRESCRIPTION(state, payload) {
            console.log(payload)
            state.isLoading = true
            homeService
                .getPrescriptionloginPharmacy()
                .then(res => {
                    if (res.data.status == 200) {
                        console.log("success");
                        state.isLoading = false
                        console.log(res)
                        state.prescription = shuffleArray(res.data.details)
                        console.log(this.itemsArray)
                    } else {
                        state.isLoading =  false
                        state.prescription = []
                        messageHandler.errorMessage("Failed", res.data.message);
                    }
                })
                .catch(error => {
                    state.isLoading =  false
                    console.log(error);
                    messageHandler.networkError();
                });
        },
        SET_PRESCRIPTION_FOR_DELIVER(state, payload) {
            console.log(payload)
            state.isLoading = true
            orderService
                .getReadyForDeliverOrder(payload)
                .then(res => {
                    if (res.data.status == 200) {
                        console.log("success");
                        state.isLoading = false
                        console.log(res)
                        state.prescription = shuffleArray(res.data.details)
                    } else {
                        state.isLoading =  false
                        state.prescription = []
                        messageHandler.errorMessage("Failed", res.data.message);
                    }
                })
                .catch(error => {
                    state.isLoading =  false
                    console.log(error);
                    messageHandler.networkError();
                });
        }
    },
    actions: {
        setLoading({ commit }, payload) {
            commit("SET_LOADING", payload)
        },
        setUser({ commit }, payload) {
            commit("SET_USER", payload)
        },
        getPrescription({ commit }, payload) {
            commit("SET_PRESCRIPTION", payload)
        },
        getPrescriptionForDeliver({ commit }, payload) {
            commit("SET_PRESCRIPTION_FOR_DELIVER", payload)
        }
    },
    getters: {
        getLoading(state) {
            return state.isLoading
        },
        getUser(state) {
            return state.user
        },
        getCheckUser(state) {
            if (state.user) {
                return true
            }
            else {
                return false
            }
        },
        getPharmacyName(state) {
            return state.user.name
        },
        getPrescription(state){
            return state.prescription
        }
    }
})