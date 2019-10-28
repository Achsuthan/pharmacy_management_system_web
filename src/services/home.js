import config from './config'
import axios from 'axios'


const getPrescription = () => {
    return axios.post(config.baseUrl + "/prescription/getPrescriptionForPharmacy.php").then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
}

const getTablets = (payload) => {
    return axios.post(config.baseUrl + "/tablet/getTabletsFromPrescription.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
}

const updateTablets = (payload) => {
    return axios.post(config.baseUrl + "/tablet/updateTablets.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
}



export default {
    getPrescriptionloginPharmacy: getPrescription,
    getTablets: getTablets,
    updateTablets:updateTablets,
}