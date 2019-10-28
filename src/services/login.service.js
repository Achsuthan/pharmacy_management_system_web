import config from './config'
import axios from 'axios'


const loginPharmacyFn = (payload) => {
    return axios.post(config.baseUrl + "/pharmacy/login.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
};

const registerPharmacyFn = (payload) => {
    return axios.post(config.baseUrl + "/pharmacy/register.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
};

const loginLaboratoryFn = (payload) => {
    return axios.post(config.baseUrl + "/laboratory/login.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
};

const registerLaboratoryFn = (payload) => {
    return axios.post(config.baseUrl + "/laboratory/register.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
};

export default {
    loginPharmacy: loginPharmacyFn,
    loginLaboratoryFn: loginLaboratoryFn,
    registerLaboratoryFn: registerLaboratoryFn,
    registerPharmacyFn: registerPharmacyFn
}