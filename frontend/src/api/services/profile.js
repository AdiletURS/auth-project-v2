import {axiosClient} from "@/api/apiClient.js";

const getProfile = () => {
    return axiosClient.get("/profile");
}

export {getProfile}