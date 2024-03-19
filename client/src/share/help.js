import moment from "moment"


export const Config = {
    image_path: "http://localhost:8080/image_node/"
}

const isNullorEmply = (value) => {
    if (value == "" || value == "null" || value == undefined) {
        return true;
    } else {
        return false;
    }
}

const getPermission = () => {
    var permission = localStorage.getItem("permission");
    if (!isNullorEmply(permission)) {
        permission = JSON.parse(permission);
        return permission;
    } else {
        return null;
    }
}

const logout = () => {
    localStorage.clear()
    window.location.href = "/dashboard/login"
}

const getUser = () => {
    var user = localStorage.getItem("user");
    if (isNullorEmply(user)) {
        logout()
    } else {
        user = JSON.parse(user)
        return user
    }
}

const isPersmission = (code_permission) => {
    const arrPermission = getPermission();
    if (arrPermission) {
        if (arrPermission.includes(code_permission)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const getRefreshToken = () => {
    var refresh_token = localStorage.getItem("refresh_token");
    if (!isNullorEmply(refresh_token)) {
        return refresh_token
    } else {
        return null;
    }
}

const getAcessToken = () => {
    var access_token = localStorage.getItem("access_token");
    if (!isNullorEmply(access_token)) {
        return access_token
    } else {
        return null;
    }
}

const formatDateClient = (data) => {
    if (!isNullorEmply(data)) {
        return moment(data).format("DD/MM/YYYY hh:mm");
    } else {
        return null;
    }
}

const formatDateServer = (data) => {
    if (!isNullorEmply(data)) {
        return moment(data).format("YYYY/MM/DD");
    } else {
        return null;
    }
}

const test = () => {

}

const storeUserData = (param) => {
    console.log(param)
    localStorage.setItem("isLogin", 1);
    localStorage.setItem("access_token", param.access_token);
    localStorage.setItem("refresh_permission", param.refresh_token);
    localStorage.setItem("permission", JSON.stringify(param.permission));
    localStorage.setItem("user", JSON.stringify(param.user));
}

export {
    isNullorEmply, getPermission, isPersmission,
    formatDateClient, formatDateServer, getRefreshToken,
    storeUserData, logout, getAcessToken, getUser
}