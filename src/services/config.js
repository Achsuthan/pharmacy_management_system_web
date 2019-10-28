const isLive = false
var baseUrl = "http://localhost:8888/pharmacy_management_system_backend";

if(isLive){
    baseUrl = "http://localhost:8888/pharmacy_management_system_backend";
}
else {
    baseUrl = "http://localhost:8888/pharmacy_management_system_backend"
}

const checkUser = ()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if(user){
        return true
    }
    else {
        return false
    }
}

export default{
    isLive: isLive,
    baseUrl: baseUrl,
    checkUser: checkUser,
}