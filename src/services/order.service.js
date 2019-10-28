import config from './config'
import axios from 'axios'


const getReadyForDeliverOrder = (payload) => {
    return axios.post(config.baseUrl + "/prescription/getPrescriptionForReadyForDelivery.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
};

const getDeliveredOrder = (payload) => {
    return axios.post(config.baseUrl + "/prescription/getPrescriptionForDelivered.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
};

export default {
    getReadyForDeliverOrder: getReadyForDeliverOrder,
    getDeliveredOrder: getDeliveredOrder,
}