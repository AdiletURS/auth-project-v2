import {AUTH_BASE_URL, axiosClient} from "@/api/apiClient.js";

const getProfile = () => {
    return axiosClient.get(AUTH_BASE_URL + "/profile");
}

export {getProfile}