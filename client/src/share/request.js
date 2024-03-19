// import axios from 'axios'
import { message } from "antd";
import { getAcessToken, getRefreshToken, isNullorEmply, logout, storeUserData } from "./help";


// const Config  = {
//     base_server: "http://localhost:8081/api",
//     image_path: "",
//     version: 1
// }

// const request = (url, method, data, new_token=null) => {
//     var access_token = getAcessToken;
//     if(!isNullorEmply(access_token)){
//         access_token = new_token;
//     }

//     return axios({
//         url: Config.base_server + url,
//         method: method,
//         data: data,
//         headers: {
//             Authorization: "Bearer "+ access_token
//         }
//     }).then(res => {
//         return res.data;
//     }).catch(error => {
//         // var status = error.response.status;
//         return error;
//     }).finally(final => {
//         console.log("final", final);
//     })

// }

// const refreshToken = (url, method, data) => {
//     var refresh_key = getRefreshToken();
//     return axios({
//         url: Config.base_server + "employee_refresh_token",
//         method: "post",
//         data: {
//             "refresh_key" : refresh_key
//         }
//     }).then(res => {
//         storeUserData(res.data);
//         var new_token = localStorage.getItem("access_token");
//         return (url, method, data, new_token)
//     }).catch(err =>{
//         logout();
//         return false;
//     })
// }

// export {request, refreshToken};




import axios from "axios";
// import { getAccessToken, getRefreshToken, logout, storeUserData } from "./helper";
// import { message } from "antd";

export const config = {
    base_server: "http://localhost:8081/api/",
    image_path: "",
    version: 1
}
export const request = (url, method, param, new_token = null) => {
    var access_token = getAcessToken();
    if (new_token != null) {
        access_token = new_token
    }
    return axios({
        url: config.base_server + url,
        method: method,
        data: param,
        headers: {
            Authorization: "Bearer " + access_token
        }
    }).then(res => {
        return res.data;
    }).catch(err => {
        var status = err.response?.status
        if (status === 404) {
            // return err
            message.error("Route Not Found!")
        } else if (status === 401) {
            message.error("Status : " + err.response.status + " Error : " + err.response.data.message)
            return refreshToken(url, method, param)
            // logout()
            // console.log(err)
            // message.error("You don't has permission access this method!")
            // ព្យាយាមត Token ថ្មី

        } else if (status === 500) {
            message.error("Internal error server!")
        } else {
            message.error("Status : " + err.response.status + " Error : " + err.response.data.message)
            console.log(err)
        }
        return false
    }).finally(final => {
        // console.log("final", final)
    })
}


export const refreshToken = (url, method, param) => {
    const refresh_key = getRefreshToken()
    return axios({
        url: config.base_server + "employee_refresh_token",
        method: "post",
        data: {
            "refresh_key": refresh_key
        }
    }).then(res => {
        storeUserData(res.data)
        var new_token = res.data.access_token
        return request(url, method, param, new_token)
    }).catch(error => {
        // តលែងបាន ចង់មិនចង់ ត្រូវ Logout
        // message.error("refresh fail")
        logout()
        return false
    })
}
