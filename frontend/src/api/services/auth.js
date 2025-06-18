import {AUTH_BASE_URL, axiosClient} from "../apiClient.js";

const register = (user) => {
    return axiosClient.post(AUTH_BASE_URL + "/register", JSON.stringify(user));
}

const login = (user) => {
    return axiosClient.post(AUTH_BASE_URL + "/login", JSON.stringify(user));
}

const refresh = (refreshToken) => {
    return axiosClient.post(AUTH_BASE_URL + "/refresh", JSON.stringify({ refreshToken }));
}

export {register, login, refresh}