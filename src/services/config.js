const isLive = false
var baseUrl = "http://localhost:8888/pharmacy_management_system_backend";

if(isLive){
    baseUrl = "http://localhost:8888/pharmacy_management_system_backend";
}
else {
    baseUrl = "http://localhost:8888/pharmacy_management_system_backend"
}

export default{
    isLive: isLive,
    baseUrl: baseUrl,
}