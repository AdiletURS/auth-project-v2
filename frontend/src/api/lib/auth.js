import {axiosClient} from "../apiClient.js";

const register = (user) => {
    return axiosClient.post("/register", JSON.stringify(user));
}

export {register}