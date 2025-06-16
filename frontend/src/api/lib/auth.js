import {axiosClient} from "../apiClient.js";

const register = (user) => {
    return axiosClient.post("/register", JSON.stringify(user));
}

const login = (user) => {
    return axiosClient.post("/login", JSON.stringify(user));
}

const refresh = (refreshToken) => {
    return axiosClient.post("/refresh", JSON.stringify({ refreshToken }));
}

export {register, login, refresh}