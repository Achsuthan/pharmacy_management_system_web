import config from './config'
import axios from 'axios'


const validateQR = (payload) => {
    return axios.post(config.baseUrl + "/qr/validateQR.php", payload).then(response => {
        console.log(response)
        return response
    })
        .catch(error => {
            return error
        })
};

export default {
    validateQR: validateQR,
}