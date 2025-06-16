import {axiosClient} from "../apiClient.js";

const register = (user) => {
    return axiosClient.post("/register", JSON.stringify(user));
}

const login = (user) => {
    return axiosClient.post("/login", JSON.stringify(user));
}

export {register, login}