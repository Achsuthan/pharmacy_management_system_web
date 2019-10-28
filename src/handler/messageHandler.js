import Vue from 'vue'

export default {

    errorMessage(status,details) {
        Vue.notify({
            group: "foo",
            type:'error',
            title: status,
            text: details  
        })
    },

    networkError() {
        Vue.notify({
            group: "foo",
            type:'error',
            title: '500 - Network Error',
            text: 'Please check your connection.'
        })
    },

    successMessage(status, details) {
        Vue.notify({
            group: "foo",
            type:'success',
            title: status,
            text: details
        })
    }
}